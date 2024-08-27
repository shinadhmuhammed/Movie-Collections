import axios from "axios";

const createAxios = () => {
    const axiosUser = axios.create({
        baseURL: `http://localhost:3001/`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return axiosUser;
};


export default createAxios;
