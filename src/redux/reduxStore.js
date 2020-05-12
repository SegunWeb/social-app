import {combineReducers, createStore} from "redux";
import profileReducer from "../reducer/ProfileReducer";
import dialogsReducer from "../reducer/DialogsReducer";
import sidebarReducer from "../reducer/sidebarReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

let store = createStore(rootReducer);


export default store;