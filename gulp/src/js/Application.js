import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactApp from './components/ReactApp';
import { render } from 'react-dom';
import Modal from 'react-modal';
import history from '~/components/history/History.js';
import Profile from '../../Profile';
import HomePage from '~/components/page/HomePage.js';
import userProfileRS from './services/UserService'

$.ajaxSetup({
    dataType: 'json'
});

var Application = {
    basePath: Profile.basePath,
    name: 'org.forweb.roguelike',
    getBackEndUrl: function(){
        return Profile.backend;
    },
    openPage: function(page){
        let title = page.TITLE || '';
        let url = page.URL;
        $('title').text = title;
        history.push({state: {}, pathname: url});
    }
};

export default Application;
ReactDOM.render(<ReactApp />, document.getElementById('application'));
