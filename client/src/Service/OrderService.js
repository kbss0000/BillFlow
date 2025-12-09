import apiClient from "../util/axios";

export const latestOrders = async () => {
    return await apiClient.get("/orders/latest");
}

export const fetchOrders = async () => {
    return await apiClient.get("/orders/latest");
}

export const createOrder = async (order) => {
    return await apiClient.post("/orders", order);
}

export const deleteOrder = async (id) => {
    return await apiClient.delete(`/orders/${id}`);
}