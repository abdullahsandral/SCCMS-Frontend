import React , {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {UserLogin} from '../../Actions/UsersActions';
import Input from '../../Shared/Components/UI Element/Input';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import {AuthContext} from '../../Shared/Contexts/Authentication-Context';
import {useForm} from '../../Shared/Hooks/Form-Hook';
import {MIN_LENGTH_VALIDATOR , EMAIL_VALIDATOR} from '../../Shared/Util/Validators/Validator';
import classes from './LoginForm.module.css';
import { useSelector } from 'react-redux';

const LoginForm = () =>
{ 
    // const Authenticated = useContext(AuthContext);

    const [signIn,setSignIn] = useState(false);

    const dispatch = useDispatch();
    const Authenticated = useSelector( state => state.authentication);
    console.log(Authenticated);
    const [formState , inputChangeHandler] = useForm({
        userName : {
            inputValue : '',
            inputisValid : false
        },
        role :{
            inputValue : '',
            inputisValid : false
        },
        password : {
            inputValue : '',
            inputisValid : false
        },
    } , false)
      
    const submitForm = async e =>
    {
        e.preventDefault();
        const data = {
            userName: formState.inputs.userName.inputValue,
            password: formState.inputs.password.inputValue,
            role: formState.inputs.role.inputValue,
        }
        dispatch(UserLogin(data))
        // try 
        // {setSignIn(true);
        //     const response = await fetch(`http://localhost:5000/api/shared/signin`,
        //     {
        //         method : 'POST',
        //         headers : {'Content-Type' : 'application/json'},
        //         body : JSON.stringify(
        //             {
        //                 userName : formState.inputs.userName.inputValue,
        //                 password : formState.inputs.password.inputValue,
        //                 role : formState.inputs.role.inputValue,
        //             }
        //         )
        //     })

        //     const responseData = await response.json();
        //     if(!response.ok)
        //     {
        //         setSignIn(false);   
        //         alert(responseData.errorCode+"\n"+responseData.errorMsg);
        //     }
        //     else
        //     {
        //         setSignIn(false);   
        //         Authenticated.login(responseData.userRole,responseData.userId,responseData.userImage)
        //     }

        // } catch (error) {    setSignIn(false);   alert(error);  }
    }  

    useEffect(()=> {
        inputChangeHandler('role','Student',true);
        // if(Authenticated) history.push
        },[inputChangeHandler])
   
    return(
        <div className={classes.center}>
             {signIn && 
            <Backdrop>
                <Spinner />
                <h2 style={{color:'gold'}}>Signing In</h2>
            </Backdrop>
            }
            <form className = {classes.addPlaceFORM} onSubmit = {submitForm}>
                <h3 style={{alignSelf: 'center'}}>SignIn</h3>
                <Input  
                    id = "userName" type = "Input" fieldType = 'email' Label = "Email" 
                    pHolder = "Enter Email Address" rClass = 'gYellow'
                    Error = "Please Enter a Valid Email" onInputChange = {inputChangeHandler}
                    validators = {[EMAIL_VALIDATOR()]} 
                />
                <label><b>Select Your Role</b></label>
                <select className= {classes.classSelecter} value={formState.inputs.role.inputValue}
                onChange={e => inputChangeHandler('role',e.target.value,!!e.target.value)}>
                    <option value=''>Select A Role</option>
                    <option value='Admin'>Admin</option>
                    <option value='Student'>Student</option>
                    <option value='Teacher'>Teacher</option>
                </select>
                <Input  
                    id = "password" type = "Input" fieldType = 'password'  Label = "Password" 
                    pHolder = "Enter Password" rClass = 'gYellow'
                    Error = "Password Field is Required" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1)]}
                />

                <button className = 'btn btn-outline-success p-2 mt-3' disabled={!formState.formIsValid}>
                LOG IN 
                </button>
            </form>
        </div>
    )
}

export default LoginForm;