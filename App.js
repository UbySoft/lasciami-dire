///** DEFAULT */
import React, {useEffect} from "react";
import "react-native-gesture-handler";
import {ThemeProvider} from "styled-components/native";
///** CUSTOM */
import {StatusBarComp} from "./app/components/index";
///** CUSTOM */
import {
	SignInScreen,
	SignUpScreen,
	ForgotPasswordScreen,
	SignUpGroupScreen,
} from "./app/screens/index";
import {HomeNavigation} from "./app/screens/organizer/home";
import StartApp from "./app/utils/StartApp";
///** REDUX */
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {RDX_InfoTheme} from "./app/store/actions/themeAction";
import {RDX_InfoUser} from "./app/store/actions/userAction";
///** NAVIGATION */
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {TransitionPresets} from "@react-navigation/stack";
import axios from "axios";
const STACK = createNativeStackNavigator();

const App = (props) => {
	console.log("App", props);
	const isLoggedIn = props.USER.isLoggedIn;
	const ColorMe = props.THEME.colorsTheme;

	const fetchApi = async () => {
		console.log("@@@ fetchApi: 1");
		try {
			const res = await axios.get("https://lasciamidire.com/api/");
			console.log("@@@ fetchApi: " + res.data);
		} catch (error) {
			console.log("@@@ fetchApi: " + error.message);
		}
	};

	useEffect(() => {
		fetchApi();
	}, []);

	const NavTheme = {
		//theme component navigation
		dark: false,
		colors: {
			primary: ColorMe.TEXT_COLOR_1,
			background: ColorMe.BACK_COLOR_1,
			card: ColorMe.BACK_COLOR_1,
			text: ColorMe.TEXT_COLOR_1,
			border: ColorMe.SLATE_GRAY,
			notification: ColorMe.ERROR,
		},
	};

	const screenOptionStyle = {
		headerStyle: {
			backgroundColor: ColorMe.BACK_COLOR_1,
		},
		headerTintColor: ColorMe.TEXT_COLOR_2,
		// headerBackTitle: ColorMe.BACK_COLOR_1,
	};

	return (
		<StartApp>
			<ThemeProvider theme={ColorMe}>
				<NavigationContainer theme={NavTheme}>
					<STACK.Navigator
						screenOptions={({route, navigation}) => ({
							screenOptionStyle,
							gestureEnabled: true,
							...TransitionPresets.DefaultTransition,
						})}
					>
						<STACK.Group
							screenOptions={({route, navigation}) => ({
								headerShown: false,
							})}
						>
							{isLoggedIn === true ? (
								// Screens for logged in users

								<STACK.Screen
									name='HomeNavigation'
									component={HomeNavigation}
								/>
							) : (
								// Auth screens
								//<STACK.Group screenOptions={{headerShown: false}}>
								<>
									<STACK.Screen
										name='SignIn'
										options={{
											headerTitle: "SIGN IN",
										}}
										component={SignInScreen}
									/>
									<STACK.Screen
										name='SignUp'
										options={{
											headerTitle: "SignUp",
										}}
										component={SignUpScreen}
									/>
									<STACK.Screen
										name='ForgotPassword'
										options={{
											headerTitle: "FORGOT PASSWORD",
										}}
										component={ForgotPasswordScreen}
									/>
									<STACK.Screen
										name='SignUpGroup'
										options={{
											headerTitle: "SignUp GROUP",
										}}
										component={SignUpGroupScreen}
									/>
								</>
								//</STACK.Group>
							)}
						</STACK.Group>
						{/* Common modal screens */}
						<STACK.Group screenOptions={{presentation: "modal"}}>
							{/* <STACK.Screen name='Help' component={Help} /> */}
							{/* <STACK.Screen name='TestScreen' component={TestScreen} />
              <STACK.Screen name='ThemeScreen' component={ThemeScreen} /> */}
						</STACK.Group>
					</STACK.Navigator>
				</NavigationContainer>
				<StatusBarComp
					colorTheme={props.THEME.descTheme}
					backgroundColorTheme={ColorMe.BACK_COLOR_1}
				/>
			</ThemeProvider>
		</StartApp>
	);
};
//* REDUX - //
const mapStateToProps = (state) => ({
	THEME: state.themeReducer.theme,
	USER: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
	RDX_InfoTheme: bindActionCreators(RDX_InfoTheme, dispatch),
	RDX_InfoUser: bindActionCreators(RDX_InfoUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
