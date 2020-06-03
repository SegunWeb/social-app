import {ProfileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

const DELETE_POST = "DELETE_POST";


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
            default: return state;
        }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile });
export const setStatusProfile = (status) => ({type: SET_USER_STATUS, status });
export const deletePost = (postId) => ({type: DELETE_POST, postId});


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

export default profileReducer;