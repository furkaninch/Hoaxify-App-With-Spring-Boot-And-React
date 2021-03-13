import React from 'react';
import defaultPic from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
        let imageSource = defaultPic;
        
        const {image,altName,width,tempimage,height,className} = props;

        let classField = "rounded-circle shadow ";
        if(className){
         classField += className;
        }
        if(image){
        imageSource = 'images/profile/'+image;
        }
    return (
            <img className={classField}
                alt={`${altName} profile`} 
                src={tempimage || imageSource} width={width} height={height}
                onError={(event)=>{
                    event.target.src = defaultPic;
                }}
                />
    );
};

export default ProfileImageWithDefault;