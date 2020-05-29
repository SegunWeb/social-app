import React, {Component} from 'react';
import Login from "./Login";
import {connect} from "react-redux";


class LoginContainer extends Component {
    render() {
        return (
            <div>
                <Login/>
            </div>
        );
    }
}



export default LoginContainer;