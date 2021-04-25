import MultilanguageJS from './../multilanguagejs';

describe('multilanguage', () => {
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

  test('getting content from page', () => {
    const content = multilanguage.getLanguageTemplates();

    expect(console).toBe(null);
  })
});