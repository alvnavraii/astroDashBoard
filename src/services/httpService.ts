import AuthService from './authService';
import { ApiError, NetworkError } from '../utils/errors';

interface RequestConfig extends RequestInit {
    requiresAuth?: boolean;
}

interface ApiErrorResponse {
    message: string;
    code?: string;
}

class HttpService {
    private static API_URL = 'http://localhost:8080/api/v1';

    static async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const { requiresAuth = true, ...fetchConfig } = config;
        const headers = new Headers(fetchConfig.headers);

        // Si la petición requiere autenticación, añadir el token JWT
        if (requiresAuth) {
            const token = AuthService.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }

        // Asegurarse de que siempre enviamos y recibimos JSON
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        try {
            const response = await fetch(`${this.API_URL}${endpoint}`, {
                ...fetchConfig,
                headers,
            });

            // Si la respuesta no es exitosa, manejar el error
            if (!response.ok) {
                // Intentar obtener el mensaje de error de la API
                let errorData: ApiErrorResponse;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { message: 'Error desconocido del servidor' };
                }

                // Solo manejar redirección a /401 para tokens expirados en rutas autenticadas
                if (response.status === 401 && requiresAuth) {
                    const token = AuthService.getToken();
                    if (token) {
                        AuthService.logout();
                        window.location.href = '/401';
                    }
                }

                throw new ApiError(
                    errorData.message,
                    response.status,
                    errorData.code
                );
            }

            // Parsear la respuesta como JSON
            const data = await response.json();
            return data as T;
        } catch (error) {
            // Si es un error de red (servidor apagado, sin conexión, etc.)
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw new NetworkError();
            }
            // Si es nuestro ApiError personalizado, lo propagamos
            if (error instanceof ApiError) {
                throw error;
            }
            // Para cualquier otro tipo de error
            throw new ApiError('Error inesperado en la solicitud');
        }
    }

    static get<T>(endpoint: string, config: RequestConfig = {}) {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    static post<T>(endpoint: string, body: any, config: RequestConfig = {}) {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    static put<T>(endpoint: string, body: any, config: RequestConfig = {}) {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    static delete<T>(endpoint: string, config: RequestConfig = {}) {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }
}

export default HttpService;
