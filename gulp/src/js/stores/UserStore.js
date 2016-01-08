import {ReduceStore} from 'flux/utils';
import {Map} from 'immutable';
import appDispatcher from '~/dispatcher/AppDispatcher'

export const LOGGED_IN = 'loggedIn';
export const USER_PROFILE = 'userProfile';

class UserStore extends ReduceStore {

	getInitialState() {
		return new Map({
			userProfile: {},
			loggedIn: false
		});
	}

	isWaitForLogin() {
		return !this.getState().toObject().loggedIn;
	}

	reduce(state, action) {
		switch (action.type) {
			case 'user-profile/login':
				return processUserLogin(state, action.data);
				break;
			default:
				return state;
				break;
		}
	}

	areEqual(one, two) {
		return false;
	}
	
	getUserId(){
		return this.getState().get(USER_PROFILE).id;
	}
	getEmail(){
		return this.getState().get(USER_PROFILE).email;
	}
    isLoggedIn(){
        return this.getState().get(LOGGED_IN);
    }
}

//returns state
let processUserLogin = (currentState, response) => {
	let loggedIn = response.id !== null;
    console.log('user store', loggedIn, response);
	return currentState.
			set(LOGGED_IN, loggedIn).
			set(USER_PROFILE, response);
};

export default new UserStore(appDispatcher);
