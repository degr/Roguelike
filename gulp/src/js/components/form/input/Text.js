import React from 'react';
import $ from 'jquery';
import AbstractInput from './AbstractInput.js'

export default class Text extends AbstractInput{
    render(){
        var attributes = $.extend({}, this.props.attr);
        attributes.type = this.props.type ? this.props.type : 'text';
        attributes.value = this.getValue();
        
        attributes.name = this.props.name;
        if(!attributes.onChange) {
            attributes.onChange = this.changeValue.bind(this);
        }
        if(!attributes.id) {
            attributes.id = (this.props.formId ? this.props.formId + '_' + this.props.name : null);
        }
        var input = this.buildInput(attributes);
        var label = this.props.noLabel === true ? null : 
            this.buildLabel(this.props.attr ? this.props.attr.id : null, this.getLabelValue());
        return this.wrapInput(input, label);
    }
    getInputType(){
        return 'input';
    }
    
    buildInput(attributes){
        return React.createElement(this.getInputType(), attributes);
    }
}