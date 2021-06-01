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
        else console.log("email password combo bad");
    };
};

// Logs out (only a thunk bc we might add to it)
const logOutUser = () => async (dispatch) => {
    try {
        window.localStorage.removeItem("token");
        dispatch(logoutUser());
    } catch (err) {
        console.error(err);
    }
};
const addUser = (newUser, {history}) => {
    return async (dispatch) => {
        const { data: user } = await axios.post(`/api/users/`, newUser, {
          headers: { authorization: window.localStorage.getItem('token') },
        });
        dispatch(createUser(user));
        history.push('/sign-in')
    };
};

// upon clicking signin button
// >> handle submit

export { signIn, logOutUser, addUser};
