import axios from "axios"

//---------------------------------------------

const API_URL = "http://localhost:3000/api/"

export const appointmentCreate = async(appCreate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.post(`${API_URL}appointment/create`,appCreate, config);
  return res
}

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

export const updateProfile = async (profileData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.put(`${API_URL}user/putProfile`, profileData, config)
    return res
}

export const bringAllStylists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}user/allStylist`, config)
}

export const bringAllTreatments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}treatsment/allTreatsment`, config)
}

export const getAppointmentId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}appointment/date/${id}`, config)
  return res
}

export const updateAppointment = async (dataToSend, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.put(`${API_URL}appointment/modAppointment`,dataToSend, config)
  return res
}

export const deleteDate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.delete(`${API_URL}appointment/deleteAppointment/${id}`, config)
  return res
}


export const desactiveProfile = async (active, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.put(`${API_URL}user/Delete`, active, config)
}

// export const verifyPassword = (passwordData, token) => {
//   return axios.put(`${API_URL}user/putProfile`, passwordData, {
//       headers: {
//           Authorization: `Bearer ${token}`
//       }
//   }).then(response => response.data.valid);
// };

// export const changePassword = (passwordData, token) => {
//   return axios.put(`${API_URL}user/putProfile`, passwordData, {
//       headers: {
//           Authorization: `Bearer ${token}`
//       }
//   });
// };
