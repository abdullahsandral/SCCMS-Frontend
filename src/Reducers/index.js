import { combineReducers } from 'redux';

import Authencation_Reducer from './authenticationReducer'
import Classes_Redcer from './ClassesReducer';
import Teachers_Redcer from './TeachersReducers';
import Students_Redcer from './StudentsReducers';
import Notifications_Reducer from './NotificationsReducers';
import Subjects_Reducer from './SubjectsReducer';

export default combineReducers({
    authentication: Authencation_Reducer,
    classes: Classes_Redcer,
    teachers: Teachers_Redcer,
    students: Students_Redcer,
    subjects: Subjects_Reducer,
    notifications: Notifications_Reducer
})