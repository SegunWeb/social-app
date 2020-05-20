import React, {Component} from 'react';
import {connect} from 'react-redux'
import Profile from "./Profile";
import {setUserProfile} from "../../reducer/ProfileReducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {getProfileUser} from "../../api/api";

class ProfileContainer extends Component {


    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        getProfileUser(userId).then(data => {
                this.props.setUserProfile(data);
            })
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
   profile: state.profilePage.profile
});

let WithUrlDataContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile } )(WithUrlDataContainer);