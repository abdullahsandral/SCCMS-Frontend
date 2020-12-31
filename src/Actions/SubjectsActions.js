import Axios from 'axios';
import { SUBJECTS_LOADING, GET_ONE_CLASS_SUBJECTS, SUBJECTS_LOADING_OFF } from './types';

export const getOneClassSubjects = classId => async dispatch => {
  try {
      dispatch({ type: SUBJECTS_LOADING});
      const res = await Axios.get(`/admin/subjects/${classId}`);
      dispatch({ type: GET_ONE_CLASS_SUBJECTS, payload:res.data });
} catch (error) {
    dispatch({ type: SUBJECTS_LOADING_OFF});
}
}