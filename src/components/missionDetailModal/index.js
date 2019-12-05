import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, DatePicker, Table, Input, Button, Modal } from "antd";
import {} from "./style";
import DetailTable from "./detailTable";

const { Header, Content } = Layout;

const MissionDetailModal = props => {
  const { isShow, updateModalShow } = props;

  return (
    <Modal
      visible={isShow}
      onCancel={() => updateModalShow(false)}
      onOk={() => updateModalShow(false)}
      title="hhhh"
    >
      <DetailTable />
    </Modal>
  );
};

MissionDetailModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  updateModalShow: PropTypes.func.isRequired
};

export default MissionDetailModal;
