import { GET_ONE_CLASS_SUBJECTS, SUBJECTS_LOADING_OFF, SUBJECTS_LOADING } from '../Actions/types';
const initialState = {
	class_subjects: [],
	class_subjects_loading: false
}

const subjectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ONE_CLASS_SUBJECTS:
			return {
				...state,
				class_subjects: action.payload,
				class_subjects_loading: false
			}
		case SUBJECTS_LOADING:
			return {
				...state,
				class_subjects_loading: true
			}
		case SUBJECTS_LOADING_OFF:
			return {
				...state,
				class_subjects_loading: false
			}
		default:
			return state
	}
}
export default subjectsReducer;