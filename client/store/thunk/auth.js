import axios from "axios";
import { signInUser, logoutUser } from "../action-creators";

export const signIn = () => {
    return async (dispatch) => {
        const headerToken = {
            headers: {
                authorization: window.localStorage.getItem("token"),
            },
        };
        const { data: user } = await axios.get("api/auth", headerToken);
        if (user) dispatch(signInUser(user));
        else console.log("email password combo bad");
    };
};

// Logs out (only a thunk bc we might add to it)
export const logOutUser = () => async (dispatch) => {
    try {
        window.localStorage.removeItem("token");
        dispatch(logoutUser());
    } catch (err) {
        console.error(err);
    }
};
