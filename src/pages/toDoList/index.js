import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, DatePicker, Table, Input, Button } from "antd";
import {
  Container,
  CurrentTime,
  DataPickerContainer,
  Complated,
  Incomplete,
  AddMission
} from "./style";
import MissionDetailModal from "./missionDetailModal";

const { Header, Content } = Layout;

class ToDoList extends Component {
  isModalShow = true;

  constructor(props) {
    super(props);
    this.state = { book: 1 };
  }

  render() {
    return (
      <Container>
        <Layout>
          <Header>
            <CurrentTime>2019/12/4</CurrentTime>
            <DataPickerContainer>
              <DatePicker />
            </DataPickerContainer>
          </Header>
          <Content>
            <Complated>complete</Complated>
            <Incomplete>incomplete</Incomplete>
            <AddMission>
              <Input />
              <Button>添加任务</Button>
            </AddMission>
          </Content>
        </Layout>
        <MissionDetailModal isShow={this.isModalShow} />
      </Container>
    );
  }
}

// ToDoList.propTypes = {
//   history: PropTypes.isRequired
// };

export default ToDoList;
