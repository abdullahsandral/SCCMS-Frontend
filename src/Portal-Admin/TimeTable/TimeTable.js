import React, { useState, useEffect } from 'react';

import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import OD_TT from './OneDay-TT/OD_TT';
import classes from './TimeTable.module.css';

const TimeTable = props =>
{

    const DUMMY_CLASS_TIME_TABLE = [
        {Day_Name:'Monday', Lec_1:'', Lec_2:'', Lec_3:'', Lec_4:'', Lec_5:'', Lec_6:'', Lec_7:'',},
        {Day_Name:'Tuesday', Lec_1:'', Lec_2:'', Lec_3:'', Lec_4:'', Lec_5:'', Lec_6:'', Lec_7:'',},
        {Day_Name:'Wednesday', Lec_1:'', Lec_2:'', Lec_3:'', Lec_4:'', Lec_5:'', Lec_6:'', Lec_7:'',},
        {Day_Name:'Thursday', Lec_1:'', Lec_2:'', Lec_3:'', Lec_4:'', Lec_5:'', Lec_6:'', Lec_7:'',},
        {Day_Name:'Friday', Lec_1:'', Lec_2:'', Lec_3:'', Lec_4:'', Lec_5:'', Lec_6:'', Lec_7:'',},
    ]

    const classTimeTableData = {};
    const [selectedclass, setSelectedClass] = useState();
    const [classesList, setClassesList] = useState([]);
    const [classSubjects, setClassSubjects] = useState([]);
    const [classTimeTable, setClassTimeTable] = useState();
    
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const [overallState, setOverallState] = useState();
    
    const classHandler = e => setSelectedClass(e.target.value);
    
    const submitSubjectsList = async () =>
    {
        const data = []
        for(const oneDay in classTimeTableData)
        {
            const {L1, L2, L3, L4, L5, L6, L7} = classTimeTableData[oneDay].inputs;
            data.push({dayName: oneDay, lec1: L1.inputValue, lec2: L2.inputValue, lec3: L3.inputValue, lec4: L4.inputValue, lec5: L5.inputValue, lec6: L6.inputValue, lec7: L7.inputValue,})
        } 
    try 
    {   setEditing(true);
        const response = await fetch(`http://localhost:5000/api/admin/timetable`,
        {
            method :    'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(
                {
                    sClass: selectedclass,
                    timetable: data,
                })
        });
        const responseData = await response.json();
        
        if(!response.ok)
        {   setEditing(false);  
            setEditMode(false)
            alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
        }
        else
        {   
            if(responseData.classSubjects.length<=0)
            {alert(`This Class Does't Have Any Subject\nPlease Add A Subject First`); 
            setLoading(false);  return}

            if(responseData.classTimeTable.length<=0) { setClassTimeTable(DUMMY_CLASS_TIME_TABLE); setEditMode(true) }
            
            else setClassTimeTable(responseData.classTimeTable);
            setEditing(false); 
            setEditMode(false);
        }
    } catch (error) {      setEditing(false);  setEditMode(false); alert("OKKKKK   ..."+error)   }
    
    }

    const subjectStateHandler =  (state, day) => 
    {
        state.dayName = day;
        classTimeTableData[day] = state;
        for(const oneDay in classTimeTableData)
        {
            if(!classTimeTableData[oneDay].formIsValid) { setOverallState(false); return}
        } setOverallState(true)
    };

    const getClassTimeTable = async () =>
    {
        try 
        {   setLoading(true);
            const response = await fetch(`http://localhost:5000/api/admin/timetable/${selectedclass}`);
            
            const responseData = await response.json();
            
            if(!response.ok)
            {   setLoading(false);
                alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
            }
            else 
            {   
                if(responseData.classSubjects.length<=0)
                {alert(`This Class Does't Have Any Subject\nPlease Add A Subject First`); 
                setLoading(false);  return}

                if(responseData.classTimeTable.length<=0) { setClassTimeTable(DUMMY_CLASS_TIME_TABLE); setEditMode(true) }
                
                else setClassTimeTable(responseData.classTimeTable);
                
                setClassSubjects(responseData.classSubjects)
                setLoading(false);
            }
        } catch (error) {   setLoading(false); alert("OKKKKK ERRORRR ..."+error)   }
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
            <h2 style={{color:'gold'}}>{loading ? "Loading TimeTable..." : 'Updating TimeTable...'}</h2>
        </Backdrop>
    }
        <h3 style={{color:'gold'}}>Edit TimeTable of a Class</h3>
        <div className={classes.allForms}>
            {!classTimeTable && <>
                <label><b>Select A Class</b></label>
               
                <select value={selectedclass || ''} className= {classes.classSelecter} onChange={classHandler}>
                    <option value=''>Select A Class</option>
                    {classesList.map( cls => <option key={cls.Class_ID} value={cls.Class_ID}>{cls.Class_Name}</option>)}
                </select>
               
                <button onClick={getClassTimeTable} className={`btn ${!selectedclass ? 'btn-danger' : 'btn-success'}`} disabled={!selectedclass}>
                    {!selectedclass ? 'Select a Class to Edit' : `Edit ${selectedclass} Class Schedule`}
                </button> 
            </>}

            {classTimeTable && !editMode && <>
            {classTimeTable.map(oneDay => 
            <div className={classes.oneDaySchedule} key={oneDay.Day_Name}>
                <h4>{oneDay.Day_Name}</h4>
                <h5>{oneDay.Lec_1}</h5>    <h5>{oneDay.Lec_2}</h5>    <h5>{oneDay.Lec_3}</h5>    <h5>{oneDay.Lec_4}</h5>
                <h5>{oneDay.Lec_5}</h5>    <h5>{oneDay.Lec_6}</h5>    <h5>{oneDay.Lec_7}</h5>
            </div>
            )}    
            <div className={classes.BtnsDiv}>
                <button className='btn btn-secondary' 
                    onClick={ e => {setClassTimeTable(false);setEditMode(false)}}>
                    Back to Classes
                </button>
                <button className='btn btn-success' onClick={ e => setEditMode(true)}>Edit TimeTable</button>
            </div>
            </>}

            {classTimeTable && classSubjects && editMode && <>
                {classTimeTable.map(oneDay => 
                <OD_TT key={oneDay.Day_Name} 
                fState={subjectStateHandler} 
                oneDayData={oneDay}
                classSubjects={classSubjects}/>)}
    
    `           <div className={classes.BtnsDiv}>
                    <button className='btn btn-primary w-100' 
                        onClick={ e => setEditMode(false)}>
                        Back to Schedule
                    </button>
                    <button className={`btn w-100 ${!overallState ? 'btn-danger' : 'btn-success'}`} onClick={submitSubjectsList} disabled={!overallState }>
                            {`UPDATE ${selectedclass ? selectedclass : ''} Class Schedule`}
                    </button>
                </div>    
                </>}
            
        </div>
        
    </div>
    </>
}

export default TimeTable;