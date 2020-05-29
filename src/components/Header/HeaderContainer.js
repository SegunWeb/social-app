import React, {Component} from 'react';
import {connect} from 'react-redux'
import Header from "./Header";
import {logoutData} from "../../reducer/AuthReducer";

class HeaderContainer extends Component {


    render() {
        return (
            <Header {...this.props}/>
        );
    }
}
const mapStateToProps = (state) => {
        return {
            isAuth: state.authUser.isAuth,
            login: state.authUser.login
        }
};
export default connect(mapStateToProps, {logoutData})(HeaderContainer) ;