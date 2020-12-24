import React, { useState, useContext }  from 'react';

import {AuthContext} from '../../Contexts/Authentication-Context';
import Drawer from '../Dashboard/Drawer/Drawer';
import classes from './MainHeader.module.css';
import { Link } from 'react-router-dom';

const MainHeader = props =>
{
    const AuthenticationContext = useContext(AuthContext);
    const [showDashboard, setShowDashboard] = useState(false);
    const [logout, setLogout] = useState(false);
    const dashboardHandler = () =>
    {
        setShowDashboard(!showDashboard);
    }
    return <>
        {showDashboard && <Drawer closeDrawer={dashboardHandler}/>}
        <div className={classes.header}>
            <button className={classes.dashboardToggler} onClick={dashboardHandler}>
                <span></span>
                <span></span>
                <span></span>
            </button>
                <Link to='/'><h3 className={classes.dashboard}>Dashboard</h3></Link>
            {!AuthenticationContext.loggedIn && <Link to='/signin' className={classes.sBtn}>LOG IN</Link>}
            
            {AuthenticationContext.loggedIn && <div className='d-flex'>
            {logout && <Link to='/signin' className={classes.sBtn} 
                onClick={e => {setLogout(false);AuthenticationContext.logout()}}>LOG OUT</Link>}
                <img src={`http://localhost:5000/uploads/images/${AuthenticationContext.userImage}`} alt='profile'
                onClick={e => setLogout(!logout)}/>
            </div>
            }
        </div>
    </>
}

export default MainHeader;