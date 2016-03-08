import React from 'react';
import {Container} from 'flux/utils';
import {Link} from 'react-router';

import UserStore from '~/stores/UserStore';
import UserActions from '~/actions/UserActions';
import AbstractPage from '~/components/page/AbstractPage'

import MapsPage from '~/components/page/map/MapsPage'
import MapObjectsPage from '~/components/page/map/MapObjectsPage'
import EnvironmentsPage from '~/components/page/map/EnvironmentsPage'

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
            profile: UserStore.getState().userProfile
        };
    }

    render() {
        if(!UserStore.isLoggedIn()) {
            return <div className='on-ajax on-ajax-large'></div>
        } else {
            return <div>

                <div className='block-header col-md-12'>
                    <nav>
                        <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                    </nav>
                </div>
                <div className='block-content col-md-12'>
                    <div className="block-content-wrapper row">
                        {this.state.profile.permission === 1 ? HomePage.getAdminPanel() : null}
                        {this.props.children}
                    </div>
                </div>
            </div>
        }
    }
    logout(event){
        event.preventDefault();
        UserActions.logout();
    }
    static getAdminPanel(){
        return <nav className="col-sm-12">
            <Link to={MapsPage.URL}>{MapsPage.TITLE}</Link>
            <Link to={MapObjectsPage.URL}>{MapObjectsPage.TITLE}</Link>
            <Link to={EnvironmentsPage.URL}>{EnvironmentsPage.TITLE}</Link>
        </nav>
        
    }
}

const HomePageContainer = Container.create(HomePage);
export default HomePageContainer;
