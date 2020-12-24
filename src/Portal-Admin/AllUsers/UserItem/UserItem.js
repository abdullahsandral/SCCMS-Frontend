import React from 'react';

import classes from './UserItem.module.css';

const UserItem = props =>
{
    return <>
        <li className={classes.userItem}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.email}</div>
            <div>{props.role}</div>
        </li>
    </>
}

export default UserItem;