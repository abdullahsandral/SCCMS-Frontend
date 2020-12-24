import React, { useEffect, useState } from 'react';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import RadioInput from '../../../Shared/Components/UI Element/RadioInput';
import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, CNIC_VALIDATOR,PH_NUMBER_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from '../AddStudent/AddStudent.module.css';
import { useHistory, useParams } from 'react-router-dom';

const EditStudent = props =>
{
    const sID = useParams().sID;    
    const [student, setStudent] = useState();
    const [editing, setEditing] = useState(false)
    
    const history = useHistory();
    
    const [formState , inputChangeHandler, dataSetter] = useForm({
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
    } , false);
    
    const updateStudentHandler = async e =>
    {
        e.preventDefault();
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
    {   setEditing(true)
        const response = await fetch(`http://localhost:5000/api/admin/students/${sID}`,
        {
            method :    'POST',
            body   :     newStudentData
        });
        const responseData = await response.json();
        
        if(!response.ok)
        {    setEditing(false);
            alert(responseData.errorCode+"\n"+responseData.errorMsg)
        }
        else
        {
            // dispatchPlaceAdded({ type : 'NEW_PLACE_ADDED'})
            setEditing(false);
            history.push(`/students`)
        }
    } catch (error) {  setEditing(false);   alert(error)   }
       
    }

    useEffect( () =>
    {
        const getStudentData = async () => 
       {try 
            {
                const response = await fetch(`http://localhost:5000/api/admin/students/${sID}`);
                const data = await response.json();
                
                if(response.ok) 
                {
                    dataSetter(
                    {
                        rollNo : {
                            inputValue : data.Roll_Number,
                            inputisValid : true
                        },
                        class : {
                            inputValue : data.Class_ID,
                            inputisValid : true
                        },
                        firstName : {
                            inputValue : data.First_Name,
                            inputisValid : true
                        },
                        lastName : {
                            inputValue : data.Last_Name,
                            inputisValid : true
                        },
                        userImage : {
                            inputValue : data.Student_Image,
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
                        email : {
                            inputValue : data.E_Mail,
                            inputisValid : true
                        },
                        gender : {
                            inputValue : data.Gender,
                            inputisValid : true
                        },
                        sContact : {
                            inputValue : data.Contact_Number,
                            inputisValid : true
                        },
                        pContact : {
                            inputValue : data.Father_Contact,
                            inputisValid : true
                        },
                        DOB : {
                            inputValue : data.Date_Of_Birth,
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
                        userName : {
                            inputValue : data.User_Name.slice(0,data.User_Name.length-10),
                            inputisValid : true
                        },
                        password : {
                            inputValue : data.Password,
                            inputisValid : true
                        },
                    },true);
                    setStudent(data)
                }
                
                else  history.push('/students')

            } catch (error) { alert(error.message); history.push('/students')   }
       }

       getStudentData();

    },[dataSetter, history, sID])

    useEffect(()=>
    {
        inputChangeHandler('class',formState.inputs.class.inputValue,!!formState.inputs.class.inputValue)
    },[formState.inputs.class.inputValue,inputChangeHandler])

    if(!student)  return  <div className={classes.editStudent}> <h3>Loading...</h3> </div>
    else
    return <>
        <div className={classes.editStudent}>
        {editing && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Updating Student Data...</h2>
        </Backdrop>
        }
            <h3>Edit Student</h3>
            <form onSubmit={updateStudentHandler}>
                <div> <Input  
                    id = "rollNo" type = "Input" fieldType = 'text' initialValue = {formState.inputs.rollNo.inputValue}
                    pHolder = "Enter Student's Roll Number" isValid = {formState.inputs.rollNo.inputisValid} 
                    Error = "Roll No Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(15)]} 
                /></div>
                <div className= {classes.classSelecter}>
                    <select value={formState.inputs.class.inputValue}
                     onChange={e => inputChangeHandler('class',e.target.value,!!e.target.value)}>
                        <option value=''>Select A Class</option>
                        <option value={'C-6'}>6th</option>
                        <option value={'C-7'}>7th</option>
                        <option value={'C-8'}>8th</option>
                        <option value={'C-9'}>9th</option>
                        <option value={'C-10'}>10th</option>
                    </select> 
                </div>
                <div> <Input  
                    id = "firstName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.firstName.inputValue}
                    pHolder = "Enter Student's First Name" isValid = {formState.inputs.firstName.inputisValid} 
                    Error = "Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(30)]} 
                /></div>
                <div> <Input  
                    id = "lastName" type = "Input" fieldType = 'text' initialValue = {formState.inputs.lastName.inputValue}
                    pHolder = "Enter Student's Last Name" isValid = {formState.inputs.lastName.inputisValid} 
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
                    pHolder = "Enter Student's Father Name" isValid = {formState.inputs.fatherName.inputisValid} 
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
                <div className={classes.email}><Input  
                    id = "email" type = "Input" fieldType = 'email' initialValue = {formState.inputs.email.inputValue}
                    pHolder = "Enter Email Address" isValid = {formState.inputs.email.inputisValid} 
                    Error = "Please Enter a Valid Email" onInputChange = {inputChangeHandler}
                    validators = {[EMAIL_VALIDATOR()]} 
                /></div>
                <div> <Input  
                    id = "sContact" type = "Input" fieldType = 'text' initialValue = {formState.inputs.sContact.inputValue}
                    pHolder = "Enter Student's Mobile" isValid = {formState.inputs.sContact.inputisValid} 
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR()]}   max={12} min={12}
                /></div>
                <div> <Input  
                    id = "pContact" type = "Input" fieldType = 'text' initialValue = {formState.inputs.pContact.inputValue}
                    pHolder = "Enter Parent's Mobile" isValid = {formState.inputs.pContact.inputisValid} 
                    Error = "Contact Field is Required e.g 03XX-XXXXXXX" onInputChange = {inputChangeHandler}
                    validators = {[PH_NUMBER_VALIDATOR]}   max={12} min={12}
                /></div>
                
                <DatePicker 
                    id='DOB'
                    Error='Select DOB'
                    onDateChange={inputChangeHandler} 
                    iValue = {formState.inputs.DOB.inputValue}
                />
                
                <div className={classes.pContact}> <Input  
                    id = "pAddress" type = "Input" fieldType = 'text' initialValue = {formState.inputs.pAddress.inputValue}
                    pHolder = "Enter Student's Permanent Address" isValid = {formState.inputs.pAddress.inputisValid} 
                    Error = "Please Enter Permanent Address With MAX LENGTH Of 100 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(100)]} 
                /></div>
                <div className={classes.mContact}> <Input  
                    id = "mAddress" type = "Input" fieldType = 'text' initialValue = {formState.inputs.mAddress.inputValue}
                    pHolder = "Enter Student's Mailing Address" isValid = {formState.inputs.mAddress.inputisValid} 
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
                Edit Student
                </button>
            </form>
        </div>
    </>
}

export default EditStudent;