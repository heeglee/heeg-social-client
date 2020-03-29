// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// REDUX
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// STYLES
import './App.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import mainTheme from './util/theme/mainTheme';
// PAGES
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
// COMPONENTS
import NavBar from './components/layout/NavBar';
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(mainTheme);
const token = localStorage.FirebaseIdToken;

if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
						<BrowserRouter>
							<div className="container">
								<NavBar />
								<Switch>
									<Route exact path="/" component={home} />
									<AuthRoute exact path="/login" component={login} />
									<AuthRoute exact path="/signup" component={signup} />
									<Route exact path="/users/:username" component={user} />
									<Route exact path="/users/:username/squeak/:squeakId" component={user} />
								</Switch>
							</div>
						</BrowserRouter>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;