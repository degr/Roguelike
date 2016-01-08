import React, {Component} from 'react';
import {Checkbox} from '~/components/form/input/Checkbox.js'
import $ from 'jquery'

export class ColumnsSwitcher extends Component{
    constructor(props){
        super(props);

        if (!this.state)this.state = {};
        this.state.shownColumns = {};
    }
    
    render(){
        return <div className="columns-control">
            {this.getShownCheckboxes()}
        </div>;
    }
    
    getShownCheckboxes() {
        let out = [];
        for (let i = 0; i < this.props.columns.length; i++) {
            let column = this.props.columns[i];
            out.push(<Checkbox key={i} name={column.name}
                               label={column.shownCheckboxTitle || column.title || column.name}
                               onSetValue={this.onShowCheckBox.bind(this)}
                               checked={!(this.state.shownColumns[column.name] === false)}/>);
        }
        return out;
    }



    onShowCheckBox(name, value) {
        let shownColumns = $.extend({}, this.state.shownColumns);
        shownColumns[name] = value;
        let me = this;
        this.setState(
            {shownColumns: shownColumns},
            function(){me.props.onShownColumnsChange(shownColumns)}
        );
    }
    
}