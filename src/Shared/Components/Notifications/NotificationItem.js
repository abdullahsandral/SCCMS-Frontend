import React, { useState } from 'react';

import EditDeleteModal from '../EditDeleteModal/EditDeleteModal';
import classes from './Notifictions.module.css';

const NotifictionItem = ({ id, creator, date, subject, image, description }) =>
{
    const [showBtns, setShowBtns] = useState(false);
    const notificationHandler = e =>
    {
        setShowBtns(!showBtns);
    }
    const Link =   `/editNotification/${id}`;
    return <>
        <li className={classes.notification} onClick={notificationHandler}>
            <div className={classes.first}>
                <div>
                    <div className={classes.creator}>
                        <img src={`http://localhost:5000/uploads/images/${creator.image_url}`} alt='' />
             
                        <h6><b>{creator.name}</b></h6>
                    </div>
                    <p><b>{date}</b></p>
                </div>
                <p><b>Role : </b>{creator.role && creator.role[0].toUpperCase()+creator.role.slice(1)}</p>
                <p><b>Subject : </b>{subject}</p>
            </div>
            <div className={classes.second}><img src={`http://localhost:5000/uploads/images/${image}`} alt='' /></div>
            <p className={classes.third}>{description}</p>
            {showBtns && <EditDeleteModal  link={Link}/>}
        </li>
    </>
}

export default NotifictionItem;