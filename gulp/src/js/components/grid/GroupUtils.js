import $ from 'jquery';

let GroupUtils = {
    getGroupedDs: function(dataSource, groupBy){
        let thisGroupBy;
        if(typeof groupBy === 'string')thisGroupBy = [groupBy];
        else thisGroupBy = $.merge([], groupBy);
        if(thisGroupBy.length === 0)return dataSource;

        let firstGroupName = thisGroupBy.shift();
        let out = this.groupArrayByName(dataSource, firstGroupName);

        while(thisGroupBy.length) {
            let groupName = thisGroupBy.shift();
            out = GroupUtils.groupSubObjects(out, groupName);
        }
        return out;
    },

    groupSubObjects: function(parent, name){
        if($.isArray(parent)) {
            return GroupUtils.groupArrayByName(parent, name);
        } else {
            for (let groupName in parent) {
                if($.isArray(parent[groupName])) {
                    parent[groupName] = GroupUtils.groupArrayByName(parent[groupName], name);
                } else {
                    parent[groupName] = GroupUtils.groupSubObjects(parent[groupName], name)
                }
            }
            return parent;
        }
    },

    groupArrayByName: function(ds, name){
        let out = {};
        for(let i = 0; i < ds.length; i++) {
            if(!out[ds[i][name]])out[ds[i][name]] = [];
            out[ds[i][name]].push(ds[i]);
        }
        return out;
    }
};
export default GroupUtils;