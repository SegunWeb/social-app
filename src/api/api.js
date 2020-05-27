import * as axios from "axios";

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": '570cc637-8687-4ce8-a12d-511d5d729efe'}
});
const GET = instanse.get;
const POST = instanse.post;
const DELETE = instanse.delete;
const PUT = instanse.put;


export const UserAPI = {
    /*=== users container === */
    getUsers(currentPage= 1, pageSize= 10) {
        return GET(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
    },
    /*=== users jsx === */
    isUnfollow(userId) {
        return DELETE(`follow/${userId}`).then(res => res.data);
    },
    isFollow(userId) {
        return POST(`follow/${userId}`).then(res => res.data);
    }
};

/*=== profile container === */
export const ProfileAPI = {
    getProfileUser(userId) {
        return GET(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId) {
        return GET(`profile/status/` + userId)
    },
    updateStatus(status) {
        return PUT(`profile/status/`, {status: status});
    }
};


/*=== header container auth ===*/
export const getAuthData = () => {
    return GET('auth/me');
};


