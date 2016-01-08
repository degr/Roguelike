/*import 'bootstrap/dist/css/bootstrap.css';
 import 'rc-calendar/assets/bootstrap.css';*/
import React from 'react';
import Calendar0 from 'rc-calendar/';
import DatePicker from 'rc-calendar/lib/Picker';
import en_US from 'gregorian-calendar/lib/locale/en_US'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import Text from './Text.js';

//const FORMATTER = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');
const FORMATTER = new DateTimeFormat('yyyy-MM-dd');

export default class Calendar extends Text {

    constructor(props) {
        super(props);
        if (!this.state) this.state = {};

        if(!props.value && !(props.value instanceof GregorianCalendar)) {
            throw 'Please specify value for "Time" component. Value must be "GregorianCalendar" instance.';
        }
        this.state.value = props.value;
        this.state.isDatePickerOpen = false;
    }

    setValue(calendar){
        super.setValue(calendar);
    }
    
    buildInput() {
        let formatter = this.props.formatter ? this.props.formatter : FORMATTER;
        var calendar = <Calendar0 locale={CalendarLocale} showTime={false}>Some other text</Calendar0>;
        var me = this;
        return <div className="input-group">
                <DatePicker calendar={calendar}
                            placement="bottomLeft"
                            defaultValue={this.state.value}
                            value={this.props.value}
                            onChange={this.setValue.bind(this)}
                            open={this.state.isDatePickerOpen}>
                    {
                        ({value}) => {
                            return <span>
                                <input type="text" className="form-control" readOnly placeholder={me.props.attr && me.props.attr.placeholder ?  me.props.attr.placeholder : ''}
                                       value={value && formatter.format(value)}
                                       style={{
                                           background: "white",
                                           borderTopRightRadius:4,
                                           borderBottomRightRadius:4,
                                           cursor: "pointer"}}
                                    />
                                <span className="input-group-addon" style={{
                                        width:39,
                                        height:34,
                                        borderRight:0,
                                        borderLeft:'1px solid #ccc',
                                        position:'absolute',
                                        zIndex:99,
                                        right:1,top:0}}>
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                            </span>;
                        }
                    }
                </DatePicker>
            </div>;
    }
}