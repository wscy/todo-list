import React, { Component } from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import { Table } from "antd";
import "./style.css";
import MissionDetailModal from "./missionDetailModal";

class StaticTable extends Component {
  constructor(props) {
    super(props);
    let { dataSource } = props;
    dataSource = dataSource.map(value => ({ ...value, item: value }));
    this.columns = [
      {
        title: "已完成事项",
        dataIndex: "title",
        width: "80%"
      },
      {
        //   title: "查看",
        dataIndex: "item",
        render: record => <a onClick={() => this.openModal(record)}>查看</a>
      }
    ];
    this.state = {
      dataSource,
      isModalShow: false,
      selectedMissionDetails: {}
    };
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

  render() {
    const { dataSource, isModalShow, selectedMissionDetails } = this.state;

    return (
      <>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
        />
        <MissionDetailModal
          isShow={isModalShow}
          closeModal={this.closeModal}
          selectedMissionDetails={selectedMissionDetails}
        />
      </>
    );
  }
}
StaticTable.propTypes = {
  dataSource: PropTypes.arrayOf.isRequired
};
export default StaticTable;
