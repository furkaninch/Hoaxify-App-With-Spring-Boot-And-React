import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../api/apiCalls';
import HoaxView from './HoaxView';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {

    const [hoaxPage , setHoaxPage] = useState({content:[] , last : true , number: 0});

    const {t} = useTranslation();

    const {username} = useParams();

    const [newHoaxCount, setNewHoaxCount] = useState(0);

    let lastHoaxId = 0;
    let firstHoaxId = 0;

    if(hoaxPage.content.length >1){
        firstHoaxId = hoaxPage.content[0].id;
    }

    if(hoaxPage.content.length >0){
        const lastHoaxIndex = hoaxPage.content.length - 1 ;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }

    const pathInitial = username ? `/api/1.0/users/${username}/hoaxes` : `/api/1.0/hoaxes?page=`;
    const initialHoaxLoadProgress = useApiProgress("get",pathInitial);

    const pathOldHoaxes = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`;
    const loadOldHoaxesProgress = useApiProgress('get',pathOldHoaxes,true);

    const pathNewHoaxes = username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`: `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxesProgress = useApiProgress('get',pathNewHoaxes,true);

    useEffect(() =>{
        const getCount = async () => {
               const response = await getNewHoaxCount(firstHoaxId,username);
               setNewHoaxCount(response.data.count);
        }
        let looper = setInterval(() => {
            getCount();
        },5000);
        return function cleanup(){
            clearInterval(looper);
        }
    },[firstHoaxId])



    const loadOldHoaxes = async () =>{
        try{
           const response = await getOldHoaxes(lastHoaxId,username);
           setHoaxPage((previousHoaxPage) => ({
               ...response.data,
               content: [...previousHoaxPage.content,...response.data.content]
           }));
        }catch(error){

        }
    }

    const loadNewHoaxes = async () => {
        try{
            const response = await getNewHoaxes(firstHoaxId,username);
            setHoaxPage((previousHoaxPage) => ({
                ...previousHoaxPage,
                content: [...response.data,...previousHoaxPage.content]
            }));
            setNewHoaxCount(0);
        }catch(error){

        }
    }

    const onDeleteHoaxSuccess = id => {
        setHoaxPage((previousHoaxPage) => ({
            ...previousHoaxPage,
            content: [...previousHoaxPage.content.filter(hoax => {
                if(hoax.id !== id){
                    return true;
                }
                return false;
            })]
        }));
    }
    useEffect(() => {
        const loadHoaxes = async (page) => {
            try{
                const response = await getHoaxes(page ,username);
                setHoaxPage((previousHoaxPage) => ({
                    ...response.data,
                    content: [...previousHoaxPage.content,...response.data.content]
                }));
            }catch(error){
    
            }
        }
        loadHoaxes();
    },[username]);

    
    
    const {content, last } = hoaxPage;
    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ? <Spinner/> : t('There are no hoaxes')}</div>
    }
    return (
        <div>
            {newHoaxCount > 0 && 
                <div onClick={loadNewHoaxesProgress ? () => {} : () => loadNewHoaxes()} style={{cursor: loadNewHoaxesProgress ? 'not-allowed': 'pointer'}}
                className="alert alert-primary mb-1 text-center">
                    {loadNewHoaxesProgress ? <Spinner/> : t('See new hoaxes')} </div>}
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax ={hoax} onDeleteHoax={onDeleteHoaxSuccess}/>
            })}
            {!last && <div onClick={loadOldHoaxesProgress ? () => {} : () => loadOldHoaxes()} style={{cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer'}} className="alert alert-primary text-center mt-2">
                {loadOldHoaxesProgress ? <Spinner /> : t('See more Hoaxes')} </div> }
        </div>
    );

 };

export default HoaxFeed;

