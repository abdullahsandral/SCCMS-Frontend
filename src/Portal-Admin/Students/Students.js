import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import StudentItem from './StudentItem';
import classes from './Students.module.css';
import { getAllStudents } from '../../Actions/StudentsActions'
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

const Students = props =>
{
    const dispatch = useDispatch();
    const { students, students_loading } = useSelector( state => state?.students );
    
    useEffect( () =>
    {
        dispatch(getAllStudents());
    },[dispatch]);

    return <>
        <div className={classes.allStudents}>
            <div>
                <h3>Students</h3>
                <Link to='/addStudent'><button className='btn btn-success'>ADD STUDENT</button></Link>
            </div>
           
            {(students_loading || (!students_loading && students === null)) && 
                <div className={classes.loading}>
                    <Spinner />
                    <h3 style={{color:'gold'}}>Loading Students...</h3>
                </div>
            }

            {!students_loading && isEmpty(students) && students !== null && <h3 style={{color:'gold'}}>No Student Found</h3>   }

            {!students_loading && !isEmpty(students) && <>
            <div className={classes.allStudentsHeader}>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>Contact</div>
                <div>Class</div>
            </div>
            <div className={classes.studentsDetail}>
                <ul>
                    {students?.map( student => 
                    <StudentItem 
                        key={student.id}
                        id={student.id}
                        name={student.first_name} 
                        email={student.email} 
                        contact={student.contact_number} 
                        class={student.class}
                    />)}
                </ul>
            </div></>
            }
        </div>
    </>
}

export default Students;

// import React, { useEffect, useState } from 'react';

// import Spinner from '../../Shared/Components/UI Element/Spinner';
// import StudentItem from './StudentItem';
// import classes from './Students.module.css';
// import { Link } from 'react-router-dom';

// const Students = props =>
// {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect( ()=>
//     {
//        ( async () => 
//        {
//             try 
//             {
//                 const response = await fetch('http://localhost:5000/api/admin/students');
//                 const data = await response.json();
                
//                 if(response.ok) 
//                 {setStudents(data);
//                 setLoading(false);}
                
//                 else    {setLoading(false); throw new Error(response)}
                
//             } catch (error) { alert(error.message); setLoading(false);   }
//        })()
//     },[]);

    
//     return <>
//         <div className={classes.allStudents}>
//             <div>
//                 <h3>Students</h3>
//                 <Link to='/addStudent'><button className='btn btn-success'>ADD STUDENT</button></Link>
//             </div>

//             {loading && <div className={classes.loading}> <Spinner /> <h3>Loading Students...</h3> </div>}
            
//             {!loading && students.length<=0 && <h3>No Student Found</h3>   }
//             {!loading && students.length>0 &&<>
//             <div className={classes.allStudentsHeader}>
//             <div>ID</div>
//                 <div>NAME</div>
//                 <div>Email</div>
//                 <div>Contact</div>
//                 <div>Class</div>
//             </div>
//             <div className={classes.studentsDetail}>
//                 <ul>
//                     {students.map( student => 
//                     <StudentItem
//                         key={student.Student_ID} 
//                         id={student.Student_ID} 
//                         rollNo={student.Roll_Number} 
//                         name={student.First_Name} 
//                         email={student.E_Mail} 
//                         contact={student.Contact_Number} 
//                         class={student.Class_Name}/>)}
//                 </ul>
//             </div></>
//             }
//         </div>
//     </>
// }

// export default Students;