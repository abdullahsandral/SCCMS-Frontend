import React from 'react';

// import classes from './ShowAllSubjects.module.css';

const ShowAllSubjects = props =>
{
    const {subjects} = props;
    return <>
        <div>
            <h3>Subject Name</h3>
            <h3>Teacher Name</h3>
        </div>
        {subjects.map(subject => 
        <div key={subject.Subject_ID}>
            <h5>{subject.Subject_Name}</h5>
            <h5>{subject.First_Name + ' ' + subject.Last_Name}</h5>
        </div>)}
    </>
}

export default ShowAllSubjects;