import {
    GET_ALL_DONATIONS,
    GET_ONE_DONATION,
    CREATE_DONATION,
    UPDATE_DONATION
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

export const updateDonation = (donation) => {
    return {
        type: UPDATE_DONATION,
        donation,
    };
};