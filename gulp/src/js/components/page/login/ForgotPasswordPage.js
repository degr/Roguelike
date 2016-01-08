import React from 'react';
import {Container} from 'flux/utils';

class ForgotPasswordPage extends React.Component {
    static URL = 'forgot-password';
    
    static getStores(){
        return [];
    }
    static calculateState(){
        return {};
    }
    render(){
        return <div>forgot password</div>
    }
}

export default Container.create(ForgotPasswordPage);