import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../commons/Preloader/preloader";
import userPhoto from "../../../assets/myface.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if(!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }

    };

    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="photo" className={s.imgSize}/>
                {isOwner && <input type="file" onChange={mainPhotoSelected}/>}
                <h1>{profile.fullName}</h1>
                <h3>{profile.aboutMe}</h3>
                <ProfileStatusWithHooks
                    status={status}
                       updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}

export default ProfileInfo;