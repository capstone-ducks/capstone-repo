import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
    CLAIM_DONATION,
} from "../action-types";

import _ from "lodash";

const donationReducer = (state = [], action) => {
    if (action.type === GET_ALL_DONATIONS) {
        state = action.donations;
    } else if (action.type === CREATE_DONATION) {
        state = [...state, action.donation];
    } else if (action.type === CLAIM_DONATION) {
        // Deep copy old state
        let newState = _.cloneDeep(state);

        // Find old donation
        let changedDonation = newState.filter(
            (donation) => donation.id === action.donation.id,
        )[0];

        // just change "isClaimed" to true
        for (let recipient of changedDonation.users) {
            if (recipient.id === action.userId) {
                recipient.donationsRecipients.isClaimed = true;
            }
        }

        state = newState;
    }
    return state;
};

export default donationReducer;
