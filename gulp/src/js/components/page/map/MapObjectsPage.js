import React from 'react';

import AbstractOverviewPage from '~/components/page/AbstractOverviewPage'
import RequestService from '~/services/RequestService'
import FormFactory from '~/components/form/FormFactory'

export default class MapObjectsPage extends AbstractOverviewPage {
    static URL = "map-objects";
    static TITLE = "Map objects";
    
    main_url = 'map_object';
    
    constructor(props){
        super(props);
        this.state = AbstractOverviewPage.getDefaultState();
    }
    getGridId() {
        return "grid_" + this.main_url;
    }
    updateData() {
        return RequestService.get("map_object").then((r) => {
            this.setState({dataSource: r, dataSourceCount: r.length});
            return r;
        })
    }
    getColumns(){
        return [
            {name: 'title', title: 'Object name'},
            {name: 'transparent', title: 'Is transparent', render: (i) => {return i === true ? 'Y' : 'N'}, formRender: FormFactory.checkbox},
            {name: 'passable', title: 'Is passable', render: (i) => {return i === true ? 'Y' : 'N'}, formRender: FormFactory.checkbox},
            {name: 'visible', title: 'Is visible', render: (i) => {return i === true ? 'Y' : 'N'}, formRender: FormFactory.checkbox},
            {name: 'environmentId', title: 'Environment'},
            {name: 'background', title: 'background', render: (i, row) => {return i ? <img src={i} alt={row.title} title={row.title}/> : null}},
            {name: 'control', title: '', render: this.getControl.bind(this)}
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