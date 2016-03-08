import React from 'react';
import {Container} from 'flux/utils';

import UserStore from '~/stores/UserStore.js';


export default class AbstractPage extends React.Component {
    isLogged = false;
    loginToken;
    
    componentDidMount() {
        this.loginToken = UserStore.addListener(this.onUserLogin.bind(this));
        if(!UserStore.isWaitForLogin()) {
            this.afterMount();
        } else {
            this.isLogged = true;
        }
    }
    componentWillUnmount(){
        this.loginToken.remove();
    }
    onUserLogin(){
        if(this.isLogged) {
            this.isLogged = false;
            this.afterMount();
        }
    }
}
