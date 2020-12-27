import Axios from 'axios';

import { STUDENTS_LOADING, STUDENTS_LOADING_OFF, GET_ALL_STUDENTS, GET_SINGLE_STUDENT } from "./types";

export const getAllStudents = () => async dispatch => {
    try {
        dispatch({ type: STUDENTS_LOADING } );
        const res = await Axios.get('/admin/students')
        dispatch( { type: GET_ALL_STUDENTS, payload: res?.data })
    } catch (error) {
        dispatch({ type: STUDENTS_LOADING_OFF});
    }
}

export const getSingleStudent = id => async dispatch => {
    try {
        dispatch({ type: STUDENTS_LOADING } );
        const res = await Axios.get(`admin/students/${id}`);
        dispatch( { type: GET_SINGLE_STUDENT, payload: res?.data } );
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: STUDENTS_LOADING_OFF});
    }
}

export const updateStudent = (id, data, history) => async dispatch => {
    try {
        dispatch({ type: STUDENTS_LOADING } );
        await Axios.post(`admin/students/${id}`,data);
        dispatch({ type: STUDENTS_LOADING_OFF});
        history && history.push('/students')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: STUDENTS_LOADING_OFF});
    }
}

export const addStudent = (data, history) => async dispatch => {
    try {
        dispatch({ type: STUDENTS_LOADING } );
        await Axios.post(`admin/students`,data);
        dispatch({ type: STUDENTS_LOADING_OFF});
        history && history.push('/students')
    } catch (error) {
        console.log('ERROR OCCURED')
        dispatch({ type: STUDENTS_LOADING_OFF});
    }
}
