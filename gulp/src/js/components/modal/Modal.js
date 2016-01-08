import React from 'react';
import $ from 'jquery';
import Modal0 from 'react-modal';

const MODAL_STYLES = {
    content : {
        
    },
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(10, 10, 10, 0.25)',
        zIndex            : 1100 //override bootstrap navbar-static-top
    }
};
/**
 * @property className string, [medium, large]
 */
export class Modal extends React.Component{
    render(){
        var style;
        if(this.props.extendStyles === false) {
            style = this.props.customStyles;
        } else {
            style =  this.props.customStyles ? this.concatStyles(this.props.customStyles) : MODAL_STYLES;
        }
        var className = this.props.extendClassName === false ?
            this.props.className :
            'modal-window row' + (this.props.className ? ' ' + this.props.className : '');
        
        return <Modal0 {...this.props} className={className} style={style}/> 
    }
    concatStyles(styles) {
        var out = $.extend(true, {}, MODAL_STYLES);
        for(var i in out) {
            out[i] = $.extend(out[i], styles[i] ? styles[i] : {}); 
        }
        return out;
    }
}
