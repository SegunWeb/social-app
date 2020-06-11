import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../commons/Preloader/preloader";
import userPhoto from "../../../assets/myface.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);



    if(!profile) {
        return <Preloader/>
    }
    const mainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const ProfileEditMode = () => {
        setEditMode(true)
    };

    const onSubmit = (formData) => {
         saveProfile(formData).then(() => {
            setEditMode(false);
        })
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

                {editMode ?
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        ProfileEditMode={ProfileEditMode}
                    />
                }
                <ProfileStatusWithHooks
                    status={status}
                       updateStatus={updateStatus}
                />
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, ProfileEditMode}) => {
   return (
       <div> {isOwner && <div><button onClick={ProfileEditMode}>edit</button></div>}
           <div>
               <h1>{profile.fullName}</h1>
               <h3>{profile.aboutMe}</h3>
               <div>
                   <p>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</p>
                   <p>{profile.lookingForAJob &&
                   <span>{profile.lookingForAJobDescription}</span>
                   }</p>
               </div>
               <div>
                   <b>Contact</b>: {Object.keys(profile.contacts).map(key => {
                   return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
               })}
               </div>
           </div>
       </div>
   )
};

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactTitle} -- <span>{contactValue}</span>
        </div>
    )
};

export default ProfileInfo;