import Axios from 'axios';

import { NOTIFICATIONS_LOADING, NOTIFICATIONS_LOADING_OFF, GET_ALL_NOTIFICATIONS, GET_SINGLE_NOTIFICATION } from "./types";

export const getAllNotifications = () => async dispatch => {
    try {
        dispatch({ type: NOTIFICATIONS_LOADING } );
        const res = await Axios.get('/shared/notifications')
        dispatch( { type: GET_ALL_NOTIFICATIONS, payload: res?.data })
    } catch (error) {
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
    }
}

export const getSingleNotification = id => async dispatch => {
    try {
        dispatch({ type: NOTIFICATIONS_LOADING } );
        const res = await Axios.get(`shared/notifications/${id}`);
        dispatch( { type: GET_SINGLE_NOTIFICATION, payload: res?.data } );
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
    }
}

export const updateNotification = (id, data, history) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATIONS_LOADING } );
        await Axios.post(`shared/notifications/${id}`,data);
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
        history && history.push('/notifications')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
    }
}

export const addNotification = (data, history) => async dispatch => {
    try {
        dispatch({ type: NOTIFICATIONS_LOADING } );
        await Axios.post(`shared/notifications`,data);
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
        history && history.push('/notifications')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: NOTIFICATIONS_LOADING_OFF});
    }
}
