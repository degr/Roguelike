import React from 'react';

import AbstractOverviewPage from '~/components/page/AbstractOverviewPage'
import RequestService from '~/services/RequestService'

export default class EnvironmentsPage extends AbstractOverviewPage {
    static URL = "environment";
    static TITLE = "Environment";
    constructor(props){
        super(props);
        this.state = AbstractOverviewPage.getDefaultState();
    }
    getGridId() {
        return "grid_environment"
    }
    updateData() {
        RequestService.get("environment").then((r) => {
            this.setState({dataSource: r, dataSourceCount: r.length})
        })
    }
    getColumns(){
        return [
            {name: 'title', title: 'Environment'},
            {name: 'control', title: '', render: this.getControl.bind(this)}
        ]
    }
    getGrid(){
        return super.getGrid({pagination: false});
    }
}