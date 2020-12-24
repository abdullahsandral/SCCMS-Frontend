import React, { useEffect, useState, useContext } from 'react';

import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import {AuthContext} from '../../Shared/Contexts/Authentication-Context';
import classes from './ViewAttendance.module.css';

const ViewAttendance = props =>
{
    const [attendanceData, setAttendanceData] = useState({subjects:[], attendance: []});
    const [attendance, setAttendance] = useState();
    const [showSubject, setShowSubject] = useState(true);

    const [loading, setLoading] = useState(true);

    const id = useContext(AuthContext).userId

    const subjectAttendanceHandler = (id,sName) =>
    {
        const sAttendance = attendanceData.attendance.filter(atdnce => atdnce.Subject_ID === id);
        setAttendance({attendance: sAttendance, subjectName: sName});
        setShowSubject(false);
    }

    const calculateAttendance = () =>
    {   const atdnce = attendance.attendance;
        const attended = atdnce.filter( a => !!a.Attendance_Status).length;
        return `${attended} / ${atdnce.length} (${((attended/atdnce.length)*100).toFixed(2)}%)`
    }

    useEffect(() =>
    {
        const getAttendance = async () =>
        {
            try
            {
                const response = await fetch(`http://localhost:5000/api/student/attendance/${id}`);
                const data = await response.json();
                
                if(!response.ok)    alert(data.errorCode+"\n"+data.errorMsg)
                
                else    setAttendanceData(data)
            }   catch (error) { alert(error.message);  }
            
            setLoading(false)
        }; getAttendance();
    },[id])

    return <> 
    <div className={classes.studentAttendance}>
    {loading && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Loading Subjects and Attendance Data...</h2>
        </Backdrop>
    }
        {showSubject && !loading && <>
        {attendanceData.subjects.length<=0 ? <h3>No Subject Found </h3> :
        <div className={classes.subjects}>
        <h3><span>Select a Subject to View Attendance</span></h3>
            <ol>
                {attendanceData.subjects.map( subject =>
                <li key={subject.Subject_ID} onClick={() => subjectAttendanceHandler(subject.Subject_ID,subject.Subject_Name)}>
                    {subject.Subject_Name}
                </li>)}
            </ol>
        </div>}
        </>
        } 
        
        {!showSubject && !loading &&
        <div className={classes.attendance}> 
            <h3><span>Subject</span> : {attendance.subjectName}</h3>
            <h3><span>Attendance Percentange</span> : {calculateAttendance()}</h3>
           
            <h4>Sr No</h4>   <h4>Date</h4>   <h4>Attendance Status</h4>

            {attendance.attendance.map((s,i)=> 
            <div key={s.Attendance_ID}>
                <h5>{i+1}</h5>
                <h5>{s.Attendance_Date}</h5>
                <input type='checkbox' readOnly={true} checked={s.Attendance_Status}/>
            </div>
        )}
        <button className='btn btn-success' onClick={() => setShowSubject(true)}>BACK 2 SUBJECTS</button>
        </div>}
    </div>
    </>
}

export default ViewAttendance;