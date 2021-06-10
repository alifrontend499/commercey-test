// ACTION CREATORS
import {
    SAVE_COMMONTOKEN,
    REMOVE_COMMONTOKEN,
    SAVE_CURRENT_USER,
    REMOVE_CURRENT_USER,
    AUTHENTICATE_USER,
    EMPTY_AUTH
} from "redux/actions/constants/action-types";

const initialState = {
    commonToken: '',
    currentUser: null,
    isUserAuthenticated: true
};

function authReducer(state = initialState, action) {
    if (action.type === SAVE_COMMONTOKEN) {
        return {
            ...state,
            commonToken: action.payload,
        }
    }

    if (action.type === REMOVE_COMMONTOKEN) {
        return {
            ...state,
            commonToken: '',
        }
    }

    if (action.type === SAVE_CURRENT_USER) {
        return {
            ...state,
            currentUser: action.payload,
        }
    }

    if (action.type === REMOVE_CURRENT_USER) {
        return {
            ...state,
            currentUser: null,
        }
    }

    if (action.type === AUTHENTICATE_USER) {
        return {
            ...state,
            isUserAuthenticated: action.payload
        }
    }

    if (action.type === EMPTY_AUTH) {
        return {
            ...state,
            commonToken: '',
            currentUser: null,
            isUserAuthenticated: false
        }
    }
    return state
}

export default authReducer;