import React from 'react';

import AbstractOverviewPage from '~/components/page/AbstractOverviewPage'
import RequestService from '~/services/RequestService'

export default class MapsPage extends AbstractOverviewPage {
    static URL = "maps";
    static TITLE = "Maps";
    main_url = "map";
    constructor(props){
        super(props);
        this.state = AbstractOverviewPage.getDefaultState();
    }
    getGridId() {
        return "grid_" + this.main_url;
    }
    updateData() {
        return RequestService.get(this.main_url).then((r) => {
            this.setState({dataSource: r, dataSourceCount: r.length});
            return r;
        });
    }
    getColumns(){
        return [
            {name: 'title', title: 'Map name'},
            {name: 'control', title: '', render: this.getControl.bind(this), className: 'width-100'}
        ]
    }
    getGrid(){
        return super.getGrid({pagination: false});
    }
    submitSuccess(model){
        var r;
        if(model.id) {
            r = RequestService.put(this.main_url, model.id, model);
        } else {
            r = RequestService.post(this.main_url, model);
        }
        return r.then((r) => {this.updateData(); return r});
    }
    onDelete(id){
        return RequestService.del(this.main_url, id);
    }
}