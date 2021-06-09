import { createStore, combineReducers } from 'redux'

// REDUCERS
import authReducer from 'redux/reducers/reducerAuth'

// STORE CREATION
const rootReducer = combineReducers({
    auth: authReducer,
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)