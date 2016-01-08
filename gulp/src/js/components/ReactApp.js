import React, {Component} from 'react';
import Modal from 'react-modal';
import {Container} from 'flux/utils';
import { Router, Route, Redirect} from 'react-router';

import history from './history/History.js';

import UserStore, {LOGGED_IN} from '~/stores/UserStore';
import UserActions from '~/actions/UserActions';

import E404 from '~/components/page/errors/404';
import HomePage from '~/components/page/HomePage';
import LoginPage from '~/components/page/login/LoginPage';
import LogoutPage from '~/components/page/login/LogoutPage';
import ForgotPasswordPage from '~/components/page/login/ForgotPasswordPage'

class ReactApp extends Component {

	static getStores() {
		return [UserStore];
	}

	static calculateState(prevState) {
		return {
			profile: UserStore.getState()
		};
	}

	constructor() {
		super();

		Modal.setAppElement("#modalWrapper");
	}
    
	render() {
		return <Router history={history}>
			<Route path={LoginPage.URL} component={LoginPage} />
			<Route path={LogoutPage.URL} component={LogoutPage} />
			<Route path={ForgotPasswordPage.URL} component={ForgotPasswordPage} />
            <Route path={HomePage.URL} component={HomePage}>
				<Route path="*" component={E404} />
			</Route>
        </Router>;
	}

	componentDidMount() {
		if (UserStore.isWaitForLogin()) {
			UserActions.isAuthorised();
		}
	}
}

const ReactAppContainer = Container.create(ReactApp);
export default ReactAppContainer;
