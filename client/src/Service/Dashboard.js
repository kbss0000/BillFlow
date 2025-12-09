import apiClient from "../util/axios";

export const fetchDashboardData = async () => {
    return await apiClient.get("/dashboard");
}

