import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/auth";

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const signupUser = async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
};
