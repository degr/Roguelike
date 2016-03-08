import AbstractConfirmation from './AbstractConfirmation.js';
import React from 'react';
import $ from 'jquery';
import ControlPanel from '../../components/project/common/ControlPanel.js';
import Text from '../../components/form/input/Text.js';

/*
 <Prompt title="Prompt" question="Enter your name"
 okText="Confirm"
 cancelText="Cancel"
 callback={this.processPrompt.bind(this)}
 value="Anonymous"
 isOpen={this.state.promptOpen}/>
 */
export class Prompt extends AbstractConfirmation{
    
    constructor(props){
        super(props);
        if(!this.state) {
            this.state = {};
        }
        this.state.value = this.props.value ? this.props.value : '';
    }

    onPositive(e){
        this.onCloseModal(e, this.state.value);
    }
    onNegative(e){
        this.onCloseModal(e, null);
    }
    
    extendChildren(extended){
        let newChildren;
        if(this.props.insertChildrenAfter === true) {
            newChildren = [this.getControlPanel(), this.wrapChildren(), this.getInput()];
        } else {
            newChildren = [this.getControlPanel(), this.getInput(), this.wrapChildren()];
        }
        extended.children = newChildren;
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
    getInput(){
        return <div key="field">
                <Text attr={{className: "form-control"}} name="internal" label={this.props.question} value={this.state.value} onSetValue={this.onSetValue.bind(this)} />
            </div>
    }

    onSetValue(name, value) {
        this.setState({value: value});
    }
}