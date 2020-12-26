import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import RadioInput from '../../../Shared/Components/UI Element/RadioInput';
import DatePicker from '../../../Shared/Components/UI Element/DatePicker';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../Shared/Components/UI Element/Input';
import { MIN_LENGTH_VALIDATOR, EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, PH_NUMBER_VALIDATOR, CNIC_VALIDATOR } from '../../../Shared/Util/Validators/Validator';
import { useForm } from '../../../Shared/Hooks/Form-Hook';
import classes from '../AddTeacher/AddTeacher.module.css';
import { getSingleTeacher } from '../../../Actions/TeachersActions';

const EditTeacher = props => {
   const tID = useParams().tID;
   const { single_teacher: teacher } = useSelector(state => state?.teachers);
   const [editing, setEditing] = useState(false)

   const dispatch = useDispatch();
   const history = useHistory();

   const [formState, inputChangeHandler, dataSetter] = useForm({
      firstName: {
         inputValue: '',
         inputisValid: false
      },
      lastName: {
         inputValue: '',
         inputisValid: false
      },
      userImage: {
         inputValue: '',
         inputisValid: false
      },
      fatherName: {
         inputValue: '',
         inputisValid: false
      },
      CNIC: {
         inputValue: '',
         inputisValid: false
      },
      Contact: {
         inputValue: '',
         inputisValid: false
      },
      DOB: {
         inputValue: 'Select DOB',
         inputisValid: false
      },
      email: {
         inputValue: '',
         inputisValid: false
      },
      qualification: {
         inputValue: '',
         inputisValid: false
      },
      pAddress: {
         inputValue: '',
         inputisValid: false
      },
      mAddress: {
         inputValue: '',
         inputisValid: false
      },
      gender: {
         inputValue: '',
         inputisValid: false
      },
      password: {
         inputValue: '',
         inputisValid: false
      },
   }, false);

   const updateTeacherHandler = async e => {
      e.preventDefault();
      console.log(formState)
      const newTeacherData = new FormData();
      const { firstName, lastName, userImage, fatherName, CNIC, Contact, DOB, email, qualification, pAddress, mAddress, gender, password } = formState.inputs || {}
      newTeacherData.append('firstName', firstName?.inputValue);
      newTeacherData.append('lastName', lastName?.inputValue);
      newTeacherData.append('newTeacherImage', userImage?.inputValue)
      newTeacherData.append('fatherName', fatherName?.inputValue);
      newTeacherData.append('CNIC', CNIC?.inputValue);
      newTeacherData.append('Contact', Contact?.inputValue);
      newTeacherData.append('DOB', DOB?.inputValue);
      newTeacherData.append('email', email?.inputValue);
      newTeacherData.append('qualification', qualification?.inputValue);
      newTeacherData.append('pAddress', pAddress?.inputValue);
      newTeacherData.append('mAddress', mAddress?.inputValue);
      newTeacherData.append('gender', gender?.inputValue);
      newTeacherData.append('password', password?.inputValue);

      try {
         setEditing(true)
         const response = await fetch(`http://localhost:5000/api/admin/teachers/${tID}`,
            {
               method: 'POST',
               body: newTeacherData
            });
         const responseData = await response.json();

         if (!response.ok) { setEditing(false); alert(responseData.errorCode + "\n" + responseData.errorMsg) }
         else { setEditing(false); history.push(`/teachers`) }

      } catch (error) { setEditing(false); alert(error) }

   }

   useEffect(() => {
      dispatch(getSingleTeacher(tID))
    }, [tID, dispatch])

    useEffect( () => {
      const { First_Name, Last_Name, Image, Father_Name, CNIC_Number, Contact_Number, E_Mail, DOB, Permanent_Address, Mailing_Address, Qualification, Gender, Password } = teacher || {};
      teacher && dataSetter(
         {
            firstName: {
               inputValue: First_Name,
               inputisValid: true
            },
            lastName: {
               inputValue: Last_Name,
               inputisValid: true
            },
            userImage: {
               inputValue: Image,
               inputisValid: true
            },
            fatherName: {
               inputValue: Father_Name,
               inputisValid: true
            },
            CNIC: {
               inputValue: CNIC_Number,
               inputisValid: true
            },
            Contact: {
               inputValue: Contact_Number,
               inputisValid: true
            },
            DOB: {
               inputValue: DOB,
               inputisValid: true
            },
            email: {
               inputValue: E_Mail,
               inputisValid: true
            },
            qualification: {
               inputValue: Qualification,
               inputisValid: true
            },
            pAddress: {
               inputValue: Permanent_Address,
               inputisValid: true
            },
            mAddress: {
               inputValue: Mailing_Address,
               inputisValid: true
            },
            gender: {
               inputValue: Gender,
               inputisValid: true
            },
            password: {
               inputValue: Password,
               inputisValid: true
            },
         }, true);
    }, [teacher, dataSetter])

const { firstName, lastName, userImage, fatherName, CNIC, Contact, DOB, email, qualification, pAddress, mAddress, gender } = formState.inputs || {}

if (!teacher) return <div className={classes.editTeacher}> <h3>Loading...</h3> </div>
else
   return <>
      <div className={classes.editTeacher}>
         {editing &&
            <Backdrop>
               <Spinner />
               <h2 style={{ color: 'gold' }}>Editing Teacher Data...</h2>
            </Backdrop>
         }
         <h3>Edit Teacher</h3>
         <form onSubmit={updateTeacherHandler}>
            <div> <Input
               id="firstName" type="Input" fieldType='text' initialValue={firstName?.inputValue}
               pHolder="Enter Teacher's First Name" isValid={firstName?.inputisValid}
               Error="Name Field is Required with MAXIMUM LENGTH of 30 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(30)]}
            /></div>
            <div> <Input
               id="lastName" type="Input" fieldType='text' initialValue={lastName.inputValue}
               pHolder="Enter Teacher's Last Name" isValid={lastName.inputisValid}
               Error="Name Field is Required with MAXIMUM LENGTH of 20 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(20)]}
            /></div>
            <div className={classes.image}><ImageInput
               id='userImage' Error="Please Pick an Image" height='200px'
               src={`http://localhost:5000/uploads/images/${userImage.inputValue}`}
               onInputChange={inputChangeHandler}
            /></div>
            <div className={classes.fatherName}><Input
               id="fatherName" type="Input" fieldType='text' initialValue={fatherName.inputValue}
               pHolder="Enter Teacher's Father Name" isValid={fatherName.inputisValid}
               Error="Please Enter a Name With MAX LENGTH Of 30 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(30)]}
            /></div>
            <div><Input
               id="CNIC" type="Input" fieldType='text' initialValue={CNIC.inputValue}
               pHolder="CNIC No : XXXXX-XXXXXXX-X" isValid={CNIC.inputisValid}
               Error="Please Enter a Valid CNIC e.g XXXXX-XXXXXXX-X " onInputChange={inputChangeHandler}
               max={15} min={15}
               validators={[CNIC_VALIDATOR()]}
            /></div>
            <div> <Input
               id="Contact" type="Input" fieldType='text' initialValue={Contact.inputValue}
               pHolder="Enter Teacher's Mobile" isValid={Contact.inputisValid}
               Error="Contact Field is Required e.g 03XX-XXXXXXX" onInputChange={inputChangeHandler}
               validators={[PH_NUMBER_VALIDATOR()]} max={12} min={12}
            /></div>
            <DatePicker
               id='DOB'
               Error='Select DOB'
               onDateChange={inputChangeHandler}
               iValue={DOB.inputValue}
            />
            <div className={classes.email}><Input
               id="email" type="Input" fieldType='email' initialValue={email.inputValue}
               pHolder="Enter Email Address" isValid={email.inputisValid}
               Error="Please Enter a Valid Email" onInputChange={inputChangeHandler}
               validators={[EMAIL_VALIDATOR()]}
            /></div>
            <div> <Input
               id="qualification" type="Input" fieldType='text' initialValue={qualification.inputValue}
               pHolder="Enter Teacher's Highest Qualification" isValid={qualification.inputisValid}
               Error="Contact Field is Required with FIXED LENGTH of 11 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(11), MAX_LENGTH_VALIDATOR(11)]}
            /></div>
            <div className={classes.pContact}> <Input
               id="pAddress" type="Input" fieldType='text' initialValue={pAddress.inputValue}
               pHolder="Enter Teacher's Permanent Address" isValid={pAddress.inputisValid}
               Error="Please Enter Permanent Address With MAX LENGTH Of 100 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(100)]}
            /></div>
            <div className={classes.mContact}> <Input
               id="mAddress" type="Input" fieldType='text' initialValue={mAddress.inputValue}
               pHolder="Enter Teacher's Mailing Address" isValid={mAddress.inputisValid}
               Error="Please Enter Mailing Address With MAX LENGTH Of 100 Words" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(100)]}
            /></div>
            {/* <div> <Input
               id="password" type="Input" fieldType='text'
               pHolder="Enter Student's Password" isValid={true}
               Error="Please Enter a Password Including Special Small and Capital Word MIN=8" onInputChange={inputChangeHandler}
               validators={[MIN_LENGTH_VALIDATOR(0), MAX_LENGTH_VALIDATOR(100)]}
            /></div> */}
            <div className={classes.gender}>
               <b>Gender : </b>
               <RadioInput iValue={gender.inputValue} value='Male' name='gender'
                  inputChangeHandler={inputChangeHandler} title='Male' id='gender'
               />
               <RadioInput iValue={gender.inputValue} value='Female' name='gender'
                  inputChangeHandler={inputChangeHandler} title='Female' id='gender'
               />
            </div>
            <button className={`btn ${formState.formIsValid ? 'btn-success' : 'btn-danger'}`} disabled={!formState.formIsValid}>
               Edit Teacher
                </button>
         </form>
      </div>
   </>
}

export default EditTeacher;