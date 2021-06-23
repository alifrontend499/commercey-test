// ACTION CREATORS
import {
    ADD_CATAGORIES,
    EMPTY_CATALOG
} from "redux/actions/constants/action-types";

// ALL FUNCTIONS
export function addCategories(page, data) {
    return {
        type: ADD_CATAGORIES,
        payload: {
            page,
            data
        }
    }
}

export function emptyCatalog() {
    return {
        type: EMPTY_CATALOG,
        payload: 'user log out'
    }
}