import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
} from "../action-types";

const donationReducer = (state = [], action) => {
    if (action.type === GET_ALL_DONATIONS) {
        state = action.donations;
    } else if (action.type === CREATE_DONATION) {
        state = [...state, action.donation];
    }

    return state;
};

export default donationReducer;
