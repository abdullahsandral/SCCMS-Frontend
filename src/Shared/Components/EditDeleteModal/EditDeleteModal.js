import React from 'react';

import classes from './EditDeleteModal.module.css';
import { Link } from 'react-router-dom';

const EditDeleteModal = props =>
{
    const editUser = e => {  console.log(e)  }
    const deleteUser = e => {  console.log(e)   }

    return(
        <div className={classes.backdrop}>
            <div className={classes.Btns}>
                <Link to={`${props.link}`} ><button onClick={editUser}>EDIT</button></Link>
                <button onClick={deleteUser} style={{backgroundColor: 'red'}}>DELETE</button>
            </div>
        </div>
    )
}

export default EditDeleteModal;