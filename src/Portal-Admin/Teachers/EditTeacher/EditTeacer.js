import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import RadioInput from '../../../Shared/Components/UI Element/RadioInput';
import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, PH_NUMBER_VALIDATOR, CNIC_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from '../AddTeacher/AddTeacher.module.css';

const EditTeacher = props =>
{
    const tID = useParams().tID;    
    const [teacher, setTeacher] = useState();
    const [editing, setEditing] = useState(false)
    
    const history = useHistory();
    
    const [formState , inputChangeHandler, dataSetter] = useForm({
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
    } , false);
    
    const updateTeacherHandler = async e =>
    {
        e.preventDefault();
        console.log(formState)
        const newTeacherData = new FormData();
        newTeacherData.append('firstName', formState.inputs.firstName.inputValue);
        newTeacherData.append('lastName', formState.inputs.lastName.inputValue);
        newTeacherData.append('newTeacherImage', formState.inputs.userImage.inputValue)
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

    try 
    {   setEditing(true)
        const response = await fetch(`http://localhost:5000/api/admin/teachers/${tID}`,
        {
            method :    'POST',
            body   :     newTeacherData
        });
        const responseData = await response.json();
        
        if(!response.ok)
        {    setEditing(false);  alert(responseData.errorCode+"\n"+responseData.errorMsg)        }
        else
        {    setEditing(false);   history.push(`/teachers`)  }
        
    } catch (error) {    setEditing(false);   alert(error)   }
    
    }

    useEffect( () =>
    {
        const getTeacherData = async () => 
       {try 
            {
                const response = await fetch(`http://localhost:5000/api/admin/teachers/${tID}`);
                const data = await response.json();
                
                if(response.ok) 
                {
                    dataSetter(
                    {
                        firstName : {
                            inputValue : data.First_Name,
                            inputisValid : true
                        },
                        lastName : {
                            inputValue : data.Last_Name,
                            inputisValid : true
                        },
                        userImage : {
                            inputValue : data.Teacher_Image,
                            inputisValid : true
                        },
                        fatherName : {
                            inputValue : data.Father_Name,
                            inputisValid : true
                        },
                        CNIC : {
                            inputValue : data.CNIC_Number,
                            inputisValid : true
                        },
                        Contact : {
                            inputValue : data.Contact_Number,
                            inputisValid : true
                        },
                        DOB : {
                            inputValue : data.Date_Of_Birth,
                            inputisValid : true
                        },
                        email : {
                            inputValue : data.E_Mail,
                            inputisValid : true
                        },
                        qualification : {
                            inputValue : data.Qualification,
                            inputisValid : true
                        },
                        
                        pAddress : {
                            inputValue : data.Permanent_Address,
                            inputisValid : true
                        },
                        mAddress : {
                            inputValue : data.Mailing_Address,
                            inputisValid : true
                        },
                        gender : {
                            inputValue : data.Gender,
                            inputisValid : true
                        },
                        userName : {
                            inputValue : data.User_Name.slice(0,data.User_Name.length-10),
                            inputisValid : true
                        },
                        password : {
                            inputValue : data.Password,
                            inputisValid : true
                        },
                    },true);
 
                    setTeacher(data)
                }
                
                else  history.push('/teachers')

            } catch (error) { alert(error.message); history.push('/teachers')   }
       }; getTeacherData();
    },[dataSetter, history, tID])

    
    if(!teacher)  return  <div className={classes.editTeacher}> <h3>Loading...</h3> </div>
    else
    return <>
        <div className={classes.editTeacher}>
        {editing && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Editing Teacher Data...</h2>
        </Backdrop>
        }
            <h3>Edit Teacher</h3>
            <form onSubmit={updateTeacherHandler}>
                <div> <Input  
                    id = "firstName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.firstName.inputValue}
                    pHolder = "Enter Teacher's First Name" isValid = {formState.inputs.firstName.inputisValid} 
                    Error = "Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div> <Input  
                    id = "lastName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.lastName.inputValue}
                    pHolder = "Enter Teacher's Last Name" isValid = {formState.inputs.lastName.inputisValid} 
                    Error = "Name Field is Required with MAXIMUM LENGTH of 20 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(20)]} 
                /></div>
                <div  className={classes.image}><ImageInput 
                    id='userImage' Error = "Please Pick an Image" height = '200px' 
                    src={`http://localhost:5000/uploads/images/${formState.inputs.userImage.inputValue}`}
                    onInputChange = {inputChangeHandler}
                /></div>
                <div className={classes.fatherName}><Input  
                    id = "fatherName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.fatherName.inputValue}
                    pHolder = "Enter Teacher's Father Name" isValid = {formState.inputs.fatherName.inputisValid} 
                    Error = "Please Enter a Name With MAX LENGTH Of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div><Input  
                    id = "CNIC" type = "Input" fieldType = 'text' initialValue = {formState.inputs.CNIC.inputValue}
                    pHolder = "CNIC No : XXXXX-XXXXXXX-X" isValid = {formState.inputs.CNIC.inputisValid} 
                    Error = "Please Enter a Valid CNIC e.g XXXXX-XXXXXXX-X " onInputChange = {inputChangeHandler}
                    max={15} min={15}
                    validators = {[CNIC_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "Contact" type = "Input" fieldType = 'text' initialValue = {formState.inputs.Contact.inputValue}
                    pHolder = "Enter Teacher's Mobile" isValid = {formState.inputs.Contact.inputisValid} 
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR()]}  max={12} min={12}
                /></div>
                <DatePicker 
                    id='DOB'
                    Error='Select DOB'
                    onDateChange={inputChangeHandler} 
                    iValue = {formState.inputs.DOB.inputValue}
                />
                <div className={classes.email}><Input  
                    id = "email" type = "Input" fieldType = 'email' initialValue = {formState.inputs.email.inputValue}
                    pHolder = "Enter Email Address" isValid = {formState.inputs.email.inputisValid} 
                    Error = "Please Enter a Valid Email" onInputChange = {inputChangeHandler}
                    validators = {[EMAIL_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "qualification" type = "Input" fieldType = 'text' initialValue = {formState.inputs.qualification.inputValue}
                    pHolder = "Enter Teacher's Highest Qualification" isValid = {formState.inputs.qualification.inputisValid} 
                    Error = "Contact Field is Required with FIXED LENGTH of 11 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(11),MAX_LENGTH_VALIDATOR(11)]} 
                /></div>
                <div className={classes.pContact}> <Input  
                    id = "pAddress" type = "Input" fieldType = 'text' initialValue = {formState.inputs.pAddress.inputValue}
                    pHolder = "Enter Teacher's Permanent Address" isValid = {formState.inputs.pAddress.inputisValid} 
                    Error = "Please Enter Permanent Address With MAX LENGTH Of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.mContact}> <Input  
                    id = "mAddress" type = "Input" fieldType = 'text' initialValue = {formState.inputs.mAddress.inputValue}
                    pHolder = "Enter Teacher's Mailing Address" isValid = {formState.inputs.mAddress.inputisValid} 
                    Error = "Please Enter Mailing Address With MAX LENGTH Of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div> <Input  
                    id = "userName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.userName.inputValue}
                    pHolder = "Enter Student's Username"  isValid = {formState.inputs.userName.inputisValid} 
                    Error = "Please Enter a Valid Username" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div> <Input  
                    id = "password" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Student's Password"  isValid = {true} 
                    Error = "Please Enter a Password Including Special Small and Capital Word MIN=8" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(0),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.gender}> 
                    <b>Gender : </b>
                    <RadioInput iValue={formState.inputs.gender.inputValue} value='Male' name='gender'
                                inputChangeHandler={inputChangeHandler}  title='Male' id='gender'
                    />
                    <RadioInput iValue={formState.inputs.gender.inputValue} value='Female' name='gender'
                                inputChangeHandler={inputChangeHandler}  title='Female' id='gender'
                    />
                </div>
                <button  className = {`btn ${formState.formIsValid ? 'btn-success' : 'btn-danger'}`} disabled={!formState.formIsValid}>
                Edit Teacher
                </button>
            </form>
        </div>
    </>
}

export default EditTeacher;