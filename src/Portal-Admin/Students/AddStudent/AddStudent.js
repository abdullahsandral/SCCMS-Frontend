import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, PH_NUMBER_VALIDATOR,CNIC_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from './AddStudent.module.css';

const EditStudent = props =>
{

    const [adding, setAdding] = useState(false)

    const history = useHistory();
    
    const [formState , inputChangeHandler] = useForm({
        rollNo : {
            inputValue : '',
            inputisValid : false
        },
        class : {
            inputValue : '',
            inputisValid : false
        },
        firstName : {
            inputValue : '',
            inputisValid : false
        },
        lastName : {
            inputValue : '',
            inputisValid : false
        },
        userImage : {
            inputValue : '',
            inputisValid : false
        },
        fatherName : {
            inputValue : '',
            inputisValid : false
        },
        CNIC : {
            inputValue : '',
            inputisValid : false
        },
        email : {
            inputValue : '',
            inputisValid : false
        },
        gender : {
            inputValue : '',
            inputisValid : false
        },
        sContact : {
            inputValue : '',
            inputisValid : false
        },
        pContact : {
            inputValue : '',
            inputisValid : false
        },
        DOB : {
            inputValue : 'Select DOB',
            inputisValid : false
        },
        pAddress : {
            inputValue : '',
            inputisValid : false
        },
        mAddress : {
            inputValue : '',
            inputisValid : false
        },
        userName : {
            inputValue : '',
            inputisValid : false
        },
        password : {
            inputValue : '',
            inputisValid : false
        },
    } , false)
    
    const addStudentHandler = async e =>
    {
        e.preventDefault();
        console.log(formState)
        const newStudentData = new FormData();
        newStudentData.append('rollNo', formState.inputs.rollNo.inputValue);
        newStudentData.append('firstName', formState.inputs.firstName.inputValue);
        newStudentData.append('lastName', formState.inputs.lastName.inputValue);
        newStudentData.append('fatherName', formState.inputs.fatherName.inputValue);
        newStudentData.append('CNIC', formState.inputs.CNIC.inputValue);
        newStudentData.append('sContact', formState.inputs.sContact.inputValue);
        newStudentData.append('pContact', formState.inputs.pContact.inputValue);
        newStudentData.append('email', formState.inputs.email.inputValue);
        newStudentData.append('gender', formState.inputs.gender.inputValue);
        newStudentData.append('pAddress', formState.inputs.pAddress.inputValue);
        newStudentData.append('mAddress', formState.inputs.mAddress.inputValue);
        newStudentData.append('newStudentImage', formState.inputs.userImage.inputValue)
        newStudentData.append('DOB', formState.inputs.DOB.inputValue);
        newStudentData.append('userName', formState.inputs.userName.inputValue);
        newStudentData.append('password', formState.inputs.password.inputValue);
        newStudentData.append('classID', formState.inputs.class.inputValue);

    try 
    {   setAdding(true);
        const response = await fetch(`http://localhost:5000/api/admin/students`,
        {
            method :    'POST',
            body   :     newStudentData
        });
        const responseData = await response.json();
        
        if(!response.ok)
        {
            history.push(`/students`);
            alert(responseData.errorCode+"\n"+responseData.errorMsg)
        }
        else
        {
            setAdding(false);
            // dispatchPlaceAdded({ type : 'NEW_PLACE_ADDED'})
            history.push(`/students`)
            // return
        }
    } catch (error) {   setAdding(false);     alert(error)   }
}

    return <>
        <div className={classes.editStudent}>
        {adding && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Adding Student...</h2>
        </Backdrop>
        }
            <h3>Add Student</h3>
            <form onSubmit={addStudentHandler}>
                <div> <Input  
                    id = "rollNo" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Roll Number"
                    Error = "Roll No Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(15)]} 
                /></div>
                <div className= {classes.classSelecter}>
                    <select onChange={e => inputChangeHandler('class',e.target.value,!!e.target.value)}>
                        <option value=''>Select A Class</option>
                        <option value={'C-6'}>6th</option>
                        <option value={'C-7'}>7th</option>
                        <option value={'C-8'}>8th</option>
                        <option value={'C-9'}>9th</option>
                        <option value={'C-10'}>10th</option>
                    </select> 
                </div>
                <div> <Input  
                    id = "firstName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's First Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div> <Input  
                    id = "lastName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Last Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 20 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(20)]} 
                /></div>
                <div  className={classes.image}><ImageInput 
                    id='userImage' Error = "Please Pick an Image" height = '200px' maxSize = {3}
                    onInputChange = {inputChangeHandler}
                /></div>
                <div className={classes.fatherName}><Input  
                    id = "fatherName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Father Name"
                    Error = "Please Enter a Name With MAX LENGTH Of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div><Input  
                    id = "CNIC" type = "Input" fieldType = 'text'
                    pHolder = "CNIC No : XXXXX-XXXXXXX-X" max={15} min={15}
                    Error = "Please Enter a Valid CNIC e.g XXXXX-XXXXXXX-X " onInputChange = {inputChangeHandler}
                    validators = {[CNIC_VALIDATOR()]} 
                /></div>
                <div className={classes.email}><Input  
                    id = "email" type = "Input" fieldType = 'email' 
                    pHolder = "Enter Email Address"
                    Error = "Please Enter a Valid Email" onInputChange = {inputChangeHandler}
                    validators = {[EMAIL_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "sContact" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Mobile" max={12} min={12}
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "pContact" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Parent's Mobile"  max={12} min={12}
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR()]} 
                /></div>
                
                <DatePicker 
                    id='DOB'
                    Error='Select DOB'
                    onDateChange={inputChangeHandler} 
                />
                
                <div className={classes.pContact}> <Input  
                    id = "pAddress" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Permanent Address"
                    Error = "Please Enter Permanent Address With MAX LENGTH Of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.mContact}> <Input  
                    id = "mAddress" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Mailing Address"
                    Error = "Please Enter Mailing Address With MAX LENGTH Of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div> <Input  
                    id = "userName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Username"
                    Error = "Please Enter a Valid Username" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div> <Input  
                    id = "password" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Password"
                    Error = "Please Enter a Password Including Special Small and Capital Word MIN=8" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.gender} onChange={e => inputChangeHandler('gender',e.target.value, true)}> 
                    <b>Gender :</b>
                    <input type='radio' value='Male' name='gender' /> Male
                    <input type='radio' value='Female' name='gender' /> Female
                </div>
                <button  className = {`btn ${formState.formIsValid ? 'btn-success' : 'btn-danger'}`} disabled={!formState.formIsValid}>
                ADD Student
                </button>
            </form>
        </div>
    </>
}

export default EditStudent;