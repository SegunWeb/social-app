import React, {Component} from 'react';
import {connect} from 'react-redux'
import Profile from "./Profile";
import {getProfileUsersThunk, getStatusUsersThunk, updateStatusUsersThunk} from "../../reducer/ProfileReducer";
import { withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends Component {

    componentDidMount() {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                        updateStatus={this.props.updateStatusUsersThunk}
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
    connect(mapStateToProps, { getProfileUsersThunk, getStatusUsersThunk, updateStatusUsersThunk}),
    withRouter,
    // withAuthRedirect,
)
(ProfileContainer);