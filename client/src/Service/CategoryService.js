import apiClient from "../util/axios";

export const addCategory = async (category, file) => {
    const formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('file', file);

    return await apiClient.post('/admin/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteCategory = async (categoryId) => {
    return await apiClient.delete(`/admin/categories/${categoryId}`);
}

export const updateCategory = async (categoryId, category, file) => {
    const formData = new FormData();
    formData.append('category', JSON.stringify(category));
    if (file) {
        formData.append('file', file);
    }

    return await apiClient.put(`/admin/categories/${categoryId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const fetchCategories = async () => {
    return await apiClient.get('/categories');
}