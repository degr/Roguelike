import DataGrid from 'react-datagrid/';
import React from 'react';
import $ from 'jquery';

import Application from '~/Application.js';
import {ColumnsSwitcher} from './ColumnsSwitcher.js';
import {Checkbox} from '~/components/form/input/Checkbox.js';

export class Grid extends React.Component {

    selected = {};

    constructor(props) {
        super(props);
        this.onCountUpdate();
        if(typeof props.onSelectChange === 'function' && !props.selectId) {
            throw 'onSelectChange function was specified, but selectId not.';
        }
        this.state = {
            shownColumns: {},
			isAllSelected: false,
            page: this.props.page || 1,
            pageSize: this.props.pageSize || 20
        }
    }

    render() {
        if (this.props.reloadCount) {
            this.onCountUpdate();
        }
        if(typeof this.props.onPaginationChange !== 'function' &&
            (!this.props.onPageChange && !this.props.onPageSizeChange)
        ) {
            throw 'Please specify "onPaginationChange" function.'
        }
        this.reinitSelection();
        let columns = this.getColumns();
        var ds = !this.props.dataSource ? this.dataSource.bind(this) : this.props.dataSource;
        return <div className="grid-wrapper col-md-12">
            <div className="grid-content-before">
                <ColumnsSwitcher columns={this.props.columns} onShownColumnsChange={this.onShownColumnsChange.bind(this)} />
                <div className="clearfix"></div>

                <div className="top-control">
                    {this.getControlPanel('gridControlPanelTop')}
                </div>
            </div>
            <DataGrid idProperty={this.props.idProperty} dataSource={ds} columns={columns}
                dataSourceCount={this.props.dataSourceCount}
                paginationToolbarProps={Grid.getToolbarProps()}
                groupBy={this.props.groupBy}
                paginationToolbarProps={Grid.getToolbarProps()}
                withColumnMenu={false}
                pagination={this.props.pagination}
                page={this.state.page}
                pageSize={this.state.pageSize}
                onPageChange={this.props.onPageChange || this.onPageChange.bind(this)}
                onPageSizeChange={this.props.onPageSizeChange || this.onPageSizeChange.bind(this)}/>
            <div className="grid-content-after">
                <div className="bottom-control">
                    {this.getControlPanel('gridControlPanelBottom')}
                </div>
            </div>
        </div>
    }

    getControlPanel(key){
        return <div>
            {this.getDefaultControl()}
            {this.props[key] ? this.props[key] : null}
        </div>
    }

    static calculateSkip(page, pageSize){
        if(page < 1) page = 1;
        return (page - 1) * pageSize;
    }

    getSelection(){
        if(this.props.onSelectChange && $.isArray(this.props.dataSource)) {
            let selected = {};
            if(this.props.dataSource.length) {
                this.props.dataSource.forEach(function(item) {
                    selected[item[this.props.selectId]] = false;
                })
            }
            return selected;
        }
        return {};
    }

    onPageSizeChange(pageSize){
        this.setState({
            page: 1,
            pageSize: pageSize,
            skip: Grid.calculateSkip(this.state.page, pageSize)
        }, () => {
            this.props.onPaginationChange(this.state);
        });
		this.reinitSelection();
    }


    onPageChange(page) {
        this.setState({
            page: page,
            skip: Grid.calculateSkip(page, this.state.pageSize)
        }, () => {
            this.props.onPaginationChange(this.state);
        });
        this.reinitSelection();
    }

    onRefresh(event){
        event.preventDefault();
		this.props.onPaginationChange(this.state);
        this.reinitSelection();
    }

    reinitSelection(){
        if(this.props.dataSource && this.props.dataSource.length) {
            let me = this;
            let newSelection = {};
            let requireUpdate = false;
            this.props.dataSource.forEach(function(item){
                let key = item[me.props.selectId];
                newSelection[key] = false;
                if(!requireUpdate && typeof me.selected[key] === 'undefined') {
                    requireUpdate = true;
                }
            });
            if(!requireUpdate) {
                requireUpdate = Object.keys(me.selected).length == Object.keys(newSelection);
            }
            if(requireUpdate) {
                this.selected = newSelection;
            }
        } else {
            this.selected = {};
        }
    }

