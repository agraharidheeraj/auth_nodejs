import axios from "axios";

const ApiUrl ="http://localhost:8080";

const axiosInstance= axios.create({
     baseURL:ApiUrl,
     withCredentials:true,
})
export default axiosInstance;