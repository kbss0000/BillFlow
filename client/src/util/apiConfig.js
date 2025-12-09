// API Configuration - uses environment variable or defaults to localhost
const getApiBaseUrl = () => {
    // Check for environment variable first (set during build)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // In production (Railway), use the backend service URL
    if (window.location.hostname.includes('railway.app')) {
        return 'https://billflow-api-production.up.railway.app/api/v1.0';
    }

    // Default for local development
    return '/api/v1.0';
};

export const API_BASE_URL = getApiBaseUrl();
