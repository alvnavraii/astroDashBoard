import { FC, useEffect, useState } from 'react';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';

interface ErrorPageProps {
    errorCode: '401' | '404';
    errorType?: 'session' | 'credentials';
}

const ErrorPage: FC<ErrorPageProps> = ({ errorCode, errorType = 'session' }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Initialize language after mount
    useEffect(() => {
        setLanguage(getStoredLanguage());
    }, []);

    // Update translations when language changes
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

    const t = (key: string) => {
        const prefix = errorCode === '401' && errorType === 'credentials' 
            ? 'errorPages.invalidCredentials.'
            : `errorPages.${errorCode}.`;
        return getTranslation(language, prefix + key);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
            <div className="text-center px-4">
                <div className="mb-8 select-none">
                    <div className={`text-9xl font-bold mb-4 ${errorCode === '401' ? 'animate-bounce' : 'animate-float'}`}>
                        {errorCode === '401' ? (errorType === 'credentials' ? '🔑' : '🔒') : '🕵️'}
                    </div>
                    <h1 className={`text-8xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text ${
                        errorCode === '401' ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-purple-500'
                    }`}>
                        {errorCode}
                    </h1>
                </div>

                <div className="max-w-lg mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold">{t('heading')}</h2>
                    <p className="text-muted-foreground">{t('description')}</p>

                    <div className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="font-semibold mb-4">{t('tips.title')}</h3>
                        <ul className="space-y-3 text-left">
                            {errorCode === '401' ? (
                                errorType === 'credentials' ? (
                                    <>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.check')}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.reset')}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.support')}</span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.login')}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.cookies')}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span>{t('tips.timeout')}</span>
                                        </li>
                                    </>
                                )
                            ) : (
                                <>
                                    <li className="flex items-center gap-2">
                                        <span>{t('tips.check')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span>{t('tips.home')}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span>{t('tips.contact')}</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <a
                        href={errorCode === '401' ? (errorType === 'credentials' ? '/signin' : '/signin') : '/'}
                        className="auth-button inline-flex justify-center items-center"
                    >
                        {t('action')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
