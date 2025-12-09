import apiClient from "../util/axios";

export const addItem = async (item) => {
    return await apiClient.post('/admin/items', item);
}

export const deleteItem = async (itemId) => {
    return await apiClient.delete(`/admin/items/${itemId}`);
}

export const fetchItems = async () => {
    return await apiClient.get('/items');
}