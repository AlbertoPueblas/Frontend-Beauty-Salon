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

export const meProfile = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.get(`${API_URL}user/profile`, config)
    return res.data
}

export const bringDates = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.get(`${API_URL}user/appointment`, config)
    return res.data
}