// eslint-disable-next-line max-classes-per-file
import React from "react";
import "antd/dist/antd.css";
import "../style.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import PropTypes from "prop-types";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
EditableRow.propTypes = {
  form: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired
};
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    let { editing } = this.state;
    editing = !editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} 的此步骤没有填写.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
EditableCell.propTypes = {
  record: PropTypes.objectOf.isRequired,
  handleSave: PropTypes.func.isRequired,
  children: PropTypes.objectOf.isRequired,
  dataIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  restProps: PropTypes.objectOf.isRequired
};

class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    const { selectedMissionDetails, saveDetailEdit } = props;
    const { steps } = selectedMissionDetails;
    this.state = {
      dataSource: steps,
      count: selectedMissionDetails.length,
      saveDetailEdit
    };
    this.columns = [
      {
        title: "任务步骤",
        dataIndex: "content",
        width: "80%",
        editable: true
      },
      {
        dataIndex: "operation",
        render: (text, record) => {
          const { dataSource } = this.state;
          return dataSource.length >= 1 && !record.isComplated ? (
            <Popconfirm
              title="确定是已完成?"
              onConfirm={() => this.handleDelete(record)}
            >
              <a> 未完成</a>
            </Popconfirm>
          ) : (
            "已完成"
          );
        }
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    const { selectedMissionDetails } = nextProps;
    const { steps } = selectedMissionDetails;
    const dataSource = steps.map(value => ({
      ...value,
      item: value
    }));
    this.state.dataSource = dataSource;
  }

  handleDelete = record => {
    const { key, isComplated } = record;
    const { saveDetailEdit } = this.state;
    let { dataSource } = this.state;
    dataSource = dataSource.map(value => {
      let result;
      if (value.key === key) {
        result = {
          ...value,
          isComplated: !isComplated
        };
      } else {
        result = value;
      }
      return result;
    });
    saveDetailEdit(dataSource);
    this.setState({ dataSource });
  };

  handleAdd = () => {
    const { count, dataSource, saveDetailEdit } = this.state;
    const newData = {
      key: dataSource.length,
      content: "",
      isComplated: false
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
    saveDetailEdit(dataSource);
  };

  handleSave = row => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
    const { saveDetailEdit } = this.state;
    saveDetailEdit(newData);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          // editable: col.editable,
          editable: !record.isComplated,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加步骤
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}
DetailTable.propTypes = {
  saveDetailEdit: PropTypes.func.isRequired,
  selectedMissionDetails: PropTypes.arrayOf.isRequired
};
export default DetailTable;
