import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import { getOneClassSubjects, updateOneClassSubjects } from '../../../Actions/SubjectsActions';
import { getAllTeachers } from '../../../Actions/TeachersActions';
import LoadingSpinner from '../../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
import isEmpty from '../../../Shared/Util/Validators/isEmpty';
import '../AddSubjects.css'

const EditSubject = props => {
    const { classId } = useParams();
    const dispatch = useDispatch();
    const { teachers } = useSelector(state => state?.teachers);
    const { class_subjects, class_subjects_loading } = useSelector(state => state?.subjects);

    const [updatedSubjects, setUpdatedSubjects] = useState(class_subjects)
    const [deletedSubjects, setDeletedSubjects] = useState([])
    const [ newSubject, setNewSubject ] = useState({ code: '', name: '', teacher: {}, teacher_id: '' , class_id: classId })
    const [ newSubjectError, setNewSubjectError ] = useState({ code: false, name: false, teacher_id: false })
    useEffect(() => {
        parseFloat(classId) && dispatch(getOneClassSubjects(classId));
        dispatch(getAllTeachers())
    }, [classId, dispatch])
    useEffect(() => {
        setUpdatedSubjects(class_subjects);
    }, [class_subjects])

    const subjectInfoChangeHandler = (field, index) => {
        let prevState = [...updatedSubjects];
        if (field.target) {
            const { target: { name, value } } = field;
            prevState[index] = { ...prevState[index], [name]: value };
        } else {
            prevState[index] = { ...prevState[index], teacher: field, teacher_id: field?.id };
        }
        setUpdatedSubjects(prevState)
    }
    const newSubjectInfoChangeHandler = field => {
        let prevState
        if (field.target) {
            const { target: { name, value } } = field;
            !isEmpty(value) && setNewSubjectError({ ...newSubjectError, [name]: false });
            prevState = { ...newSubject, [name]: value };
        } else {
            !isEmpty(field?.id) && setNewSubjectError({ ...newSubjectError, teacher_id: false });
            prevState = { ...newSubject, teacher: field, teacher_id: field?.id };
        }
        setNewSubject(prevState)
    }
    const updateSubjectsHandler = e => {
        e.preventDefault();
        let updatedSubjectsList = updatedSubjects?.map(({ id, code, name, teacher_id, class_id }) => ({ id, code, name, teacher_id, class_id }))
        dispatch(updateOneClassSubjects(classId, updatedSubjectsList, deletedSubjects))
    }
    const addSubjectHandler = e => {
        e.preventDefault();
        const { code, name, teacher_id } = newSubject;
        if(isEmpty(code) || isEmpty(name) || isEmpty(teacher_id) ) {
            setNewSubjectError({ code: isEmpty(code), name: isEmpty(name), teacher_id: isEmpty(teacher_id) });
            return
        }
        const newSubjects = [ ...updatedSubjects ];
        newSubjects.push(newSubject);
        setUpdatedSubjects(newSubjects);
        setNewSubject({ code: '', name: '', teacher: {}, teacher_id: '' , class_id: classId })
    }
    const subjectDeleteHandler = index => {
        const prevSubjects = [ ...updatedSubjects ];
        const deletedSubject = prevSubjects.splice(index, 1);
        deletedSubject[0]?.id && setDeletedSubjects([ ...deletedSubjects, deletedSubject[0]?.id ]);
        setUpdatedSubjects(prevSubjects)
    }

    return <div className='background'>
        {(class_subjects_loading) ?
            <LoadingSpinner name={'Subjects Loading'} /> :
            <>
                <div className='shadow-none allForms p-0 m-0'>
                    <Link className='btn btn-success' to='/addSubjects'>Back to Classes</Link>
                    {/* <button className='btn btn-success float-right'>ADD SUBJECT</button> */}
                </div>
                <div className='allForms'>
                    <h4 className='text-center gold'>Edit Class Subjects</h4>
                    <form onSubmit={updateSubjectsHandler}>
                        {updatedSubjects?.map((subject, pIndex) => subject?._destroy ? '' :
                        <div className='row my-1'>
                            <div className='col-6 mb-2'>
                                <input
                                    className='w-100 h-100 p-2'
                                    value={subject?.code}
                                    disabled={subject?.code && subject?.id}
                                    onChange={e => subjectInfoChangeHandler(e, pIndex)}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <Select
                                    value={subject?.teacher}
                                    onChange={ teacher => subjectInfoChangeHandler(teacher, pIndex)}
                                    isSearchable
                                    placeholder='Select a Teacher'
                                    name="Teachers"
                                    options={teachers}
                                    getOptionValue={option => option['id']}
                                    getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <input
                                    name='name'
                                    className='w-100 h-100 p-2'
                                    value={subject?.name}
                                    placeholder='Enter Subject Name'
                                    onChange={e => subjectInfoChangeHandler(e, pIndex)}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <button
                                    type='button' 
                                    onClick={() => subjectDeleteHandler(pIndex)}
                                    className='btn btn-danger w-100 h-100'
                                >
                                    DELETE SUBJECT
                                </button>
                            </div>
                        </div>)}
                        {!isEmpty(updatedSubjects) && <>
                        <button type='submit' className='btn btn-success w-100'>UPDATE Subjects</button>
                        <hr></hr>
                        </>}
                        <div className='row my-1'>
                            <div className='col-6 mb-2'>
                                <input
                                    className='w-100 p-2'
                                    value={newSubject?.code}
                                    name='code'
                                    placeholder='Enter Subject Code.'
                                    onChange={newSubjectInfoChangeHandler}
                                />
                                {newSubjectError.code && <p className='gold m-0'>Subject code is required.</p>}
                            </div>
                            <div className='col-6 mb-2'>
                                <Select
                                    value={isEmpty(newSubject.teacher) ? '' : newSubject.teacher}
                                    onChange={newSubjectInfoChangeHandler}
                                    isSearchable
                                    placeholder='Select a Teacher'
                                    name="Teachers"
                                    options={teachers}
                                    getOptionValue={option => option['id']}
                                    getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                                />
                                {newSubjectError.teacher_id && <p className='gold m-0'>Teacher name is required.</p>}
                            </div>
                            <div className='col-6 mb-2'>
                                <input
                                    name='name'
                                    className='w-100 p-2'
                                    value={newSubject?.name}
                                    placeholder='Enter Subject Name'
                                    onChange={newSubjectInfoChangeHandler}
                                />
                                {newSubjectError.name && <p className='gold m-0'>Subject name is required.</p>}
                            </div>
                            <div className='col-6 mb-2'>
                                <button type='button' className='btn btn-success w-100' onClick={addSubjectHandler}>ADD SUBJECT</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        }
    </div>
}

export default EditSubject;