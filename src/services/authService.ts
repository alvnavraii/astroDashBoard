import HttpService from './httpService';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    // Puedes añadir más campos según lo que devuelva tu API
    // Por ejemplo: user: { id: string, name: string, email: string }
}

class AuthService {
    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const data = await HttpService.post<AuthResponse>('/auth/login', credentials, {
                requiresAuth: false // No necesitamos token para hacer login
            });
            
            // Guardar el token en localStorage
            localStorage.setItem('jwt', data.token);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async logout(): Promise<void> {
        try {
            // Aquí podrías hacer una llamada a la API para invalidar el token si es necesario
            // await HttpService.post('/auth/logout', {});
            
            // Eliminar el token del localStorage
            localStorage.removeItem('jwt');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    static getToken(): string | null {
        return localStorage.getItem('jwt');
    }

    static isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token; // Aquí podrías añadir validación adicional del token si lo necesitas
    }
}

export default AuthService;
