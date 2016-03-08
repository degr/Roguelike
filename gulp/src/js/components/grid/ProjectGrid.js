import $ from 'jquery';
import React from 'react';

import StringUtils from '~/utils/StringUtils'
import Select from '~/components/form/input/Select'
import Text from '~/components/form/input/Text'
import TD from './TD'

import GroupUtils from './GroupUtils'

const PAGE_SIZE = [
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50},
    {label: 100, value: 100}
];

export default class ProjectGrid extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cache: {},
            collapsed: {}
        }
    }

    render(){
        return <div className="datagrid">
            <table>
                {this.buildHeader()}
                {this.buildBody()}
                {this.buildFooter()}
            </table>
            {this.props.pagination === false ? null : this.buildPagination()}
        </div>
    }

    buildHeader(){
        let headers = [];
        for(let i = 0; i < this.props.columns.length; i++) {
            let col = this.props.columns[i];
            headers.push(<th key={i}>
                {col.title ? col.title : this.getTitleValue(col.name)}
            </th>);
        }
        return <thead key="thead"><tr>{headers}</tr></thead>
    }
    buildBody() {
        let rows;
        if (this.props.dataSource) {
            let ds;
            if(this.props.dataSource === 'S') {
                ds = []
            } else {
                if (this.props.groupBy) {

                    let orderedDs = GroupUtils.getGroupedDs(this.props.dataSource, this.props.groupBy);
                    if ($.isArray(orderedDs)) {
                        ds = orderedDs;
                    } else {
                        ds = [];
                        this.flatDatasource(ds, orderedDs, 0, 0);
                    }
                } else {
                    ds = this.props.dataSource;
                }
            }
            rows = this.getRowsArray(ds);
        }
        return <tbody key="tbody">{rows}</tbody>;
    }

    flatDatasource(out, ordered, rowIndex, groupIndex){
        for(let key in ordered) {
            if(!ordered.hasOwnProperty(key))continue;
            let colName = typeof this.props.groupBy === 'string' ? this.props.groupBy : this.props.groupBy[groupIndex];

            let fakeDatasource = {};
            let collapseClass = "icon icon-" + (this.state.collapsed[key] === true ? "top" : "bottom");
            fakeDatasource[colName] = <div className="group-toggler">
                <a href="#" onClick={function(e){this.collapseGroup(e, key)}.bind(this)} className={collapseClass}/>
                {key}
            </div>;

            out.push(fakeDatasource);

            let item = ordered[key];
            if($.isArray(item)) {
                if(this.state.collapsed[key] === true)continue;

                let rows = [];
                for(let j = 0; j < item.length; j++) {
                    let row = {};
                    for(let k in item[j]) {
                        let indexOf;
                        if (typeof this.props.groupBy === 'string') {
                            indexOf = k !== this.props.groupBy ? -1 : 1;
                        } else {
                            indexOf = this.props.groupBy.indexOf(k);
                        }
                        if(indexOf === -1) {
                            row[k] = item[j][k];
                        }
                    }
                    rows.push(row);
                }
                $.merge(out, rows);
            } else {
                rowIndex = this.flatDatasource(out, item, rowIndex, groupIndex + 1)
            }
        }
        return rowIndex;
    }

    collapseGroup(e, group){
        if(e)e.preventDefault();
        let collapsed = $.extend({}, this.state.collapsed);
        collapsed[group] = !collapsed[group];
        this.setState({collapsed: collapsed});
    }

    getRowsArray(dataSource){
        let out = [];
        for (let i = 0; i < dataSource.length; i++){
            let row = this.getCellsArray(dataSource[i]);
            out.push(<tr key={i} className={(i % 2 ? "even " : 'odd ') }>
                {row}
            </tr>)
        }
        return out;
    }

    getCellsArray(dataRow){
        let row = [];
        for(let c = 0; c < this.props.columns.length; c++) {
            let col = this.props.columns[c];
            let value = dataRow[col.name];
            let className = (col.className ? col.className + ' ' : '') +
                (col.textAlign ? 'align-' + col.textAlign : '');
            row.push(<TD  key={c} className={className} shouldUpdate={col.shouldCellUpdate} render={col.render}
                          value={value} dataRow={dataRow}/>);
        }
        return row;
    }

    buildFooter(){
        return <tfoot key="tfoot"/>
    }
    buildPagination(){
        let limit = this.calculateLimit();

        let displayFrom = ((this.props.page - 1) * this.props.pageSize) + 1;
        let displayTo = this.props.page * this.props.pageSize;
        let leftArrow = 'icon icon-left' + (this.props.page === 1 ? ' icon-disabled' : '');
        let rightArrow = 'icon icon-right';

        if(displayTo > limit) {
            displayTo = limit;
            rightArrow += ' icon-disabled';
        }
        return <div>
            {this.props.paginationPreffix}
            <div className="pagination">
                <a href="#" className={leftArrow} onClick={this.prevPage.bind(this)} title="Previous Page"/>
                <Text label="Page" className="page" value={this.props.page} onSetValue={this.onPageChange.bind(this)} name="page"/>
                <span className="text margin">of {Math.ceil(this.calculateLimit() / this.props.pageSize)}</span>
                <a href="#" className={rightArrow} onClick={this.nextPage.bind(this)} title="Next Page"/>
                <Select className="page-size" value={this.props.pageSize} label="Page Size" options={PAGE_SIZE}
                        onSetValue={this.onPageSizeChange.bind(this)} name="page_size" />
                <div className="text">
                    Displaying {displayFrom} - {displayTo} of {limit}
                </div>
            </div>
        </div>
    }

    prevPage(e){
        if(e)e.preventDefault();
        let page = parseInt(this.props.page);
        if(page > 1) {
            this.onPageChange(null, page - 1)
        }
    }
    nextPage(e){
        if(e)e.preventDefault();
        let page = parseInt(this.props.page);
        if(this.calculateLimit() > page * this.props.pageSize) {
            this.onPageChange(null, page + 1)
        }
    }
    onPageChange(name, value){
        this.props.onPageChange(value);
    }
    onPageSizeChange(name, value){
        this.props.onPageSizeChange(value);
    }

    getTitleValue(name){
        if(!this.state.cache[name]) {
            this.state.cache[name] = StringUtils.normalizeText(name);
        }
        return this.state.cache[name];
    }
    calculateLimit(){
        return this.props.dataSourceCount ?
            this.props.dataSourceCount :
            (this.props.dataSource ? this.props.dataSource.length : 0);
    }
}