import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { donationReducer, userReducer } from "./reducers";

// Combined Reducer
const primaryReducer = combineReducers({
    auth: userReducer,
    donations: donationReducer,
});

// Redux Middleware
const middleware = applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }),
);

// Redux Store
const store = createStore(primaryReducer, middleware);
export default store;
