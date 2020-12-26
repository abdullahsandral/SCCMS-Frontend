import { SET_CLASSES } from '../Actions/types';
const initialState = {
	classes: []
}

const classesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CLASSES:
			return {
				...state,
				classes: action.payload
			}
		default:
			return state
	}
}
export default classesReducer;