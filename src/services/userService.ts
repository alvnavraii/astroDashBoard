import HttpService from './httpService';
import type { User } from '../models/User';

class UserService {
    static async getUsers(): Promise<User[]> {
        try {
            const response = await HttpService.get<User[]>('/users', {
                requiresAuth: true
            });
            return response;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async getUserByEmail(email: string): Promise<User> {
        try {
            const response = await HttpService.get<User>(`/users/email/${email}`, {
                requiresAuth: true
            });
            return response;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }
}

export default UserService;