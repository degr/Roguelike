import React from 'react';
import $ from 'jquery';
import AbstractInput from './AbstractInput.js'
import Checkbox from './Checkbox.js'


export class Checkboxes extends AbstractInput{
    constructor(props){
        super(props);
        var value = {};
        for(var i = 0; i < this.props.options; i++) {
            var option = this.props.options;
            if(!option.name)throw "Checkboxes component require options objects array with property name.";
            value[option.name] = !!option.value;
        }
    }
    render(){
        var group = this.buildCheckboxesGroup(this.props.options);
        var label = this.buildLabel(null, this.getLabelValue());
        var className = 'formfield-holder formfield-checkboxes' +
            (this.props.className ? ' ' + this.props.className : '');
        return this.wrapInput(group, label, false, className);
    }
    onUpdateGroup(name, value, event){
        let out = $.extend({}, this.props.value);
        out[name] = value;
        console.log('onUpdateGroup',name, value);
        this.setValue(out, event);
    }
    buildCheckboxesGroup(options) {
        var out = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var radioId = this.getId() + "_" + option.name;
            var attributes = {
                name: option.name,
                label: option.label,
                id: radioId,
                type: 'checkbox',
                key: i,
                checked: option.checked,
                onSetValue: this.onUpdateGroup.bind(this),
                attr: {
                    id: radioId
                }
            };

            var input = <Checkbox {...attributes}/>;
            out.push(input);
        }
        return out;
    }
}