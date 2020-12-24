import {SET_ALL_CLASSES} from '../Actions/types';
const initialState = {
    classes : []
}

const classesReducer = ( state = initialState, action) => {
    switch(action.type){
        case SET_ALL_CLASSES : 
        return {
            ...state,
            classes : action.payload
        }
        default :
        return state
    }
}
export default classesReducer;