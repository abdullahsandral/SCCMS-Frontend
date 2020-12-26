import React from 'react';

import classes from './Drawer.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardLink = props =>
{
    const Role = useSelector( state => state?.authentication?.user_role)
    let Links;

    if(Role==='Admin')
    Links = <>
        <Link to='/teachers'>Teachers</Link>
        <Link to='/students'>Students</Link>
        <Link to='/notifications'>Notifications</Link>
        <Link to='/addSubjects'>Add Subjects</Link>
        <Link to='/timetable'>TimeTable</Link>
        <Link to='/examSchedule'>Exam Schedule</Link>
    </>
    
    else if(Role==='Teacher')
    Links = <>
        <Link to='/'>View Profile</Link>
        <Link to='/attendance'>Mark Attendance</Link>
    </>

    else if(Role==='Student')
    Links = <>
        <Link to='/viewProfile'>View Profile</Link>
        <Link to='/attendance'>View Attendance</Link>
    </>

    return <>
        <div className={classes.dawerBackdrop} onClick={props.closeDrawer}></div>
        <div className={classes.drawer}  onClick={props.closeDrawer}>
            {Links}
        </div>
        
    </>
}

export default DashboardLink;