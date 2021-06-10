// ACTION CREATORS
import {
    SAVE_COMMONTOKEN,
    REMOVE_COMMONTOKEN,
    SAVE_CURRENT_USER,
    REMOVE_CURRENT_USER,
    AUTHENTICATE_USER,
    EMPTY_AUTH
} from "redux/actions/constants/action-types";

// ALL FUNCTIONS
export function saveCommonTokenToStore(token) {
    return {
        type: SAVE_COMMONTOKEN,
        payload: token
    }
}

export function removeCommonTokenFromStore() {
    return {
        type: REMOVE_COMMONTOKEN,
        payload: 'token removed from the store!'
    }
}

export function saveCurrentUserToStore(user) {
    return {
        type: SAVE_CURRENT_USER,
        payload: user
    }
}

export function removeCurrentUserFromStore() {
    return {
        type: REMOVE_CURRENT_USER,
        payload: "Remove the current user from the store"
    }
}

export function authenticateUser(bool) {
    return {
        type: AUTHENTICATE_USER,
        payload: bool
    }
}

export function emptyAuth() {
    return {
        type: EMPTY_AUTH,
        payload: 'user log out'
    }
}