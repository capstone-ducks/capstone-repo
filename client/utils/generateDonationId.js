import axios from "axios";

const generateDonationId = async () => {
  const { data: donations } = await axios.get("/api/donations");
  return donations.length + 1;
};

export default generateDonationId;
