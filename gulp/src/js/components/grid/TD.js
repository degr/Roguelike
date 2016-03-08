import React from 'react';

export default class TD extends React.Component {

    shouldComponentUpdate (nextProps){
        return this.props.shouldUpdate ? this.props.shouldUpdate(this.props, nextProps) : true;
    }

    render(){
        return <td key={this.props.key} className={this.props.className} >
            {this.props.render ? this.props.render(this.props.value, this.props.dataRow) : this.props.value}
        </td>
    }
}