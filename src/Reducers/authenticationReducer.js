import { USER_LOGGED_IN, LOGOUT_USER, SIGNIN_LOADING, SIGNIN_LOADING_OFF } from "../Actions/types"

const initialState = {
   authenticated: false,
   user_name: null,
   user_id: null,
   image_url: null,
   role: null,
   signin_loading: false
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
            signin_loading: false
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
      case SIGNIN_LOADING:
         return {
            ...state,
            signin_loading: true
         }
      case SIGNIN_LOADING_OFF:
         return {
            ...state,
            signin_loading: false
         }
      default:
         return state
   }
}
export default AuthenticationReducer;