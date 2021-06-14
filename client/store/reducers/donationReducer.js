import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
} from "../action-types";

const initialState = {
    donations: [],
};

const donationReducer = (state = initialState, action) => {
    if (action.type === GET_ALL_DONATIONS) {
        state = action.donations;
    } else if (action.type === CREATE_DONATION) {
        state = {
            donations: [...state.donations, action.donation],
        };
    }

    return state;
};

export default donationReducer;
