import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, DatePicker, Table, Input, Button, Modal } from "antd";
import {} from "./style";
import ComplatedDetail from "../complatedTable/complatedDetail";

const { Header, Content } = Layout;

const MissionDetailModal = props => {
  const { isShow, closeModal, selectedMissionDetail } = props;
  return (
    <Modal visible={isShow} onCancel={closeModal} onOk={closeModal}>
      <ComplatedDetail selectedMissionDetail={selectedMissionDetail} />
    </Modal>
  );
};

MissionDetailModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedMissionDetail: PropTypes.arrayOf.isRequired
};

export default MissionDetailModal;
