import {AbstractConfirmation} from './AbstractConfirmation.js';
import React from 'react';
/*
 <Confirm isOpen={this.state.confirmOpen} callback={this.confirmClb.bind(this)} title="Confirm">
    <div>Something here</div>
  </Confirm>
 */
export class Confirm extends AbstractConfirmation{
    onPositive(e){
        this.onCloseModal(e, true);
    }
    onNegative(e){
        this.onCloseModal(e, false);
    }
    
    getControl(){
        return [
            <p className="navbar-btn">
                <a href="#" className="btn btn-primary" onClick={this.onPositive.bind(this)}>
                    {this.props.okText ? this.props.okText : 'Ok'}
                </a>
            </p>,
            <p className="navbar-btn">
                <a href="#" className="btn btn-warning" onClick={this.onNegative.bind(this)}>
                    {this.props.cancelText ? this.props.cancelText : 'Cancel'}
                </a>
            </p>
        ];
    }
}