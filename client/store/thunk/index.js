import axios from 'axios';
import {editUser, signInUser, deleteUser, createUser} from '../action-creators/index';

const signIn = () =>{
    return async (dispatch) =>{
        const headerToken ={
            headers:{
                authorization: window.localStorage.getItem('token')
            },
        };
        const {data: user} = await axios.get('api/auth', headerToken);
        if(user)
            dispatch(signInUser(user));
        else
            console.log('email password combo bad');
    }
};



// upon clicking signin button
// >> handle submit

export { signIn };
