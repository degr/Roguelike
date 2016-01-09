import appDispatcher from "~/dispatcher/AppDispatcher";
import UserService from '~/services/UserService';
import history from '~/components/history/History';

import LoginPage from '~/components/page/login/LoginPage';
import HomePage  from '~/components/page/HomePage';

import Application from '~/Application';

export default class UserActions {

	static login(email, password) {
		UserService.login(email, password).then(
			UserActions.onIsAuthorised
		);
	}

    static isExist(email) {
        return UserService.isExist(email);
    }
    
	static register(email, password){
        UserService.register(email, password).then(
            function(response){
                UserActions.onIsAuthorised({id: response, email: email, password: password})
            }
        );
    }
	
	
	static isAuthorised() {
		UserService.isAuthorised().then(
            UserActions.onIsAuthorised
        );
	}
	
	static logout(){
        UserService.logout().then(function(){
		    UserActions.onIsAuthorised({
                id: null,
                email: null
		})});
	}
	
	static anonimousSession(){
        UserService.logout().then(function(){
            UserActions.onIsAuthorised({
                    id: 0,
                    email: ''
		})});
	}

	static onIsAuthorised(response) {
		appDispatcher.dispatch({
			type: 'user-profile/login',
			data: response
		});
		if(document.location.pathname === '/' + LoginPage.URL) {
			if(response.id !== null) {
                Application.openPage(HomePage);
			}
		} else {
			if(response.id === null) {
                Application.openPage(LoginPage);
			}
		}
	}
}
