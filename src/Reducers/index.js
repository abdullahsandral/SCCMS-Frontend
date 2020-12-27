import { combineReducers } from 'redux';

import Authencation_Reducer from './authenticationReducer'
import Classes_Redcer from './classesReducer';
import Teachers_Redcer from './TeachersReducers';
import Students_Redcer from './StudentsReducers';

export default combineReducers({
    authentication: Authencation_Reducer,
    classes: Classes_Redcer,
    teachers: Teachers_Redcer,
    students: Students_Redcer
})