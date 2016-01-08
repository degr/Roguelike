import React from 'react';
import $ from 'jquery';
import Text from './Text.js'

export default class Textarea extends Text{
    getInputType(){
        return 'textarea';
    }
}