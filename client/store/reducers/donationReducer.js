import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
    CLAIM_DONATION,
} from "../action-types";

const donationReducer = (state = [], action) => {
    if (action.type === GET_ALL_DONATIONS) {
        state = action.donations;
    }
    else if (action.type === CREATE_DONATION) {
        state = [...state, action.donation];
    }
    else if (action.type === CLAIM_DONATION) {
        const donations = state.donations.map(donation =>{
            donation.id === action.donation.id ? action.donation : donation });
        state = [...state, donations];
    }
    return state;
};

export default donationReducer;
