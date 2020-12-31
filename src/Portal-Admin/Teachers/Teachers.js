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
    const { teachers,  teachers_loading } = useSelector( state => state?.teachers );
    
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
            {(teachers_loading || (!teachers_loading && teachers === null)) && 
                <div className={classes.loading}>
                    <Spinner />
                    <h3 style={{color:'gold'}}>Loading Teachers...</h3>
                </div>
            }

            {!teachers_loading && isEmpty(teachers) && teachers !== null && <h3 style={{color:'gold'}}>No Teacher Found</h3>   }

            {!teachers_loading && !isEmpty(teachers) && <>
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
                        key={teacher.id}
                        id={teacher.id} 
                        name={teacher.first_name} 
                        email={teacher.email} 
                        contact={teacher.contact_number} 
                        qualification={teacher.qualification}/>)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default Teachers;