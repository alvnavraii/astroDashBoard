import { FC, useEffect, useState } from 'react';
import { Language, languages, getStoredLanguage, setStoredLanguage } from '../i18n';

interface FlagProps {
    language: Language;
    className?: string;
}

const CatalanFlag: FC<{ className?: string }> = ({ className = '' }) => (
    <svg 
        className={className} 
        viewBox="0 0 900 600" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="900" height="600" fill="#FCDD09"/>
        <path stroke="#DA121A" strokeWidth="60" d="M0 120h900M0 240h900M0 360h900M0 480h900"/>
    </svg>
);

const Flag: FC<FlagProps> = ({ language, className = '' }) => {
    if (language === 'ca') {
        return <CatalanFlag className={`w-6 h-4 ${className}`} />;
    }
    return <span className={`text-xl ${className}`}>{languages[language].flag}</span>;
};

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

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Select language"
            >
                <Flag language={currentLang} />
                <span>{languages[currentLang].name}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                        {Object.entries(languages).map(([code, lang]) => (
                            <button
                                key={code}
                                onClick={() => handleLanguageChange(code as Language)}
                                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-accent transition-colors ${
                                    currentLang === code ? 'bg-accent' : ''
                                }`}
                            >
                                <Flag language={code as Language} />
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;
