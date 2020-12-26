import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Spinner from '../../../Components/UI Element/Spinner';
import Backdrop from '../../../Components/Backdrop/Backdrop';
import ImageInput from '../../../../Shared/Components/UI Element/ImageInput';
import Input from '../../../../Shared/Components/UI Element/Input';
import {MIN_LENGTH_VALIDATOR , MAX_LENGTH_VALIDATOR} from '../../../../Shared/Util/Validators/Validator';
import {useForm} from '../../../../Shared/Hooks/Form-Hook';
import classes from './EditNotification.module.css';

const EditNotification = props =>
{
    const nID = useParams().nID;
    const history = useHistory();

    const [notificationImage, setNotificationImage] = useState();
    const [creatorName, setCreatorName] = useState('');

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [formState , inputChangeHandler, dataSetter] = useForm({

        subject : {
            inputValue : '',
            inputisValid : false
        },
        description : {
            inputValue : '',
            inputisValid : false
        },
    } , false)

    useEffect(()=>
    {  
        const getNotificationById = async () =>
        {
            try 
            {
                const response = await fetch(`http://localhost:5000/api/shared/notifications/${nID}`);
                const data = await response.json();

                if(response.ok)
                {
                    dataSetter(
                        {
                            subject : {
                                inputValue : data.Notification_Subject,
                                inputisValid : true
                            },
                            description : {
                                inputValue : data.Description,
                                inputisValid : true
                            }
                        } , true)
                    setNotificationImage(data.Notification_Image);
                    setCreatorName(data.Creator_Name)
                    setLoading(false);
                }
                else history.push('/notifications')
            } catch (error) {   alert(error); history.push('/notifications'); }
        }
        getNotificationById();
    },[dataSetter,history,nID])

    const editNotificationHandler = async e =>
    {
        e.preventDefault(); 
        console.log(notificationImage);
        const {subject,description} = formState.inputs;
        const NotificationFormData = new FormData();
        NotificationFormData.append('subject', subject.inputValue)
        NotificationFormData.append('description', description.inputValue)
        NotificationFormData.append('notificationImage', notificationImage)
        try 
        { setEditing(true);
            const response = await fetch(`http://localhost:5000/api/shared/notifications/${nID}`,
            {
                method :    'POST',
                body   :    NotificationFormData,
            });
            const responseData = await response.json();
            
            if(!response.ok)
            {
                setEditing(false);
                history.push('/notifications')
                alert("OK...."+responseData.errorCode+"\n"+responseData.errorMsg)
            }
            else
            {
                setEditing(false);
                history.push('/notifications')
            }
        } catch (error) { setEditing(false);   alert("OKKKKK ERRORRR ..."+error)   }
    }

    if(loading) return   <div className={classes.editNotification}> <h2 style={{color:'gold'}}>Loading Notification...</h2>  </div>
    else
    return <>
        <div className={classes.editNotification}>
        {editing && <Backdrop>
            <Spinner />
            <h2 style={{color:'gold'}}>Adding Notification...</h2>
        </Backdrop>}
            <h3>Edit Notification</h3>
            <form onSubmit={editNotificationHandler}>
                <div className={classes.userName}><Input 
                    id = "userName" type = "Input" fieldType = 'text'  initialValue = {creatorName}
                    pHolder = "Creator Name" isValid = {true} disabled={true}
                    Error = "Name Field is Required with MAXIMUM LENGTH of 25 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(25)]}  
                /></div>
                <div className={classes.subject}><Input  
                    id = "subject" type = "Input" fieldType = 'text'  initialValue = {formState.inputs.subject.inputValue}
                    pHolder = "Notification Subject"  isValid = {formState.inputs.subject.inputisValid} 
                    Error = "Subject Field is Required with MAXIMUM LENGTH of 50 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(1),MAX_LENGTH_VALIDATOR(50)]} 
                /></div>
                <div  className={classes.image}><ImageInput 
                    id='notificationImage' Error = "Please Pick an Image If you Want" height = '200px' 
                    src={`http://localhost:5000/uploads/images/${notificationImage}`}
                    onInputChange = {(id,image,valid) => setNotificationImage(image)}
                /></div>
                <div className={classes.description}><Input  
                    id = "description" fieldType = 'text'  initialValue = {formState.inputs.description.inputValue}
                    pHolder = "Notification Description"  isValid = {formState.inputs.description.inputisValid} 
                    Error = "Description Field is Required with MAXIMUM LENGTH of 200 Words" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(2),MAX_LENGTH_VALIDATOR(200)]} 
                /></div>
                <button  className = {`btn ${formState.formIsValid ? 'btn-outline-success' : 'btn-danger'}`}  disabled={!formState.formIsValid}>
                UPDATE Notification
                </button>
            </form>
        </div>
    </>
}

export default EditNotification;