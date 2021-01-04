import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { getAllClasses } from '../../Actions/ClassesActions';
import { getAllTeachers } from '../../Actions/TeachersActions';
import LoadingSpinner from '../../Shared/Components/LoadingSpinner.js/LoadingSpinner';
import isEmpty from '../../Shared/Util/Validators/isEmpty';
import { getOneClassSubjects } from '../../Actions/SubjectsActions';
import './AddSubjects.css';

const Subjects = () => {
    const { classes, classes_loading } = useSelector(state => state?.classes)
    // const { teachers } = useSelector(state => state?.teachers)
    const { class_subjects, class_subjects_loading } = useSelector(state => state?.subjects)
    const dispatch = useDispatch();

    const [selectedClass, setSelectedClass] = useState('');
    useEffect(() => {
        dispatch(getAllClasses());
        dispatch(getAllTeachers());
    }, [dispatch])
    const classChangeHandler = cls => {
        if(cls?.id !== selectedClass?.id) {
            setSelectedClass(cls)
            dispatch(getOneClassSubjects(cls?.id));
        }
    }
    return <div className='background'>
        {(classes_loading) || (class_subjects_loading) ?
            <LoadingSpinner name={classes_loading ? 'Classes Loading' : 'Subjects Loading'} /> :
            <div className='allForms'>
                <form>
                    <h4 className='text-center gold'>Select a Class to View Subjects</h4>
                    <Select
                        value={selectedClass}
                        onChange={classChangeHandler}
                        isSearchable
                        placeholder='Select a Class'
                        name="classes"
                        options={classes}
                        getOptionValue={option => option['id']}
                        getOptionLabel={option => `${option.name}`}
                    />
                </form>
                {selectedClass && !class_subjects_loading && <>
                    {isEmpty(class_subjects) ? <h4 className='m-3 text-white text-center'>No subject exist against this class.</h4> :
                        <div className='row mt-4 mx-0 w-100 allForms'>
                            <h4 className='col-2 py-3 gold text-center custom-shadow '>Code</h4>
                            <h4 className='col-5 py-3 gold text-center custom-shadow '>Subject</h4>
                            <h4 className='col-5 py-3 gold text-center custom-shadow '>Teacher</h4>
                            {class_subjects?.map(subject => <>
                                <h6 className='col-2 py-3 text-white text-center custom-shadow '>{subject?.code}</h6>
                                <h6 className='col-5 py-3 text-white text-center custom-shadow '>{subject?.name}</h6>
                                <h6 className='col-5 py-3 text-white text-center custom-shadow '>{subject?.teacher?.first_name + ' ' + subject?.teacher?.last_name}</h6>
                            </>)
                            }
                        </div>}
                    <Link to={`/editSubject/${selectedClass?.id}`} className='btn btn-success w-100'>Edit {selectedClass?.name} Class Subjects</Link>
                </>}
            </div>}
    </div>
}
export default Subjects;