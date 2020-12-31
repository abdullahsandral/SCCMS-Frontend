import React from 'react';

// import classes from './ShowAllSubjects.module.css';
import isEmpty from '../../../Shared/Util/Validators/isEmpty';

const ShowAllSubjects = props =>
{
    const { subjects } = props
    return isEmpty(subjects) ? <h3>No Subject exist against this class.</h3> :
    <>
        <div>
            <h3>Subject Name</h3>
            <h3>Teacher Name</h3>
        </div>
        {subjects.map(subject => 
        <div key={subject?.id}>
            <h5>{subject?.name}</h5>
            <h5>{subject?.teacher.first_name + ' ' + subject?.teacher.last_name}</h5>
        </div>)}
    </>
}

export default ShowAllSubjects;