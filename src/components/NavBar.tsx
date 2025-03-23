import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import AuthService from '../services/authService';
import { Avatar } from "flowbite-react";
interface User {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    id?: string;
}

const NavBar = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log('Efecto iniciado');
        (async () => {
            try {
                const currentUser = await AuthService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Error:', error);
                setUser(null);
            }
        })();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full h-[5rem] bg-background z-50">
            <div className="max-w-7xl mx-auto px-4 h-full relative">
                <div className="fixed top-2 left-20  items-center justify-left h-full">
                   {user && <Avatar
                        img={user?.avatarUrl || `/avatars/avatar${user?.id}.jpg`}
                        size="lg"
                        rounded={true}
                        placeholderInitials={`${user?.firstName[0]}${user?.lastName[0]}`}
                        className="ring-2 ring-gray-100 dark:ring-gray-600 w-20 h-20 rounded-full"
                    />}
                </div>
                <div className="flex items-center justify-center h-full">
                    <h1 className="text-2xl font-bold text-foreground">
                        {user?`${user.firstName} ${user.lastName}`: ""}
                    </h1>
                </div>
                <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
                    <LanguageSelector />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default NavBar; 