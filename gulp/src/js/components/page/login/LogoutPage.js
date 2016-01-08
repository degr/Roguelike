import React from 'react';
import {Link} from 'react-router';

import Application from '~/Application.js';
import {ControlPanel} from '~/components/project/common/ControlPanel.js';
import {LoginPage} from '~/components/page/login/LoginPage.js';

import UserStore, {USER_PROFILE} from '~/stores/UserStore.js';
import UserActions from '~/actions/UserActions.js';

export default class LogoutPage extends React.Component{
    static URL = 'logout';
    static TITLE = 'Logout';

    render(){
        return <div>Logging out...</div>
    }

    componentDidMount(){
        UserActions.logout();
    }
}
