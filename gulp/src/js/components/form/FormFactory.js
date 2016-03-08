import React from 'react';

import Checkbox from './input/Checkbox';

export default {
    checkbox: function(column) {
        return <Checkbox name={column.name} label={column.title}/>
    }
}