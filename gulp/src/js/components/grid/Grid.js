import React from 'react';
import $ from 'jquery';

import Application from '~/Application';
import ColumnsSwitcher from './ColumnsSwitcher';
import Checkbox from '~/components/form/input/Checkbox';
import Notification from '~/components/modal/Notification';
import ProjectGrid from './ProjectGrid';

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        if(typeof props.onSelectChange === 'function' && !props.selectId) {
            throw 'onSelectChange function was specified, but selectId not.';
        }
        if((props.pagination !== false) &&
            (
                typeof props.onPaginationChange !== 'function' &&
                (!props.onPageChange && !this.props.onPageSizeChange)
            )
        ) {
            throw 'Please specify "onPaginationChange" function.'
        }
        this.state = {
            shownColumns: {},
            isAllSelected: false,
            isAllChanged : false,
            checkboxesInit : false,
            page: this.props.page || 1,
            pageSize: this.props.pageSize,
            skip: 0,
            selected: [],
            showSaved: false,
            showReset: false
        }
    }

    initCheckboxes(){
        if(this.props.selectedIds && !this.state.checkboxesInit && !this.state.isAllChanged){
            this.state.selected = this.props.selectedIds;
            if(this.state.selected.length > 0){
                this.state.checkboxesInit = true;
            }
        }
        this.state.isAllChanged = false;
    }


    render() {
        this.initCheckboxes();
        let columns = this.getColumns();
        let wrapperClass = "grid-wrapper " + (this.props.wrapperClass || "col-md-12");
        return <div className={wrapperClass}>
            <div className="grid-content-before">
                {this.props.hideSwitcher === true ? null : <ColumnsSwitcher columns={this.props.columns} onShownColumnsChange={this.onShownColumnsChange.bind(this)} shownColumns={this.state.shownColumns}/>}
                <div className="clearfix"></div>

                <div className="top-control">
                    {this.getControlPanel('gridControlPanelTop')}
                    {this.getDefaultControl('top')}
                </div>
            </div>
            <div className={this.props.onAjax ? 'on-ajax' : ''}>
                <ProjectGrid id={this.props.id} dataSource={this.props.dataSource} columns={columns}
                             dataSourceCount={this.props.dataSourceCount}
                             groupBy={this.props.groupBy}
                             paginationToolbarProps={Grid.getToolbarProps()}
                             pagination={this.props.pagination}
                             page={this.state.page}
                             pageSize={this.state.pageSize}
                             onPageChange={this.props.onPageChange || this.onPageChange.bind(this)}
                             onPageSizeChange={this.props.onPageSizeChange || this.onPageSizeChange.bind(this)}
                             paginationPreffix={this.getDefaultControl('bottom')}
                />
            </div>
            <div className="grid-content-after">
                <div className="bottom-control">
                    {this.getControlPanel('gridControlPanelBottom')}
                </div>
            </div>
            <Notification isOpen={this.state.showSaved} closeTimeoutMS="1500"
                          onTimeout={() => this.setState({showSaved: false})}>
                Grid settings saved
            </Notification>
            <Notification isOpen={this.state.showReset} closeTimeoutMS="1500"
                          onTimeout={() => this.setState({showReset: false})}>
                Grid settings reset
            </Notification>
        </div>
    }

    getControlPanel(key){
        return <div>
            {this.props[key] ? this.props[key] : null}
        </div>
    }

    static calculateSkip(page, pageSize){
        if(page < 1) page = 1;
        return (page - 1) * pageSize;
    }

    onPageSizeChange(pageSize){
        this.selectAll('', false);
        this.setState({
            page: 1,
            pageSize: pageSize,
            skip: Grid.calculateSkip(this.state.page, pageSize)
        }, () => {
            if(this.props.onPaginationChange)this.props.onPaginationChange(this.exportPaginationChanges());
        });
    }

    exportPaginationChanges(){
        return {
            page: this.state.page,
            pageSize: this.state.pageSize,
            skip: this.state.skip
        }
    }

    onPageChange(page) {
        this.selectAll('', false);
        this.setState({
            page: page,
            pageSize: this.state.pageSize,
            skip: Grid.calculateSkip(page, this.state.pageSize)
        }, () => {
            if(this.props.onPaginationChange)this.props.onPaginationChange(this.exportPaginationChanges());
        });
    }

    onRefresh(event){
        this.selectAll('', false);
        event.preventDefault();
        this.props.onPaginationChange(this.exportPaginationChanges());
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


    getDefaultControl(clazz){
        if(this.props.noControl === true)return null;
        let controls = [];
        if(this.props.onMoveToTrash) {
            controls.push(<a href="#" onClick={this.props.onMoveToTrash} key="1">
                <span className="icon icon-trash"/>
                {this.props.moveToTrashText ? this.props.moveToTrashText : 'Move to trash'}
            </a>);
        }
        if(this.props.onPaginationChange) {
            controls.push(<a href="#" onClick={this.onRefresh.bind(this)} key="2">
                <span className="icon icon-refresh"/> Refresh
            </a>);
        }
        return <div className={"controls " + clazz}>
            {controls}
        </div>;
    }


    getColumns() {
        let out = [];
        if(typeof this.props.onSelectChange === 'function') {
            out.push({
                title: this.getSelectAllCheckbox(),
                width: this.props.selectionWidth ? this.props.selectionWidth : 85,
                name: 'select-all-column',
                render: this.getRowSelectionCheckbox.bind(this),
                className: 'width-100'
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
        let checked = this.state.selected.indexOf(value) > -1;
        return (<Checkbox name={value} checked={checked} onSetValue={this.selectRow.bind(this)}
                          className="no-margin" noLabel={true} attr={{id: (this.props.gridId ? this.props.gridId + "_" : '') + 'row_' + value}}/>);
    }

    getSelectAllCheckbox(){
        return <Checkbox name={(this.props.gridId ? this.props.gridId + "_" : '') + "select_all"}
                         checked={this.state.isAllSelected} onSetValue={this.selectAll.bind(this)}
                         label={this.props.selectAllLabel ? this.props.selectAllLabel : "Select all"}
                         className="no-margin select-all"/>;
    }


    selectAll(name, value){
        let dataSource = this.props.dataSource;
        if(!dataSource || dataSource.length == 0){
            return;
        }
        let selectId = this.props.selectId;
        let selected = [];
        if(value){
            dataSource.forEach(function(item){
                selected.push(item[selectId]);
            }.bind(this));
        }
        this.setState(
            {isAllSelected: value, isAllChanged : true, selected: selected},
            this.triggerSelection.bind(this)
        );
    }


    selectRow(name, value){
        let position = this.state.selected.indexOf(name);
        let selected = $.merge([], this.state.selected);
        if(value) {
            if(position === -1) {
                selected.push(name);
            }
        } else {
            if(position !== -1) {
                selected.splice(position, 1);
            }
        }
        this.setState(
            {selected: this.validateSelection(selected)},
            this.triggerSelection.bind(this)
        );
    }

    validateSelection(selected){
        if(this.props.dataSource && this.props.dataSource.length && this.state.selected) {
            for(let i = this.state.selected.length; i > 0; i--) {
                let id = this.state.selected[i - 1];
                let found = false;
                for(let j = 0; j < this.props.dataSource.length; j++) {
                    if(id === this.props.dataSource[j][this.props.selectId]) {
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    selected.splice(i-1, 1);
                }
            }
        } else {
            selected = [];
        }
        return selected;
    }

    triggerSelection(){
        if(this.props.onSelectChange) {
            this.props.onSelectChange(this.state.selected);
        }
    }

    clearSelection(){
        this.setState(
            {selected: []},
            this.triggerSelection.bind(this)
        );
    }

}