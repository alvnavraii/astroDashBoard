import { FC, useEffect, useState } from 'react';
import { Language, languages, getStoredLanguage, setStoredLanguage, getTranslation } from '../i18n';
import FlagIcon from './FlagIcon';

const LanguageSelector: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<Language>('en');

    // Initialize language after mount
    useEffect(() => {
        setCurrentLang(getStoredLanguage());
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setCurrentLang(lang);
        setStoredLanguage(lang);
        setIsOpen(false);
        // Reload the page to apply the new language
        window.location.reload();
    };

    const t = (key: string) => getTranslation(currentLang, key);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-l-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors border-r border-primary-foreground/10 min-w-[140px]"
                aria-label="Select language"
            >
                <FlagIcon language={currentLang} />
                <span>{t(`languages.${currentLang}`)}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-card rounded-lg shadow-lg border border-border z-50">
                        {Object.keys(languages).map((code) => (
                            <button
                                key={code}
                                onClick={() => handleLanguageChange(code as Language)}
                                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-accent transition-colors ${
                                    currentLang === code ? 'bg-accent' : ''
                                }`}
                            >
                                <FlagIcon language={code as Language} />
                                <span>{t(`languages.${code}`)}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;