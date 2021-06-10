import axios from "axios";
import { createUser, updateUser } from "../action-creators";

export const addUser = (newUser) => {
    return async (dispatch) => {
        const { data: user } = await axios.post(`/api/users/`, newUser);

        dispatch(createUser(user));
    };
};

export const updateExistingUser = ({ newUserData, id }) => {
    return async (dispatch) => {
        const { data: user } = await axios.put(`/api/users/${id}`, newUserData);
        dispatch(updateUser(user));
    };
};
