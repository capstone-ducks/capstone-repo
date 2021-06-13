import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
} from "../action-types";

const initialState = {
    donations: [],
    selectedDonation: null,
};

const donationReducer = (state = initialState, action) => {
    if (action.type === GET_ALL_DONATIONS) {
        state = action.donations;
    } else if (action.type === GET_ONE_DONATION) {
        state = {
            ...state,
            selectedDonation: action.donation,
        };
    } else if (action.type === CREATE_DONATION) {
        state = {
            allDonations: [...state.allDonations, action.donation],
            selectedDonation: action.donation,
        };
    }

    return state;
};

export default donationReducer;
