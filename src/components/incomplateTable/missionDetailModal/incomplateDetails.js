// eslint-disable-next-line max-classes-per-file
import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import PropTypes, { bool } from "prop-types";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
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
              message: `${title} 没有填写.`
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

class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    const { closeModal, selectedMissionDetails } = props;
    this.state = {
      dataSource: selectedMissionDetails,
      count: selectedMissionDetails.length
    };
    this.columns = [
      {
        title: "待办事项",
        dataIndex: "content",
        width: "80%",
        editable: true
      },
      {
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 && !record.isComplated ? (
            <Popconfirm
              title="确定是已完成?"
              onConfirm={() => this.handleDelete(record)}
            >
              <a> 未完成</a>
            </Popconfirm>
          ) : (
            "已完成"
          )
      }
    ];
  }

  handleDelete = record => {
    const { key, isComplated } = record;
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
    /* this.setState({ dataSource: dataSource.filter(item => item.key !== key) }); */
    this.setState({ dataSource });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      content: "",
      isComplated: false
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  render() {
    console.log("------------>", this.state);
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
          Add a row
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
  closeModal: PropTypes.func.isRequired,
  selectedMissionDetails: PropTypes.arrayOf.isRequired
};
export default DetailTable;
