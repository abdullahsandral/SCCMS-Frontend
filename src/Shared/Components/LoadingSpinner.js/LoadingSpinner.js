import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../UI Element/Spinner';

const LoadingSpinner = ({ name, color }) => {
   return <Backdrop>
      <Spinner />
      <h2 style={{ color: color ? color : 'gold' }}>{name}</h2>
   </Backdrop>
}

export default LoadingSpinner;