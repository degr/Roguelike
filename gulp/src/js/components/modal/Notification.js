import $ from 'jquery';
import React from 'react';
import {Modal} from './Modal.js';

const NOTIFICATION_STYLES = {
    overlay: {
        top: '15px',
        left: 'auto',
        right: '15px',
        width: '300px',
        height: '80px',
        backgroundColor: 'transparent'
    },
    content : {
        top: 0,
        right: 0,
        width: '300px',
        height: '80px'
    }
};
/*
 <Notification isOpen={true} closeTimeoutMS="3000">Some data here</Notification>
 */
export class Notification extends React.Component {
    set mountTime(mountTime) {this._mountTime = mountTime}
    get mountTime() {return this._mountTime}

    constructor(props) {
        super(props);
        if (!this.props.closeTimeoutMS && this.props.closeTimeoutMS !== 0) {
            throw 'Please specify "closeTimeoutMS" property for Notification';
        }
        if (typeof this.props.onTimeout !== 'function') {
            throw 'Please specify "onTimeout" function. This function must set \'isOpen\' state to false.';
        }
        this.state = {
            synteticState: false
        };
        this.mountTime = new Date().getTime();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.mountTime = new Date().getTime();
        }
    }

    render() {
        let timeout = parseInt(this.props.closeTimeoutMS);
        let lifeTime = (this.mountTime + timeout) - new Date().getTime();
        let isOpen = this.props.isOpen && (lifeTime > 0);
        if (isOpen) {
            setTimeout(this.onUpdateTimeout.bind(this), lifeTime + 10);
        }
        let className = this.prepareClassName(this.props.notificationType);
        
        return <Modal {...this.props} closeTimeoutMS={lifeTime} isOpen={isOpen} customStyles={NOTIFICATION_STYLES}
                                      className={className} children={this.prepareChildren()}/>;
    }

    prepareChildren(){
        let closeButton = <a href="#" onClick={function(event){event.preventDefault();this.props.onTimeout();}.bind(this)} className="icon icon-close"></a>;
        if(!this.props.children) {
            return null;
        } else if($.isArray(this.props.children)) {
            return $.merge([closeButton], this.props.children)
        } else {
            return [closeButton, this.props.children];
        }
    }
    
    prepareClassName(type){
        let out = "modal-notification alert-";
        if(!type)type = 'success';
        switch (type) {
            case 'danger':
            case 'success':
            case 'info':
            case 'warning':
                return out += type;
            default:
                throw 'Unknown notification type: ' + type;
        }
    }
    
    onUpdateTimeout() {
        this.props.onTimeout();
    }
}