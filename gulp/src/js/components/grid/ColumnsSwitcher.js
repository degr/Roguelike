import React, {Component} from 'react';
import $ from 'jquery'

import Checkbox from '~/components/form/input/Checkbox.js'
import StringUtils from '~/utils/StringUtils'

export default class ColumnsSwitcher extends Component{

    render(){
        return <div className="columns-control">
            {this.getShownCheckboxes()}
        </div>;
    }

    getShownCheckboxes() {
        let out = [];
        for (let i = 0; i < this.props.columns.length; i++) {
            let column = this.props.columns[i];
            if(column.name === 'control' && !column.title)continue;

            out.push(<Checkbox key={i} name={column.name}
                               label={column.shownCheckboxTitle || column.title || StringUtils.normalizeText(column.name)}
                               onSetValue={this.onShowCheckBox.bind(this)}
                               checked={!(this.props.shownColumns[column.name] === false)}/>);
        }
        return out;
    }


    onShowCheckBox(name, value) {
        let shownColumns = $.extend({}, this.props.shownColumns);
        shownColumns[name] = value;
        let me = this;
        this.props.onShownColumnsChange(shownColumns)
    }

}