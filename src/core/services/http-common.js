import axios from "axios";

export default axios.create({
  // baseURL: "https://gettingbetterapi.azurewebsites.net/api/v1/",
  baseURL: "https://localhost:7003/api/v1/",
  headers: {"Content-type": "application/json"}
});