import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import userReducer from './reducers/userReducer';

// Combined Reducer
const primaryReducer = combineReducers({auth: userReducer});

// Redux Middleware
const middleware = applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }),
);

// Redux Store
const store = createStore(primaryReducer, middleware);
export default store;
