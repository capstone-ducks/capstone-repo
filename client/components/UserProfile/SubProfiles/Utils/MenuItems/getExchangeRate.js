import axios from "axios";

const getExchangeRate = async () => {
    const {
        ticker: { price },
    } = (await axios.get("https://api.cryptonator.com/api/ticker/usd-eth"))
        .data;

    return price;
};

export default getExchangeRate;
