import React, { useEffect, useState } from 'react';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import StudentItem from './StudentItem';
import classes from './Students.module.css';
import { Link } from 'react-router-dom';

const Students = props =>
{
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>
    {
       ( async () => 
       {
            try 
            {
                const response = await fetch('http://localhost:5000/api/admin/students');
                const data = await response.json();
                
                if(response.ok) 
                {setStudents(data);
                setLoading(false);}
                
                else    {setLoading(false); throw new Error(response)}
                
            } catch (error) { alert(error.message); setLoading(false);   }
       })()
    },[]);

    
    return <>
        <div className={classes.allStudents}>
            <div>
                <h3>Students</h3>
                <Link to='/addStudent'><button className='btn btn-success'>ADD STUDENT</button></Link>
            </div>

            {loading && <div className={classes.loading}> <Spinner /> <h3>Loading Students...</h3> </div>}
            
            {!loading && students.length<=0 && <h3>No Student Found</h3>   }
            {!loading && students.length>0 &&<>
            <div className={classes.allStudentsHeader}>
            <div>ID</div>
                <div>NAME</div>
                <div>Email</div>
                <div>Contact</div>
                <div>Class</div>
            </div>
            <div className={classes.studentsDetail}>
                <ul>
                    {students.map( student => 
                    <StudentItem
                        key={student.Student_ID} 
                        id={student.Student_ID} 
                        rollNo={student.Roll_Number} 
                        name={student.First_Name} 
                        email={student.E_Mail} 
                        contact={student.Contact_Number} 
                        class={student.Class_Name}/>)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default Students;