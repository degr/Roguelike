import React from 'react';

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
