import styled from "styled-components";

export const Container = styled.div`
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    height: 20%;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-width: 2px;
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }
  height: 100%;
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
  padding: 0 50px;
  flex: 1;
  display: inline;
`;
