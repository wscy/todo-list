import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, DatePicker, Table, Input, Button, Icon } from "antd";
import moment from "moment";
import {
  Container,
  CurrentTime,
  DataPickerContainer,
  Complated,
  Incomplete,
  AddMission
} from "./style";
/* import MissionDetailModal from "../../components/missionDetailModal";
 */
import EditableTable from "../../components/incomplateTable";
import StaticTable from "../../components/complatedTable";

const { Header, Content } = Layout;
class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
      textValue: "",
      selectedDate: this.renderCurrentTime(),
      missionList: [
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
          steps: [{ key: 0, content: "去打球叫上朋友", isComplated: false }],
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
  };

  renderAddButton = () => {
    const { textValue } = this.state;
    let result = <></>;
    if (textValue !== "") {
      result = (
        <Button shape="circle" type="primary" onClick={this.addNewMission}>
          <Icon type="plus" />
        </Button>
      );
    } else {
      result = (
        <Button shape="circle" type="dashed" disabled>
          <Icon type="plus" />
        </Button>
      );
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
    const { isModalShow, textValue, selectedDate, missionList } = this.state;
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
          <Header>
            <CurrentTime>
              今天是：
              {this.renderCurrentTime()}
            </CurrentTime>
            <DataPickerContainer>
              请选择日期：
              <DatePicker onChange={this.selectDate} />
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
              {this.renderAddButton()}
              <div style={{ width: "400px" }}>
                <Input
                  allowClear
                  onChange={e => this.setState({ textValue: e.target.value })}
                />
              </div>
            </AddMission>
          </Content>
        </Layout>
        {/*    <MissionDetailModal
          isShow={isModalShow}
          updateModalShow={this.updateModalShow}
        /> */}
      </Container>
    );
  }
}

// ToDoList.propTypes = {
//   history: PropTypes.isRequired
// };

export default ToDoList;
