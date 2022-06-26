import axios from "axios";

export default axios.create({
  baseURL: "https://gettingbetterapi.azurewebsites.net/api/v1/",
  headers: {"Content-type": "application/json"}
});