import React, { Component } from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import { Table, Divider, Tag } from "antd";
import "./style.css";
import MissionDetailModal from "../missionDetailModal";

class StaticTable extends Component {
  constructor(props) {
    super(props);
    const { dataSource, count } = props;
    console.log("StaticTable-->", Object.prototype.toString.call(dataSource));
    this.columns = [
      {
        dataIndex: "title",
        width: "80%",
        render: text => <a>{text}</a>
      },
      {
        //   title: "查看",
        dataIndex: "steps",
        render: record => <a onClick={() => this.openModal(record)}>查看</a>
      }
    ];
    this.state = { dataSource, isModalShow: false, selectedMissionDetail: [] };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    this.state.dataSource = dataSource;
  }

  openModal = record => {
    this.setState({ isModalShow: true, selectedMissionDetail: record });
  };

  closeModal = () => {
    this.setState({ isModalShow: false });
  };

  render() {
    const {
      dataSource,
      isModalShow,
      selectedMissionDetail,
      closeModal
    } = this.state;
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
          selectedMissionDetail={selectedMissionDetail}
        />
      </>
    );
  }
}
StaticTable.propTypes = {
  dataSource: PropTypes.arrayOf.isRequired
};
export default StaticTable;
