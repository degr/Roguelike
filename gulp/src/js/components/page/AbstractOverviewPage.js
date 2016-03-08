import React from 'react';
import $ from 'jquery';

import Modal from '~/components/modal/Modal';
import Confirm from '~/components/modal/Confirm';
import Notification from '~/components/modal/Notification';
import Form from '~/components/form/Form';
import FormControl from '~/components/form/FormControl';
import Grid from '~/components/grid/Grid';
import Text from '~/components/form/input/Text';

import AbstractPage from './AbstractPage';

/**
 * Implement this methods:
 * this.getGridId() - unique grid id
 * this.updateData() or fullUpdataData(), must update grid datasource and datasource count
 * this.getColumns()
 * this.submitSuccess(model) - submit to save or update entity
 * this.onDelete(id)
 */
export default class AbstractOverviewPage extends AbstractPage {
    
    static getDefaultState(){
        return {
            onAjax: true,
            selectedItem: null,
            showDeletePopup: false,
            showDeleteNotification: false,
            showEditPopup: false,
            showSaved: false,
            showCantSaved: false,
            dataSource: [],
            dataSourceCount: 0,
            pagination: {
                pageSize: 10,
                skip: 0,
                page: 1
            }
        }
    }

    afterMount(){
        this.fullUpdateData();
    }
    
    render (){
        return <div>
            <ul className="col-sm-12">
                {this.getGridControls()}
            </ul>
            <div className="clearfix"/>
            {this.getGrid()}
            {this.getEditPopup()}
            {this.getDeletePopup()}
            {this.getSavedNotification()}
            {this.getCantSavedNotification()}
            {this.getDeleteNotification()}
        </div>
    }

    getDeleteNotification(){
        return <Notification isOpen={this.state.showDeleteNotification} closeTimeoutMS="2000"
                             onTimeout={() => this.setState({showDeleteNotification: false})}>
            Deletes
        </Notification>
    }
    getSavedNotification(){
        return <Notification isOpen={this.state.showSaved} closeTimeoutMS="1500" 
                             onTimeout={() => this.setState({showSaved: false})}>
            Saved
        </Notification>
    }

    getCantSavedNotification(){
        return <Notification notificationType="danger" closeTimeoutMS="2000" isOpen={this.state.showCantSaved}
                             onTimeout={() => this.setState({showCantSaved: false})}>
            Can't save
        </Notification>
    }

    getGridControls(){
        return [
            <a href="#" key="0" className="btn btn-primary"
               onClick={(e) => {e.preventDefault(); this.setState({selectedItem: {}, showEditPopup: true})}}>
                Add
            </a>
        ]
    }
    
    getControl(value, row){
        return <div className="control">{value}
            <a href="#" className="icon icon-edit" onClick={(e) => {
                e.preventDefault();this.setState({selectedItem: row, showEditPopup: true})}}/>
            <a href="#" className="icon icon-delete" onClick={(e) => {
                e.preventDefault();this.setState({selectedItem: row, showDeletePopup: true})}}/>
        </div>
    }
    
    getGrid(props) {
        return <Grid {...AbstractOverviewPage.prepareProps(
            {
                onAjax: this.state.onAjax,
                id: this.getGridId(),
                columns: this.getColumns(),
                dataSource: this.getDataSource(),
                dataSourceCount: this.getDataSourceCount(),
                pagination: {true},
                pageSize: this.state.pagination.pageSize,
                skip: this.state.pagination.skip,
                page: this.state.pagination.page,
                onPaginationChange: (p) => {this.setState({pagination: p}, () => this.fullUpdateData())}
            },
            props
        )} />
    }

    getEditPopup(props){
        return <Modal {...AbstractOverviewPage.prepareProps(
            {isOpen: this.state.showEditPopup}, props)}>
            {this.getEditForm()}
        </Modal>
    }

    static prepareProps(def, add){
        if(add) {
            return $.extend({}, def, add);
        } else {
            return def || {}
        }
    }
    getEditForm(){
        if(!this.state.selectedItem) {
            return null;
        }

        let inputs = [];
        let cols = this.getColumns();
        for(let i = 0; i < cols.length; i++) {
            let input = this.buildEditInput(cols[i]);
            if(input !== null) {
                inputs.push(input);
            }
        }
        return <Form submit={this.submit.bind(this)} onCollectValues={this.collectValues.bind(this)}
                     model={this.state.selectedItem} errors={this.state.selectedItemErrors}>
            {inputs}
            <FormControl>
                <input type="button" value="Close" onClick={() => this.setState({selectedItem: {}, showEditPopup: false})} className="btn btn-danger" />
                <input type="reset" value="Reset" onClick={() => this.setState({selectedItem: {}})} className="btn btn-warning" />
                <input type="submit" value="Submit" className="btn btn-primary" />
            </FormControl>
        </Form>
    }
    
    buildEditInput(col){
        if(['id', 'control'].indexOf(col.name) > -1 ) {
            return null;
        }
        if(col.formRender) {
            return col.formRender(col, this.state.selectedItem[col.name], this.state.selectedItem);
        } else {
            return <Text name={col.name} label={col.title}/>;
        }
    }
    collectValues(name, value, errors){
        let errs = $.extend({}, this.state.selectedItemErrors);
        let mod = $.extend({}, this.state.selectedItem);
        errs[name] = errors;
        mod[name] = value;
        this.setState({selectedItem: mod, selectedItemErrors: errs});
    }
    
    submit(model, hasError, errors){
        if(hasError) {
            let errs = $.extend({}, this.state.selectedItemErrors);
            let mod = $.extend({}, this.state.selectedItem);
            for(let key in model) {
                errs[key] = errors[key];
                mod[key] = model[key];
            }
            this.setState({selectedItem: mod, selectedItemErrors: errs});
        } else {
            this.setState({showEditPopup: false}, () => {
                this.submitSuccess(this.state.selectedItem).then(
                    (response) => {
                        if(response) {
                            this.setState({showSaved: true})
                        } else {
                            this.setState({showCantSaved: true})
                        }
                    }
                )
            });
        }
    }
    getDeletePopup(){
        return <Confirm isOpen={this.state.showDeletePopup} callback={(r) => {
            this.setState({showDeletePopup: false}, r ? this.deleteConfirmed.bind(this) : null);
        }}>
            Are you  sure to delete?</Confirm>
    }
    getDataSource() {
        return this.state.dataSource;
    }
    getDataSourceCount() {
        return this.state.dataSourceCount;
    }
    
    deleteConfirmed(){
        let id = this.state.selectedItem.id;
        this.setState({onAjax: true, selectedItem: null}, () => {
            this.onDelete(id).then(
                () => this.setState({showDeleteNotification: true}, this.fullUpdateData.bind(this))
            )
        })
    }


    fullUpdateData() {
        this.setState({onAjax: true}, () =>
            this.updateData().then((r) => {
                this.setState({onAjax: false})
            })
        )
    }
}