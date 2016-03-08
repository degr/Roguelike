import React from 'react';
import {Container} from 'flux/utils';
import $ from 'jquery';
import { Link } from 'react-router'

import Application from '~/Application'

import UserStore from '~/stores/UserStore';
import UserActions from '~/actions/UserActions';

import HomePage from '~/components/page/HomePage';
import Form from '~/components/form/Form';
import FormControl from '~/components/form/FormControl';
import Text from '~/components/form/input/Text';
import PasswordGenerator from '~/components/form/input/PasswordGenerator';
import ForgotPasswordPage from '~/components/page/login/ForgotPasswordPage';

class LoginPage extends React.Component {
    static URL =  'login';
    static getStores(){
        return [UserStore];
    }
    static calculateState(prevState){
        if(prevState === null) {
            prevState  = {
                action: 'login',
                email: {
                    value: '',
                    errors: []
                },
                password: {
                    value: '',
                    errors: []
                },
                isError: true
            }
        }
        return {
            action: prevState.action,
            email: prevState.email,
            password: prevState.password,
            isError: prevState.isError,
            profile: UserStore.getState()
        }
    }

    render () {
        if(UserStore.isLoggedIn()) {
            Application.openPage(HomePage);
            return null;
        }
        let password = this.state.action === 'login' ?
                <Text type="password" 
                      label='Your Password' 
                      value={this.state.password.value}
                      errors={this.state.password.errors} 
                      name='password'
                      rules='required length:5:20'/> :
                <PasswordGenerator 
                    label='Your Password'
                    value={this.state.password.value}
                    errors={this.state.password.errors}
                    name='password'
                    rules='required length:5:20'/>;
        return (
            <div className="login-box" id="login-box">
                <p className='login-error'>{this.state.profile.message}</p>
                <Form className='login-form' submit={this.submitLogin.bind(this)} onCollectValues={this.onCollectValues.bind(this)}>
                    <Text label='Your email' name='email' value={this.state.email.value}
                          errors={this.state.email.errors} rules='required' />
                    {password}
                    <FormControl>
                        <Link to={ForgotPasswordPage.URL} className="btn btn-warning">Forgot pass</Link>

                        <input type="button" onClick={this.anonimousSession.bind(this)} className="btn btn-primary"
                               value="Anonimously"/>
                        
                        <input type="submit" onMouseOver={this.setRegistrationAction.bind(this)} className="btn btn-primary"
                               value="Register"/>

                        <input type="submit" onMouseOver={this.setLoginAction.bind(this)} className="btn btn-primary"
                               value="Login"/>
                    </FormControl>
                </Form>
            </div>
        );
    }

    setRegistrationAction(){
        if(this.state.action != 'register') {
            this.setState({action: 'register'});
        }
    }
    setLoginAction(){
        if(this.state.action != 'login') {
            this.setState({action: 'login'});
        }
    }

    forgotPassword(){
        alert("not implemented");
    }

    anonimousSession(){
        UserActions.anonimousSession();
    }

    register(){
        alert("not implemented");
    }
    
    onCollectValues(name, value, errors){
        let state = {};
        state[name] = {
            value: value,
            errors: errors
        };
        this.setState(state);
    }

    submitLogin(model, hasErrors, errors){
        if(hasErrors) {
            let state = {};
            for(let key in model) {
                state[key] = {
                    value: model[key],
                    errors: errors[key]
                }
            }
            this.setState(state);
        } else {
            let {email, password} = this.state;
            if(this.state.action == 'login') {
                UserActions.login(email.value, password.value);
            } else if(this.state.action == 'register') {
                UserActions.isExist(email.value).then(
                    function(response){
                        if(response === false) {
                            UserActions.register(email.value, password.value);
                        } else {
                            this.setState({email: {
                                value: this.state.email.value,
                                errors: ['User with this email already exist']
                            }});
                        }
                    }.bind(this));
            } else {
                throw 'Undefined login action';
            }
        }
    }

    
    onChange() {
        this.setState({
            profile: UserStore.getState()
        });
    }
}

let container = Container.create(LoginPage);
export default container;