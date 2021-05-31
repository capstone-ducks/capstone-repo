import {
    EDIT_USER,
    DELETE_USER,
    LOAD_USER,
    CREATE_USER,
    SIGNIN,
    LOGOUT,
} from "../action-types/index";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    if (action.type === SIGNIN) {
        const { user } = action;
        state = { ...state, user };
    }
    else if (action.type === LOGOUT) {
        state = { ...state, user: null };
    }
    else if (action.type === CREATE_USER) {
        state = {...state, ...action.user};
    }
    return state;
};
export default userReducer;
