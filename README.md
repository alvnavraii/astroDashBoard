# Astro Starter Kit: Minimal

```sh
yarn create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `yarn install`             | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Astro Dashboard

A modern authentication dashboard built with Astro and React, featuring multi-language support (English, Spanish, and Catalan), dark/light theme, and a responsive design.

## 🚀 Quick Start

You can run this project in your browser using CodeSandbox:

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/alvnavraii/astroDashBoard)

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
