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
    return axios.post(`${API_URL}auth/register`, credentials)
}

export const loginCall = async (credentials) => {
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
  return axios.get(`${API_URL}treatment/allTreatment`, config)
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
  console.log("hhhh",dataToSend);
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

//Admin calls.
export const allUsers = async (token, page = 1, limit =15) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}user/allUsers?page=${page}&limit${limit}`, config);
}

export const allAppointments = async (token, page = 1, limit = 15) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}appointment/totalDates?page=${page}&limit${limit}`, config);
}

export const resetUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.put(`${API_URL}user/restore/${id}`,{},  config)
}

export const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.delete(`${API_URL}user/permanentDell/${id}`, config)
}

export const allTreatments = async (token, page = 1, limit = 15) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}treatment/allTreatment?page=${page}&limit${limit}`, config);
}

export const deleteAppointmentByAdmin = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("borratis", id);
  return axios.delete(`${API_URL}appointment/deleteByAdmin/${id}`, config)
}

export const updateForUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.put(`${API_URL}user/updateByAd/${id}`,{}, config)
}

export const createTreatment = async (treatmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("Create",treatmentData);
  return axios.post(`${API_URL}treatment/newTreatment`, treatmentData, config)
}

export const modifyTreatment = async (treatmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("moood",treatmentData);
  return axios.put(`${API_URL}treatment/putTreatment`, treatmentData, config)

}

export const deleteTreatment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.delete(`${API_URL}treatment/delTreatment/${id}`, config)
}