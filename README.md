# MultilanguageJS - Multi language for static sites

A simple way to use multi language in static sites. 

## Installing

You can install using yarn or by cloning the repo.

#### Using Yarn


```
$ yarn add https://github.com/ianwelerson/multilanguagejs.git
```

#### Using the repo

```
$ git clone https://github.com/ianwelerson/multilanguagejs.git
```

## Using

1) Import in js file

```
import MultilanguageJS from 'multilanguagejs';
```

2) Initialize the MultilanguageJS


```
// As a first param you need to pass an array of accepted languages
// As a second param you need to a language to fallback.
let multilanguage = new MultilanguageJS(
    ['pt-BR', 'en-US'],
    'pt-BR'
);
```

3) Set the active language

```
// To use the browser language you can call 'setLanguageByBrowser()':
multilanguage.setLanguageByBrowser();

// To set manually a language you call 'setLanguage('language')':
multilanguage.setLanguage('pt-BR');
```

4) Insert the HTML content

```
// Create a template tag with attr 'type="language-group"'
<template type="language-group">
  // Inside then you put all your variants for this content using the attr 'language="your-Language"'
  // The tag used can be any one, just put the attr for each language variation
  <h3 language='pt-BR'>Olá Pessoal!</h3>
  <h3 language='en-US'>Hi everyone!</h3>
</template>
```

5) Others

```
// To change the language you can use 'setLanguage("your-Language")'
multilanguage.setLanguage('pt-BR');

// To get actual language you can use 'getActiveLanguage()'
multilanguage.getActiveLanguage();

// To get an array of accepted language you can use 'getAcceptedLanguages()'
multilanguage.getAcceptedLanguages();

// To get the default language you can use 'getDefaultLanguage()'
multilanguage.getDefaultLanguage();

// To use the browser language as page language you can use 'setLanguageByBrowser()'
multilanguage.setLanguageByBrowser();
```

## Next version (v1.0.0)
I will start a refatoring of all library very soon.

My intentions is to create the simplest way to provide a internationalization for static website, without json files and things like that, you will need just the old and good HTML (and a few lines of js).

After this refatoring I will put this library on `npm` and CDN.

This are the next steps:

- [X] Implement Unit Tests
- [ ] Fix issue when has no content for specific language on language block
- [ ] Return Promises in all methods, with information about whats happened
- [ ] Remove all `console.log`
- [ ] Add inline translate strings, using `data-` property
- [ ] Implement GitHub actions for: unit tests and publish
- [ ] Improve documentation
- [ ] Publish on `npm`
- [ ] Publish on CDN


## Author

* **Ian Welerson** [IanWelerson.com](http://ianwelerson.com)

## License

This project is licensed under the MIT License
