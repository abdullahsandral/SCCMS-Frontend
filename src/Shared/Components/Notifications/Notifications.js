import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../Components/UI Element/Spinner';
import NotificationItem from './NotificationItem';
import classes from './Notifictions.module.css';

const Notifictions = props =>
{
    
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const getNotifications = async () =>
        {
            try 
            {
                const response = await fetch(`http://localhost:5000/api/shared/notifications`);
                const data = await response.json();
                
                if(response.ok) 
                {setNotifications(data);
                setLoading(false);}
                
                else    {setLoading(false); throw new Error(response)}
                
            } catch (error) { alert(error.message); setLoading(false);   }
        }
        getNotifications();
    },[])

    return <>
        <div className={classes.notifications}>        
            <div>
                <h3>Notifications</h3>
                <Link to='/addNotification'><button className='btn btn-success'>ADD NOTIFICATION</button></Link>
            </div>
            {loading ? 
            <div className={classes.loading}>
                <Spinner /> <h3>Loading Notifications...</h3> 
            </div>
            :   <>
                {notifications && <>
                    { notifications.length<=0 ? <h3>No Notification Found...</h3>  :
                    <ul>
                        {notifications.map(notfy => 
                            <NotificationItem 
                                key={notfy.Notification_ID}
                                id={notfy.Notification_ID}
                                creator={notfy.Creator_Name} 
                                date={notfy.createdAt} 
                                subject={notfy.Notification_Subject} 
                                image={notfy.Notification_Image} 
                                description={notfy.Description}/>)}
                    </ul>}
                    </>}</>
            }
            
        </div>
    </>
}

export default Notifictions;