// ACTION CREATORS
import {
    SET_GLOBAL_LOADING,
    SET_SIDEBAR_STATUS,

    
    EMPTY_COMMON,
} from "redux/actions/constants/action-types";

// ALL FUNCTIONS
export function setGlobalLoading(bool) {
    return {
        type: SET_GLOBAL_LOADING,
        payload: bool
    }
}

export function setSideBarStatus(bool) {
    return {
        type: SET_SIDEBAR_STATUS,
        payload: bool
    }
}

export function emptyCommon() {
    return {
        type: EMPTY_COMMON,
        payload: 'user log out'
    }
}