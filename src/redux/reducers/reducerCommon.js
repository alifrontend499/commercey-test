// ACTION CREATORS
import {
    SET_GLOBAL_LOADING,
    SET_SIDEBAR_STATUS,


    EMPTY_COMMON,
} from "redux/actions/constants/action-types";

const initialState = {
    globalLoading: false,
    sideBarVisibility: false
};

function commonReducer(state = initialState, action) {
    if (action.type === SET_GLOBAL_LOADING) {
        return {
            ...state,
            globalLoading: action.payload,
        }
    }

    if (action.type === SET_SIDEBAR_STATUS) {
        return {
            ...state,
            sideBarVisibility: action.payload,
        }
    }

    if (action.type === EMPTY_COMMON) {
        return {
            ...state,
            globalLoading: false,
        }
    }
    return state
}

export default commonReducer;