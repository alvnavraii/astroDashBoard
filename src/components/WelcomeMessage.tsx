import { useState, useEffect } from 'react';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';

export default function WelcomeMessage() {
    const [language, setLanguage] = useState<Language>(getStoredLanguage());

    useEffect(() => {
        const handleStorageChange = () => {
            const newLang = getStoredLanguage();
            if (newLang !== language) {
                setLanguage(newLang);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [language]);

    const t = (key: string) => getTranslation(language, key);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-bold mb-4">
                    🎉
                </h1>
                <h2 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                    {t("dashboard.welcome")}
                </h2>
                <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
                    {t("dashboard.ready")}
                    <span className="animate-bounce inline-block">🚀</span>
                </p>
                <p className="text-xl text-purple-500 dark:text-purple-400">
                    {t("dashboard.have_day")}
                    <span className="animate-pulse inline-block">💜</span>
                </p>
            </div>
        </div>
    );
} 