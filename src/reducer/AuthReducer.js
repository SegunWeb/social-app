import {getAuthData, login, logout} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA';
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    id: null,
    login: null,
    email: null,
    // isFetching: false,
    isAuth: false
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload,
            };
        // case TOGGLE_IS_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: action.isFetching,
        //     };
        default:
            return state;
    }
};


export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, payload: {id, login, email, isAuth} });
// export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthUserData = () => (dispatch) => {
   return getAuthData().then(response => {
        if(response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, login, email, true))
        }
    })
};
export const loginData = (email, password, remember) => (dispatch) => {
    login(email, password, remember).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit("login", {_error: message}));
        }
    })
};
export const logoutData = () => (dispatch) => {
    logout().then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
};






export default AuthReducer;
