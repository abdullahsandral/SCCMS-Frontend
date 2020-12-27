import { NOTIFICATIONS_LOADING, NOTIFICATIONS_LOADING_OFF, GET_ALL_NOTIFICATIONS, GET_SINGLE_NOTIFICATION } from "../Actions/types"

const initialState = {
   notifications: null,
   single_notification: null,
   notifications_loading: false
}

const notificationsReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_NOTIFICATIONS:
         return {
            ...state,
            notifications: action.payload,
            notifications_loading: false
         }
      case GET_SINGLE_NOTIFICATION:
         return {
            ...state,
            single_notification: action.payload,
            notifications_loading: false
         }
      case NOTIFICATIONS_LOADING:
         return {
            ...state,
            notifications_loading: true
         }
      case NOTIFICATIONS_LOADING_OFF:
         return {
            ...state,
            notifications_loading: false
         }
      default:
         return state
   }
}
export default notificationsReducer;