import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {format} from 'timeago.js'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';
const HoaxView = (props) => {

    const loggedInUser =  useSelector(store => store.username);
    const {hoax , onDeleteHoax} = props;
    const {user,content,timestamp,fileAttachment,id} = hoax;
    const{username,displayName,image} = user;
    const [visibility,setVisibility] = useState(false);
    
    const pendingApiCall = useApiProgress('delete','/api/1.0/hoaxes');

    const ownedByLoggedInUser = loggedInUser === username;
    

    const {i18n , t} = useTranslation();

    const formatted= format(timestamp,i18n.language);

    const onClickDelete = () => {
            setVisibility(true);
    }

    const onClickCancel = () => {
        setVisibility(false);
    }

    const onClickDeleteSubmit = async() => {
        await deleteHoax(id);
        onDeleteHoax(id);
        setVisibility(false)
    }

    return (
            <>
        <div className = "card p-1 shadow">
            <div className="d-flex">
                <ProfileImageWithDefault image={image} width="32" height="32" className="m-2"/>
                    <div className="pl-2 flex-fill m-auto"> 
                    <Link to={`user/${username}`} className="text-dark">
                    <h6 className="d-inline">{displayName} @ {username} </h6>
                    <span>-</span>
                    <span>{formatted}</span>
                    </Link>
                 </div> 
                 {ownedByLoggedInUser && <button onClick={onClickDelete}
                  className="btn btn-delete-link btn-sm">
                    <span className="material-icons">
                        delete_outline
                    </span>
                </button>}
            </div>
            <div className="pl-2">
                {content}
                
            </div>
          {fileAttachment && (
              <div className = "pl-2 m-4">
                  {fileAttachment.fileType.startsWith('image') &&
                  <img className = "img-fluid" src={`images/attachments/${fileAttachment.name}`}></img> }
              {!fileAttachment.fileType.startsWith('image') &&
                <strong className="text-danger">{t('Hoax has unsupported attachment!')}</strong>
              }
              </div> 
          )}
        </div>
            <Modal visible={visibility} title = {t('Delete Hoax')} message={
            <div>
                <div> 
                    <strong>{t('Are you sure you want to delete this Hoax? You can not undo this action!')}</strong>
                </div>
                <span>{content}</span>
             </div>
             }
            onClickCancel={onClickCancel} onClickSubmit={onClickDeleteSubmit}
            pendingApiCall={pendingApiCall}/>
        </>
    );
};

export default HoaxView;