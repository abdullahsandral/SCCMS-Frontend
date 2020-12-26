import { USER_LOGGED_IN, LOGOUT_USER, SIGNIN_LOADING, SIGNIN_LOADING_OFF } from "../Actions/types"

const initialState = {
   authenticated: false,
   user_email: null,
   user_id: null,
   user_image: null,
   user_role: null,
   signin_loading: false
}

const AuthenticationReducer = (state = initialState, action) => {

   switch (action.type) {
      case USER_LOGGED_IN:
         const { user_role, user_id, user_email, user_image } = action.payload
         return {
            ...state,
            authenticated: true,
            user_email: user_email,
            user_id: user_id,
            user_image: user_image,
            user_role: user_role,
            signin_loading: false
         }
      case LOGOUT_USER:
         return {
            ...state,
            authenticated: false,
            user_email: null,
            user_id: null,
            user_image: null,
            user_role: null,
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