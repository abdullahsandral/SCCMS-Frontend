import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, PH_NUMBER_VALIDATOR, CNIC_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from './AddTeacher.module.css';
import 'react-calendar/dist/Calendar.css';

const EditTeacher = props =>
{

    const [adding, setAdding] = useState(false)
    const history = useHistory();

    const [formState , inputChangeHandler] = useForm({
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
        Contact : {
            inputValue : '',
            inputisValid : false
        },
        DOB : {
            inputValue : 'Select DOB',
            inputisValid : false
        },
        email : {
            inputValue : '',
            inputisValid : false
        },
        qualification : {
            inputValue : '',
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
        gender : {
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
    
    const addTeacherHandler = async e =>
    {
        e.preventDefault();
      
        const newTeacherData = new FormData();
        newTeacherData.append('firstName', formState.inputs.firstName.inputValue);
        newTeacherData.append('lastName', formState.inputs.lastName.inputValue);
        newTeacherData.append('fatherName', formState.inputs.fatherName.inputValue);
        newTeacherData.append('CNIC', formState.inputs.CNIC.inputValue);
        newTeacherData.append('Contact', formState.inputs.Contact.inputValue);
        newTeacherData.append('DOB', formState.inputs.DOB.inputValue);
        newTeacherData.append('email', formState.inputs.email.inputValue);
        newTeacherData.append('qualification', formState.inputs.qualification.inputValue);
        newTeacherData.append('pAddress', formState.inputs.pAddress.inputValue);
        newTeacherData.append('mAddress', formState.inputs.mAddress.inputValue);
        newTeacherData.append('gender', formState.inputs.gender.inputValue);
        newTeacherData.append('userName', formState.inputs.userName.inputValue);
        newTeacherData.append('password', formState.inputs.password.inputValue);
        newTeacherData.append('newTeacherImage', formState.inputs.userImage.inputValue)
        try 
        {   setAdding(true);
            const response = await fetch(`http://localhost:5000/api/admin/teachers`,
            {
                method :    'POST',
                body   :     newTeacherData
            });
            const responseData = await response.json();
            
            if(!response.ok)
            {    setAdding(false);   alert(responseData.errorCode+"\n"+responseData.errorMsg)  }
            else
            {      setAdding(false);   history.push(`/teachers`)  }
        } catch (error) {    setAdding(false);    alert(error)   }
    
    }

    return <>
        <div className={classes.editTeacher}>
        {adding && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Adding Teacher...</h2>
        </Backdrop>
        }
            <h3>Add Teacher</h3>
            <form onSubmit={addTeacherHandler}>
                <div> <Input  
                    id = "firstName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's First Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div> <Input  
                    id = "lastName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's Last Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 20 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(20)]} 
                /></div>
                <div  className={classes.image}><ImageInput 
                    id='userImage' Error = "Please Pick an Image" height = '200px' maxSize = {3}
                    onInputChange = {inputChangeHandler}
                /></div>
                <div><Input  
                    id = "fatherName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's Father Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div><Input  
                    id = "CNIC" type = "Input" fieldType = 'text' 
                    pHolder = "CNIC No : XXXXX-XXXXXXX-X"  max={15} min={15}
                    Error = "Please Enter a Valid CNIC e.g XXXXX-XXXXXXX-X " onInputChange = {inputChangeHandler}
                    validators = {[CNIC_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "Contact" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's Mobile"
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR]}  max={12} min={12}
                /></div>

                <DatePicker 
                    id='DOB'
                    Error='Select DOB'
                    onDateChange={inputChangeHandler} 
                />
                
                <div className={classes.email}><Input  
                    id = "email" type = "Input" fieldType = 'email' 
                    pHolder = "Enter Email Address"
                    Error = "Please Enter a Valid Email" onInputChange = {inputChangeHandler}
                    validators = {[EMAIL_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "qualification" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Highest Qualifiction"
                    Error = "Enter Highest Qualifiction " onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                
                <div className={classes.pContact}> <Input  
                    id = "pAddress" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's Permanent Address"
                    Error = "Permanent Address Field is Required with MAXIMUM LENGTH of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.mContact}> <Input  
                    id = "mAddress" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Teacher's Mailing Address"
                    Error = "Mailing Address Field is Required with MAXIMUM LENGTH of 100 Words" onInputChange = {inputChangeHandler}
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
                <button  className = {`btn ${formState.formIsValid ? 'btn-success' : 'btn-danger'}`}  disabled={!formState.formIsValid} >
                    ADD Teacher
                </button>
            </form>
        </div>
    </>
}

export default EditTeacher;