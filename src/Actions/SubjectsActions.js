import Axios from 'axios';
import { SUBJECTS_LOADING, GET_ONE_CLASS_SUBJECTS, SUBJECTS_LOADING_OFF } from './types';

export const getOneClassSubjects = classId => async dispatch => {
    try {
        dispatch({ type: SUBJECTS_LOADING });
        const res = await Axios.get(`/admin/subjects/${classId}`);
        dispatch({ type: GET_ONE_CLASS_SUBJECTS, payload: res.data });
    } catch (error) {
        dispatch({ type: SUBJECTS_LOADING_OFF });
    }
}

export const updateOneClassSubjects = (classId ,subjectData) => async dispatch => {
    try {console.log(subjectData)
        dispatch({ type: SUBJECTS_LOADING });
        const res = await Axios.post(`/admin/subjects/${classId}`, { subjects: subjectData });
        console.log(res)
        // dispatch({ type: GET_ONE_CLASS_SUBJECTS, payload: res.data });
    } catch (error) {
        dispatch({ type: SUBJECTS_LOADING_OFF });
    }
}