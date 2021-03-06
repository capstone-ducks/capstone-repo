import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
    CLAIM_DONATION,
} from "../action-types";

export const getAllDonations = (donations) => {
    return {
        type: GET_ALL_DONATIONS,
        donations,
    };
};

export const getOneDonation = (donation) => {
    return {
        type: GET_ONE_DONATION,
        donation,
    };
};

export const createDonation = (donation) => {
    return {
        type: CREATE_DONATION,
        donation,
    };
};

export const claimDonation = (donation, userId) => {
    return {
        type: CLAIM_DONATION,
        donation,
        userId,
    };
};
