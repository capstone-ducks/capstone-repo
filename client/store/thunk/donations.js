import axios from "axios";
import {
    getAllDonations,
    getOneDonation,
    createDonation,
} from "../action-creators";

export const fetchAllDonations = () => {
    return async (dispatch) => {
        const { data: donations } = await axios.get(`/api/donations`);
        dispatch(getAllDonations(donations));
    };
};

export const fetchAllUsersDonations = (id) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
        const { data: donations } = await axios.get(`/api/users/${id}/donations`,
            {
                headers: {
                    authorization: token,
                },
            });
        dispatch(getAllDonations(donations));
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
        dispatch(createDonation(donation));
        }
        catch(err) {
            console.log('Error in createDonationThunk ', err);
        }
        // history.push('/')
    };
};
