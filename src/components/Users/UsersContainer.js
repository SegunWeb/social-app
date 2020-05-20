import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    follow,
    setUsers,
    unfollow,
    setCurrentPage,
    setTotalUsersCount, toggleIsFetching, toggleIsProgress
} from "../../reducer/UsersReducer";
import Users from "./Users.jsx";
import Preloader from "../Preloader/preloader";
import {UserAPI} from "../../api/api";


class UsersContainer extends Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        UserAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        UserAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items)
        })
    };

    render() {
        return (
            <> {
                this.props.isFetching ?  <Preloader /> : null
            }
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    onPageChanged={this.onPageChanged}
                    toggleIsProgress={this.props.toggleIsProgress}
                    followingInProgress={this.props.followingInProgress}

                />
            </>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

export default connect(mapStateToProps, { follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsProgress })(UsersContainer);