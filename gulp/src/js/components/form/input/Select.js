import React from 'react';
import $ from 'jquery';
import Text from './AbstractInput.js'

export default class Select extends Text{

    buildInput(attributes){
        return <select {...attributes} value={this.props.value} onChange={this.onChange.bind(this)}>
            {this.buildOptionsGroup(this.props.options)}
        </select>;
    }
    
    buildOptionsGroup(options) {
        var out = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            out.push(<option value={option.value} key={i}>{option.label}</option>);
        }
        return out;
    }
    onChange(event) {
        this.setValue(event.target.value);
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }
}