import axios from "axios";
import {
    editUser,
    logoutUser,
    signInUser,
    deleteUser,
    createUser,
} from "../action-creators";

const signIn = () => {
    return async (dispatch) => {
        const headerToken = {
            headers: {
                authorization: window.localStorage.getItem("token"),
            },
        };
        const { data: user } = await axios.get("api/auth", headerToken);
        if (user) dispatch(signInUser(user));
        else console.log("Email and/or password incorrect");
    };
};

const register = (newUser) => {
    return async (dispatch) => {
        const { data: token } = await axios.post("api/auth/signup", newUser);
        window.localStorage.setItem("token", token);
        const headerToken = {
            headers: {
                authorization: window.localStorage.getItem("token"),
            },
        };
        const { data: user } = await axios.get("api/auth", headerToken);
        dispatch(createUser(user));
    }
};

// Logs out (only a thunk bc we might add to it)
const logout = () => async (dispatch) => {
    try {
        window.localStorage.removeItem("token");
        dispatch(logoutUser());
    } catch (err) {
        console.error(err);
    }
};


export { signIn, logout, register };
