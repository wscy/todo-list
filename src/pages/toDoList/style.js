import styled from "styled-components";

export const Container = styled.div`
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    height: 10%;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-width: 2px;
    background-color: #1890ff;;
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }
  .ant-layout-sider{
    background-color: #1890ff;;
  }
  height: 100%;
  border:1px solid #1890ff;;
  box-shadow: 2px 0px 2px #1890ff;;

`;
export const CurrentTime = styled.div`
  border-width: 2px;
`;
export const DataPickerContainer = styled.div`
  border-width: 2px;
`;
export const Complated = styled.div`
  flex: 4;
`;
export const Incomplete = styled.div`
  flex: 4;
`;
export const AddMission = styled.div`
  padding: 5px 50px;
  display: flex;
  justify-content: center;
  background-color: #1890ff;;
`;
export const Title=styled.div`
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:30px;
  padding-top:10px
`