import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import ShowAllSubjects from './ShowAllSubjects/ShowAllSubjects';
import EditSubject from './EditSubject/EditSubject';
import classes from './AddSubjects.module.css';

const ExamSchedule = props =>
{
    const classSubjectsData = {};
    const [classesList, setClassesList] = useState([]);
    const [teachersList, setTeachersList] = useState([]);
    const [subjects, setSubjects] = useState();

    const [selectedclass, setSelectedClass] = useState();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const [overallState, setOverallState] = useState();
    
    const classHandler = e => { setSelectedClass(e.target.value)};
    
    const submitSubjectsList = async () =>
    {
        const data = []
        for(const oneSubject in classSubjectsData)
        {
            const sCode = classSubjectsData[oneSubject].inputs.subjectCode.inputValue;
            const sName = classSubjectsData[oneSubject].inputs.subjectName.inputValue;
            const sTeacher = classSubjectsData[oneSubject].inputs.subjectTeacher.inputValue;
            data.push({subjectCode: sCode, subjectName: sName, subjectTeacher: sTeacher});
        } 
    try 
    {   setEditing(true);
        const response = await fetch(`http://localhost:5000/api/admin/subjects`,
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
            setEditMode(false);            setEditing(false);            setSubjects(false);
            alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
        }
        else
        {
            setSubjects(responseData);            setEditMode(false);            setEditing(false)
        }
    } catch (error) { setEditing(false);    setEditMode(false);     alert("OKKKKK ERRORRR ..."+error)   }
    
    }

    const subjectStateHandler =  (state, sid) => 
    {
        classSubjectsData[sid] = state;
        for(const oneSubject in classSubjectsData)
        {
            if(!classSubjectsData[oneSubject].formIsValid) { setOverallState(false); return}
        } setOverallState(true)
    };

    const addSubjectHandler = (type,idd) =>
    {
        const id = uuid();
        const newSub = {Subject_ID: id, Subject_Code:'', Subject_Name: '', Teacher_ID: ''};
        const currentState = [...subjects];
        if(type==='add') currentState.push(newSub);
        else if(type==='delete')
        {
            const obj = currentState.find( sub => sub.Subject_ID === idd)
            currentState.splice(currentState.indexOf(obj),1);
        } 
        currentState.length<=0 && setOverallState(true);
        setSubjects(currentState);
    }    

    const getClassSubjects = async () =>
    {
        try 
        {   setLoading(true);
            const response = await fetch(`http://localhost:5000/api/admin/subjects/${selectedclass}`);
            
            const responseData = await response.json();
            
            if(!response.ok)
            {   setLoading(false);
                alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
            }
            else
            {   
                responseData.length<=0 && setOverallState(true);
                setLoading(false);
                setSubjects(responseData);
            }
        } catch (error) {   setLoading(false); alert("OKKKKK ERRORRR ..."+error)   }
    }

    useEffect(()=>
    {
        const getAllClasses = async () =>
        {
            try 
            {   setLoading(true);
                const response = await fetch(`http://localhost:5000/api/admin/subjects/classesANDteachers`);
                
                const responseData = await response.json();
                
                if(!response.ok)
                {   
                    alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
                }
                else
                {   
                    setTeachersList(responseData.teachers)
                    setClassesList(responseData.classes);
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
            <h2 style={{color:'gold'}}>{loading ? "Loading Subjects..." : 'Updating Subjects...'}</h2>
        </Backdrop>
    }
        <h3 style={{color:'gold'}}>Edit Subjects of a Class</h3>
        <div className={classes.allForms}>
            {!subjects &&<>
                <label><b>Select A Class</b></label>
                
                <select className= {classes.classSelecter} value={selectedclass || ''} onChange={classHandler}>
                    <option value=''>Select A Class</option>
                    {classesList.map( cls => <option key={cls.Class_ID} value={cls.Class_ID}>{cls.Class_Name}</option>)}
                </select>
                
                    <button onClick={getClassSubjects} className={`btn ${!selectedclass ? 'btn-danger' : 'btn-success'}`} disabled={!selectedclass}>
                        {!selectedclass ? 'Select a Class to Edit' : `Edit ${selectedclass} Class Schedule`}
                    </button> 
            </>}

            {subjects && !editMode &&
            <div className={classes.subjectsPreview}>
                <ShowAllSubjects subjects={subjects} />
                <button className='btn btn-secondary' 
                onClick={ e => {setSubjects(false);setEditMode(false)}}>
                Back to Classes </button>
                <button className='btn btn-success' onClick={ e => setEditMode(true)}>Edit Subjects</button>
            </div>
            }            
            
            {subjects && editMode && <>
                {subjects.map(subject => 
                <EditSubject key={subject.Subject_ID} 
                id={subject.Subject_ID}  
                fState={subjectStateHandler} 
                subjectData={subject}
                teachersList = {teachersList}
                subjectDelete = {addSubjectHandler}/>)}
                
                <div className='d-flex justify-content-between'>
                    <button onClick={() => addSubjectHandler('add')} className={classes.addBtn}>ADD SUBJECT</button>
                    {/* <button onClick={() => addSubjectHandler('delete')} className={classes.deleteBtn}>DELETE SUBJECT</button> */}
                </div>
                <div className={classes.BtnsDiv}>
                    <button className='btn btn-primary w-100' 
                        onClick={ e => {getClassSubjects();setEditMode(false);}}>
                        Back to Subjects
                    </button>
                    <button className={`btn w-100 ${!overallState ? 'btn-danger' : 'btn-success'}`} onClick={submitSubjectsList} disabled={!overallState }>
                        {`UPDATE ${selectedclass ? selectedclass : ''} Class Subjects`}
                    </button>
                </div>
            </>}
            
        </div>
        
    </div>
    </>
}

export default ExamSchedule;