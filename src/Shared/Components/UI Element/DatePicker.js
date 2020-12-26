import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';

import calendar from '../../../Assets/calendar.svg';
import classes from './DatePicker.module.css';

const DatePicker = props =>
{
    const [showCalendar, setShowCalender] = useState(false);
    const [selectedDate, setSelectedDate] = useState(props.iValue|| false);

    const DateChangeHandler = d =>
    {
        setShowCalender(!showCalendar); 

        let sDate;
        if(d.toLocaleDateString('en-GB'))
        {
            sDate  = d.toLocaleDateString('en-GB');
            setSelectedDate(sDate);
        }
        else if(selectedDate) return;
    }

    const id=props.id, onDateChange=props.onDateChange;

    useEffect(() => {if(!selectedDate) return ;onDateChange(id,selectedDate,true)},[selectedDate,id,onDateChange] )

    return <>
    <div className={classes.dob}>
        <strong aria-disabled={props.disabled}>{selectedDate || props.Error}</strong>
        <img src={calendar}  alt='Datepicker' onClick={ e => !props.disabled ? setShowCalender(!showCalendar) : false} />
        {showCalendar && 
        <Calendar 
            className={classes.calendar} 
            onClickDay={DateChangeHandler}
            minDate = {props.minDate || new Date('1971, 12, 16')} maxDate = {props.maxDate} 
        />}
    </div>
    </>
}

export default DatePicker;