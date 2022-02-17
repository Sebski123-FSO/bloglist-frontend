import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newNote, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

export default { getAll, create };
