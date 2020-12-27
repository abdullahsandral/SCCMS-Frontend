import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Dashboard.module.css';
import { useSelector } from 'react-redux';

const Dashboard = props =>
{
    const Role = useSelector( state => state?.authentication?.role)
    let Links;
    if(Role==='admin')
    Links = <>
        <Link to='/teachers'>Teachers</Link>
        <Link to='/students'>Students</Link>
        <Link to='/notifications'>Notifications</Link>
        <Link to='/addSubjects'>Add Subjects</Link>
        <Link to='/timetable'>TimeTable</Link>
        <Link to='/examSchedule'>Exam Schedule</Link>
    </>
    else if(Role==='teacher')
    Links = <>
        <Link to='/'>View Profile</Link>
        <Link to='/attendance'>Mark Attendance</Link>
    </>
    else if(Role==='student')
    Links = <>
        <Link to='/'>View Profile</Link>
        <Link to='/attendance'>View Attendance</Link>
    </>

    return <>
        <div className={classes.dashboard}>
            {Links}
        </div>
    </>
}

export default Dashboard;