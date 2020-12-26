import React, { useState } from 'react';

import classes from './StudentsList.module.css';

const StudentsList = props =>
{
    const {students,attendance,date,subject,classID} = props

    let filteredStudent = students.filter(v => v.Class_ID === classID);
    const studentList = {};
    for(const s of filteredStudent) 
    {studentList[s.Student_ID] = {studentID: s.Student_ID, attendanceStatus: true}}

    for(const att of attendance) 
    { studentList[att.Student_ID].attendanceStatus = att.Attendance_Status}

    const [attendanceState, setAttendaneState] = useState(studentList);

    const attendanceStateHandler = id =>
    {
        const pState = {...attendanceState};
        pState[id].attendanceStatus = !pState[id].attendanceStatus
        setAttendaneState(pState)   
    }

    const submitAttendanceHandler = async () =>
    {
        const attendanceData=[];
        for(const oneStudent in attendanceState) {attendanceData.push(attendanceState[oneStudent])}

        try 
        {  const method = attendance.length<=0 ? 'POST' : 'PATCH'
            const response = await fetch(`http://localhost:5000/api/teacher/markAttendance`,
            {
                method :    method,
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    {
                        attendanceData: attendanceData,
                        classID: classID,
                        subjectID: subject.subjectID,
                        date: date,
                    })
            });
            const responseData = await response.json();
            
            if(!response.ok)
            {
                alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
            }
            else
            {
                props.selectSubject();
            }
        } catch (error) { alert("OKKKKK ERRORRR ..."+error)   }
    }

    
    return <>
    <div className={classes.btnsDiv}>
    <h3>Subject : {props.subject.subjectName}</h3>
    <h3>Date : {props.date}</h3>
    </div>
    <div className={classes.studentsDiv}>
        <h4>Roll No</h4>   <h4>Student Name</h4>   <h4>Attendance Status</h4>
    </div>
    {filteredStudent.map(s => 
    <div key={s.Student_ID} className={classes.studentsDiv}>
        <h5>{s.Roll_Number}</h5>
        <h5>{s.First_Name+' '+s.Last_Name}</h5>
        <input type='checkbox' checked={attendanceState[s.Student_ID].attendanceStatus}
        onChange={()=>attendanceStateHandler(s.Student_ID)} />
    </div>
     )}
    <div className={classes.btnsDiv}>
        <button onClick={props.selectSubject} className='btn btn-success'>Back To Subjects</button>
        <button onClick={submitAttendanceHandler} className='btn btn-primary'>
            {`${attendance.length<=0 ? 'Mark' : 'Update'}`} Attendance
        </button>
    </div>
    </>
}

export default StudentsList;
