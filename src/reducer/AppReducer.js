import {getAuthData, login, logout} from "../api/api";
import {stopSubmit} from 'redux-form'
import {getAuthUserData} from "./AuthReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';



let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};


export const setInitializedSuccess = () => ({type: SET_INITIALIZED});

export const getInitializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(setInitializedSuccess())
    })
};
export default appReducer;
