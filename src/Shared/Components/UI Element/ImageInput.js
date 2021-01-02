import React, { useRef, useState, useEffect } from 'react';

import classes from './ImageInput.module.css';

const ImageInput = props => {
    const [image , setImage] = useState();
    const [imagePreview , setImagePreview] = useState(props.src);
    const fileInputRef = useRef();

    useEffect( () =>
    {
        if(!image) return
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = () => 
        {
            setImagePreview(fileReader.result);
        }
    },[image])

    const pickImageHandler = () =>
    {
        fileInputRef.current.click();
    }
    const imagePickedHandler = e =>
    {
        let pickedImage , pickedImageISValid;
        if(e.target.files && e.target.files.length===1)
        {
            pickedImage  = e.target.files[0];
            setImage(pickedImage);
            if(pickedImage.size > 5242880) alert(`WARRNING \nImage is too Large\nPlease Replace with another one\nMAXIMUM IMAGE SIZE = ${props.maxSize||5}MB`)
            pickedImageISValid = true
        }
        else if(image) return;
        else  pickedImageISValid = false;
        props.onInputChange(props.id, pickedImage, pickedImageISValid)
    }

    useEffect(() => {
        setImagePreview(props.src)
    },[props.src])
    // const onInputChange = props.onInputChange, id = props.id;
    // useEffect( () => {if(imagePreview) onInputChange(id, image || imagePreview,true) },[id,imagePreview,onInputChange, image])

    return(
        <>
            <input 
                id={props.id} 
                type='file' 
                ref = {fileInputRef}
                accept='.jpg, .jpeg, .png,' 
                style={{display : 'none'}}
                onChange = {imagePickedHandler}
            />

            <div className={classes.imgDiv}>
                <button type='button' className='w-100' onClick = {pickImageHandler}>
                    {imagePreview &&  <img src={imagePreview} style={{maxHeight: props.height}}  alt='PREVIEW'/>}
                    {!imagePreview && <b><p  style={{maxHeight: props.height}}>Please Pick an Image</p></b>}
                </button>
            </div>
        </>
    ) 
}

export default ImageInput;
