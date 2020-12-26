import React, { useState, useEffect } from 'react';

// import classes from './ImageInput.module.css';

const ImageInput = props =>
{
    const inputChangeHandler = props.inputChangeHandler, id = props.id
    const [value, setValue] = useState(props.iValue)
    const valueChangeHandler = e => {setValue(e.target.value); inputChangeHandler(id,e.target.value,true)}
    
    useEffect(() => { if(!value) return; inputChangeHandler(id,value,true); },[id,value,inputChangeHandler])

    return <>
        <input checked={props.iValue===props.value} type='radio' 
        onChange={valueChangeHandler} value={props.value} name={props.name} /> {props.title}
    </>
}

export default ImageInput;