import React from 'react';
import $ from 'jquery';

import {Modal} from './Modal.js';
import {ControlPanel} from '../../components/project/common/ControlPanel.js';
import keyboardListener from '~/components/project/KeyboardListener.js';

export class AbstractConfirmation extends React.Component {
    
    enterButtonListner = null;
    escButtonListner = null;
    
    componentWillUnmount() {
        this.unlistenKeyboard(false);
    }

    componentDidMount() {
        this.listenKeyboard(this.props.isOpen);
    }

    componentWillUpdate(nextProps){
        //it's ok, only one function can be executed
        this.listenKeyboard(nextProps.isOpen);
        this.unlistenKeyboard(nextProps.isOpen);
    }
    
    listenKeyboard(isOpen){
        if(!isOpen)return;
        if(this.enterButtonListner === null) {
            this.enterButtonListner = keyboardListener.push(this.onPositive.bind(this), 13);
        } 
        if(this.escButtonListner === null ) {
            this.escButtonListner = keyboardListener.push(this.onNegative.bind(this), 27);
        }
    }
    
    unlistenKeyboard(isOpen){
        if(isOpen)return;
        keyboardListener.remove(13, this.enterButtonListner);
        keyboardListener.remove(27, this.escButtonListner);
        this.enterButtonListner = null;
        this.escButtonListner = null;
    }
    
    render() {
        if (typeof this.getControl !== 'function') {
            throw 'Please specify "getControl" function. Return type - array with react buttons.'
        }
        if (typeof this.props.callback !== 'function') {
            throw 'Please specify "this.props.callback" function.'
        }
        var extended = $.extend({}, this.props);
        this.extendChildren(extended);
        return <Modal {...extended} />
    }

    getControlPanel() {
        return <ControlPanel title={this.props.title} leftItems={this.getControl()} key="panel"/>;
    }

    extendChildren(extended){
        extended.children = [this.getControlPanel(), this.wrapChildren()];
    }
    
    onCloseModal(e, response){
        e.preventDefault();
        this.props.callback(response);
    }

    wrapChildren(){
        return  this.props.children ? <div key="content">{this.props.children}</div> : null;
    }
}