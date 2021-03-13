import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import {getUser} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from  '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';
import { useParams } from 'react-router-dom';

const UserPage = (props) => {

    const[user,setUser] = useState({});
    const[notFound ,setNotFound] = useState(false);

    const{t} = useTranslation();
    const {username} = useParams();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/' + username,true);

   

    useEffect(()=>{
        setNotFound(false);
    },[user]);

    const loadUser = async () => {
        try{
            const response = await getUser(username);
            setUser(response.data);
        }
        catch(error){
            setNotFound(true);
        }
    }
    useEffect(() => {
        loadUser();
    },[username]);

    if(pendingApiCall){
       return(
            <Spinner/>
       );
    }

    

    if(notFound){
        return (
            <div className= "container">
            <div className="alert alert-danger text-center" 
            role="alert">
                <div>
                    <span class="material-icons" style={{fontSize:'48px'}}>
                        error
                    </span> 
                </div>
                {t('User not found')}  
            </div>
            </div>
            
        )
    }

    if(pendingApiCall || user.username !== username){
        return(
            <Spinner/>
       );
    }

    return (
        <div className="container"> 
            <div className="row">
                <div className="col"><ProfileCard user={user}/></div>
                <div className="col"><HoaxFeed/></div>
            </div>
        </div>
    );
};

export default UserPage;