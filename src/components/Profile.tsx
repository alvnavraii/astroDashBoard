import { useState, useEffect } from 'react';
import { Avatar } from "flowbite-react";
import AuthService from '../services/authService';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';

interface User {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    id?: string;
    email?: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const language = getStoredLanguage();

    useEffect(() => {
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

    if (!user) return null;

    return (
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 10rem)' }}>
            <div className="max-w-2xl w-full mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-6 mb-6">
                        <Avatar
                            img={user.avatarUrl || `/avatars/avatar${user.id}.jpg`}
                            size="lg"
                            rounded={true}
                            placeholderInitials={`${user.firstName[0]}${user.lastName[0]}`}
                            className="ring-2 ring-gray-100 dark:ring-gray-600 w-20 h-20 rounded-full"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName}
                            </h2>
                            {user.email && (
                                <p className="text-gray-600 dark:text-gray-300">
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {getTranslation(language, "profile.personalInfo")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {getTranslation(language, "profile.firstName")}
                                </label>
                                <p className="mt-1 text-gray-900 dark:text-white">
                                    {user.firstName}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {getTranslation(language, "profile.lastName")}
                                </label>
                                <p className="mt-1 text-gray-900 dark:text-white">
                                    {user.lastName}
                                </p>
                            </div>
                            {user.email && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {getTranslation(language, "profile.email")}
                                    </label>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
