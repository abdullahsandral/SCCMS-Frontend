import React, { useEffect } from 'react';

import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , MAX_LENGTH_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from '../OneSubjectSchedule/OneSubjectSchedule.module.css';

const OD_TT = props =>
{ 
    const SID = props.SID;
    const fState = props.fState;
    const subjectData = props.subjectData;
    const viewMode = props.viewMode;

    let date, sTime, eTime;
    if(!subjectData.Exam_Date) date=false; else date = true;
    if(!subjectData.Exam_Start_Time) sTime=false; else sTime = true;
    if(!subjectData.Exam_End_Time) eTime=false; else eTime = true;

    const [formState , inputChangeHandler] = useForm({
        date : {
            inputValue : props.subjectData.Exam_Date ,
            inputisValid : date
        },
        startTime : {
            inputValue : props.subjectData.Exam_Start_Time,
            inputisValid : sTime
        },
        endTime : {
            inputValue : props.subjectData.Exam_End_Time,
            inputisValid : eTime
        },
    } , sTime && date && eTime)


    useEffect(() => { fState(formState,subjectData.Subject_Name,SID);},[fState,subjectData,formState,SID])

    return <>
        <form className={classes.OD_TT} onSubmit={e =>{ e.preventDefault(); console.log(formState);}}>
            <h5>{props.subjectData.Subject_Name}</h5>
            
            <DatePicker 
                    id="date" iValue = {formState.inputs.date.inputValue} 
                    Error='Please Select a Date' onDateChange = {inputChangeHandler}  
                    disabled={viewMode}
            />
            
            <Input  
                    id = "startTime" type = "Input" fieldType = 'text'  initialValue = {formState.inputs.startTime.inputValue}
                    pHolder = "Enter Start Time" isValid = {formState.inputs.startTime.inputisValid} 
                    Error = "Subject Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(3),MAX_LENGTH_VALIDATOR(15)]}  disabled={viewMode}
            /> 
            <Input  
                    id = "endTime" type = "Input" fieldType = 'text'  initialValue = {formState.inputs.endTime.inputValue}
                    pHolder = "Enter EndTime" isValid = {formState.inputs.endTime.inputisValid} 
                    Error = "Subject Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(3),MAX_LENGTH_VALIDATOR(15)]} disabled={viewMode} 
            />
        </form>
    </>
}

export default OD_TT;