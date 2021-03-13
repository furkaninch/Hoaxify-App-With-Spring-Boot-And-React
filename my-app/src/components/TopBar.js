import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/hoaxify.png';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch , useSelector} from 'react-redux';
import {onLogOut} from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';


const TopBar = props => {
        const{t} = useTranslation();

        const {username,isLoggedIn,displayName,image} = useSelector(store => ({
                isLoggedIn: store.isLoggedIn,
                username: store.username,
                displayName: store.displayName,
                image: store.image
        }));

        const menuArea = useRef(null);

        const [menuVisible, setMenuVisible] = useState(false);

        useEffect(() =>{
            document.addEventListener('click' , menuClickTracker);
            return () => {
                document.removeEventListener('click',menuClickTracker);
            }
        },[isLoggedIn])


        const menuClickTracker = (event) => {
            if(menuArea.current === null || 
                    !menuArea.current.contains(event.target)){
                setMenuVisible(false);
            }
        }

        const dispatch = useDispatch();

        const onLogOutSuccess = () => {
           dispatch(onLogOut());
        };

        let links = (
            <ul className="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to='/login'>
                    {t('Login')}
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    {t('Sign Up')}
                </Link>
            </li>
                </ul>
                );
        
            if(isLoggedIn){
                let dropDownClass = "dropdown-menu p-0 shadow";

                if(menuVisible){
                    dropDownClass = "dropdown-menu show p-0 shadow";
                }
            links = (
            <ul className="navbar-nav ml-auto" ref={menuArea}>
                    <li className="nav-item dropdown">
                        <div style={{cursor: "pointer"}} className="d-flex" onClick={() => {
                            setMenuVisible(true);
                        }}>
                            <ProfileImageWithDefault image= {image} 
                            width="40" height="40" className="rounded-circle m-auto" />
                            <span className="nav-link dropdown-toggle" >{displayName}</span>
                        </div>
                        <div className={dropDownClass}> 
                            
                            <Link className="dropdown-item d-flex p-2" to = {`/user/${username}`}
                            onClick ={()=>{
                                setMenuVisible(false);
                            }}>
                                 <span className="material-icons text-info mr-2">
                                    person
                                </span>
                                    {t('My Profile')}
                                </Link>
                           
                            <span>
                                <Link className="dropdown-item d-flex p-2" to = "/" onClick={onLogOutSuccess}>
                                <span className="material-icons text-danger mr-2">
                                    power_settings_new
                                </span>
                                    {t('Log Out')}
                                </Link>
                            </span>
                        </div>
                    </li>
            </ul>
                );
            }
            return (
                <div className="shadow-sm bg-light mb-2">
                    <nav className="navbar navbar-light container navbar-expand">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} width="60" alt="hoaxify logo"/>  
                            Hoaxify
                        </Link>
                        {links}
                    </nav>
                </div>
            );
}

export default TopBar;