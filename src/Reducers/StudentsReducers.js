import { STUDENTS_LOADING, STUDENTS_LOADING_OFF, GET_ALL_STUDENTS, GET_SINGLE_STUDENT } from "../Actions/types"

const initialState = {
   students: null,
   single_student: null,
   students_loading: false
}

const studentsReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_STUDENTS:
         return {
            ...state,
            students: action.payload,
            students_loading: false
         }
      case GET_SINGLE_STUDENT:
         return {
            ...state,
            single_student: action.payload,
            students_loading: false
         }
      case STUDENTS_LOADING:
         return {
            ...state,
            students_loading: true
         }
      case STUDENTS_LOADING_OFF:
         return {
            ...state,
            students_loading: false
         }
      default:
         return state
   }
}
export default studentsReducer;