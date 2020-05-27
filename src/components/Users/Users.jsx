import React from 'react';
import s from "./User.module.css";
import userPhoto from "../../assets/myface.jpg";
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pageCount; i++) {
        pages.push(i)
    }



    return(
        <div className={s.wrapper}>
            <div className={s.selectedPage}>
                {pages.map(p => {
                    return <span
                        key={p}
                        className={props.currentPage}
                        onClick={(e) => {props.onPageChanged(p)}}
                    >{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                  <img className={s.userPhoto}
                                       src={u.photos.small !== null ? u.photos.small : userPhoto} alt="img"/>
                            </NavLink>

                        </div>
                    </span>
                    <span>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.unfollow(u.id)}}>Unfollow</button>

                                : <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.follow(u.id)}}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
};

export default Users;