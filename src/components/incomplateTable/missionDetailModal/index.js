import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Modal } from "antd";
import {} from "./style";
import DetailTable from "./incomplateDetails";

const { Header, Content } = Layout;

const MissionDetailModal = props => {
  const {
    isShow,
    closeModal,
    saveModal,
    saveDetailEdit,
    selectedMissionDetails
  } = props;
  const { title, steps } = selectedMissionDetails;
  return (
    <Modal
      visible={isShow}
      onCancel={closeModal}
      onOk={closeModal}
      title={title}
    >
      <DetailTable
        selectedMissionDetails={selectedMissionDetails}
        saveDetailEdit={saveDetailEdit}
      />
    </Modal>
  );
};

MissionDetailModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  saveModal: PropTypes.func.isRequired,
  saveDetailEdit: PropTypes.func.isRequired,
  selectedMissionDetails: PropTypes.arrayOf.isRequired,
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf.isRequired
};

export default MissionDetailModal;
