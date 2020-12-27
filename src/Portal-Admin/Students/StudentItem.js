import React, { useState } from 'react';

import EditDeleteModal from '../../Shared/Components/EditDeleteModal/EditDeleteModal';
import classes from './Students.module.css';

const StudentItem = ({ id, name, email, contact, class: className }) => {
    const [showBtns, setShowBtns] = useState(false);
    const studentHandler = e =>
    {
        setShowBtns(!showBtns);
    }
    const Link = `/editStudent/${id}`;
    return <>
        <li className={classes.studentItem} onClick={studentHandler}>
            <div>{id}</div>
            <div>{name}</div>
            <div>{email}</div>
            <div>{contact}</div>
            <div>{className.name}</div>
            {showBtns && <EditDeleteModal  link={Link}/>}
        </li>
    </>
}

export default StudentItem;