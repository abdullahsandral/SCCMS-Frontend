import React, { useState } from 'react';

import EditDeleteModal from '../EditDeleteModal/EditDeleteModal';
import classes from './Notifictions.module.css';

const NotifictionItem = props =>
{
    const [showBtns, setShowBtns] = useState(false);
    const notificationHandler = e =>
    {
        setShowBtns(!showBtns);
    }
    const Link =   `/editNotification/${props.id}`;
    return <>
        <li className={classes.notification} onClick={notificationHandler}>
            <div className={classes.first}>
                <div>
                    <h6><b>{props.creator}</b></h6>
                    <p><b>{props.date}</b></p>
                </div>
                <p><b>Subject : </b>{props.subject}</p>
            </div>
            <div className={classes.second}><img src={`http://localhost:5000/uploads/images/${props.image}`} alt='' /></div>
            <p className={classes.third}>{props.description}</p>
            {showBtns && <EditDeleteModal  link={Link}/>}
        </li>
    </>
}

export default NotifictionItem;