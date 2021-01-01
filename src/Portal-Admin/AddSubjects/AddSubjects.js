import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllClasses } from '../../Actions/ClassesActions';
import { getAllTeachers } from '../../Actions/TeachersActions';
import './AddSubjects.css';
import LoadingSpinner from '../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
import isEmpty from '../../Shared/Util/Validators/isEmpty';
import { getOneClassSubjects } from '../../Actions/SubjectsActions';
const Subjects = () => {
    const { classes, classes_loading } = useSelector(state => state?.classes)
    const { teachers } = useSelector(state => state?.teachers)
    const { class_subjects, class_subjects_loading } = useSelector(state => state?.subjects)
    const dispatch = useDispatch();

    const [selectedClass, setSelectedClass] = useState('');
    useEffect(() => {
        dispatch(getAllClasses());
        dispatch(getAllTeachers());
    }, [])
    const classChangeHandler = cls => {
        setSelectedClass(cls)
        dispatch(getOneClassSubjects(cls?.id));
    }
    return <div className='background'>{console.log('CLASSES STATE : ', classes, classes_loading)}{console.log('SUBJECTS STATE : ', class_subjects, class_subjects_loading)}
        {(classes_loading) || (class_subjects_loading) ?
            <LoadingSpinner name={classes_loading ? 'Classes Loading' : 'Subjects Loading'} /> :
            <div className='allForms'>
                <form>
                    <h4 className='text-center gold'>Select a Class to View Subjects</h4>
                    <div className="dropdown bg-white">
                        <div style={{ cursor: 'pointer' }}
                            className="border p-2 px-4 w-100 dropdown-toggle d-flex justify-content-between align-items-center"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                        >
                            <div>{selectedClass?.name || 'Select a Class'}</div>
                        </div>
                        <div className="dropdown-menu w-100 mt-0 p-0" aria-labelledby="dropdownMenuButton">
                            {classes?.map((cls, index) =>
                                <h6 key={index}
                                    className={`m-0 p-2 px-4 item ${selectedClass?.id === cls?.id ? 'active_item' : ''}`}
                                    onClick={() => classChangeHandler(cls)}
                                >{cls?.name}
                                </h6>)
                            }
                        </div>
                    </div>
                </form>
                {selectedClass && !class_subjects_loading && <>
                    {isEmpty(class_subjects) ? <h4 className='m-3 text-white text-center'>No subject exist against this class.</h4> :
                    <div className='row mt-4 mx-0 w-100 allForms'>
                        <h4 className='col-2 py-3 gold text-center custom-shadow '>Code</h4>
                        <h4 className='col-5 py-3 gold text-center custom-shadow '>Subject</h4>
                        <h4 className='col-5 py-3 gold text-center custom-shadow '>Teacher</h4>
                        {class_subjects?.map(subject => <>
                            <h6 className='col-2 py-3 gold text-center custom-shadow '>{subject?.code}</h6>
                            <h6 className='col-5 py-3 gold text-center custom-shadow '>{subject?.name}</h6>
                            <h6 className='col-5 py-3 gold text-center custom-shadow '>{subject?.teacher?.first_name + ' ' + subject?.teacher?.last_name}</h6>
                        </>)

                        }
                    </div>}
                </>}
            </div>}
    </div>
}
export default Subjects;


// import React, {useState, useEffect} from 'react';
        // import uuid from 'react-uuid';

        // import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
        // import Spinner from '../../Shared/Components/UI Element/Spinner';
        // import ShowAllSubjects from './ShowAllSubjects/ShowAllSubjects';
        // import EditSubject from './EditSubject/EditSubject';
        // import classes from './AddSubjects.module.css';
// import {useDispatch, useSelector} from 'react-redux';
// import {getAllClasses} from '../../Actions/ClassesActions';
// import {getAllTeachers} from '../../Actions/TeachersActions';
        // import LoadingSpinner from '../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
// import {getOneClassSubjects} from '../../Actions/SubjectsActions';
        // import isEmpty from '../../Shared/Util/Validators/isEmpty';

// const ExamSchedule = props => {
//     const dispatch = useDispatch();
//     const { classes: classess, classes_loading } = useSelector(state => state.classes);
//     const { teachers } = useSelector(state => state.teachers);
//     const { class_subjects: subjects } = useSelector(state => state.subjects);
// console.log('SUBJECTS : ', subjects)
//     // const classSubjectsData = {};

//     const [selectedclass, setSelectedClass] = useState();
//     const [editMode, setEditMode] = useState(false);


//     // const classChangeHandler = ({ target: { value } }) => { setSelectedClass() };

