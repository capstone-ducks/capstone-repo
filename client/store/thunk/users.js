import axios from "axios";
import { createUser } from "../action-creators";

export const addUser = (newUser) => {
    return async (dispatch) => {
        const { data: user } = await axios.post(`/api/users/`, newUser);

        dispatch(createUser(user));
    };
};
