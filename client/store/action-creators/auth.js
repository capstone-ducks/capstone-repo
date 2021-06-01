import { LOGOUT, SIGNIN } from "../action-types";

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
};

export const signInUser = (user) => {
    return {
        type: SIGNIN,
        user,
    };
};
