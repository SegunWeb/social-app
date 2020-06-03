import React from 'react';
import s from "./User.module.css";
import userPhoto from "../../assets/myface.jpg";
import {NavLink} from "react-router-dom";


const User = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                  <img className={s.userPhoto}
                                       src={user.photos.small !== null ? user.photos.small : userPhoto} alt="img"/>
                            </NavLink>

                        </div>
                    </span>
                <span>
                        <div>
                            {user.followed
                                ? <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id)
                                    }}>Unfollow</button>

                                : <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)
                                    }}>Follow</button>
                            }
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                    </span>
            </div>
        </div>
    )
};

export default User;