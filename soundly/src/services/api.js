import axios from "axios";

const api = axios.create({
  baseURL: "https://soundly-api.onrender.com", 
  timeout: 60000,
  headers: {
    Authorization: "d0aafc97-3bdc-4b41-81fc-bc97f1fa9146",
  },
});

export default api;
