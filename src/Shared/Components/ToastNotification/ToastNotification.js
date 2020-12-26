import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const ToastNotification = ({ message, type }) => {
    const notify = () => toast(`${message}`);
    return <div>
        <button onClick={notify}>{type} ! </button>
        <ToastContainer />
      </div>
}
export default ToastNotification;