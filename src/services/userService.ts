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
}

export default UserService;