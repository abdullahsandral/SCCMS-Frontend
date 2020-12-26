import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {AuthContext} from '../../Shared/Contexts/Authentication-Context';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import classes from './TeacherProfile.module.css';

const TeacherProfile = props =>
{
    const [teacher, setTeacher] = useState();
    const [loading, setLoading] = useState(true);
    
    const id = useContext(AuthContext).userId
    const history = useHistory();

    useEffect( () =>
    {
       const getTeacherData =  async () => 
       {
        try 
        {
            const response = await fetch(`http://localhost:5000/api/teacher/${id}`);
            const data = await response.json();
            
            if(response.ok)     {setTeacher(data);}
            
            else                 setLoading(false)
                
        } catch (error) { alert(error.message);  }
            setLoading(false)
       }
       getTeacherData();
    },[history,id])
    
    if(loading) return <div className={classes.teacherProfile}>
        <div className={classes.loading}>
            <Spinner />
            <h3>Loading Profile Data...</h3> 
        </div>
        </div> 
    else 
    return <>
    {!teacher && <div className={classes.teacherProfile}> <div className={classes.loading}> <h3>No Teacher Exist Against This ID</h3> </div> </div> }
    {teacher && 
    <div className={classes.teacherProfile}>
        <div className={classes.teacherData}>
            <div className={classes.profileImge}>
                <img src={`http://localhost:5000/uploads/images/${teacher.Teacher_Image}`} alt='Profile'/>
                <h4 className="text-center my-3">{teacher.First_Name} {teacher.Last_Name}</h4>
            </div>
            <div> <b>CNIC : </b> {teacher.CNIC_Number} </div>
            <div> <b>Father Name : </b> {teacher.Father_Name} </div>
            <div> <b>Qualification : </b> {teacher.Qualification} </div>
            <div> <b>Date of Birth : </b> {teacher.Date_Of_Birth} </div>
            <div> <b>Contact Number : </b>{teacher.Contact_Number} </div>
            <div> <b>E-Mail : </b> {teacher.E_Mail} </div>
            <div className={classes.pAddress}> <b>Permanant Address : </b> {teacher.Permanent_Address} </div>
            <div className={classes.mAddress}> <b>Mailing Address : </b> {teacher.Mailing_Address} </div>
            <div> <b>Gender : </b> {teacher.Gender} </div>       
        </div>
    </div>
    }
    </>
}

export default TeacherProfile;