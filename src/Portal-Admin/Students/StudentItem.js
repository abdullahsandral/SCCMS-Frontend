import React, { useState } from 'react';

import EditDeleteModal from '../../Shared/Components/EditDeleteModal/EditDeleteModal';
import classes from './Students.module.css';

const StudentItem = props =>
{
    const [showBtns, setShowBtns] = useState(false);
    const studentHandler = e =>
    {
        setShowBtns(!showBtns);
    }
    const Link =   `/editStudent/${props.id}`;
    return <>
        <li className={classes.studentItem} onClick={studentHandler}>
            <div>{props.rollNo}</div>
            <div>{props.name}</div>
            <div>{props.email}</div>
            <div>{props.contact}</div>
            <div>{props.class}</div>
            {showBtns && <EditDeleteModal  link={Link}/>}
        </li>
    </>
}

export default StudentItem;