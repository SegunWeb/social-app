import React, {Component} from 'react';
import s from './User.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/myface.jpg'

class Users extends Component {

    componentDidMount() {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    };

    render() {

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
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
                        className={this.props.currentPage === p && s.pageActive}
                            onClick={(e) => {this.onPageChanged(p)}}
                        >{p}</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={s.userPhoto}
                                 src={u.photos.small != null ? u.photos.small != null : userPhoto} alt="img"/>
                        </div>
                    </span>
                        <span>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                            {/* <span>*/}
                            {/*    <div>{u.location.country}</div>*/}
                            {/*    <div>{u.location.city}</div>*/}
                            {/*</span>*/}
                    </span>
                    </div>)
                }
            </div>
        )
    }
};

export default Users;