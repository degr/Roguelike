import React from 'react';
import Validation from '../Validation.js';
import $ from 'jquery';

export default class AbstractInput extends React.Component{
    get id(){return this._id};
    set id(id){this._id = id};
    
    changeValue(event) {
        this.setValue(event.target.value, event);
    }
    setValue(value, event){
        if(typeof this.props.onSetValue === 'function'){
            let {errorMessages, errorKeys} = this.getInputState(value);
            this.props.onSetValue(this.props.name, value, errorMessages, errorKeys, event);
        }
    }
    
    getInputState(value){
        let errorKeys = this.validate(value);
        let errorMessages = this.findErrorMessage(errorKeys);
        return {
            value: value,
            errorKeys: errorKeys,
            errorMessages: errorMessages
        }
    }
    
    validate(value){
        return Validation.validate(value, this.props.validations);
    }

    findErrorMessage(errorKeys) {
        let errors = [];
        for(var i = 0; i < errorKeys.length; i++) {
            var message = null;
            let candidateMessages = this.props.errorMessages;
            if (typeof candidateMessages === 'string' && candidateMessages.length > 0) {
                message = candidateMessages;
            } else if (typeof candidateMessages === 'object') {
                message = candidateMessages[errorKeys[i]] ? candidateMessages[errorKeys[i]] : null;
            }
            if (message === null) {
                message = Validation.messages[errorKeys[i]] ?
                    Validation.messages[errorKeys[i]] : Validation.messages['default'];
            }
            if (errors.indexOf(message) === -1) {
                errors.push(message);
            }
        }
        return errors;
    }
    
    getValue(){
        return this.props.value;
    }
    buildLabel(id, inner, key) {
        let forId = id ? id : (this.props.formId ? this.props.formId + "_" + this.props.name : null)
        var params = forId ? {htmlFor:forId} : {};
        params.key = 'label' + (key ? "_" + key : "");
        return React.createElement('label', params, inner);
    }
    
    wrapInput(input, label, forceLabel, className){
        var input0 = <div className="formfield-input">{input}</div>;
        var label0 = this.props.noLabel === true ?
            null :
            (forceLabel || label ? <div className="formfield-label">{label}</div> : null);
        var className0 = className ? className : ('formfield-holder formfield-' +
            (this.props.type ? this.props.type : this.getInputType()) +
            (this.props.className ? ' ' + this.props.className : ''));

        if(this.props.validations) {
            if((typeof this.props.validations === 'string' && this.props.validations.indexOf('required') > -1)
                || this.props.validations.required !== undefined
            ) {
                className0 += ' required';
            }
        }
        var errors = this.buildErrorMessage();
        return (<div className={className0} key={this.props.key}>
            {label0}
            {input0}
            {errors}
            <div className="clearfix"></div>
        </div>);
    }
    buildErrorMessage(){
        if(!this.props.errors)return null;
        var messages = [];
        for(var i = 0; i < this.props.errors.length; i++){
            messages.push(<div key={i}>{this.props.errors[i]}</div>)
        }
        return <div className="error">{messages}</div> 
    }
    getLabelValue(){
        if(this.props.label)return this.props.label;
        if(this.props.noLabel === true) {
            return null;
        }
        var regexp = /([a-z])([A-Z])/g;
        var value = this.props.name.replace(/\_/g, ' ');
        if(value.match(regexp)) {
            value = value.replace(regexp, '$1 $2');
        }
        var p = value.split(' ');
        var out = '';
        for(var i = 0; i < p.length; i++){
            if(!p[i])continue;
            out += p[i].charAt(0).toUpperCase() + p[i].substring(1) + (i !== p.length - 1 ? ' ' : '');
        }
        return out;
    }
    
    getId(){
        if(typeof this.id === 'undefined' ) {
            var formId = this.props.formId ? this.props.formId + '_' : '';
            this.id = formId + (this.state && this.state.id ? this.state.id : (this.props.id ? this.props.id : this.props.name));
        }
        return this.id;
    }
}
