import { USER_LOGGED_IN, LOGOUT_USER, GET_ALL_USERS, USERS_LOADING, USERS_LOADING_OFF } from "../Actions/types"

const initialState = {
   authenticated: false,
   user_name: null,
   user_id: null,
   image_url: null,
   role: null,
   users: null,
   users_loading: false
}

const AuthenticationReducer = (state = initialState, action) => {

   switch (action.type) {
      case USER_LOGGED_IN:
         const { user_id, image_url, user_name, role  } = action.payload
         return {
            ...state,
            authenticated: true,
            user_name,
            user_id,
            image_url,
            role,
            users_loading: false
         }
      case GET_ALL_USERS:
         return {
            ...state,
            users: action.payload,
            users_loading: false
         }
      case LOGOUT_USER:
         return {
            ...state,
            authenticated: false,
            user_name: null,
            user_id: null,
            image_url: null,
            role: null,
         }
      case USERS_LOADING:
         return {
            ...state,
            users_loading: true
         }
      case USERS_LOADING_OFF:
         return {
            ...state,
            users_loading: false
         }
      default:
         return state
   }
}
export default AuthenticationReducer;