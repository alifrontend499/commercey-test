// AXIOS
import axios from "axios";

import apiUrl from "./constants";

// get admin users
export async function getUsers(token, page) {
    if ((token, page)) {
        const users = await axios.get(apiUrl + "list" + page, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return users;
    } else {
        console.log("Please add required parameters");
    }
}

// get single user details
export async function getUserDetails(token, userId) {
    if ((token, userId)) {
        const user = await axios.get(apiUrl + "detail/" + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// creating a new user
export async function createUser(token, userData) {
    if ((token, userData)) {
        const user = await axios.get(
            apiUrl + "add/user",
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                user_type: userData.user_type,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// editing a new user
export async function editUser(token, userData) {
    if ((token, userData)) {
        const user = await axios.get(
            apiUrl + "update/detail/" + userData.id,
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                user_type: userData.user_type,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}

// change user's password
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
            }
        );
        return user;
    } else {
        console.log("Please add required parameters");
    }
}
