import React, { useEffect } from 'react';

import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , MAX_LENGTH_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from './EditSubject.module.css';

const EditSubject = props =>
{
    const {teachersList,fState,id} = props
    const {Subject_Code, Subject_Name, Teacher_ID} = props.subjectData;

    const [formState , inputChangeHandler] = useForm({
        subjectCode : {
            inputValue : Subject_Code,
            inputisValid : Subject_Code.trim().length!==0
        },
        subjectName : {
            inputValue : Subject_Name,
            inputisValid : Subject_Name.trim().length!==0
        },
        subjectTeacher : {
            inputValue : Teacher_ID || '',
            inputisValid :  !!Teacher_ID
        }
    } ,Subject_Code.trim().length!==0 && Subject_Name.trim().length!==0 && !!Teacher_ID)


    useEffect(() => { fState(formState,`S${id}`);},[formState,fState,id])

    const {inputValue} = formState.inputs.subjectTeacher
    useEffect(()=> inputChangeHandler('subjectTeacher',inputValue,!!inputValue),[inputValue,inputChangeHandler])
    
    return <>
    
        <form className={classes.OD_TT} onSubmit={e =>{ e.preventDefault(); console.log(formState);}}>
            <Input  
                id = "subjectCode" type = "Input" fieldType = 'text' initialValue = {formState.inputs.subjectCode.inputValue}
                pHolder = "Enter Subject Unique Code" isValid = {formState.inputs.subjectCode.inputisValid} 
                Error = "Subject Field is Required with MAXIMUM LENGTH of 39 Words" onInputChange = {inputChangeHandler}
                validators = {[MIN_LENGTH_VALIDATOR(3),MAX_LENGTH_VALIDATOR(39)]} 
            />
            
            <select value={formState.inputs.subjectTeacher.inputValue}
                    onChange={e => inputChangeHandler('subjectTeacher',e.target.value,!!e.target.value)}>
                    <option value=''>Select A Teacher</option>
                    {teachersList.map( t => <option key={t.Teacher_ID} value={t.Teacher_ID}>{t.First_Name + ' ' + t.Last_Name}</option>)}
            </select>
            
            <Input  
                id = "subjectName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.subjectName.inputValue}
                pHolder = "Enter Subject Name" isValid = {formState.inputs.subjectName.inputisValid} 
                Error = "Subject Field is Required with MAXIMUM LENGTH of 39 Words" onInputChange = {inputChangeHandler}
                validators = {[MIN_LENGTH_VALIDATOR(3),MAX_LENGTH_VALIDATOR(39)]} 
            />
            <button onClick={()=>props.subjectDelete('delete',id)}>DELETE SUBJECT</button>
        </form>
    </>
}

export default EditSubject;