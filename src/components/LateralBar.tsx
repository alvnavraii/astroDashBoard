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
        console.log('Language:', language);
        console.log('Translation result:', getTranslation(language, key));
        return getTranslation(language, key);
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-800 z-10">
            <nav className="flex flex-col items-center mt-6 space-y-6">
                <a href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FaHome className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                </a>
                
                <button 
                    type="button"
                    onClick={() => {
                        console.log('Toggling menu:', !isOpen);
                        setIsOpen(!isOpen);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                    <FaDatabase className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                </button>

                {isOpen && (
                    <div className="fixed left-16 top-[88px] bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 min-w-[160px]">
                        <a 
                            href="/users" 
                            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <FaUsers className="w-5 h-5 mr-2" />
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
