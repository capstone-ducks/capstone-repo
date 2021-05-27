import {EDIT_USER, DELETE_USER, LOAD_USER, CREATE_USER} from '../action-types/index';

const initialState = {
    user:{},
    token: null
}

const userReducer = (state = initialState, action) =>{
    if(action.type === LOAD_USER){
        const {user, token} = action;
        state = {...state, user, token}
    }
    return state;
}
export default userReducer ;
