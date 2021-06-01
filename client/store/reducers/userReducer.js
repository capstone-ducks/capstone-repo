import { CREATE_USER, SIGNIN, LOGOUT } from "../action-types";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    if (action.type === SIGNIN) {
        const { user } = action;
        state = { ...state, user };
    } else if (action.type === LOGOUT) {
        state = { ...state, user: null };
    }

    return state;
};
export default userReducer;
