import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "../reducer/ProfileReducer";
import dialogsReducer from "../reducer/DialogsReducer";
import sidebarReducer from "../reducer/sidebarReducer";
import usersReducer from "../reducer/UsersReducer";
import AuthReducer from "../reducer/AuthReducer";
import thunkMiddleware from "redux-thunk"


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    authUser: AuthReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;