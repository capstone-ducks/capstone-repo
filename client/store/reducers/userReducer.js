import { CREATE_USER, SIGNIN, LOGOUT, UPDATE_USER } from "../action-types";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    if (action.type === SIGNIN) {
        const { user } = action;
        state = { ...state, user };
    } else if (action.type === LOGOUT) {
        state = { ...state, user: null };
    } else if (action.type === UPDATE_USER) {
        state = { ...state, user: action.user };
    }

    return state;
};

export default userReducer;
