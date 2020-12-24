import { combineReducers } from 'redux';

import Authencation_Reducer from './authenticationReducer'
import Classes_Redcer from './classesReducer';

export default combineReducers({
    authentication: Authencation_Reducer,
    classes: Classes_Redcer,
})