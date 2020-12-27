import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import classes from '../AddTeacher/AddTeacher.module.css';
import { getSingleTeacher, updateTeacher, addTeacher } from '../../../Actions/TeachersActions';
import isEmpty from '../../../Shared/Util/Validators/isEmpty';
import LoadingSpinner from '../../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
import dayjs from 'dayjs';

const EditTeacher = props => {
   const tID = useParams().tID;
   const { single_teacher: teacher, teachers_loading } = useSelector(state => state?.teachers);
   const teacherDataFormat = { first_name: '', last_name: '', image_url: '', father_name: '', cnic: '', contact_number: '', date_of_birth: '', email: '', qualification: '', permanent_address: '', mailing_address: '', gender: '', password: '' };

   const [ teacherData, setTeacherData ] = useState({...teacherDataFormat})
   const [ teacherDataErrors, setTeacherDataErrors ] = useState({...teacherDataFormat})

   const dispatch = useDispatch();
   const history = useHistory();

   const inputChangeHandler = ({ target: { name, value }}) => {
      setTeacherData( { ...teacherData, [name]: value } );
      !isEmpty(value) && setTeacherDataErrors( { ...teacherDataErrors, [name]: false } )
   }
   const validate = () => {
      let valid = true;
        const errors = { ...teacherDataErrors }
        for(let field in teacherData) {
           if(tID && field === 'password')  continue;
            if(!teacherData[field]) {
                errors[field] = true;
                valid=false;
            }
        }
        setTeacherDataErrors(errors)
        return valid;
   }
   const updateTeacherHandler = async e => {
      e.preventDefault();

      let isValidForm = validate();
      if(!isValidForm) return;

      console.log(teacherData)
      const newTeacherData = new FormData();
      const { first_name, last_name, image_url, father_name, cnic, contact_number, date_of_birth, email, qualification, permanent_address, mailing_address, gender, password } = teacherData
      newTeacherData.append('first_name', first_name);
      newTeacherData.append('last_name', last_name);
      newTeacherData.append('newTeacherImage', image_url)
      newTeacherData.append('father_name', father_name);
      newTeacherData.append('cnic', cnic);
      newTeacherData.append('contact_number', contact_number);
      newTeacherData.append('date_of_birth', date_of_birth);
      newTeacherData.append('email', email);
      newTeacherData.append('qualification', qualification);
      newTeacherData.append('permanent_address', permanent_address);
      newTeacherData.append('mailing_address', mailing_address);
      newTeacherData.append('gender', gender);
      !tID && newTeacherData.append('password', password);

      tID ? dispatch(updateTeacher(tID, newTeacherData, history)) : dispatch(addTeacher(newTeacherData, history));
   }

   useEffect(() => {
      tID && dispatch(getSingleTeacher(tID))
    }, [tID, dispatch])

    useEffect( () => {
      tID && teacher && setTeacherData({ ...teacher })
    }, [tID, teacher])

const { first_name, last_name, image_url, father_name, cnic, contact_number, date_of_birth, email, qualification, permanent_address, mailing_address, gender } = teacherData

if (!teacher && tID) return <div className={classes.editTeacher}> <h3>Loading...</h3> </div>
else
   return <>
      <div className={classes.editTeacher}>
         {teachers_loading && <LoadingSpinner name={`${tID ? 'Editing Teacher Data' : 'Adding Teacher'}`}/>}
         <h3>{tID ? 'Edit' : 'Add'} Teacher</h3>
         <form onSubmit={updateTeacherHandler}>
            <div>
               <input name="first_name" type='text' value={first_name} placeholder={`Enter Teacher's First Name`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.first_name && <p>Field is required</p>}
            </div>
            <div>
               <input name="last_name" type='text' value={last_name} placeholder={`Enter Teacher's Last Name`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.last_name && <p>Field is required</p>}
            </div>
            <div className={classes.image}>
               <ImageInput
               id='image_url' Error="Please Pick an Image" height='200px'
               src={image_url ? `http://localhost:5000/uploads/images/${image_url}` : ''}
               onInputChange={(id, value) => inputChangeHandler({target: { name: id, value}})}
               />
            </div>
            <div className={classes.father_name}>
               <input name="father_name" type='text' value={father_name} placeholder={`Enter Teacher's Father Name`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.father_name && <p>Field is required</p>}
            </div>
            <div>
               <input name="cnic" type='text' value={cnic} placeholder={`cnic No : XXXXX-XXXXXXX-X`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.cnic && <p>Field is required</p>}
            </div>
            <div>
               <input name="contact_number" type='text' value={contact_number} placeholder={`contact_number Field is Required e.g 03XX-XXXXXXX`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.contact_number && <p>Field is required</p>}
            </div>
            <div>
               <input name="date_of_birth" type='date' value={dayjs(date_of_birth).format('YYYY-MM-DD')} placeholder={`Enter date_of_birth`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.date_of_birth && <p>Field is required</p>}
            </div>
            <div className={classes.email}>
               <input name="email" type='text' value={email} placeholder={`Enter Email Address`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.email && <p>Field is required</p>}
            </div>
            <div>
               <input name="qualification" type='text' value={qualification} placeholder={`Enter Teacher's Highest Qualification`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.qualification && <p>Field is required</p>}
            </div>
            <div className={classes.pContact}>
               <input name="permanent_address" type='text' value={permanent_address} placeholder={`Enter Teacher's Permanent Address`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.permanent_address && <p>Field is required</p>}
            </div>
            <div className={classes.mContact}> 
               <input name="mailing_address" type='text' value={mailing_address} placeholder={`Enter Teacher's Mailing Address`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.mailing_address && <p>Field is required</p>}
            </div>
            {tID ? '' :
            <div> 
               <input name="password" type='password' value={teacherData.password} placeholder={`Enter Teacher's Password`} onChange={inputChangeHandler}  />
               {teacherDataErrors?.password && <p>Field is required</p>}
            </div>
            }
            <div className={classes.gender}>
               <input id="male" name='gender' type='radio' checked={gender === 'male'} value='male' onChange={inputChangeHandler}  />
               <label style={{ margin: 0}} htmlFor='male'>Male</label>
               <input id="female" name='gender' type='radio' checked={gender === 'female'} value='female' onChange={inputChangeHandler}  />
               <label style={{ margin: 0}} htmlFor='female'>Female</label>
            </div>
            <button className={`btn btn-success`} >
               {tID ? 'Update' : 'Add'} Teacher
            </button>
         </form>
      </div>
   </>
}

export default EditTeacher;