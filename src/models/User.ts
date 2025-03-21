export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl: string;
    isActive: boolean;
    isAdmin: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;
}