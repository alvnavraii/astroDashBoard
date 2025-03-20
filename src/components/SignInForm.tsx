import { useState, type FormEvent, useEffect } from 'react';
import AuthService from '../services/authService';
import { ApiError, NetworkError } from '../utils/errors';
import PasswordInput from './PasswordInput';
import { getTranslation, getStoredLanguage, type Language } from '../i18n';

const SignInForm = () => {
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
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

    const t = (key: string) => getTranslation(language, key);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await AuthService.login({ email, password });
            // Si la autenticación es exitosa, redirigir al dashboard
            window.location.replace('/');
            return;
        } catch (err) {
            if (err instanceof NetworkError) {
                setError(t('auth.errors.networkError'));
            } else if (err instanceof ApiError) {
                if (err.status === 401) {
                    window.location.replace('/401?type=credentials');
                    return;
                }
                setError(t('auth.errors.unexpectedError'));
            } else {
                setError(t('auth.errors.unexpectedError'));
            }
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <h2 className="text-2xl font-bold text-center mb-6">{t('auth.welcome')}</h2>

            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('auth.email')}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="auth-input"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    {t('auth.password')}
                </label>
                <PasswordInput
                    disabled={isLoading}
                    className="auth-input pr-10" 
                />
            </div>

            <div className="flex justify-end mt-2">
                <a href="/forgot-password" className="auth-link text-sm">
                    {t('auth.forgotPassword')}
                </a>
            </div>

            <button
                type="submit"
                className="auth-button mt-6"
                disabled={isLoading}
            >
                {isLoading ? t('common.loading') : t('auth.signIn')}
            </button>

            <div className="auth-divider mt-6">
                <div className="auth-divider-line" />
                <div className="text-sm text-muted-foreground px-3">{t('auth.noAccount')}</div>
                <div className="auth-divider-line" />
            </div>

            <a
                href="/signup"
                className="auth-button variant-outline flex justify-center items-center mt-6"
            >
                {t('auth.signUp')}
            </a>
        </form>
    );
};

export default SignInForm;
