import axios from "axios";
import { createUser, updateUser } from "../action-creators";

export const addUser = (newUser) => {
    return async (dispatch) => {
        const { data: user } = await axios.post(`/api/users/`, newUser);

        dispatch(createUser(user));
    };
};

export const updateExistingUser = ({ data, id }) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");

        // Requires a token to edit!
        const { data: user } = await axios.put(`/api/users/${id}`, data, {
            headers: {
                authorization: token,
            },
        });
        dispatch(updateUser(user));
    };
};
