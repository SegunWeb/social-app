import {ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_POST:
                let newPost = {
                        id: 5,
                        message: action.newPostText,
                        likesCount: 0
                };
                return {
                    ...state,
                    posts: [...state.posts, newPost],
                    newPostText: '',
                };

            case SET_USER_PROFILE:
                return {
                    ...state,
                    profile: action.profile
                };
            case SET_USER_STATUS:
                return {
                    ...state,
                    status: action.status
                };
            case DELETE_POST:
                return {
                    ...state,
                    posts: state.posts.filter(p => p.id !== action.postId)
                };
            case SAVE_PHOTO_SUCCESS:
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                };
            default:
                return state;
        }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile });
export const setStatusProfile = (status) => ({type: SET_USER_STATUS, status });
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getProfileUsersThunk = (userId) => async (dispatch) => {
    const response = await ProfileAPI.getProfileUser(userId);
    dispatch(setUserProfile(response.data))

};
export const getStatusUsersThunk = (userId) => async (dispatch) => {
    const response = await ProfileAPI.getStatus(userId);
    dispatch(setStatusProfile(response.data))
};
export const updateStatusUsersThunk = (status) => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status))
    }
};

export const savePhoto = (file) => async (dispatch) => {
    const response = await ProfileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().authUser.id;
    const response = await ProfileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileUsersThunk(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
};


export default profileReducer;