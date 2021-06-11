import { CREATE_USER, UPDATE_USER } from "../action-types";

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user,
    };
};

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user,
    };
};
