import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table, Divider, Tag } from "antd";

const ComplatedDetails = props => {
  const { selectedMissionDetails } = props;

  const columns = [
    {
      title: "已完成事项",
      dataIndex: "content",
      width: "80%"
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={selectedMissionDetails}
      pagination={false}
    />
  );
};

ComplatedDetails.propTypes = {
  selectedMissionDetails: PropTypes.arrayOf.isRequired
};
export default ComplatedDetails;
