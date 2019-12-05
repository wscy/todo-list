import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Divider, Tag } from "antd";
import "./style.css";

class StaticTable extends Component {
  constructor(props) {
    super(props);
    const { updateModalShow, dataSource, count } = props;

    this.columns = [
      {
        title: "已完成事项",
        dataIndex: "title",
        width: "80%",
        render: text => <a>{text}</a>
      },
      {
        //   title: "查看",
        dataIndex: "operation",
        render: record => <a onClick={() => updateModalShow(true)}>查看</a>
      }
    ];
    this.state = { dataSource };
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Table
        columns={this.columns}
        dataSource={dataSource}
        pagination={false}
      />
    );
  }
}
export default StaticTable;
