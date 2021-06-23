// ACTION CREATORS
import {
    ADD_CATAGORIES,
    EMPTY_CATALOG
} from "redux/actions/constants/action-types";

const initialState = {
    catalogList: []
};

function catalogReducer(state = initialState, action) {
    if (action.type === ADD_CATAGORIES) {
        console.log("ADD_CATAGORIES ", action.payload)
        console.log("state.catalogList ", state.catalogList)
        return {
            ...state,
            catalogList: [
                ...state.catalogList,
                [{
                    page: action.payload.page,
                    data: action.payload.data
                }]
            ],
        }
    }



    if (action.type === EMPTY_CATALOG) {
        return {
            ...state,
            catalogList: []
        }
    }
    return state
}

export default catalogReducer;