import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Backdrop from '../../../Shared/Components/Backdrop/Backdrop';
import Spinner from '../../../Shared/Components/UI Element/Spinner';
import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import classes from '../AddTeacher/AddTeacher.module.css';
import { getSingleTeacher } from '../../../Actions/TeachersActions';
import isEmpty from '../../../Shared/Util/Validators/isEmpty';

const EditTeacher = props => {
   const tID = useParams().tID;
   const { single_teacher: teacher, teacher_loading } = useSelector(state => state?.teachers);

   const teacherDataFormat = { firstName: '', lastName: '', userImage: '', fatherName: '', CNIC: '', Contact: '', DOB: '', email: '', qualification: '', pAddress: '', mAddress: '', gender: '' };
   const teacherDataErrorsFormat = { firstName: false, lastName: false, userImage: false, fatherName: false, CNIC: false, Contact: false, DOB: false, email: false, qualification: false, pAddress: false, mAddress: false, gender: false };

   const [ teacherData, setTeacherData ] = useState({...teacherDataFormat})
   const [ teacherDataErrors, setTeacherDataErrors ] = useState({...teacherDataErrorsFormat})

   const inputChangeHandler = ({ target: { name, value }}) => {
      setTeacherData( { ...teacherData, [name]: value } );
      isEmpty(value) && setTeacherDataErrors( { ...teacherDataErrors, [name]: 'Field is required' } )
   }

   const dispatch = useDispatch();
   const history = useHistory();


   const updateTeacherHandler = async e => {
      e.preventDefault();
      console.log(teacherData)
      const newTeacherData = new FormData();
      const { firstName, lastName, userImage, fatherName, CNIC, Contact, DOB, email, qualification, pAddress, mAddress, gender, password } = teacherData
      newTeacherData.append('firstName', firstName);
      newTeacherData.append('lastName', lastName);
      newTeacherData.append('newTeacherImage', userImage)
      newTeacherData.append('fatherName', fatherName);
      newTeacherData.append('CNIC', CNIC);
      newTeacherData.append('Contact', Contact);
      newTeacherData.append('DOB', DOB);
      newTeacherData.append('email', email);
      newTeacherData.append('qualification', qualification);
      newTeacherData.append('pAddress', pAddress);
      newTeacherData.append('mAddress', mAddress);
      newTeacherData.append('gender', gender);
      newTeacherData.append('password', password);

      // try {
      //    setEditing(true)
      //    const response = await fetch(`http://localhost:5000/api/admin/teachers/${tID}`,
      //       {
      //          method: 'POST',
      //          body: newTeacherData
      //       });
      //    const responseData = await response.json();

      //    if (!response.ok) { setEditing(false); alert(responseData.errorCode + "\n" + responseData.errorMsg) }
      //    else { setEditing(false); history.push(`/teachers`) }

      // } catch (error) { setEditing(false); alert(error) }

   }

   useEffect(() => {
      dispatch(getSingleTeacher(tID))
    }, [tID, dispatch])

    useEffect( () => {
      const { First_Name, Last_Name, Image, Father_Name, CNIC_Number, Contact_Number, E_Mail, DOB, Permanent_Address, Mailing_Address, Qualification, Gender } = teacher || {};
      setTeacherData({ firstName: First_Name, lastName: Last_Name, userImage: Image, fatherName: Father_Name, CNIC: CNIC_Number, Contact: Contact_Number, DOB: DOB, email: E_Mail, qualification: Qualification, pAddress: Permanent_Address, mAddress: Mailing_Address, gender: Gender})
    }, [teacher])

const { firstName, lastName, userImage, fatherName, CNIC, Contact, DOB, email, qualification, pAddress, mAddress, gender } = teacherData

console.log(gender)
if (!teacher) return <div className={classes.editTeacher}> <h3>Loading...</h3> </div>
else
   return <>
      <div className={classes.editTeacher}>
         {teacher_loading &&
            <Backdrop>
               <Spinner />
               <h2 style={{ color: 'gold' }}>Editing Teacher Data...</h2>
            </Backdrop>
         }
         <h3>Edit Teacher</h3>
         <form onSubmit={updateTeacherHandler}>
            <div>
               <input name="firstName" type='text' value={firstName} placeholder={`Enter Teacher's First Name`} onChange={inputChangeHandler}  />
            </div>
            <div>
               <input name="lastName" type='text' value={lastName} placeholder={`Enter Teacher's Last Name`} onChange={inputChangeHandler}  />
            </div>
            <div className={classes.image}>
               <ImageInput
               id='userImage' Error="Please Pick an Image" height='200px'
               src={`http://localhost:5000/uploads/images/${userImage}`}
               onInputChange={(id, value) => inputChangeHandler({target: { name: id, value}})}
               />
            </div>
            <div className={classes.fatherName}>
               <input name="fatherName" type='text' value={fatherName} placeholder={`Enter Teacher's Father Name`} onChange={inputChangeHandler}  />
            </div>
            <div>
               <input name="CNIC" type='text' value={CNIC} placeholder={`CNIC No : XXXXX-XXXXXXX-X`} onChange={inputChangeHandler}  />
            </div>
            <div>
               <input name="Contact" type='text' value={Contact} placeholder={`Contact Field is Required e.g 03XX-XXXXXXX`} onChange={inputChangeHandler}  />
            </div>
            {/* <DatePicker
               id='DOB'
               Error='Select DOB'
               onInputChange={(id, value) => inputChangeHandler({target: { id, value}})}
               iValue={DOB}
            /> */}
            <div>
               <input name="DOB" type='date' value={DOB} placeholder={`Enter DOB`} onChange={inputChangeHandler}  />
            </div>
            <div className={classes.email}>
               <input name="email" type='text' value={email} placeholder={`Enter Email Address`} onChange={inputChangeHandler}  />
            </div>
            <div>
               <input name="qualification" type='text' value={qualification} placeholder={`Enter Teacher's Highest Qualification`} onChange={inputChangeHandler}  />
            </div>
            <div className={classes.pContact}>
               <input name="pAddress" type='text' value={pAddress} placeholder={`Enter Teacher's Permanent Address`} onChange={inputChangeHandler}  />
            </div>
            <div className={classes.mContact}> 
               <input id="mAddress" type='text' value={mAddress} placeholder={`Enter Teacher's Permanent Address`} onChange={inputChangeHandler}  />
            </div>
            <div className={classes.gender}>
               <input id="male" name='gender' type='radio' checked={gender === 'Male'} value='male' onChange={inputChangeHandler}  />
               <label style={{ margin: 0}} htmlFor='male'>Male</label>
               <input id="female" name='gender' type='radio' checked={gender === 'Female'} value='female' onChange={inputChangeHandler}  />
               <label style={{ margin: 0}} htmlFor='female'>Female</label>
               {/* <b>Gender : </b>
               <RadioInput iValue={gender} value='Male' name='gender'
                  onInputChange={(id, value) => inputChangeHandler({target: { id, value}})} title='Male' id='gender'
               />
               <RadioInput iValue={gender} value='Female' name='gender'
                  onInputChange={(id, value) => inputChangeHandler({target: { id, value}})} title='Female' id='gender'
               /> */}
            </div>
            <button className={`btn ${teacherData ? 'btn-success' : 'btn-danger'}`} disabled={!teacherData}>
               Edit Teacher
            </button>
         </form>
      </div>
   </>
}

export default EditTeacher;