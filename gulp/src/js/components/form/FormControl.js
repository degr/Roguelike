import React from 'react';

export default class FormControl extends React.Component {
    render(){
        let className = 'control ' + (this.props.direction ? this.props.direction : 'right'); 
        return <div className={className}>
            {this.props.children}
        </div>
    }
}