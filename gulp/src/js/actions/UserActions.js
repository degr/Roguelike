import appDispatcher from "~/dispatcher/AppDispatcher";
import UserService from '~/services/UserService';
import history from '~/components/history/History';

import LoginPage from '~/components/page/login/LoginPage';
import HomePage  from '~/components/page/HomePage';

import Application from '~/Application';

export default class UserActions {

	static login(email, password) {

        console.log('login', email, password);
		UserService.login(email, password).then(
			UserActions.onIsAuthorised
		);
	}

    static isExist(email) {

        console.log('isAuthorised', email);
        return UserService.isExist(email);
    }
    
	static register(email, password){
        console.log('isAuthorised', email, password);
        UserService.register(email, password).then(
            function(response){
                UserActions.onIsAuthorised({id: response, email: email, password: password})
            }
        );
    }
	
	
	static isAuthorised() {

        console.log('isAuthorised');
		UserService.isAuthorised().then(
            UserActions.onIsAuthorised
        );
	}
	
	static logout(){
        console.log('logout');
        UserService.logout().then(function(){
		    UserActions.onIsAuthorised({
                id: null,
                email: null
		})});
	}
	
	static anonimousSession(){
        console.log('anonimousSession');
        UserService.logout().then(function(){
            UserActions.onIsAuthorised({
                    id: 0,
                    email: ''
		})});
	}

	static onIsAuthorised(response) {
        console.log('onIsAuthorised', response);
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
