<p align="center">
  <h1 align="center">🌍 MultilanguageJS</h1>
  <p align="center">
    <strong>Simple, zero-dependency i18n for static websites.</strong>
  </p>
  <p align="center">
    Add multi-language support with just a few lines of code — no complex configurations or heavy frameworks needed.
  </p>
  <p align="center">
    <a href="https://www.npmjs.com/package/multilanguagejs"><img src="https://img.shields.io/npm/v/multilanguagejs?style=flat-square&color=cb3837" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/multilanguagejs"><img src="https://img.shields.io/npm/dm/multilanguagejs?style=flat-square&color=blue" alt="npm downloads" /></a>
    <a href="https://github.com/ianwelerson/multilanguagejs/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/multilanguagejs?style=flat-square&color=green" alt="license" /></a>
    <a href="https://bundlephobia.com/package/multilanguagejs"><img src="https://img.shields.io/bundlephobia/minzip/multilanguagejs?style=flat-square&color=orange" alt="bundle size" /></a>
  </p>
</p>

<br />

## ✨ Features

- 🚫 **Zero dependencies** — nothing to install besides the lib itself
- 🔀 **Two translation modes** — HTML templates and string dictionaries
- 🌐 **Browser language detection** — auto-detect with `navigator.language`
- 🔄 **Fallback support** — missing translations gracefully fall back to your default language
- 🔷 **TypeScript** — full type definitions included out of the box
- 🪶 **Tiny** — ~2KB minified, because your users shouldn't pay for i18n
- 📦 **CDN + npm** — use it however you want

<br />

## 📥 Installation

### npm

```bash
npm install multilanguagejs
```

### CDN

```html
<script src="https://unpkg.com/multilanguagejs/dist/multilanguagejs.umd.js"></script>
```

<br />

## 🚀 Quick Start

### Option 1: String Dictionaries

The simplest approach — provide translations as a JavaScript object and mark elements with `data-i18n`.

```html
<h1 data-i18n="greeting"></h1>
<p data-i18n="description"></p>

<script src="https://unpkg.com/multilanguagejs/dist/multilanguagejs.umd.js"></script>
<script>
  const ml = new MultilanguageJS({
    languages: ["en-US", "pt-BR"],
    defaultLanguage: "en-US",
    translations: {
      "en-US": {
        greeting: "Hello!",
        description: "Welcome to my website.",
      },
      "pt-BR": {
        greeting: "Olá!",
        description: "Bem-vindo ao meu site.",
      },
    },
  });

  ml.setLanguageFromBrowser();
</script>
```

### Option 2: HTML Templates

Use native `<template>` tags to define content variants directly in your HTML.

```html
<template type="language-group">
  <h1 language="en-US">Hello!</h1>
  <h1 language="pt-BR">Olá!</h1>
</template>

<template type="language-group">
  <p language="en-US">Welcome to my website.</p>
  <p language="pt-BR">Bem-vindo ao meu site.</p>
</template>

<script type="module">
  import { MultilanguageJS } from "multilanguagejs";

  const ml = new MultilanguageJS({
    languages: ["en-US", "pt-BR"],
    defaultLanguage: "en-US",
  });

  ml.setLanguageFromBrowser();
</script>
```

### 🤝 Combining Both Modes

You can use templates and string dictionaries together in the same page. Templates are great for complex HTML blocks, while string dictionaries work well for simple text content.

<br />

## 📖 API

### `new MultilanguageJS(options)`

Creates a new instance.

| Option            | Type       | Required | Description                                          |
| ----------------- | ---------- | -------- | ---------------------------------------------------- |
| `languages`       | `string[]` | ✅       | Array of accepted language codes                     |
| `defaultLanguage` | `string`   | ➖       | Fallback language (defaults to first in `languages`) |
| `translations`    | `object`   | ➖       | Translation dictionaries keyed by language           |

### Methods

| Method                          | Description                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `setLanguage(lang)`             | Set the active language. Falls back to default if the language is not accepted.                 |
| `setLanguageFromBrowser()`      | Set the language based on `navigator.language`.                                                 |
| `getActiveLanguage()`           | Returns the current active language or `null`.                                                  |
| `getAcceptedLanguages()`        | Returns the array of accepted languages.                                                        |
| `getDefaultLanguage()`          | Returns the default/fallback language.                                                          |
| `setTranslations(translations)` | Update the translation dictionaries at runtime. Immediately re-applies if a language is active. |
| `getLanguageTemplates()`        | Returns all `<template type="language-group">` elements found in the document.                  |

<br />

## 🔀 Language Switcher Example

```html
<select id="lang-switcher">
  <option value="en-US">English</option>
  <option value="pt-BR">Português</option>
</select>

<script>
  document.getElementById("lang-switcher").addEventListener("change", (e) => {
    ml.setLanguage(e.target.value);
  });
</script>
```

<br />

## 🔷 TypeScript

Full type definitions are included. Import types directly:

```ts
import {
  MultilanguageJS,
  type MultilanguageJSOptions,
  type Translations,
} from "multilanguagejs";
```

<br />

## 🛠️ Development

```bash
npm install        # Install dependencies
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run build      # Build for production
npm run lint       # Lint source code
```

<br />

## 📄 License

MIT — Made with ❤️ by [Ian Welerson](https://github.com/ianwelerson)
