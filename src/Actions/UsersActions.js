import Axios from 'axios';
import { USER_LOGGED_IN } from "./types";

export const UserLogin = userData => async dispatch => {
    try {console.log(USER_LOGGED_IN)
        const res = await Axios.post('shared/signin',userData);console.log(userData)
        console.log(res.data)
        const {userId, userImage, userName} = res.data;
        console.log(userImage,userName,userId)
        dispatch({type: USER_LOGGED_IN, payload:{name: userName || 'Admin', userImg: userImage, userId}});
    } catch (error) {
        console.log('ERROR OCCURED')
    }
    

}