import es from './translations/es.json';
import ca from './translations/ca.json';
import en from './translations/en.json';
import fr from './translations/fr.json';
import de from './translations/de.json';

export type Language = 'en' | 'es' | 'ca' | 'fr' | 'de';

export const languages: Record<Language, { flag: string }> = {
    en: { flag: '🇬🇧' },
    es: { flag: '🇪🇸' },
    ca: { flag: '' },  // Este usa el componente CatalanFlag
    fr: { flag: '🇫🇷' },
    de: { flag: '🇩🇪' }
};

export type TranslationKey = keyof typeof es;

export function getTranslation(lang: Language, key: string): string {
    const keys = key.split('.');
    let current: any;
    switch(lang) {
        case 'es':
            current = es;
            break;
        case 'ca': 
            current = ca;
            break;
        case 'en':
            current = en;
            break;
        case 'fr':
            current = fr;
            break;
        case 'de':
            current = de;
            break;
        default:
            current = en; // Fallback to English
    }
    
    for (const k of keys) {
        if (current[k] === undefined) {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
            return key;
        }
        current = current[k];
    }
    
    return current;
}

export function getBrowserLanguage(): Language {
    if (typeof window === 'undefined') return 'en';
    const userLang = navigator.language.split('-')[0];
    return (userLang in languages ? userLang : 'en') as Language;
}

export function getStoredLanguage(): Language {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('language') || getBrowserLanguage()) as Language;
}

export function setStoredLanguage(lang: Language): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('language', lang);
}
