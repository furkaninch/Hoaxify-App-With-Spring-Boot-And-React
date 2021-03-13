import React from 'react';
import {Link} from 'react-router-dom';
import ProfileImageWithDefault  from './ProfileImageWithDefault';

const UserListItem = (props) => {
    const{user} = props;
    const {username,displayName,image} = user;
    
    return (
    
    <Link to={`/user/${user.username}`} className= "list-group-item list-group-item-action"> 
        <ProfileImageWithDefault alt={user.username} image={image} width="50" height="50"/>
         <span className="pl-2">
         {displayName} @ {username}
         </span>
    </Link>
    );
};

export default UserListItem;