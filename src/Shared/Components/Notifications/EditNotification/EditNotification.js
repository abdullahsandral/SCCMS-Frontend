import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ImageInput from '../../../../Shared/Components/UI Element/ImageInput';
import classes from './EditNotification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, getSingleNotification, updateNotification } from '../../../../Actions/NotificationsActions';
import LoadingSpinner from '../../LoadingSpinner.js/LoadingSpinner';
import isEmpty from '../../../Util/Validators/isEmpty';

const notificationDataFormat = { subject: '', description: '', image_url: '' };

const EditNotification = props => {
    const { nID } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { single_notification: notification, notifications_loading } = useSelector(state => state?.notifications);
    const { id: creator_id } = useSelector(state => state.authentication);

    const [notificationData, setNotificationData] = useState({ ...notificationDataFormat })
    const [notificationDataErrors, setNotificationDataErrors] = useState({ ...notificationDataFormat })

    useEffect(() => {
        nID && dispatch(getSingleNotification(nID));
    }, [dispatch, nID])

    useEffect(() => {
        nID && notification && setNotificationData({ ...notification })
    }, [nID, notification])

    const inputChangeHandler = ({ target: { name, value } }) => {
        setNotificationData({ ...notificationData, [name]: value });
        !isEmpty(value) && setNotificationDataErrors({ ...notificationDataErrors, [name]: false })
    }
    const validate = () => {
        let valid = true;
        const errors = { ...notificationDataErrors }
        for (let field in notificationData) {
            if (!notificationData[field]) {
                errors[field] = true;
                valid = false;
            }
        }
        setNotificationDataErrors(errors)
        return valid;
    }
    const editNotificationHandler = async e => {
        e.preventDefault();

        let isValidForm = validate();
        if (!isValidForm) return;

        const { subject, description, image_url } = notificationData;

        const NotificationFormData = new FormData();
        NotificationFormData.append('subject', subject);
        NotificationFormData.append('description', description);
        NotificationFormData.append('notificationImage', image_url);
        console.log('Creator ID : ', creator_id)
        !nID && NotificationFormData.append('creator_id', creator_id);

        nID ? dispatch(updateNotification(nID, NotificationFormData, history)) : dispatch(addNotification(NotificationFormData, history))
    }

    const { subject, description, image_url } = notificationData;
    if (!notification && nID) return <div className={classes.editNotification}> <h3>Loading...</h3> </div>
    else
        return <>
            <div className='background'>
                {notifications_loading && <LoadingSpinner name={`${nID ? 'Editing Notification Data' : 'Adding Notification'}`} />}
                <h3>Edit Notification</h3>
                <form onSubmit={editNotificationHandler} className='custom-form'>
                    <div className='row'>
                        <div className='col-12 col-md-8 d-flex flex-column order-2 order-md-1'>
                            <input
                                className='w-100 form-control'
                                name="subject"
                                type='text'
                                value={subject}
                                placeholder={`Enter Notification Subject`}
                                onChange={inputChangeHandler}
                            />
                            {notificationDataErrors?.subject && <p className='m-0 error-color'>Field is required</p>}
                            <textarea
                                className='w-100 mt-2 flex-grow-1 form-control'
                                name="description"
                                type='text'
                                value={description}
                                placeholder={`Enter Notification Description`}
                                onChange={inputChangeHandler}
                            />
                            {notificationDataErrors?.description && <p className='m-0 error-color'>Field is required</p>}
                        </div>
                        <div className='col-12 col-md-4 order-1 order-md-2'>
                            <ImageInput
                                id='image_url' Error="Please Pick an Image" height='200px'
                                src={image_url ? `http://localhost:5000/uploads/images/${image_url}` : ''}
                                onInputChange={(id, value) => inputChangeHandler({ target: { name: id, value } })}
                            />
                        </div>
                    </div>
                    <button className={`btn w-100 mt-3 btn-success`}>UPDATE Notification</button>
                </form>
            </div>
        </>
}

export default EditNotification;