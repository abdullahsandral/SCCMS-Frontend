import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import TeacherItem from './TeacherItem';
import classes from './Teachers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../Actions/TeachersActions';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

const Teachers = props =>
{
    const dispatch = useDispatch();
    const { teachers, taechers_loading } = useSelector( state => state?.teachers );
    
    useEffect( () =>
    {
        dispatch(getAllTeachers());
    },[dispatch]);

    return <>
        <div className={classes.allTeachers}>
            <div>
                <h3>Teachers</h3>
                <Link to='/addTeacher'><button className='btn btn-success'>ADD TEACHER</button></Link>
            </div>
           
            {(taechers_loading || (!taechers_loading && teachers === null)) && 
                <div className={classes.loading}>
                    <Spinner />
                    <h3 style={{color:'gold'}}>Loading Teachers...</h3>
                </div>
            }

            {!taechers_loading && isEmpty(teachers) && teachers !== null && <h3 style={{color:'gold'}}>No Teacher Found</h3>   }

            {!taechers_loading && !isEmpty(teachers) && <>
            <div className={classes.allTeachersHeader}>
                <div>ID</div>
                <div>NAME</div>
                <div>Email</div>
                <div>Contact</div>
                <div>Qualification</div>
            </div>
            <div className={classes.teachersDetail}>
                <ul>
                    {teachers?.map( teacher => 
                    <TeacherItem 
                        key={teacher.ID}
                        id={teacher.ID} 
                        name={teacher.First_Name} 
                        email={teacher.E_Mail} 
                        contact={teacher.Contact_Number} 
                        qualification={teacher.Qualification}/>)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default Teachers;