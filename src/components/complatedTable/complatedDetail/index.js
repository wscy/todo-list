import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Divider, Tag } from "antd";
import "./style.css";

const ComplatedDetail = props => {
  const { selectedMissionDetail } = props;

  const columns = [
    {
      dataIndex: "content",
      width: "80%"
    }
  ];

  console.log("selectedMissionDetail-->", selectedMissionDetail);
  return (
    <Table
      columns={columns}
      dataSource={selectedMissionDetail}
      pagination={false}
    />
  );
};
export default ComplatedDetail;
