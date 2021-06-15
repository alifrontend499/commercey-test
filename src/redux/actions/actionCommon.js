// ACTION CREATORS
import {
    SET_GLOBAL_LOADING,
    EMPTY_COMMON,
} from "redux/actions/constants/action-types";

// ALL FUNCTIONS
export function setGlobalLoading(bool) {
    return {
        type: SET_GLOBAL_LOADING,
        payload: bool
    }
}

export function emptyCommon() {
    return {
        type: EMPTY_COMMON,
        payload: 'user log out'
    }
}