import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../commons/Preloader/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {

    if(!profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt="photo"/>
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