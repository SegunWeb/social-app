import {getAuthData} from "../api/api";

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
                ...action.data,
                isAuth: true
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


export const setAuthUserData = (id, login, email) => ({type: SET_USER_DATA, data: {id, login, email} });
// export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthUserData = () => (dispatch) => {
    getAuthData().then(response => {
        if(response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, login, email))
        }
    })
}


export default AuthReducer;
