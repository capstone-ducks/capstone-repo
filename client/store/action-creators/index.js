import{CREATE_USER, EDIT_USER, DELETE_USER, LOAD_USER} from '../action-types/index';

export const editUser = (user) =>{
    return{
        type: EDIT_USER,
        user
    }
}

export const deleteUser = (userId) =>{
    return{
        type: DELETE_USER,
        userId
    }
}

export const loginUser = ({user, token}) =>{
    return{
        type: LOAD_USER,
        user,
        token
    }
}

export const createUser = (user) =>{
    return{
        type: CREATE_USER,
        user
    }
}