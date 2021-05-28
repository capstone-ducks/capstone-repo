import axios from 'axios';
import {editUser, signInUser, deleteUser, createUser} from '../action-creators/index';

const signIn = () =>{
    return async (dispatch) =>{
        const headerToken ={
            headers:{
                authorization: window.localStorage.getItem('token')
            },
        };
        const {data: user} = await axios.get('api/users', headerToken);
        dispatch(signInUser(user));
    }
};



// upon clicking signin button
// >> handle submit

export { signIn };
