import apiClient from "../util/axios";

export const login = async (data) => {
    return await apiClient.post("/login", data);
}