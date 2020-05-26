import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    followSuccess,
    unfollowSuccess,
    setCurrentPage, toggleIsProgress, getUsersThunk, isUnfollowThunk, isFollowThunk
} from "../../reducer/UsersReducer";
import Users from "./Users.jsx";
import Preloader from "../Preloader/preloader";
import {withAuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";




class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
        // this.props.toggleIsFetching(true);
        // UserAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount)
        // })
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        // UserAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items)
        // })
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
                    unfollow={this.props.unfollowSuccess}
                    follow={this.props.followSuccess}
                    onPageChanged={this.onPageChanged}
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
        isAuth: state.authUser.isAuth,
    }
};

export default compose(
    connect(mapStateToProps,
        { followSuccess, unfollowSuccess,
            setCurrentPage, toggleIsProgress,
            getUsersThunk, isUnfollowThunk, isFollowThunk}),
    withAuthRedirect
)(UsersContainer);

