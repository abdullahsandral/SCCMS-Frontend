import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotifications } from '../../../Actions/NotificationsActions';

import Spinner from '../../Components/UI Element/Spinner';
import NotificationItem from './NotificationItem';
import classes from './Notifictions.module.css';

const Notifictions = props =>
{
    const { notifications, notifications_loading } = useSelector( state => state?.notifications );
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch( getAllNotifications() );
    },[dispatch])

    return <>
        <div className={classes.notifications}>        
            <div>
                <h3>Notifications</h3>
                <Link to='/addNotification'><button className='btn btn-success'>ADD NOTIFICATION</button></Link>
            </div>
            {notifications_loading || (!notifications_loading && notifications === null) ? 
            <div className={classes.loading}>
                <Spinner /> <h3>Loading Notifications...</h3> 
            </div> :
            <>
                {notifications && <>
                    { notifications.length<=0 ? <h3>No Notification Found...</h3>  :
                    <ul>
                        {notifications.map(notfy => 
                            <NotificationItem 
                                key={notfy.id}
                                id={notfy.id}
                                creator={notfy.user} 
                                date={notfy.createdAt} 
                                subject={notfy.subject} 
                                image={notfy.image_url} 
                                description={notfy.description}/>)}
                    </ul>}
                    </>}</>
            }
            
        </div>
    </>
}

export default Notifictions;