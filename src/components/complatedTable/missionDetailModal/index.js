import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Modal } from "antd";
import ComplatedDetails from "./complatedDetails";

const { Header, Content } = Layout;

const MissionDetailModal = props => {
  const {
    isShow,
    closeModal,
    selectedMissionDetails: { title, steps }
  } = props;
  return (
    <Modal
      visible={isShow}
      onCancel={closeModal}
      onOk={closeModal}
      title={`本次任务是：${title}`}
    >
      <ComplatedDetails selectedMissionDetails={steps} />
    </Modal>
  );
};

MissionDetailModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedMissionDetails: PropTypes.arrayOf.isRequired,
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf.isRequired
};

export default MissionDetailModal;
