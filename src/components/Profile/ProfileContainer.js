import React, {Component} from 'react';
import {connect} from 'react-redux'
import Profile from "./Profile";
import {getProfileUsersThunk} from "../../reducer/ProfileReducer";
import { withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";


class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getProfileUsersThunk(userId)
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default compose(
    connect(mapStateToProps, { getProfileUsersThunk } ),
    withRouter,
    withAuthRedirect,
)
(ProfileContainer);