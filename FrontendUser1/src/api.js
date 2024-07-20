import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const callApi = async (
  endpoint,
  method = "GET",
  body = null,
  isFormaDataAPI = false,
  queryParams = {}
) => {
  const token = localStorage.getItem("token");

  const config = {
    method: method,
    url: `${BASE_URL}/${endpoint}`,
    headers: {
      "Content-Type":
        isFormaDataAPI === true ? "multipart/form-data" : "application/json",
    },
    data: body,
    params: queryParams,
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return [null, error.response ? error.response.data : error.message];
  }
};
