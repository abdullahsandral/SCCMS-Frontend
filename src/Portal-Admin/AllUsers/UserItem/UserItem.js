import React from 'react';

import classes from './UserItem.module.css';

const UserItem = ({ id, name, user_name, role }) =>
{
    return <>
        <li className={classes.userItem}>
            <div>{id}</div>
            <div>{name}</div>
            <div>{user_name}</div>
            <div>{role && role[0].toUpperCase()+role.slice(1)}</div>
        </li>
    </>
}

export default UserItem;