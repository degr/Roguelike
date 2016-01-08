import React from 'react';
import {Container} from 'flux/utils';

import UserStore from '~/stores/UserStore';
import UserActions from '~/actions/UserActions';
import AbstractPage from '~/components/page/AbstractPage'

class HomePage extends React.Component {
    
    static URL = "/";
    
    constructor(props){
        super(props);
        if(!this.state)this.state = {};
        this.state.menuChange = false;
        this.state.selectedMenu = null;
    }

    componentDidMount(){
        if(UserStore.isLoggedIn())return;
        UserActions.isAuthorised();
    }
    
    static getStores() {
        return [UserStore];
    }

    static calculateState(prevState) {
        return {
            profile: UserStore.getState()
        };
    }

    render() {
        return <div>
            
            <div className='block-header col-md-12'>
                <nav>
                    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                </nav>
            </div>
            <div className='block-sidebar col-md-3'>
                sidebar
            </div>
            <div className='block-content col-md-9'>
                <div className="block-content-wrapper row">
                    {UserStore.isLoggedIn() ? this.props.children : <div className='on-ajax on-ajax-large'></div> }
                </div>
            </div>
        </div>
    }
    logout(event){
        event.preventDefault();
        UserActions.logout();
    }
}

const HomePageContainer = Container.create(HomePage);
export default HomePageContainer;