//     // const submitSubjectsList = async () => {
//     //     const data = []
//     //     for (const oneSubject in classSubjectsData) {
//     //         const sCode = classSubjectsData[oneSubject].inputs.subjectCode.inputValue;
//     //         const sName = classSubjectsData[oneSubject].inputs.subjectName.inputValue;
//     //         const sTeacher = classSubjectsData[oneSubject].inputs.subjectTeacher.inputValue;
//     //         data.push({ subjectCode: sCode, subjectName: sName, subjectTeacher: sTeacher });
//     //     }
//     //     try {
//     //         setEditing(true);
//     //         const response = await fetch(`http://localhost:5000/api/admin/subjects`,
//     //             {
//     //                 method: 'POST',
//     //                 headers: { 'Content-Type': 'application/json' },
//     //                 body: JSON.stringify(
//     //                     {
//     //                         sClass: selectedclass,
//     //                         subjects: data,
//     //                     })
//     //             });
//     //         const responseData = await response.json();

//     //         if (!response.ok) {
//     //             setEditMode(false); setEditing(false); setSubjects(false);
//     //             alert("OK...." + responseData.errorCode + "\n" + responseData.errorMsg)
//     //         }
//     //         else {
//     //             setSubjects(responseData); setEditMode(false); setEditing(false)
//     //         }
//     //     } catch (error) { setEditing(false); setEditMode(false); alert("OKKKKK ERRORRR ..." + error) }

//     // }

//     // const subjectStateHandler = (state, sid) => {
//     //     classSubjectsData[sid] = state;
//     //     for (const oneSubject in classSubjectsData) {
//     //         if (!classSubjectsData[oneSubject].formIsValid) { setOverallState(false); return }
//     //     } setOverallState(true)
//     // };

//     // const addSubjectHandler = (type, idd) => {
//     //     const id = uuid();
//     //     const newSub = { Subject_ID: id, Subject_Code: '', Subject_Name: '', Teacher_ID: '' };
//     //     const currentState = [...subjects];
//     //     if (type === 'add') currentState.push(newSub);
//     //     else if (type === 'delete') {
//     //         const obj = currentState.find(sub => sub.Subject_ID === idd)
//     //         currentState.splice(currentState.indexOf(obj), 1);
//     //     }
//     //     currentState.length <= 0 && setOverallState(true);
//     //     setSubjects(currentState);
//     // }

//     const classChangeHandler = ({ target: { value }}) => {
//         setSelectedClass(value)
//         dispatch(getOneClassSubjects(value))
//     }
//     // const getClassSubjects = () => {
//     //     console.log('S:JSIj')
//     // }
//     useEffect(() => {
//         dispatch(getAllClasses());
//         dispatch(getAllTeachers());
//     }, [])
//     console.log("SELCETED CLASS : ", selectedclass)
//     return <>
//         <div className={classes.timeTable}>
//             <h3 style={{ color: 'gold' }}>Edit Subjects of a Class</h3>
//             <div className={classes.allForms}>
//                 {!selectedclass && <>
//                     <label><b>Select A Class</b></label>
//                     <select className={classes.classSelecter} value={selectedclass?.id - 1 || ''} onChange={classChangeHandler}>
//                         <option value='' disabled >Select A Class</option>
//                         {classess?.map((cls, index) => <option key={cls.id} value={cls?.id}>{cls.name}</option>)}
//                     </select>
//                 </>}
//                 {selectedclass && subjects && !editMode &&
//                     <div className={classes.subjectsPreview}>
//                         <ShowAllSubjects subjects={subjects} />
//                         {!isEmpty(subjects) && <>
//                         <button className='btn btn-secondary' onClick={e => setSelectedClass(false) }> Back to Classes </button>
//                         <button className='btn btn-success' onClick={e => setEditMode(true)}>Edit Subjects</button>
//                         </>}
//                     </div>
//                 }

//                 {selectedclass && subjects && editMode && <>
//                         <EditSubject
//                             // id={subject.Subject_ID}
//                             // fState={subjectStateHandler}
//                             subjects={subjects}
//                             teachers={teachers}
//                             // subjectDelete={addSubjectHandler} 
//                         />)

//                     <div className='d-flex justify-content-between'>
//                         {/* <button onClick={() => addSubjectHandler('add')} className={classes.addBtn}>ADD SUBJECT</button> */}
//                         {/* <button onClick={() => addSubjectHandler('delete')} className={classes.deleteBtn}>DELETE SUBJECT</button> */}
//                     </div>
//                     <div className={classes.BtnsDiv}>
//                         {/* <button className='btn btn-primary w-100'
//                             onClick={e => { getClassSubjects(); setEditMode(false); }}>
//                             Back to Subjects
//                     </button> */}
//                         {/* <button className={`btn w-100 ${!overallState ? 'btn-danger' : 'btn-success'}`} onClick={submitSubjectsList} disabled={!overallState}>
//                             {`UPDATE ${selectedclass ? selectedclass : ''} Class Subjects`}
//                         </button> */}
//                     </div>
//                 </>}

//             </div>

//         </div>
//     </>
// }

// export default ExamSchedule;