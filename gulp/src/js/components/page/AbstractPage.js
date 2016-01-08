import React from 'react';
import {Container} from 'flux/utils';

import userProfileStore from '~/stores/UserStore.js';

let loginToken;
export default class AbstractPage extends React.Component {
    isLogged = false;
    
    componentDidMount() {
        loginToken = userProfileStore.addListener(this.onUserLogin.bind(this));
        if(userProfileStore.getState().get("success")) {
            this.afterMount();
        } else {
            this.isLogged = true;
        }
    }
    componentWillUnmount(){
        loginToken.remove();
    }
    onUserLogin(){
        if(this.isLogged) {
            this.afterMount();
        }
    }
}
