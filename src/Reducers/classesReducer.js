import { GET_ALL_CLASSES, CLASSES_LOADING, CLASSES_LOADING_OFF } from '../Actions/types';
const initialState = {
	classes: [],
	classes_loading: false
}

const classesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_CLASSES:
			return {
				...state,
				classes: action.payload,
				classes_loading: false
			}
		case CLASSES_LOADING:
			return {
				...state,
				classes_loading: true
			}
		case CLASSES_LOADING_OFF:
			return {
				...state,
				classes_loading: false
			}
		default:
			return state
	}
}
export default classesReducer;