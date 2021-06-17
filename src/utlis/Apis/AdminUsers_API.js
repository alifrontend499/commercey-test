// AXIOS
import axios from "axios";

// cancel token
const CancelToken = axios.CancelToken;

// api url
import { apiUrl } from "./constants";

// get admin users
export let cancelGetUsersApi;
export async function getUsers(token, page) {
    // if ((token, page)) {
    if (token) {
        const users = await axios.get(apiUrl + "list" + page, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetUsersApi = c;
            }),
        });
        return users;
    } else {
        console.log("Please add required parameters");
    }
}

// get single user details
export let cancelGetUserDetailsApi;
export async function getUserDetails(token, userId) {
    if (token, userId) {
        const user = await axios.get(apiUrl + "detail/" + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelGetUserDetailsApi = c;
            }),
        });
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// creating a new user
export let cancelCreateUserApi;
export async function createUser(token, userData) {
    if ((token, userData)) {
        const user = await axios.post(
            apiUrl + "add",
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                group_id: userData.group_id,
                enable_two_factor: userData.enable_two_factor,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelCreateUserApi = c;
                }),
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// editing a new user
export let cancelEditUserApi;
export async function editUser(token, userData) {
    if ((token, userData)) {
        const user = await axios.put(
            apiUrl + "edit/" + userData.login_id,
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                group_id: userData.group_id,
                enable_two_factor: userData.enable_two_factor,
                user_status: userData.user_status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelEditUserApi = c;
                }),
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// change user's password
export let cancelChangePasswordApi;
export async function changePassword(token, userId, newPassword) {
    if ((token, userId, newPassword)) {
        const user = await axios.get(
            apiUrl + "update/password/" + userId,
            {
                password: newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancelChangePasswordApi = c;
                }),
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// change user's password
export let cancelDeleteUserApi;
export async function deleteUser(token, userId) {
    if ((token, userId)) {
        const user = await axios.delete(apiUrl + "delete/" + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelDeleteUserApi = c;
            }),
        });
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// get admin users
export let cancelAdminUsersApi;
export async function getAdminGroups(token) {
    // if (token) {
    const user = await axios.get(
        apiUrl + "admingroups", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancelAdminUsersApi = c;
        }),
    }
    );
    return user;
    // } else {
    //     console.log("Please add required parameters");
    // }
}
