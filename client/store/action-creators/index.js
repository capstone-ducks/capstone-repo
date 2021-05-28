import {
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    SIGNIN,
    LOGOUT,
} from "../action-types/index";

export const editUser = (user) => {
    return {
        type: EDIT_USER,
        user,
    };
};

export const deleteUser = (userId) => {
    return {
        type: DELETE_USER,
        userId,
    };
};

export const signInUser = (user) => {
    return {
        type: SIGNIN,
        user,
    };
};

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
};
