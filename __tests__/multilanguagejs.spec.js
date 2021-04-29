import MultilanguageJS from './../multilanguagejs';

// Loads a sample HTML page
const fs = require('fs');
const path = require('path');
const pageWithContent = fs.readFileSync(path.resolve(__dirname, './mocks/pageWithContent.html'), 'utf8');
const pageWithContentMissing = fs.readFileSync(path.resolve(__dirname, './mocks/pageWithContentMissing.html'), 'utf8');
const pageWithoutContent = fs.readFileSync(path.resolve(__dirname, './mocks/pageWithoutContent.html'), 'utf8');
jest.dontMock('fs');

describe('module configuration', () => {
  const acceptedLanguages = ['pt-BR', 'en-US'];
  const defaultLanguage = 'pt-BR';
  let multilanguage;

  beforeEach(() => {
    multilanguage = new MultilanguageJS(acceptedLanguages, defaultLanguage);
  });

  test('loads', () => {
    expect(multilanguage).toBeInstanceOf(MultilanguageJS)
  });
  
  test('sets default language', () => {
    expect(multilanguage.getDefaultLanguage()).toBe(defaultLanguage);
  });
  
  test('not set an active language', () => {
    expect(multilanguage.getActiveLanguage()).toBe('');
  });
  
  test(`available languages is ${acceptedLanguages}`, () => {
    expect(multilanguage.getAcceptedLanguages()).toBe(acceptedLanguages);
  });

  test('not set an unaccepted language', () => {
    const spy = jest.spyOn(multilanguage, 'setLanguage');
    const language = 'es-ES';

    multilanguage.setLanguage(language);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, language);
    expect(spy).toHaveBeenNthCalledWith(2, defaultLanguage);
  });

  test('set a language manually', () => {
    multilanguage.setLanguage('pt-BR');

    expect(multilanguage.getActiveLanguage()).toBe('pt-BR');
  });

  test('set a language by browser', () => {
    jest.spyOn(navigator, 'language', 'get').mockReturnValueOnce('pt-BR');

    multilanguage.setLanguageByBrowser();

    expect(multilanguage.getActiveLanguage()).toBe('pt-BR');
  });
});

describe('html interaction', () => {
  const acceptedLanguages = ['pt-BR', 'en-US'];
  const defaultLanguage = 'pt-BR';
  let multilanguage;

  beforeEach(() => {
    multilanguage = new MultilanguageJS(acceptedLanguages, defaultLanguage);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('page without content', () => {
    beforeEach(() => {
      document.documentElement.innerHTML = pageWithoutContent.toString();
    });

    test('return zero items if page has no language-group', () => {  
      const content = multilanguage.getLanguageTemplates();
  
      expect(content).toHaveLength(0);
    });
  });

  describe('page with content', () => {
    beforeEach(() => {
      document.documentElement.innerHTML = pageWithContent.toString();
    });

    test('return correct number of items', () => {
      const content = multilanguage.getLanguageTemplates();
  
      expect(content).toHaveLength(9);
    });

    test('return correct number of visible contents', () => {
      const content = document.querySelectorAll(`[language="en-US"]`);
  
      expect(content).toHaveLength(9);
    });

    test('update correctly after language change', () => {
      const numberOfContents = 9;
      // Getting the active contents
      const originalContentBefore = document.querySelectorAll(`[language="en-US"]`);
      // Change language
      multilanguage.setLanguage('pt-BR');
      // Get old language content
      const originalContentAfter = document.querySelectorAll(`[language="en-US"]`);
      // Get new content
      const newContents = document.querySelectorAll(`[language="pt-BR"]`);
  
      expect(originalContentBefore).toHaveLength(numberOfContents);
      expect(originalContentAfter).toHaveLength(0);
      expect(newContents).toHaveLength(numberOfContents);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('page with missing content', () => {
    beforeEach(() => {
      document.documentElement.innerHTML = pageWithContentMissing.toString();
    });

    test('return correct number of items', () => {
      const content = multilanguage.getLanguageTemplates();
  
      expect(content).toHaveLength(9);
    });

    test('return correct number of visible contents', () => {
      const content = document.querySelectorAll(`[language="en-US"]`);
  
      expect(content).toHaveLength(9);
    });

    test('update only where have content', () => {
      const numberOfContents = 9;
      // Getting the active contents
      const originalContentBefore = document.querySelectorAll(`[language="en-US"]`);
      // Change language
      multilanguage.setLanguage('pt-BR');
      // Get old language content
      const originalContentAfter = document.querySelectorAll(`[language="en-US"]`);
      // Get new content
      const newContents = document.querySelectorAll(`[language="pt-BR"]`);
  
      expect(originalContentBefore).toHaveLength(numberOfContents);
      expect(originalContentAfter).toHaveLength(0);
      expect(newContents).toHaveLength(numberOfContents);
      expect(document.body).toMatchSnapshot();
    });
  });
});