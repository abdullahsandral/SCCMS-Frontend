import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ImageInput from '../../../Shared/Components/UI Element/ImageInput';
import classes from '../AddStudent/AddStudent.module.css';
import { getSingleStudent, updateStudent, addStudent } from '../../../Actions/StudentsActions';
import isEmpty from '../../../Shared/Util/Validators/isEmpty';
import LoadingSpinner from '../../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
import dayjs from 'dayjs';
import { getAllClasses } from '../../../Actions/ClassesActions';

const EditStudent = props => {
    const sID = useParams().sID;
    const { single_student: student, students_loading } = useSelector(state => state?.students);
    const { classes: classesList } = useSelector(state => state?.classes);
    const studentDataFormat = { roll_no: '', first_name: '', last_name: '', image_url: '', father_name: '', cnic: '', contact_number: '', father_contact_number: '', date_of_birth: '', email: '', permanent_address: '', mailing_address: '', gender: '', class_id: '', password: '' };

    const [studentData, setStudentData] = useState({ ...studentDataFormat })
    const [studentDataErrors, setStudentDataErrors] = useState({ ...studentDataFormat })

    const dispatch = useDispatch();
    const history = useHistory();

    const inputChangeHandler = ({ target: { name, value } }) => {
        setStudentData({ ...studentData, [name]: value });
        !isEmpty(value)  && setStudentDataErrors({ ...studentDataErrors, [name]: false })
    }
    const validate = () => {
        let valid = true;
        const errors = { ...studentDataErrors }
        for (let field in studentData) {
            if (sID && field === 'password') continue;
            if (!studentData[field]) {
                errors[field] = true;
                valid = false;
            }
        }
        setStudentDataErrors(errors)
        return valid;
    }
    const updateStudentHandler = async e => {
        e.preventDefault();

        let isValidForm = validate();
        if (!isValidForm) return;

        console.log(studentData)
        const newStudentData = new FormData();
        const { roll_no, first_name, last_name, image_url, father_name, cnic, contact_number, father_contact_number, date_of_birth, email, permanent_address, mailing_address, gender, class_id, password } = studentData
        newStudentData.append('roll_no', roll_no);
        newStudentData.append('first_name', first_name);
        newStudentData.append('last_name', last_name);
        newStudentData.append('newStudentImage', image_url)
        newStudentData.append('father_name', father_name);
        newStudentData.append('cnic', cnic);
        newStudentData.append('contact_number', contact_number);
        newStudentData.append('date_of_birth', date_of_birth);
        newStudentData.append('email', email);
        newStudentData.append('father_contact_number', father_contact_number);
        newStudentData.append('permanent_address', permanent_address);
        newStudentData.append('mailing_address', mailing_address);
        newStudentData.append('gender', gender);
        newStudentData.append('class_id', class_id);
        !sID && newStudentData.append('password', password);

        sID ? dispatch(updateStudent(sID, newStudentData, history)) : dispatch(addStudent(newStudentData, history));
    }

    useEffect(() => {
        dispatch(getAllClasses())
        sID && dispatch(getSingleStudent(sID))
    }, [sID, dispatch])

    useEffect(() => {
        sID && student && setStudentData({ ...student })
    }, [sID, student])

    const { roll_no, first_name, last_name, image_url, father_name, cnic, contact_number, father_contact_number, date_of_birth, email, permanent_address, mailing_address, gender, class_id, password } = studentData

    if (!student && sID) return <div className={classes.editStudent}> <h3>Loading...</h3> </div>
    else
        return <>
            <div className={classes.editStudent}>
                {students_loading && <LoadingSpinner name={`${sID ? 'Editing Student Data' : 'Adding Student'}`}  />}
                <h3>{sID ? 'Edit' : 'Add'} Student</h3>
                <form onSubmit={updateStudentHandler}>
                    <div>
                        <input name="roll_no" type='text' value={roll_no} placeholder={`Enter Student's Roll No`} onChange={inputChangeHandler} />
                        {studentDataErrors?.roll_no && <p>Field is required</p>}
                    </div>
                    <div className= {classes.classSelecter}>
                        <select name='class_id' value={class_id} onChange={inputChangeHandler}>
                            <option disabled value=''>Select A Class</option>
                            {classesList?.map( classs =>
                                <option value={classs.id}>{classs.name}</option>
                            )}
                        </select> 
                        {studentDataErrors?.class_id && <p>Field is required</p>}
                    </div>
                    <div>
                        <input name="first_name" type='text' value={first_name} placeholder={`Enter Student's First Name`} onChange={inputChangeHandler} />
                        {studentDataErrors?.first_name && <p>Field is required</p>}
                    </div>
                    <div>
                        <input name="last_name" type='text' value={last_name} placeholder={`Enter Student's Last Name`} onChange={inputChangeHandler} />
                        {studentDataErrors?.last_name && <p>Field is required</p>}
                    </div>
                    <div className={classes.image}>
                        <ImageInput
                            id='image_url' Error="Please Pick an Image" height='200px'
                            src={image_url ? `http://localhost:5000/uploads/images/${image_url}` : ''}
                            onInputChange={(id, value) => inputChangeHandler({ target: { name: id, value } })}
                        />
                        {studentDataErrors?.image_url && <p style={{textAlign: 'center'}}>Field is required</p>}
                    </div>
                    <div className={classes.father_name}>
                        <input name="father_name" type='text' value={father_name} placeholder={`Enter Student's Father Name`} onChange={inputChangeHandler} />
                        {studentDataErrors?.father_name && <p>Field is required</p>}
                    </div>
                    <div>
                        <input name="cnic" type='text' value={cnic} placeholder={`cnic No : XXXXX-XXXXXXX-X`} onChange={inputChangeHandler} />
                        {studentDataErrors?.cnic && <p>Field is required</p>}
                    </div>
                    <div className={classes.email}>
                        <input name="email" type='text' value={email} placeholder={`Enter Email Address`} onChange={inputChangeHandler} />
                        {studentDataErrors?.email && <p>Field is required</p>}
                    </div>
                    <div>
                    {sID ? '' : <>
                        <input name="password" type='password' value={password} placeholder={`Enter Student's Password`} onChange={inputChangeHandler} />
                        {studentDataErrors?.password && <p>Field is required</p>} </>
                    }
                    </div>
                    <div>
                        <input name="contact_number" type='text' value={contact_number} placeholder={`contact_number Field is Required e.g 03XX-XXXXXXX`} onChange={inputChangeHandler} />
                        {studentDataErrors?.contact_number && <p>Field is required</p>}
                    </div>
                    <div>
                        <input name="father_contact_number" type='text' value={father_contact_number} placeholder={`Enter Student's Father Contact`} onChange={inputChangeHandler} />
                        {studentDataErrors?.father_contact_number && <p>Field is required</p>}
                    </div>
                    <div>
                        <input name="date_of_birth" type='date' value={dayjs(date_of_birth).format('YYYY-MM-DD')} placeholder={`Enter date_of_birth`} onChange={inputChangeHandler} />
                        {studentDataErrors?.date_of_birth && <p>Field is required</p>}
                    </div>
                    <div className={classes.pContact}>
                        <input name="permanent_address" type='text' value={permanent_address} placeholder={`Enter Student's Permanent Address`} onChange={inputChangeHandler} />
                        {studentDataErrors?.permanent_address && <p>Field is required</p>}
                    </div>
                    <div className={classes.mContact}>
                        <input name="mailing_address" type='text' value={mailing_address} placeholder={`Enter Student's Mailing Address`} onChange={inputChangeHandler} />
                        {studentDataErrors?.mailing_address && <p>Field is required</p>}
                    </div>
                    <div className={classes.gender}>
                        <input id="male" name='gender' type='radio' checked={gender === 'male'} value='male' onChange={inputChangeHandler} />
                        <label style={{ margin: 0 }} htmlFor='male'>Male</label>
                        <input id="female" name='gender' type='radio' checked={gender === 'female'} value='female' onChange={inputChangeHandler} />
                        <label style={{ margin: 0 }} htmlFor='female'>Female</label>
                    </div>
                    <button className={`btn btn-success`} >
                        {sID ? 'Update' : 'Add'} Student
            </button>
                </form>
            </div>
        </>
}

export default EditStudent;