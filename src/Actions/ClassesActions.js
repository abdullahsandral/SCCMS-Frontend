import Axios from 'axios';
import { CLASSES_LOADING, CLASSES_LOADING_OFF, GET_ALL_CLASSES } from './types';

export const getAllClasses = () => async dispatch => {
  try {
      dispatch({ type: CLASSES_LOADING});
      const res = await Axios.get('shared/classes');
      dispatch({ type: GET_ALL_CLASSES, payload:res.data });
} catch (error) {
    dispatch({ type: CLASSES_LOADING_OFF});
}
}