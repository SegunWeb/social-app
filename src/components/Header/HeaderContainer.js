import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as axios from "axios";
import {setAuthUserData} from "../../reducer/AuthReducer";
import Header from "./Header";



class HeaderContainer extends Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,  {
            withCredentials: true
        })
            .then(response => {
                  if(response.data.resultCode === 0) {
                      let {id, login, email} = response.data.data;
                      this.props.setAuthUserData(id, login, email)
                  }
            })
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





export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer) ;