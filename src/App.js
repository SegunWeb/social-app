import React, {Component, Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {HashRouter, BrowserRouter, Route, withRouter} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {getInitializedApp} from "./reducer/AppReducer";
import Preloader from "./components/commons/Preloader/preloader";
import store from "./redux/reduxStore";
import {withSuspense} from "./components/hoc/withSuspense";
import ProfileStatus from "./components/Profile/ProfileInfo/ProfileStatus";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import( "./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import( "./components/Profile/ProfileContainer"));

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
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path='/profile/:userId?'
                                   render={withSuspense(ProfileContainer)}/>
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

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {getInitializedApp}))(App);

const MainApp = (props) => (
    <HashRouter >
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>

//     <BrowserRouter basename={process.env.PUBLIC_URL}>
//     <Provider store={store}>
//     <AppContainer/>
//     </Provider>
// </BrowserRouter>

);
export default MainApp