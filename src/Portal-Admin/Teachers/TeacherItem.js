import React, { useState } from 'react';

import EditDeleteModal from '../../Shared/Components/EditDeleteModal/EditDeleteModal';
import classes from './Teachers.module.css';

const TeacherItem = props =>
{
    const [showBtns, setShowBtns] = useState(false);
    const teacherHandler = e =>
    {
        setShowBtns(!showBtns);
    }
    const Link = `/editTeacher/${props.id}`;
    return <>
        <li className={classes.teacherItem} onClick={teacherHandler}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.email}</div>
            <div>{props.contact}</div>
            <div>{props.qualification}</div>
            <div></div>
            {showBtns && <EditDeleteModal link={Link}/>}
        </li>
    </>
}

export default TeacherItem;