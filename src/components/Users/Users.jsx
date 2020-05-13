import React from 'react';
import s from './User.module.css';

const Users = (props) => {

    if( props.users.length === 0 ) {
        props.setUsers( [
            {
                id: 0,
                photo: 'https://st2.depositphotos.com/2195902/7661/v/450/depositphotos_76619585-stock-illustration-angry-dog.jpg',
                followed: false,
                fullName: 'Dmitry',
                status: 'I am Groot',
                location: {
                    country: 'Ukraine',
                    city: "Odessa",
                }
            },
            {
                id: 1,
                photo: 'https://st2.depositphotos.com/2195902/7661/v/450/depositphotos_76619585-stock-illustration-angry-dog.jpg',
                followed: true,
                fullName: 'Serg',
                status: 'I am Boy',
                location: {
                    country: 'Ukraine',
                    city: "Dnepr",
                }
            },
            {
                id: 2,
                photo: 'https://st2.depositphotos.com/2195902/7661/v/450/depositphotos_76619585-stock-illustration-angry-dog.jpg',
                followed: false,
                fullName: 'Sasha',
                status: 'I am Groot',
                location: {
                    country: 'Ukraine',
                    city: "Odessa",
                }
            }
        ])
    }




    return (
        <div className={s.wrapper}>
            {
                props.users.map( u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.userPhoto} src={u.photo} alt="img"/>
                        </div>
                    </span>
                    <span>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id)} }>Follow</button>
                            }
                        </div>
                    </span>

                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                         <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>


                </div>)
            }
        </div>
    );
};

export default Users;