    onShownColumnsChange(shownColumns){
        this.setState({shownColumns: shownColumns});
    }

    static getToolbarProps() {
        return  {
            showSeparators: false,
            iconSize: 15,
            iconProps: {
                //style: {fill: 'green'},
                overStyle: {fill: '#157C8E'}//,
                //disabledStyle: {fill: 'red'}
            }
        }
    }


    dataSource(query) {
        var out = Application.ajax(
            this.props.dataUrl,
            this.props.dataProperties ?
                (typeof this.props.dataProperties === 'function' ?
                    this.props.dataProperties(query) :
                    this.props.dataProperties) :
            {}
        );
        if (this.props.onDataFilter) {
            return out.then(this.props.onDataFilter);
        } else {
            return out;
        }
    }

    onCountUpdate(query) {
        if (!this.props.countUrl) {
            if (this.props.countProperties) {
                if (typeof this.props.countProperties === 'function') {
                    return this.props.countProperties(query);
                } else {
                    return parseInt(this.props.countProperties);
                }
            }
            return 0;
        }
        var out = Application.ajax(
            this.props.countUrl,
            typeof this.props.countProperties === 'function' ? this.props.countProperties(query) : {}
        );
        if (this.props.onCountFilter) {
            return out.then(this.props.onCountFilter);
        } else {
            return out;
        }
    }


    getDefaultControl(){
        let moveToTrash = this.props.onMoveToTrash ?
            <a href="#" onClick={this.props.onMoveToTrash} >
                <span className="icon icon-trash"></span>
                {this.props.moveToTrashText ? this.props.moveToTrashText : 'Move to trash'}
            </a> : null;
        return <div className="controls">
            {moveToTrash}
            <a href="#" onClick={this.onRefresh.bind(this)}>
                <span className="icon icon-refresh"></span>
                Refresh
            </a>
        </div>;
    }

    getColumns() {
        let out = [];
        if(typeof this.props.onSelectChange === 'function') {
            out.push({
                title: this.getSelectAllCheckbox(),
                width: this.props.selectionWidth ? this.props.selectionWidth : 85,
                name: 'select-all-column',
                render: this.getRowSelectionCheckbox.bind(this)
            });
        }
        for (let i = 0; i < this.props.columns.length; i++) {
            let column = this.props.columns[i];
            if (this.state.shownColumns[column.name] === false) continue;
            out.push(column);
        }
        return out;
    }

    getRowSelectionCheckbox(pseudoValue, row){
        let value = row[this.props.selectId];
        return (<Checkbox name={value} checked={this.selected[value]} onSetValue={this.selectRow.bind(this)}
                          className="no-margin" noLabel={true} attr={{id: (this.props.gridId ? this.props.gridId + "_" : '') + 'row_' + value}}/>);
    }

    getSelectAllCheckbox(){
        return <Checkbox name={(this.props.gridId ? this.props.gridId + "_" : '') + "select_all"}
                         checked={this.state.isAllSelected} onSetValue={this.selectAll.bind(this)}
                         label={this.props.selectAllLabel ? this.props.selectAllLabel : "Select all"}
                         className="no-margin select-all"/>;
    }

    selectAll(name, value){
        for(var i in this.selected){
            if(!this.selected.hasOwnProperty(i))continue;
            this.selected[i] = value;
        }
        this.setState({isAllSelected: value}, this.triggerSelection.bind(this));
    }


    selectRow(name, value){
        if(typeof this.selected[name] === 'undefined') {
            throw 'Attempt to select checkbox, that does not exist. May be "this.selected" object was not updated.';
        }
        this.selected[name] = value;
        let isAllSelected = true;
        for(let key in this.selected) {
            if(!this.selected.hasOwnProperty(key))continue;
            if(!this.selected[key]) {
                isAllSelected = false;
                break;
            }
        }
        this.setState({isAllSelected: isAllSelected}, this.triggerSelection.bind(this));
    }

    triggerSelection(){
        let out = [];
        for(var i in this.selected) {
            if(this.selected[i]) {
                out.push(i);
            }
        }
        this.props.onSelectChange(out);
    }
}
