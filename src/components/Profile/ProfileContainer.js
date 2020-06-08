import React, {Component} from 'react';
import {connect} from 'react-redux'
import Profile from "./Profile";
import {
    getProfileUsersThunk,
    getStatusUsersThunk,
    savePhoto,
    updateStatusUsersThunk
} from "../../reducer/ProfileReducer";
import { withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.loginUserId;
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileUsersThunk(userId);
        this.props.getStatusUsersThunk(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.match.params.userId;
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        if(userId !== prevProps.userId) {
            this.refreshProfile()
        }
    }

    render() {
        let userId = this.props.match.params.userId;
        return (
            <div>
                <Profile {...this.props}
                        isOwner={!userId}
                         profile={this.props.profile}
                         status={this.props.status}
                        updateStatus={this.props.updateStatusUsersThunk}
                         savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    loginUserId: state.authUser.id,
    isAuth: state.authUser.isAuth,
});

export default compose(
    connect(mapStateToProps, { getProfileUsersThunk, getStatusUsersThunk, updateStatusUsersThunk, savePhoto}),
    withRouter,
    // withAuthRedirect,
)
(ProfileContainer);