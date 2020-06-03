import React from 'react';
import s from "./User.module.css";
import Paginator from "../commons/Pagunator/Paginator";
import User from "./User";


const Users = ({currentPage, users, onPageChanged, followingInProgress, follow, unfollow, totalUsersCount, pageSize }) => {


    return(
        <div className={s.wrapper}>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount}
            />

            {users.map(user => (
                    <User
                        user={user}
                        follow={follow}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        key={user.id}
                    />
                    ))
            }

        </div>
    )
};

export default Users;