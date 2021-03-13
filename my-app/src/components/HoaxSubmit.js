import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {useApiProgress} from '../shared/ApiProgress';
import Button from './Button';
import Input from './Input';
import HoaxImage from './HoaxImage';

const HoaxSubmit = () => {

    const [focused, setFocused] = useState(false);
    const [hoax,setHoax] = useState('');
    const [errors , setErrors] = useState({});
    const [hoaxImage , setHoaxImage] = useState();
    const [attachmentId, setAttachmentId] = useState();

    const isPendingApi = useApiProgress("post" , "/api/1.0/hoaxes",true);
    const pendingFileUpload = useApiProgress("post","/api/1.0/hoax-attachments",true);

    let rows = 1;

    if(focused){
        rows = 3;
    }
    
    useEffect(() => {
        if(!focused){
            setHoax('');
            setErrors({});
            setHoaxImage();
            setAttachmentId(undefined);
        }
    },[focused])


    const {image} = useSelector((store) =>({
            image: store.image
    }));

    useEffect(() => {
        setErrors({});
    },[hoax])

    const onClickHoaxify = async() => {
        const body = {
            content: hoax,
            attachmentId: attachmentId
        }
        try{
            const response = await postHoax(body);
            setFocused(false);
        }catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
            }
        }
        
    }

    const onChangeFile = event => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setHoaxImage(fileReader.result);
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    };


    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('image',file);
        try{
           const response = await postHoaxAttachment(attachment);
           setAttachmentId(response.data.id);
        }catch(error){

        }
    }

    const {t} = useTranslation();
    
    
    let textAreaClass = 'form-control';
    if(errors.content){
        textAreaClass += ' is-invalid';
    }

    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault image={image} width="32" height="32"/>
            <div className="flex-fill ml-3">
                <textarea value = {hoax} className={textAreaClass} onFocus={() => {
                    setFocused(true);
                }} onChange={(event) => {
                    setHoax(event.target.value);
                }} rows={rows}/>
                <div className="invalid-feedback">
                        {errors.content}
                    </div>
                {focused && 
                <>
                {!hoaxImage && <Input type="file" onChange={onChangeFile}/>}
                {hoaxImage &&  <HoaxImage image={hoaxImage} uploading={pendingFileUpload}/>}
                <div className="d-flex justify-content-between mt-1">

                 <Button className = "btn btn-primary" onClick={onClickHoaxify} text="Hoaxify" disabled={isPendingApi || pendingFileUpload} spinner={isPendingApi}/>
                  <Button className = "btn btn-light d-inline-flex" onClick = {() =>{setFocused(false)}} text={
                      <>
                       <span className="material-icons">
                       close
                        </span>
                        {t('Cancel')}
                    </>
                    } 
                      disabled={pendingFileUpload || isPendingApi} spinner={isPendingApi}/>
                 </div> 
                 </>}
            </div>
            
            
        </div>
    );
};

export default HoaxSubmit;