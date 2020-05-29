import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {getAuthUserData} from "./reducer/AuthReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {getInitializedApp} from "./reducer/AppReducer";
import Preloader from "./components/commons/Preloader/preloader";

class App extends Component {
    componentDidMount() {
        this.props.getInitializedApp()
    }

    render() {
        return (
            <>
                {!this.props.initialized ?
                    <Preloader/> :

                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <Navbar/>
                        <div className='app-wrapper-content'>
                            <Route path='/dialogs'
                                   render={() => <DialogsContainer/>}/>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route path='/users'
                                   render={() => <UsersContainer/>}/>
                            <Route path='/login'
                                   render={() => <LoginContainer/>}/>
                        </div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.appInit.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {getInitializedApp}))(App);