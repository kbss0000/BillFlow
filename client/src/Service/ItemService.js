import apiClient from "../util/axios";

export const addItem = async (item, file) => {
    const formData = new FormData();
    formData.append('item', JSON.stringify(item));
    formData.append('file', file);

    return await apiClient.post('/admin/items', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteItem = async (itemId) => {
    return await apiClient.delete(`/admin/items/${itemId}`);
}

export const updateItem = async (itemId, item, file) => {
    const formData = new FormData();
    formData.append('item', JSON.stringify(item));
    if (file) {
        formData.append('file', file);
    }

    return await apiClient.put(`/admin/items/${itemId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const fetchItems = async () => {
    return await apiClient.get('/items');
}