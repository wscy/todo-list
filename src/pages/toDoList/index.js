import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, DatePicker, Input, Button } from "antd";
import moment from "moment";
import {
  Container,
  CurrentTime,
  DataPickerContainer,
  Complated,
  Incomplete,
  AddMission,
  Title
} from "./style";
import EditableTable from "../../components/incomplateTable";
import StaticTable from "../../components/complatedTable";

const { Header, Content, Sider } = Layout;
const storage = window.localStorage;
class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      selectedDate: this.renderCurrentTime(),
      missionList:
        storage.getItem("missionList") !== null
          ? JSON.parse(storage.getItem("missionList"))
          : [
              {
                key: 0,
                title: "起床",
                date: "2019-12-06",
                steps: [
                  { key: 0, content: "睁眼", isComplated: true },
                  { key: 1, content: "打开被子", isComplated: true },
                  { key: 2, content: "穿衣服", isComplated: true },
                  { key: 3, content: "下床", isComplated: true }
                ],
                isComplated: true
              },
              {
                key: 1,
                title: "上班",
                date: "2019-12-09",
                steps: [
                  { key: 0, content: "出门", isComplated: true },
                  { key: 1, content: "赶公交", isComplated: true },
                  { key: 2, content: "进公司", isComplated: true },
                  { key: 3, content: "打卡", isComplated: true }
                ],
                isComplated: true
              },
              {
                key: 2,
                title: "回复老大邮件",
                date: "2019-12-06",
                steps: [
                  { key: 0, content: "抄送给产品", isComplated: false },
                  { key: 1, content: "把写的文案发给他", isComplated: true }
                ],
                isComplated: false
              },
              {
                key: 3,
                title: "看书",
                date: "2019-12-10",
                steps: [{ key: 0, content: "打卡", isComplated: false }],
                isComplated: false
              },
              {
                key: 4,
                title: "打球",
                date: "2019-12-10",
                steps: [
                  { key: 0, content: "去打球叫上朋友", isComplated: false }
                ],
                isComplated: false
              },
              {
                key: 5,
                title: "回复组员邮件",
                date: "2019-12-10",
                steps: [],
                isComplated: false
              }
            ]
    };
  }

  renderCurrentTime = () => String(moment().format("YYYY-M-DD"));

  selectDate = (date, dateString) => {
    this.setState({ selectedDate: dateString });
  };

  updateMissionTitle = newMissionItem => {
    const { missionList } = this.state;
    missionList.map((value, index) => {
      if (value.key === newMissionItem.key) {
        missionList[index] = newMissionItem;
      }
    });

    this.setState({ missionList });
  };

  updateMissionComplated = key => {
    let { missionList } = this.state;
    missionList = missionList.map(value => {
      let result;
      if (value.key === key) {
        result = {
          ...value,
          isComplated: true
        };
      } else {
        result = value;
      }
      return result;
    });
    this.setState({ missionList });
  };

  addNewMission = () => {
    const { missionList, textValue, selectedDate } = this.state;
    const count = missionList[missionList.length - 1].key;
    const newMission = {
      key: count + 1,
      title: textValue,
      date: selectedDate,
      steps: [],
      isComplated: false
    };
    missionList.push(newMission);
    this.setState({ missionList });
    window.location.reload();
  };

  renderAddButton = () => {
    const { textValue } = this.state;
    let result = <></>;
    if (textValue !== "") {
      result = (
        <Button onClick={this.addNewMission}>
          <div style={{ color: "black" }}>点我添加</div>
        </Button>
      );
    } else {
      result = <Button disabled>点我添加</Button>;
    }
    return result;
  };

  updateChangedDetailList = newIncompleteItem => {
    const { missionList, selectedDate } = this.state;
    missionList.map((value, index) => {
      if (value.date === selectedDate) {
        if (value.key === newIncompleteItem.key) {
          missionList[index] = newIncompleteItem;
        }
      }
    });
    this.setState({ missionList });
  };

  render() {
    const { selectedDate, missionList } = this.state;

    storage.setItem("missionList", JSON.stringify(missionList));
    const incompleteMissions = [];
    const completedMissions = [];
    missionList.map(value => {
      if (value.date === selectedDate) {
        if (value.isComplated) {
          completedMissions.push(value);
        } else {
          incompleteMissions.push(value);
        }
      }
    });
    return (
      <Container>
        <Layout>
          <Sider>
            <Title>To-Do List</Title>
          </Sider>
          <Layout>
            <Header>
              <CurrentTime>
                今天是：
                {this.renderCurrentTime()}
              </CurrentTime>
              <DataPickerContainer>
                请选择日期：
                <DatePicker onChange={this.selectDate} allowClear={false} />
              </DataPickerContainer>
            </Header>
            <Content>
              <Complated>
                <EditableTable
                  updateModalShow={this.updateModalShow}
                  dataSource={incompleteMissions}
                  count={incompleteMissions.length}
                  updateMissionComplated={this.updateMissionComplated}
                  updateChangedDetailList={this.updateChangedDetailList}
                  updateMissionTitle={this.updateMissionTitle}
                />
              </Complated>
              <Incomplete>
                <StaticTable
                  dataSource={completedMissions}
                  count={completedMissions.length}
                  updateModalShow={this.updateModalShow}
                />
              </Incomplete>
              <AddMission>
                <div style={{ fontSize: "20px", color: "black" }}>
                  添加你的任务：
                </div>
                <div style={{ width: "400px" }}>
                  <Input
                    allowClear
                    onChange={e => this.setState({ textValue: e.target.value })}
                  />
                </div>
                {this.renderAddButton()}
              </AddMission>
            </Content>
          </Layout>
        </Layout>
      </Container>
    );
  }
}

export default ToDoList;
