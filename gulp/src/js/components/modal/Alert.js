import AbstractConfirmation from './AbstractConfirmation.js';
import React from 'react';
import $ from 'jquery';
import ControlPanel from '~/components/project/common/ControlPanel.js';

/*
 <Alert isOpen={this.state.alertOpen} callback={this.alertClb.bind(this)} title="Alert">
    <div>Something here</div>
 </Alert>
 
 */
export class Alert extends AbstractConfirmation{
    onPositive(e){
        this.onCloseModal(e, true);
        return true;
    }
    onNegative(e){
        this.onPositive(e);
        return true;
    }
    getControl(){
        return [
            <p className="navbar-btn">
                <a href="#" className="btn btn-primary" onClick={this.onPositive.bind(this)}>
                    {this.props.okText ? this.props.okText : 'Ok'}
                </a>
            </p>
        ];
    }
}