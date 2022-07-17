import styled from "styled-components/native";
import Constants from "expo-constants";

const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme["BACKGROUND_COLOR"]};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export default Container;
