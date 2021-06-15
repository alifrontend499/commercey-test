import { createStore, combineReducers } from 'redux'

// REDUCERS
import authReducer from 'redux/reducers/reducerAuth'
import commonReducer from 'redux/reducers/reducerCommon'

// STORE CREATION
const rootReducer = combineReducers({
    auth: authReducer,
    common: commonReducer
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)