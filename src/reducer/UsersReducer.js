import {UserAPI} from "../api/api";
import {updateOdjcctInArray} from "../utils/helper/ojects-helper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_PROGRESS = "TOGGLE_IS_PROGRESS";


const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
          return {
              ...state,
              users: updateOdjcctInArray(state.users, action.userId, "id", {followed: true} ),
          };
        case UNFOLLOW:
            return {
                ...state,
                users: updateOdjcctInArray(state.users, action.userId, "id", {followed: false} ),
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case TOGGLE_IS_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)

            };
        default: return state

    }
};


export const followSuccess = (userId) => ({type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId });
export const setUsers = (users) => ({type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsProgress = (isFetching, userId) => ({type: TOGGLE_IS_PROGRESS, isFetching, userId} );


export const getUsersThunk = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        const data = await UserAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};


const ToggleFollow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsProgress(true, userId));
    const res = await apiMethod(userId);
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsProgress(false, userId));
};
export const isFollowThunk = (userId) => {
    return async (dispatch) => {
        ToggleFollow(dispatch, userId, UserAPI.isFollow(userId), followSuccess);

        // dispatch(toggleIsProgress(true, userId));
        // const res = await UserAPI.isFollow(userId);;
        // if (res.data.resultCode === 0) {
        //     dispatch(followSuccess(userId))
        // }
        // dispatch(toggleIsProgress(false, userId));
    }
};
export const isUnfollowThunk = (userId) => {
    return async (dispatch) => {
         ToggleFollow(dispatch, userId,  UserAPI.isUnfollow(userId), unfollowSuccess);

        // dispatch(toggleIsProgress(true, userId));
        // const res = await UserAPI.isUnfollow(userId);
        // if (res.data.resultCode === 0) {
        //     dispatch(unfollowSuccess(userId))
        // }
        // dispatch(toggleIsProgress(false, userId));
    }
};






export default usersReducer;