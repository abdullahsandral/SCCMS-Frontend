import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../Actions/types"

const initialState = {
    authenticated: false,
    userName: null,
    userId: null,
    userImg: null
}

const AuthenticationReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case USER_LOGGED_IN:console.log('In A Reducer : ', action.payload)
            return {
                ...state,
                authenticated: !!action.payload.userId,
                userName: action.payload.name,
                userId: action.payload.userId,
                userImg: action.payload.userImg
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                authenticated: false
            }
        default:
            return state
    }
}
export default AuthenticationReducer;