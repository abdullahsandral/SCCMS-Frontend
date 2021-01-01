import React, { useEffect, useState } from 'react';

import Input from '../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , MAX_LENGTH_VALIDATOR} from '../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from './EditSubject.module.css';

const EditSubject = ({ taeachers, subjects }) =>
{   
    const [ updatedSubjects, setUpdatedSubjects ] = useState( subjects?.map( ({ id, code, name, teacher_id, class_id }) => ({ id, code, name, teacher_id, class_id })))
    console.log(updatedSubjects)
    return <>
    </> 
}

export default EditSubject;