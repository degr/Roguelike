import React from 'react';
import $ from 'jquery';
import Validation from './Validation.js';
/*
example:
 var inputs = [
 {
 type: "text",
 label: 'Your email',
 name: "email",
 attr: {},
 formfield: "default",
 validations: "isEmail",
 errorMessages: "This is not a valid email",
 //required: true
 },
 {
 type: "select",
 label: "Choose your gender",
 name: "gender",
 attr: {},
 formfield: "default",
 options: [{label: 'male', value: 'm'}, {label: 'female', value: 'f'}],
 required: true
 },
 {
 type: "radio",
 name: "smoker",
 label: "Are you smoker?",
 attr: {},
 formfield: "default",
 options: [{label: 'smoker', value: 'y'}, {label: 'no smoker', value: 'n'}]
 },
 {
 type: "checkboxes",
 name: "smoker1",
 label: "Are you smoker?",
 attr: {},
 formfield: "default",
 options: [{label: 'smoker', value: 'y'}, {label: 'no smoker', value: 'n'}]
 },
 {
 type: "checkbox",
 name: "isCool",
 label: "Are you cool?",
 attr: {},
 formfield: "default"
 },
 {
 type: "textarea",
 name: "description",
 label: "Some data about you",
 attr: {},
 formfield: "default"
 }
 ];
<Form inputs={inputs} submit={function(model){console.log(model);}} formfields={{}} />
*/

export default class Form extends React.Component {
    submit(e) {
        if(typeof this.props.submit === 'function') {
            if(e)e.preventDefault();
            var errors = null;
            var onError = false;
            var model = {};
            if(this.refs) {
                for(let r in this.refs){
                    let child = this.refs[r];
                    if(!child.getInputState)continue;
                    let {value, errorMessages, errorKeys} = child.getInputState(child.getValue());
                    model[child.props.name] = value;
                    if(errorKeys && errorKeys.length) {
                        if(errors === null)errors = {};
                        if(!onError)onError = true;
                        errors[child.props.name] = errorMessages;
                    }
                }
            }
            this.props.submit(model, onError, errors);
        }
    }
    findErrorMessage(fieldName, errorKeys) {
        var errors = [];
        for(var fIndex = 0; fIndex < this.props.fields.length; fIndex++) {
            var current = this.props.fields[fIndex];
            if(current.name !== fieldName)continue;
            for(var i = 0; i < errorKeys.length; i++) {
                var message = null;
                if (typeof current.errorMessages === 'string' && current.errorMessages.length > 0) {
                    message = current.errorMessages;
                } else if (typeof current.errorMessages === 'object') {
                    message = current.errorMessages[errorKeys[i]] ? current.errorMessages[errorKeys[i]] : null;
                }
                if (message === null) {
                    message = Validation.messages[errorKeys[i]] ?
                        Validation.messages[errorKeys[i]] : Validation.messages['default'];
                }
                if (errors.indexOf(message) === -1) {
                    errors.push(message);
                }
            }
        }
        return errors;
    }
    render() {
        return (<form onSubmit={this.submit.bind(this)} className={this.props.className} id={this.props.id}>
            {this.props.contentBefore}
            {this.renderChildren()}
            {this.props.contentAfter}
            <div className="clearfix"></div>
        </form>);
    }

    renderChildren() {
        if (!this.props.children)return null;
        let out = [];

        let children;
        if (React.isValidElement(this.props.children)) {
            children = [this.props.children]
        } else if (this.props.children && this.props.children.length) {
            children = this.props.children;
        } else if (this.props.children) {
            throw 'Unknown chldrens format in form';
        } else {
            return null;
        }
        return children.map((child, key) => {
            return React.cloneElement(child, {
                key: key,
                ref: key,
                formId: this.props.id,
                onSetValue: this.collectValues.bind(this)
            });
        });
    }
    
    collectValues(name, value, errorMessages, errorKeys, event){
        if(typeof this.props.onCollectValues === 'function') {
            this.props.onCollectValues(name, value, errorMessages, errorKeys, event);
        } else {
            throw "Form must contain 'onCollectValues' props. Please, specify this function."
        }
    }
}
