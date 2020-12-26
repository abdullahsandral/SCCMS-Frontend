import Axios from 'axios';

export const getAllClasses = id => dispatch => {
  try {
      dispatch({ type: CLASSES_LOADING});
    const res = await Axios.post('shared/signin',userData);

    localStorage.setItem('user',JSON.stringify(res.data));
    dispatch({ type: USER_LOGGED_IN, payload:res.data });
} catch (error) {
    dispatch({ type: SIGNIN_LOADING_OFF});
    toast.error(`LOGIN FAILED INVALID DATA`, );
}
}