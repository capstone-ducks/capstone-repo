import axios from "axios";

const generateUserId = async () => {
  const { data: donations } = await axios.get("/api/users");
  return donations.length + 1;
};

export default generateUserId;