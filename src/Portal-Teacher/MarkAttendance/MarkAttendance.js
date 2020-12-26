import React, { useState, useEffect, useContext } from 'react';

import StudentsList from './StudentsList/StudentsList';
import {AuthContext} from '../../Shared/Contexts/Authentication-Context';
import DatePicker from '../../Shared/Components/UI Element/DatePicker';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import classes from './MarkAttendance.module.css';

const MarkAttendance = props =>
{
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedClass, setSelectedClass] = useState();
    const [studentsList,setStudentsList] = useState([]);

    const [loadingData, setLoadingData] = useState();
    const [markAttendance, setMarkAttendance] = useState();

    const tID = useContext(AuthContext).userId;
    
    const subjectSelecterHandler = e =>
    {
        const sub = e.target.value;
        for(const subject of attendanceData.subjects) 
        if(subject.Subject_ID.toString() === sub) 
        { 
            setSelectedClass(subject.Class_ID); 
            setSelectedSubject({subjectID:subject.Subject_ID.toString(), subjectName: subject.Subject_Name})
            return
        }
    }
    const getSubjectAttendance = async () =>
    {
        try 
            {  
                const response = await fetch(`http://localhost:5000/api/teacher/getAttendance`,
                {
                    method :    'POST',
                    headers: { 'Content-Type' : 'application/json'},
                    body: JSON.stringify(
                        {
                            classID: selectedClass,
                            subjectID: selectedSubject.subjectID,
                            date: selectedDate,
                        })
                });
                const responseData = await response.json();
                
                if(!response.ok)
                {
                    alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
                }
                else if(responseData.length>=0)
                {
                    const AttendanceData = {...attendanceData};
                    AttendanceData.subjectAttendance = responseData;
                    setAttendanceData(AttendanceData);
                    setMarkAttendance(true)
                }
            } catch (error) { alert("OKKKKK ERRORRR ..."+error)   }
    }
    useEffect(()=>
    {
        const getTeacherSubjects = async () =>
        {
            try 
            {   setLoadingData(true);
                const response = await fetch(`http://localhost:5000/api/teacher/subjects/${tID}`);
                
                const responseData = await response.json();
                
                if(!response.ok)
                {   
                    alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
                }
                else
                {  
                    setAttendanceData(responseData);
                    setStudentsList(responseData.students)
                }
            } catch (error) { alert("OKKKKK ERRORRR ..."+error)   }
            setLoadingData(false);
        }; getTeacherSubjects();
    },[tID])

    return <>
    <div className={classes.attendancePage}>
    {loadingData && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Loading Teacher's Subjects...</h2>
        </Backdrop>
    }
        <div className={classes.subjectSelecterForm}>
            {attendanceData.subjects && !markAttendance && <>
                <label><b>Select A Subject</b></label>
                
                <select className= {classes.subjectSelecter} value={selectedSubject ? selectedSubject.subjectID : ''}  
                onChange={subjectSelecterHandler}>
                    <option value=''>Select A Subject</option>
                    {attendanceData.subjects.map( sub => 
                    <option key={sub.Subject_ID} value={sub.Subject_ID}>{sub.Subject_Name}</option>)}
                </select>

                <label><b>Select Attendance Date</b></label>
                <DatePicker 
                    id='Select a Date'
                    iValue={selectedDate}
                    Error='Select a Date'
                    onDateChange={(id,v,valid) => setSelectedDate(v)} 
                />

                    <button onClick={getSubjectAttendance} 
                    className={`btn ${!selectedSubject || !selectedDate ? 'btn-danger' : 'btn-success'}`} 
                    disabled={!selectedSubject || !selectedDate}>
                    {(!selectedSubject || !selectedDate)? 'Select a Subject and Date to Mark Attendance' : `Mark ${selectedSubject.subjectName} Attendance`}
                    </button> 
            </>}
            
            {studentsList && markAttendance && 
            <StudentsList 
            students={attendanceData.students} 
            attendance = {attendanceData.subjectAttendance}
            date={selectedDate} 
            subject={selectedSubject} 
            classID={selectedClass}
            selectSubject={()=>setMarkAttendance(false)} />}
        </div>
    </div>
    </>
}

export default MarkAttendance;