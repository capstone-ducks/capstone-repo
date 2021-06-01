import { CREATE_USER } from "../action-types";

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user,
    };
};
