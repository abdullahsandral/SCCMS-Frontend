import Axios from 'axios';

import { TEACHERS_LOADING, TEACHERS_LOADING_OFF, GET_ALL_TEACHERS, GET_SINGLE_TEACHER } from "./types";

export const getAllTeachers = () => async dispatch => {
    try {
        dispatch({ type: TEACHERS_LOADING } );
        const res = await Axios.get('/admin/teachers')
        dispatch( { type: GET_ALL_TEACHERS, payload: res?.data })
    } catch (error) {
        dispatch({ type: TEACHERS_LOADING_OFF});
    }
}

export const getSingleTeacher = id => async dispatch => {
    try {
        dispatch({ type: TEACHERS_LOADING } );
        const res = await Axios.get(`admin/teachers/${id}`);
        dispatch( { type: GET_SINGLE_TEACHER, payload: res?.data } );
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: TEACHERS_LOADING_OFF});
    }
}

export const updateTeacher = (id, data, history) => async dispatch => {
    try {
        dispatch({ type: TEACHERS_LOADING } );
        await Axios.post(`admin/teachers/${id}`,data);
        dispatch({ type: TEACHERS_LOADING_OFF});
        history && history.push('/teachers')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: TEACHERS_LOADING_OFF});
    }
}

export const addTeacher = (data, history) => async dispatch => {
    try {
        dispatch({ type: TEACHERS_LOADING } );
        await Axios.post(`admin/teachers`,data);
        dispatch({ type: TEACHERS_LOADING_OFF});
        history && history.push('/teachers')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: TEACHERS_LOADING_OFF});
    }
}
