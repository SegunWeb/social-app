import React from 'react';
import {createField, Input, Textarea} from "../../commons/FormsControls/FormControls";
import Login from "../../Login/Login";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {}}>save</button>
                {
                    error && <p style={{color: "red"}}>{error}</p>
                }
            </div>
            <div>
                <p>
                    <b>Full name</b> -- {createField ("Full name", "fullName", [], Input)}
                </p>
                <p>
                    <b>About me</b> --
                    {/*{profile.aboutMe}*/}
                    {createField ("About me", "aboutMe", [], Textarea)}
                </p>
                <div>
                    <p>
                        {/*Looking for a job: {profile.lookingForAJob ? "yes" : "no"}*/}
                     <b>Looking for a Job</b> --   {createField ("", "lookingForAJob", [], Input, {type: "checkbox"})}
                    </p>
                    <p>
                        {/*{profile.lookingForAJobDescription}*/}
                      <b>My professionals skills</b> --  {createField ("My professionals skills", "lookingForAJobDescription", [], Textarea)}
                    </p>
                </div>
                {/*<div>*/}
                {/*    <b>Contact</b>: {Object.keys(profile.contacts).map(key => {*/}
                {/*    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
                {/*})}*/}
                {/*</div>*/}
                <div>
                     {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}</b>: <span> {createField (key, "contacts." + key, [], Input)}</span>
                        </div>
                      )
                })}
                </div>
            </div>
        </form>
    );
};

const ProfileDataFormRedux = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormRedux;