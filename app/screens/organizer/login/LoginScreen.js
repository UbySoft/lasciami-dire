///** DEFAULT */
import React, { useContext } from "react";
import styled, { ThemeProvider } from "styled-components/native";

///** REDUX */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeTheme } from "../../../actions/themeAction";

///** CUSTOM */
import {
  BoxStl,
  TitleStl,
  ContainerStl,
  TextStl,
} from "../../../components/styled/index";

const LoginScreen = (props) => {
  console.log(props.THEME.coloriTema);

  return (
    <ThemeProvider theme={props.THEME}>
      <ContainerStl>
        <TitleStl style={{ color: props.THEME.coloriTema.PRIMARY_TEXT_COLOR }}>
          Login Screen
        </TitleStl>
      </ContainerStl>
    </ThemeProvider>
  );
};

//* REDUX - //
const mapStateToProps = (state) => ({
  THEME: state.themeReducer.theme,
});

const mapDispatchToProps = (dispatch) => ({
  changeTheme: bindActionCreators(changeTheme, dispatch),
});
/****** ************************ */

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
