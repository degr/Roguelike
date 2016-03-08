import $ from 'jquery';
import {ReduceStore} from 'flux/utils';
import appDispatcher from '~/dispatcher/AppDispatcher'

export const LOGGED_IN = 'loggedIn';
export const USER_PROFILE = 'userProfile';

class UserStore extends ReduceStore {

    getInitialState() {
        return {
            userProfile: {},
            loggedIn: false
        };
    }

    isWaitForLogin() {
        return !this.getState().loggedIn;
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
        return this.getState()[USER_PROFILE].id;
    }
    getEmail(){
        return this.getState()[USER_PROFILE].email;
    }
    isLoggedIn(){
        return this.getState()[LOGGED_IN];
    }
}

//returns state
let processUserLogin = (currentState, response) => {
    currentState[LOGGED_IN] = response.id !== null;
    currentState[USER_PROFILE] = response;
    return $.extend({}, currentState)
};

export default new UserStore(appDispatcher);
