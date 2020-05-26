import React, {Component} from 'react';
import {connect} from 'react-redux'
import Header from "./Header";
import { getAuthUserData} from "../../reducer/AuthReducer";

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

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
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer) ;