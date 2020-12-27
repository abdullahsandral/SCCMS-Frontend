import React , {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {UserLogin} from '../../Actions/UsersActions';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import classes from './LoginForm.module.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

const errorDetails = {
    user_name: 'Username is a required Field', password: 'Password is a required Field', role: 'Role is a required Field'
}

const LoginForm = () =>
{ 
    const history = useHistory()
    const dispatch = useDispatch();
    const { authenticated, signin_loading } = useSelector( state => {console.log(state); return state.authentication});

    const [ loginData, setLoginData ] = useState({ user_name: '', password: '', role: '' });
    const [ loginDataErrors, setLoginDataErrors ] = useState({ user_name: false, password: false, role: false });
    
    const inputChangeHandler = ({ target: { value, name }}) => {
        setLoginData({ ...loginData, [name]: value });
        !isEmpty(value) && setLoginDataErrors({ ...loginDataErrors, [name]: false })
    }
    const validateForm = () => {
        let valid = true;
        const errors = { ...loginDataErrors }
        for(let field in loginData) {
            if(isEmpty(loginData[field])) {
                errors[field] = errorDetails[field];
                valid=false;
            }
        }
        setLoginDataErrors(errors)
        return valid;
    }
    const submitForm = async e =>
    {
        e.preventDefault();
        const isValid = validateForm()
        isValid && dispatch(UserLogin(loginData))
    }  
    useEffect(() => {
        authenticated && history.push('/')
    }, [authenticated, history])

    const { user_name, role, password} = loginData
    return(
        <div className={classes.center}>
             {signin_loading && 
            <Backdrop>
                <Spinner />
                <h2 style={{color:'gold'}}>Signing In</h2>
            </Backdrop>
            }
            <form className = {classes.addPlaceFORM} onSubmit = {submitForm}>
                <h3 style={{alignSelf: 'center'}}>SignIn</h3>
                <label><b>Username</b></label>
                <input name='user_name' type='text' placeholder='Enter your username' value={user_name} onChange={inputChangeHandler} />
                {loginDataErrors?.user_name && <p>{loginDataErrors?.user_name}</p>}
                <label><b>Select Your Role</b></label>
                <select name='role' className= {classes.classSelecter} value={role} onChange={inputChangeHandler}>
                    <option value=''>Select A Role</option>
                    <option value='admin'>Admin</option>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                </select>
                {loginDataErrors?.role && <p>{loginDataErrors?.role}</p>}
                <label><b>Password</b></label>
                <input name='password' type='password' placeholder='Enter your username' value={password} onChange={inputChangeHandler} />
                {loginDataErrors?.password && <p>{loginDataErrors?.password}</p>}
                <button className = 'btn btn-outline-success p-2 mt-3'>
                    LOG IN 
                </button>
            </form>
        </div>
    )
}

export default LoginForm;