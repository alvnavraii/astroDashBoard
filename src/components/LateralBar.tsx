import { useState, useEffect } from 'react';
import { FaHome, FaDatabase, FaUsers, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';
import AuthService from '../services/authService';

export default function LateralBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>(getStoredLanguage());

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(getStoredLanguage());
        };

        window.addEventListener('storage', handleLanguageChange);
        return () => window.removeEventListener('storage', handleLanguageChange);
    }, []);

    const t = (key: string) => {
        return getTranslation(language, key);
    };

    const handleLogout = () => {
        AuthService.logout();
        window.location.href = '/signin';
    };

    return (
        <aside className="fixed left-0 top-20 h-[calc(100vh-2rem)] w-12 flex flex-col bg-white dark:bg-gray-800 z-10">
            <nav className="flex flex-col items-center mt-4 space-y-4 h-full">
                <div className="group relative flex items-center">
                    <a 
                        href="/dashboard" 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <FaHome className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                    </a>
                    <div className="invisible group-hover:visible absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-gray-900 dark:before:border-r-gray-600">
                        {t("nav.home")}
                    </div>
                </div>

                <div className="group relative flex items-center">
                    <a 
                        href="/profile" 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <FaUser className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                    </a>
                    <div className="invisible group-hover:visible absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-gray-900 dark:before:border-r-gray-600">
                        {t("nav.profile")}
                    </div>
                </div>

                <div className="group relative flex items-center">
                    <button 
                        type="button"
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <FaDatabase className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                    </button>
                    <div className={`invisible ${!isOpen && 'group-hover:visible'} absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-600 text-white text-sm font-medium rounded-lg opacity-0 ${!isOpen && 'group-hover:opacity-100'} transition-all duration-300 whitespace-nowrap before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-gray-900 dark:before:border-r-gray-600`}>
                        {t("nav.database")}
                    </div>
                    {isOpen && (
                        <div className="absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 bg-gray-600 dark:bg-gray-600 rounded-lg shadow-lg py-2 min-w-[160px] z-20 before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-gray-600">
                            <a 
                                href="/users"
                                className="flex items-center px-4 py-2 text-white dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                            >
                                <FaUsers className="w-5 h-5 mr-2" />
                                <span>{t("nav.users")}</span>
                            </a>
                        </div>
                    )}
                </div>

                <div className="group relative flex items-center mt-auto">
                    <button 
                        onClick={handleLogout} 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                    </button>
                    <div className="invisible group-hover:visible absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap before:content-[''] before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-8 before:border-transparent before:border-r-gray-900 dark:before:border-r-gray-600">
                        {t("nav.logout")}
                    </div>
                </div>
            </nav>
        </aside>
    );
}
