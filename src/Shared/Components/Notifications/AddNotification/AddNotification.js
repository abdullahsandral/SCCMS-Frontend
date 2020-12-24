import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Spinner from '../../../Components/UI Element/Spinner';
import Backdrop from '../../../Components/Backdrop/Backdrop';
import ImageInput from '../../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , MAX_LENGTH_VALIDATOR} from '../../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../../Shared/Hooks/Form-Hook';
import classes from './AddNotification.module.css';

const AddNotification = props =>
{
    const history = useHistory()

    const [addingNotifiation, setAddingNotification] = useState(false);
    const [creatorImage ,setCreatorImage] = useState('');
    const [formState , inputChangeHandler] = useForm({
        creatorName : {
            inputValue : '',
            inputisValid : false
        },
        subject : {
            inputValue : '',
            inputisValid : false
        },
        description : {
            inputValue : '',
            inputisValid : false
        }
    } , false)
    
    const addNotificstionHandler = async e =>
    {
        e.preventDefault(); 
        console.log(creatorImage);
        const {creatorName,subject,description} = formState.inputs;
        const NotificationFormData = new FormData();
        NotificationFormData.append('creatorName', creatorName.inputValue)
        NotificationFormData.append('subject', subject.inputValue)
        NotificationFormData.append('description', description.inputValue)
        NotificationFormData.append('notificationImage', creatorImage)
        try 
        { 
            const response = await fetch(`http://localhost:5000/api/shared/notifications`,
            {
                method :    'POST',
                body   :    NotificationFormData,
            });
            const responseData = await response.json();
            
            if(!response.ok)
            {
                setAddingNotification(false)
                alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
            }
            else
            {
                setAddingNotification(false)
                history.push('/notifications')
            }
        } catch (error) { setAddingNotification(false);    alert("OKKKKK ERRORRR ..."+error)   }
    }


    return <>
        <div className={classes.editNotification}>
        {addingNotifiation && 
        <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Adding Notification...</h2>
        </Backdrop>
        }
            <h3>Add Notification</h3>
            <form onSubmit={addNotificstionHandler}>
                <div className={classes.userName}> <Input  
                    id = "creatorName" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Your Name"
                    Error = "Name Field is Required with MAXIMUM LENGTH of 25 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(25)]} 
                /></div>
                <div className={classes.subject}> <Input  
                    id = "subject" type = "Input" fieldType = 'text' 
                    pHolder = "Enter Notification Subject"
                    Error = "Subject Field is Required with MAXIMUM LENGTH of 50 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(50)]} 
                /></div>
                <div  className={classes.image}><ImageInput 
                    id='userImage' Error = "Please Pick an Image" height = '200px' maxSize = {3}
                    onInputChange = {(id,image,valid) => setCreatorImage(image)}
                /></div>
                <div className={classes.description}> <Input  
                    id = "description" fieldType = 'text' 
                    pHolder = "Enter Description"
                    Error = "Description Field is Required with MAXIMUM LENGTH of 200 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(11),MAX_LENGTH_VALIDATOR(200)]} 
                /></div>
                <button  className = {`btn ${formState.formIsValid ? 'btn-outline-success' : 'btn-danger'}`} disabled={!formState.formIsValid}>
                ADD Notification
                </button>
            </form>
        </div>
    </>
}

export default AddNotification;