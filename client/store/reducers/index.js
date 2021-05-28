import {EDIT_USER, DELETE_USER, LOAD_USER, CREATE_USER, SIGNIN} from '../action-types/index';

const initialState = {
    user:{},
    token: null
}

const userReducer = (state = initialState, action) =>{
    if(action.type === SIGNIN){
        const {user, token} = action;
        state = {...state, user, token}
    }
    return state;
}
export default userReducer ;
