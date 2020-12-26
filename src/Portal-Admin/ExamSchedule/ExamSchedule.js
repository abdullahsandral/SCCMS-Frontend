import React, { useState, useEffect } from 'react';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import OneSubjectSchedule from './OneSubjectSchedule/OneSubjectSchedule';
import classes from './ExamSchedule.module.css';

const ExamSchedule = props =>
{ 
    const subjectsData = {};

    const [classesList, setClassesList] = useState([]);
    const [subjects, setSubjects] = useState();
    const [selectedclass, setSelectedClass] = useState();

    const [editMode, setEditMode] = useState(false);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState();

    const [overallState, setOverallState] = useState();
   
    const classHandler = e => setSelectedClass(e.target.value);
    
    const submitSchedule = async () =>
    {
        const data = []
        for(const oneSubject in subjectsData)
        {
            const {Subject_ID} = subjectsData[oneSubject];
            const {date,startTime,endTime} = subjectsData[oneSubject].inputs;
            data.push({sID: Subject_ID,date:date.inputValue,startTime: startTime.inputValue,endTime: endTime.inputValue});
        } 
        try 
            {   setEditing(true);
                const response = await fetch(`http://localhost:5000/api/admin/subjects/examSchedule/${selectedclass}`,
                {
                    method :    'POST',
                    headers: { 'Content-Type' : 'application/json'},
                    body: JSON.stringify(
                        {
                            sClass: selectedclass,
                            subjects: data,
                        })
                });
                const responseData = await response.json();
                
                if(!response.ok)
                {
                    setEditing(false);
                    setEditMode(false)
                    alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
                }
                else
                {
                    setSubjects(responseData);
                    setEditMode(false);
                    setEditing(false);
                }
            } catch (error) {   setEditing(false);  setEditMode(false); alert("OKKKKK ERRORRR ..."+error)   }
            
    }

    const subjectStateHandler =  (state, subject,sid) => 
    {
        state.Subject_ID = sid;
        subjectsData[subject] = state;
        for(const oneSubject in subjectsData)
        {
            if(!subjectsData[oneSubject].formIsValid) { setOverallState(false); return}
        } setOverallState(true)
    };

    const getClassSchedule = async () =>
    {
        try 
        {setLoading(true);
            const response = await fetch(`http://localhost:5000/api/admin/subjects/examSchedule/${selectedclass}`);
            const data = await response.json();
            
            if(response.ok) 
            {   
                if(data.length<=0)
                {alert(`This Class Does't Have Any Subject\nPlease Add A Subject First`); setLoading(false);  return}
                setSubjects(data);  
                setLoading(false);
            }
            
            else    {setLoading(false); throw new Error(response)}
            
        } catch (error) { alert(error.message); setLoading(false);   }
    }
   
    useEffect(()=>
    {
        const getAllClasses = async () =>
        {
            try 
            {   setLoading(true);
                const response = await fetch(`http://localhost:5000/api/shared/classes`);
                
                const responseData = await response.json();
                
                if(!response.ok)
                {   
                    alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
                }
                else
                {   
                    setClassesList(responseData);
                }
            } catch (error) { alert("OKKKKK ERRORRR ..."+error)   }
            setLoading(false);
        };  getAllClasses();
    },[])

return <>
    <div className={classes.timeTable}>
    {(loading || editing) && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>{loading ? "Loading Exam Schedule..." : 'Updating Exam Schedule...'}</h2>
        </Backdrop>
    }
        <h3  style={{color:'gold'}}>Edit Exam Schedule of a Class</h3>
        <div className={classes.allForms}>
            {!subjects &&<>
                <label><b>Select A Class</b></label>
                
                <select className= {classes.classSelecter} onChange={classHandler}>
                    <option value=''>Select A Class</option>
                    {classesList.map( cls => <option key={cls.Class_ID} value={cls.Class_ID}>{cls.Class_Name}</option>)}
                </select>
               
                    <button onClick={getClassSchedule} className={`btn ${!selectedclass ? 'btn-danger' : 'btn-success'}`} disabled={!selectedclass}>
                        {!selectedclass ? 'Select a Class to Edit' : `Edit ${selectedclass} Class Schedule`}
                    </button> 
            </>}
                        
            {subjects && !editMode && <>
                {subjects.map(subject => 
                <div key={subject.Subject_ID} className={classes.eSchedule}>
                    <h4>{subject.Subject_Name}</h4>
                    <h5>{subject.Exam_Date ? subject.Exam_Date : '_ _ : _ _'}</h5>
                    <h5>{subject.Exam_Start_Time ? subject.Exam_Start_Time : '_ _ : _ _'}</h5>
                    <h5>TO</h5>
                    <h5>{subject.Exam_End_Time ? subject.Exam_End_Time : '_ _ : _ _'}</h5>
                </div>)}

            <div className={classes.BtnsDiv}>
                <button className='btn btn-secondary' onClick={ e => {setSelectedClass(false);setSubjects(false);setEditMode(false)}}>
                    Back to Classes
                </button>
                <button className='btn btn-success' onClick={ e => setEditMode(true)}>Edit Exam Schedule</button>
            </div>
            </>}

            {subjects && editMode &&<> 
                {subjects.map(subject => 
                <OneSubjectSchedule 
                key={subject.Subject_ID} 
                SID={subject.Subject_ID} 
                fState={subjectStateHandler}
                subjectData={subject}/>)}
            <div className={classes.BtnsDiv}>
                <button className='btn btn-primary w-100' onClick={ e => setEditMode(false)}>
                    Back to Subjects
                </button>
                <button className={`btn ${!overallState ? 'btn-danger' : 'btn-success'}`} onClick={submitSchedule} disabled={!overallState }>
                    {`UPDATE ${selectedclass ? selectedclass : ''} Class Exam Schedule`}
                </button>
            </div>
            </>}
        </div>
        
    </div>
    </>
}

export default ExamSchedule;