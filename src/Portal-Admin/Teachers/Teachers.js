import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import TeacherItem from './TeacherItem';
import classes from './Teachers.module.css';

const Teachers = props =>
{
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>
    {
       const getTeachers = async () => 
       {
            try 
            {
                const response = await fetch('http://localhost:5000/api/admin/teachers');
                const data = await response.json();
                
                if(response.ok) 
                {setTeachers(data);
                setLoading(false);}
                
                else    {setLoading(false); throw new Error(response)}
                
            } catch (error) {alert(error.message); setLoading(false);   }
       }; getTeachers();
    },[]);

    return <>
        <div className={classes.allTeachers}>
            <div>
                <h3>Teachers</h3>
                <Link to='/addTeacher'><button className='btn btn-success'>ADD TEACHER</button></Link>
            </div>
           
            {loading && <div className={classes.loading}> <Spinner /> <h3 style={{color:'gold'}}>Loading Teachers...</h3> </div>}

            {!loading && teachers.length<=0 && <h3 style={{color:'gold'}}>No Teacher Found</h3>   }

            {!loading && teachers.length>0   && <>
            <div className={classes.allTeachersHeader}>
            <div>ID</div>
                <div>NAME</div>
                <div>Email</div>
                <div>Contact</div>
                <div>Qualification</div>
            </div>
            <div className={classes.teachersDetail}>
                <ul>
                    {teachers.map( teacher => 
                    <TeacherItem 
                        key={teacher.Teacher_ID}
                        id={teacher.Teacher_ID} 
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