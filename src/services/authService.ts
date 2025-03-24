import HttpService from './httpService';
import UserService from './userService';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

class AuthService {
    private static setCookie(token: string): void {
        const expirationHours = 6;
        const date = new Date();
        date.setTime(date.getTime() + (expirationHours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `jwt=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
    }

    private static getCookie(): string | null {
        const name = "jwt=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let cookie of cookieArray) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }

    static getToken(): string | null {
        return this.getCookie();
    }

    private static decodeToken(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    static async getCurrentUser(): Promise<User | null> {
        try {
            const userEmail = sessionStorage.getItem('userEmail');
            console.log('Email en getCurrentUser:', userEmail);
            
            if (!userEmail || userEmail === 'undefined'||userEmail==="null"||userEmail==="") {
                console.log('No hay email en sessionStorage');
                return null;
            }

            const user = await UserService.getUserByEmail(userEmail);
            console.log('Usuario obtenido:', user);
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await HttpService.post<AuthResponse>('/auth/login', credentials, {
                requiresAuth: false
            });
            
            // Decodificar el token para obtener el email
            const decodedToken = this.decodeToken(response.token);
            if (!decodedToken || !decodedToken.sub) {
                throw new Error('Invalid token structure');
            }

            const userEmail = decodedToken.sub;
            
            // Guardar token y email
            this.setCookie(response.token);
            sessionStorage.setItem('userEmail', userEmail);
            
            console.log('Email guardado en sessionStorage:', userEmail);
            
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async logout(): Promise<void> {
        try {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
            sessionStorage.removeItem('userEmail');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    static isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token; // Aquí podrías añadir validación adicional del token si lo necesitas
    }
}

export default AuthService;
