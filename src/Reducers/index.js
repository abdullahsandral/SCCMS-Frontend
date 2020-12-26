import { combineReducers } from 'redux';

import Authencation_Reducer from './authenticationReducer'
import Classes_Redcer from './classesReducer';
import Teachers_Redcer from './TeachersReducers';

export default combineReducers({
    authentication: Authencation_Reducer,
    classes: Classes_Redcer,
    teachers: Teachers_Redcer
})