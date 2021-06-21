import axios from "axios";
import {
    getAllDonations,
    getOneDonation,
    createDonation,
    claimDonation,
} from "../action-creators/donations";

export const fetchAllDonations = () => {
    return async (dispatch) => {
        try {
            const { data: donations } = await axios.get(`/api/donations`);
            dispatch(getAllDonations(donations));
        } catch (err) {
            console.log("Error in fetchAllDonations thunk ", err);
        }
    };
};

export const fetchAllUsersDonations = (id) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem("token");
            const { data: donations } = await axios.get(
                `/api/users/${id}/donations`,
                {
                    headers: {
                        authorization: token,
                    },
                },
            );
            dispatch(getAllDonations(donations));
        } catch (err) {
            console.log("Error in fetchAllUsersDonations thunk ", err);
        }
    };
};

export const fetchOneDonation = (id) => {
    return async (dispatch) => {
        const { data: donation } = await axios.get(`/api/donations/${id}`);

        dispatch(getOneDonation(donation));
    };
};

export const createDonationThunk = (donationData) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem("token");
            const { data: donation } = await axios.post(
                `/api/donations/`,
                donationData,
                {
                    headers: {
                        authorization: token,
                    },
                },
            );
            console.log(donation);
            dispatch(createDonation(donation));
        } catch (err) {
            console.log("Error in createDonationThunk ", err);
        }
    };
};

export const claimDonationThunk = (donationId, userId, body) => {
    return async (dispatch) => {
        try {
            const { data: donation } = await axios.put(
                `/api/donations/${donationId}/${userId}`,
                body,
            );
            dispatch(claimDonation(donation));
            dispatch(fetchAllUsersDonations(userId));
        } catch (err) {
            console.log("Error in claimDonationThunk ", err);
        }
    };
};
