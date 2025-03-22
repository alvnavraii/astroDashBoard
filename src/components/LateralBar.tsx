import { useState, useEffect } from 'react';
import { FaHome, FaDatabase, FaUsers } from 'react-icons/fa';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';

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

    return (
        <aside className="fixed left-0 top-20 h-[calc(100vh-2rem)] w-12 flex flex-col bg-white dark:bg-gray-800 z-10">
            <nav className="flex flex-col items-center mt-4 space-y-4">
                <a href="/dashboard" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FaHome className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                </a>
                
                <button 
                    type="button"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                    <FaDatabase className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                </button>

                {isOpen && (
                    <div className="fixed left-12 top-[72px] bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 min-w-[160px]">
                        <a 
                            href="/users" 
                            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <FaUsers className="w-4 h-4 mr-2" />
                            <span>
                                {t('lateralBar.menu.users')}
                            </span>
                        </a>
                    </div>
                )}
            </nav>
        </aside>
    );
}
