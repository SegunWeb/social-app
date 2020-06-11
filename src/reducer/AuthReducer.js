import {getAuthData, login, logout, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/SET_USER_DATA';
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    id: null,
    login: null,
    email: null,
    // isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
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
export const getCaptcha = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});
// export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthUserData = () => async (dispatch) => {
    const response = await getAuthData();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true))
    }
};
export const loginData = (email, password, remember, captcha) => async (dispatch) => {
    const response = await login(email, password, remember, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }  else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("login", {_error: message}));
    }
};
export const logoutData = () => async (dispatch) => {
    const response =  await logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};


export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
        dispatch(getCaptcha(captchaUrl));
};








export default AuthReducer;
