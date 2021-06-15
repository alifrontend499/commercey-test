// ACTION CREATORS
import {
    SET_GLOBAL_LOADING,
    EMPTY_COMMON,
} from "redux/actions/constants/action-types";

const initialState = {
    globalLoading: false,
};

function commonReducer(state = initialState, action) {
    if (action.type === SET_GLOBAL_LOADING) {
        return {
            ...state,
            globalLoading: action.payload,
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