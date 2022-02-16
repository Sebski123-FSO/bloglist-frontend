import axios from "axios";
const baseUrl = "/api/login";

const login = async (userName, password) => {
  const response = await axios.post(baseUrl, { userName, password });
  return response.data;
};

export default { login };
