import axios from "axios";
import { Values } from "../../pages/Auth";
import { IUser } from "../reducers/auth";

const api = axios.create({
    baseURL: "http://localhost:3001"
});

export const register = async (formData: Values) => {
    const response = await api.post<IUser>("/user/register", formData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};

export const login = async (formData: Values) => {
    const response = await api.post<IUser>("/user/login", formData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};