// eslint-disable-next-line max-classes-per-file
import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import PropTypes, { bool } from "prop-types";
import MissionDetailModal from "./missionDetailModal";

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
              message: `${title} is required.`
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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const { count, updateChangedDetailList } = props;
    let { dataSource } = props;
    dataSource = dataSource.map(value => ({ ...value, item: value }));
    this.state = {
      dataSource,
      count,
      isModalShow: false,
      selectedMissionDetails: {},
      updateChangedDetailList
    };

    this.columns = [
      {
        title: "待办事项",
        dataIndex: "title",
        width: "80%",
        editable: true
      },
      {
        dataIndex: "item",
        render: (text, record) =>
          dataSource.length >= 1 ? (
            <>
              <a onClick={() => this.openModal(record)}>查看</a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Popconfirm
                title="确定是已完成?"
                onConfirm={() => this.handleDelete(record)}
              >
                <a>完成</a>
              </Popconfirm>
            </>
          ) : null
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    let { dataSource } = nextProps;
    dataSource = dataSource.map(value => ({ ...value, item: value }));
    this.state.dataSource = dataSource;
  }

  openModal = record => {
    this.setState({ isModalShow: true, selectedMissionDetails: record });
  };

  closeModal = () => {
    this.setState({ isModalShow: false });
  };

  handleDelete = record => {
    this.props.updateChangedDetailList(record);
    this.props.updateMissionComplated(record.key);

    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== record.key)
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

  saveDetailEdit = updatedSteps => {
    console.log("saveDetailEdit--->", updatedSteps);
    let { dataSource, selectedMissionDetails } = this.state;
    delete selectedMissionDetails.item;
    selectedMissionDetails = {
      ...selectedMissionDetails,
      steps: updatedSteps
    };
    dataSource = dataSource.map(value => {
      let result;
      if (value.key === selectedMissionDetails.key) {
        result = selectedMissionDetails;
      } else {
        result = value;
      }
      return result;
    });
    this.setState({ dataSource });
  };

  render() {
    const { dataSource, isModalShow, selectedMissionDetails } = this.state;
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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <MissionDetailModal
          isShow={isModalShow}
          closeModal={this.closeModal}
          selectedMissionDetails={selectedMissionDetails}
          saveDetailEdit={this.saveDetailEdit}
        />
      </div>
    );
  }
}
EditableTable.propTypes = {
  dataSource: PropTypes.arrayOf.isRequired,
  count: PropTypes.number.isRequired,
  updateMissionComplated: PropTypes.func.isRequired
};
export default EditableTable;
