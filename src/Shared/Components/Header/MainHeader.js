import React, { useState }  from 'react';

import Drawer from '../Dashboard/Drawer/Drawer';
import classes from './MainHeader.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../Actions/UsersActions';

const MainHeader = props =>
{
    const dispatch = useDispatch();
    const { authenticated, image_url } = useSelector( state => state?.authentication) || {}
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
            {!authenticated && <Link to='/signin' className={classes.sBtn}>LOG IN</Link>}
            
            {authenticated && <div className='d-flex'>
            {logout && <Link to='/signin' className={classes.sBtn} 
                onClick={e => {setLogout(false);dispatch(logoutUser())}}>LOG OUT</Link>}
                <img src={`http://localhost:5000/uploads/images/${image_url}`} alt='profile'
                onClick={e => setLogout(!logout)}/>
            </div>
            }
        </div>
    </>
}

export default MainHeader;