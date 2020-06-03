import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "../reducer/ProfileReducer";
import dialogsReducer from "../reducer/DialogsReducer";
import sidebarReducer from "../reducer/sidebarReducer";
import usersReducer from "../reducer/UsersReducer";
import AuthReducer from "../reducer/AuthReducer";
import AppReducer from "../reducer/AppReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer } from "redux-form";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    authUser: AuthReducer,
    form: formReducer,
    appInit: AppReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;