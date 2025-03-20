import es from './translations/es.json';
import ca from './translations/ca.json';
import en from './translations/en.json';

export type Language = 'es' | 'ca' | 'en';

export const languages = {
    es: {
        name: 'Español',
        flag: '🇪🇸',
        translations: es
    },
    ca: {
        name: 'Català',
        flag: '🐲',
        translations: ca
    },
    en: {
        name: 'English',
        flag: '🇬🇧',
        translations: en
    }
} as const;

export type TranslationKey = keyof typeof es;

export function getTranslation(lang: Language, key: string): string {
    const keys = key.split('.');
    let current: any = languages[lang].translations;
    
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
