# Astro Starter Kit: Minimal

# Astro Dashboard

A modern authentication dashboard built with Astro and React, featuring multi-language support (English, Spanish, and Catalan), dark/light theme, and a responsive design.

## 🚀 Quick Start

You can run this project directly in your browser:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/alvnavraii/astroDashBoard)

Or run it locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```text
/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── SignInForm.tsx
│   │   └── ThemeToggle.tsx
│   ├── i18n/
│   │   ├── translations/
│   │   │   ├── ca.json
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── index.ts
│   ├── layouts/
│   │   ├── ErrorLayout.astro
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── 401.astro
│   │   ├── 404.astro
│   │   ├── forgot-password.astro
│   │   ├── index.astro
│   │   ├── signin.astro
│   │   └── signup.astro
│   ├── services/
│   │   ├── authService.ts
│   │   └── httpService.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── errors.ts
└── package.json
```

## 🌟 Features

### Authentication
- Sign In form with validation
- Sign Up page
- Forgot Password flow
- Custom error pages (401, 404)

### Internationalization
- 🇬🇧 English
- 🇪🇸 Spanish
- Senyera Catalan
- Automatic browser language detection
- Persistent language selection

### Theme
- Dark/Light mode toggle
- System theme detection
- Persistent theme selection
- Tailwind CSS for styling

### Components
- Reusable Button component
- Password input with show/hide toggle
- Language selector with flags/icons
- Theme toggle with animations
- Error pages with custom layouts

## 🧞 Commands

All commands are run from the root of the project:

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🛠️ Tech Stack

- [Astro](https://astro.build) - Web framework for content-focused websites
- [React](https://reactjs.org) - UI components and interactivity
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better DX

## 📝 License

MIT
