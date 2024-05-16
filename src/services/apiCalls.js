import axios from "axios"

//---------------------------------------------

const API_URL = "http://localhost:3000/api/"


export const newRegister = async (credentials) => {
    console.log(credentials, "aqui registro");
    return axios.post(`${API_URL}auth/register`, credentials)
}

export const loginCall = async (credentials) => {
    console.log(credentials,"hello");
    const res = await axios.post(`${API_URL}auth/login`, credentials);
    return res
};