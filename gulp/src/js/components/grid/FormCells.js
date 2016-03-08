import React from 'react';

import Text from '~/components/form/input/Text';
import Time from '~/components/form/input/Time';
import Select from '~/components/form/input/Select';

const ERRORS = function(id, nameClosure, errorStorage){
    return errorStorage && errorStorage[id] ? errorStorage[id][nameClosure] : null;
};

export default {
    textInputFactory(nameClosure, validations, me, idName, errorsStorage){
        return ((v, row) => {

            return <Text value={row[nameClosure]} name={nameClosure} errors={ERRORS(row[idName], nameClosure, errorsStorage)}
                         onSetValue={function(name, value, errors){me.updateTableCell(row[idName], name, value, errors)}}
                         noLabel={true}  validations={validations}/>
        }).bind(me);
    },

    timerFactory(nameClosure, validations, me, idName, errorsStorage){
        return ((v, row) => {
            return <Time value={row[nameClosure]} name={nameClosure} seconds={false} validations={validations}
                         onSetValue={function(name, value, errors){me.updateTableCell(row[idName], name, value, errors)}}
                         errors={ERRORS(row[idName], nameClosure, errorsStorage)} noLabel={true} noSeconds={true} />
        }).bind(me);
    },

    dropDownFactory(nameClosure, validations, me, idName, options, errorsStorage){
        return ((v, row) => {
            return <Select options={options} value={row[nameClosure]} name={nameClosure} seconds={false} noLabel={true}
                           onSetValue={function(name, value, errors){me.updateTableCell(row[idName], name, value, errors)}}
                           noSeconds={true} validations={validations} errors={ERRORS(row[idName], nameClosure, errorsStorage)} />
        }).bind(me);
    }
}