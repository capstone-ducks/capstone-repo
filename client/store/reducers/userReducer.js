import {EDIT_USER, DELETE_USER, LOAD_USER, CREATE_USER, SIGNIN} from '../action-types/index';

const initialState = {
    user:{},
}

const userReducer = (state = initialState, action) =>{
    if(action.type === SIGNIN){
        const {user} = action;
        state = {...state, user}
    }
    return state;
}
export default userReducer ;
