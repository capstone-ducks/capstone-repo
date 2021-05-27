import axios from 'axios';
import {editUser, loginUser, deleteUser, createUser} from '../action-creators/index';

const fetchUser = (userId) =>{
    return async (dispatch) =>{
        const headerToken ={
            headers:{
                authorization: window.localStorage.getItem('token')
            },
        };
        const {data: user} = await axios.get('api/users', headerToken);
        dispatch(loginUser(user));
    }
}

export  { fetchUser};