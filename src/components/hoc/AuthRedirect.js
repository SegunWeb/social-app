import {Redirect} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authUser.isAuth,
});

export const withAuthRedirect = (Components) => {
    class AuthRedirect extends Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>;
            return <Components {...this.props}/>
        }
    }
    const ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirect);
    return ConnectAuthRedirectComponent
};
