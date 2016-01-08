/*import 'bootstrap/dist/css/bootstrap.css';
 import 'rc-calendar/assets/bootstrap.css';*/
import React from 'react';
import Calendar0 from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import en_US from 'gregorian-calendar/lib/locale/en_US'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import Time0 from 'rc-calendar/lib/time/Time';

import Text from './Text.js';


//import GregorianCalendar from 'gregorian-calendar';
export default class Time extends Text {
    
    constructor(props){
        super(props);
        if(!props.value && !(props.value instanceof GregorianCalendar)) {
            throw 'Please specify value for "Time" component. Value must be "GregorianCalendar" instance.';
        }
    }
    
    buildInput() {
        return <div className="rc-calendar-footer time-input">
            <div className="rc-calendar-time">
                <Time0 prefixCls="rc-calendar" value={this.getValue()} locale={CalendarLocale} onChange={this.setValue.bind(this)} />
            </div>
        </div>
    }
}