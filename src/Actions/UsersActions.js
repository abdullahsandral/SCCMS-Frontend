import Axios from 'axios';

import { USER_LOGGED_IN, SIGNIN_LOADING, LOGOUT_USER, SIGNIN_LOADING_OFF } from "./types";

export const UserLogin = userData => async dispatch => {
    try {
        dispatch({ type: SIGNIN_LOADING});
        const res = await Axios.post('shared/signin',userData);

        localStorage.setItem('user',JSON.stringify(res.data));
        dispatch({ type: USER_LOGGED_IN, payload:res.data });
    } catch (error) {
        dispatch({ type: SIGNIN_LOADING_OFF});
    }
}

export const setCurrentUser = user => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    return {
        type: USER_LOGGED_IN,
        payload: userData
    }
}

export const logoutUser = () => async dispatch => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER })
}