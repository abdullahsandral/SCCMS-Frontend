import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {AuthContext} from '../../Shared/Contexts/Authentication-Context';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import classes from './StudentProfile.module.css';

const StudentProfile = props =>
{
    const [student, setStudent] = useState();
    const [loading, setLoading] = useState(true);
 
    const id = useContext(AuthContext).userId
    const history = useHistory();

    useEffect( () =>
    {
       const getStudentData =  async () => 
       {
        try 
        {
            const response = await fetch(`http://localhost:5000/api/student/${id}`);
            const data = await response.json();
            
            if(response.ok)     {setStudent(data[0]);setLoading(false)}
            
            else  setLoading(false)
                
        } catch (error) { setLoading(false); alert(error.message);  }
           
       }
       getStudentData();
    },[history,id])
    
    if(loading) return <div className={classes.studentProfile}>
        <div className={classes.loading}>
            <Spinner />
            <h3>Loading Profile Data...</h3> 
        </div>
        </div> 
    else 
    return <>
    {!student && <div className={classes.studentProfile}> <div className={classes.loading}> <h3>No Student Exist Against This ID</h3> </div> </div> }
    {student && 
    <div className={classes.studentProfile}>
        <div className={classes.studentData}>
            <div className={classes.profileImge}>
                <img src={`http://localhost:5000/uploads/images/${student.Student_Image}`} alt='Profile'/>
                <h4 className="text-center my-3">{student.First_Name} {student.Last_Name}</h4>
            </div>
            <div> <b>Roll Number : </b> {student.Roll_Number} </div>
            <div> <b>Class : </b> {student.Class_Name} </div>
            <div> <b>Father Name : </b> {student.Father_Name} </div>
            <div> <b>Date of Birth : </b> {student.Date_Of_Birth} </div>
            <div> <b>CNIC : </b> {student.CNIC_Number} </div>
            <div> <b>Contact Number : </b>{student.Contact_Number} </div>
            <div> <b>Parent Contact : </b> {student.Father_Contact} </div>
            <div> <b>E-Mail : </b> {student.E_Mail} </div>
            <div className={classes.pAddress}> <b>Permanant Address : </b> {student.Permanent_Address} </div>
            <div className={classes.mAddress}> <b>Mailing Address : </b> {student.Mailing_Address} </div>
            <div> <b>Gender : </b> {student.Gender} </div>       
        </div>
   
    </div>
    }
    </>
}

export default StudentProfile;