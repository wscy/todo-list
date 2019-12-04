import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, DatePicker, Table, Input, Button, Modal } from "antd";
import {} from "./style";

const { Header, Content } = Layout;

const MissionDetailModal = props => {
  const { isShow } = props;

  return <Modal visible={isShow}>dfdfsffsdfdf</Modal>;
};

// ToDoList.propTypes = {
//   history: PropTypes.isRequired
// };

export default MissionDetailModal;
