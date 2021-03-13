import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import {deleteUser, updateUser} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import  Button  from './Button';
import {updateSuccess , onLogOut} from '../redux/authActions';
import Modal from './Modal';


const ProfileCard = (props) => {
    const [errors , setErrors] = useState({});
    const [user,setUser] = useState({});
    const [newImageUrl , setNewImageUrl] = useState();

   
    useEffect(() => {
        setUser(props.user);
    },[props.user])

    const dispatch = useDispatch();

    const history = useHistory();

    const [inEditMode,setInEditMode] = useState(false);

    const{username, displayName , image } = user;

   


    useEffect(() => {
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
            setNewImageUrl(undefined);
        }else{
            setUpdatedDisplayName(displayName)
        }
    },[inEditMode , displayName]);

    const [updatedDisplayName , setUpdatedDisplayName] = useState();

    const [editable , setEditable] = useState(false);

    const routeParams = useParams();
    const pathUsername = routeParams.username; 

    const {username: loggedInUsername} = useSelector((store) =>({
        username: store.username
    }));

    const [visibility,setVisibility] = useState(false);
    
    useEffect(()=>{
        setErrors(previousErrors => {
           return {
               ...previousErrors ,
               displayName: undefined
           } 
        })
    },[updatedDisplayName])

    useEffect(() => {
        setErrors((previousErrors) =>{
            return{
            ...previousErrors,
            image: undefined
         } 
        })
    },[newImageUrl,image])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    },[pathUsername,loggedInUsername]);
    

    const onClickSave = async () =>{
        let image;
        if(newImageUrl){
            image= newImageUrl.split(',')[1]
        }
        const body = {
            displayName: updatedDisplayName,
            image: image
        };
        try {
            const response = await updateUser(username,body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
    }

    const onChangeFile = (event) =>{
        if(event.target.files.length < 1){
            return;
        }
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                    setNewImageUrl(fileReader.result);
            }
            fileReader.readAsDataURL(file);
    }

    const onClickCancelDelete = () => {
        setVisibility(false);
    }

    const onClickDelete = () => {
        setVisibility(true);
    }

    const onClickDeleteSubmit = async () => {
        await deleteUser(username);
        setVisibility(false);
        dispatch(onLogOut());
        history.push('/');
    }
    const pendingApiDeleteUser = useApiProgress('delete','/api/1.0/users/' + username);
    const pendingApiCall = useApiProgress('put','/api/1.0/users/' + username);
    
    
    const{t} =useTranslation();
    const {displayName: displayNameError , image: imageError} = errors;

    return (
        <div className="card text-center">

            <div className="card-header">
                <ProfileImageWithDefault alt={username} tempimage = {newImageUrl} image={image} width="100" height="100"/>
            </div>
            <div className="card-body">
                {!inEditMode &&
                <div> 
                    <h3> 
                        {displayName}@{username}
                    </h3>
                    { editable &&
                    <>
                    <button onClick={() =>{setInEditMode(true)}} className="btn btn-success d-inline-flex">
                        <span className="material-icons">
                            edit
                         </span>
                        {t('Edit')}
                    </button>
                    <div className="mt-2">
                    <button className="btn btn-danger d-inline-flex" onClick={onClickDelete}>
                        <span className="material-icons pr-2">
                            person_remove
                        </span>
                        {t('Delete User')}
                    </button>
                    </div>
                    <Modal title = {t('Delete User')}visible={visibility} onClickCancel = {onClickCancelDelete}
                    pendingApiCall = {pendingApiDeleteUser}
                        onClickSubmit= {onClickDeleteSubmit}
                        message={
                            <div>
                                <div> 
                                    <strong>{t('Are you sure you want to delete this User? You can not undo this action!')}</strong>
                                </div>
                                <span>{username}</span>
                            </div>
                            } />
                    </>
                    }
                </div>
                } 
                {inEditMode && 
                    <div>
                        <Input error = {displayNameError} label={t('Change Display Name')} defaultValue = {displayName} onChange={(event) => {
                            setUpdatedDisplayName(event.target.value);
                        }}/>
                        <Input error = {imageError}type="file" onChange={onChangeFile}/>
                            <div>
                            <Button disabled={pendingApiCall} onClick={onClickSave} className ="btn btn-primary d-inline-flex"
                                    spinner={pendingApiCall} text={
                                        <>
                                            <span className="material-icons">
                                                 save
                                            </span>
                                            {t('Save')}
                                        </>
                                    }
                            />
                                
                            <button disabled={pendingApiCall} onClick = {() =>{setInEditMode(false)}} className="btn btn-light d-inline-flex ml-2">
                                <span className="material-icons">
                                       close
                                </span>
                                    {t('Cancel')}
                                </button>
                            </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default ProfileCard;