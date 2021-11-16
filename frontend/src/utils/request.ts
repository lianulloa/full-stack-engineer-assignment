import axios from "axios"

const request = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/"
    : "https://deployed-url.herokuapp.com/api/",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  data: {}
})

export default request