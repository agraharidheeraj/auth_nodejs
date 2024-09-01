import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_URL;

const axiosInstance= axios.create({
     baseURL:ApiUrl,
     withCredentials:true,
})
export default axiosInstance;