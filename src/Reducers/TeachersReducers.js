import { TEACHERS_LOADING, TEACHERS_LOADING_OFF, GET_ALL_TEACHERS, GET_SINGLE_TEACHER } from "../Actions/types"

const initialState = {
   teachers: null,
   single_teacher: null,
   teachers_loading: false
}

const AuthenticationReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_TEACHERS:
         return {
            ...state,
            teachers: action.payload,
            teachers_loading: false
         }
      case GET_SINGLE_TEACHER:
         return {
            ...state,
            single_teacher: action.payload,
            teachers_loading: false
         }
      case TEACHERS_LOADING:
         return {
            ...state,
            teachers_loading: true
         }
      case TEACHERS_LOADING_OFF:
         return {
            ...state,
            teachers_loading: false
         }
      default:
         return state
   }
}
export default AuthenticationReducer;