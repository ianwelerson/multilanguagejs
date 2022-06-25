import { getByText, queryAllByTestId, queryAllByAttribute } from '@testing-library/dom'
import MultilanguageJS from './../multilanguagejs'

// Mock for page content
import {
  pageWithouContent,
  pageWithMissingContent,
  pageWithContent
} from './__mocks__/pagesContent'

function mountPage(pageString) {
  document.documentElement.innerHTML = pageString

  return document
}

const acceptedLanguages = ['pt-BR', 'en-US']
const defaultLanguage = 'pt-BR'

describe('Module instance', () => {
  let multilanguagejs

  beforeEach(() => {
    multilanguagejs = new MultilanguageJS(acceptedLanguages, defaultLanguage)
  })

  it('should instantiate the lib with default values', () => {
    const localMutilanguagejs = new MultilanguageJS()

    expect(localMutilanguagejs.getAcceptedLanguages()).toHaveLength(0)
    expect(localMutilanguagejs.getDefaultLanguage()).toBe(undefined)
    expect(localMutilanguagejs.getActiveLanguage()).toBe('')
  })

  it('should create an instance of MultilanguageJS', () => {
    expect(multilanguagejs).toBeInstanceOf(MultilanguageJS)
  })

  it(`should have the default language as: ${defaultLanguage}`, () => {
    expect(multilanguagejs.getDefaultLanguage()).toBe(defaultLanguage)
  })

  it(`should have the accepted language as: ${acceptedLanguages}`, () => {
    expect(multilanguagejs.getAcceptedLanguages()).toBe(acceptedLanguages)
  })

  it('should not have an active language', () => {
    expect(multilanguagejs.getActiveLanguage()).toBe('')
  })

  it('should be possible to set the language manually', () => {
    expect(multilanguagejs.getActiveLanguage()).toBe('')

    const language = 'pt-BR'
    
    multilanguagejs.setLanguage(language)

    expect(multilanguagejs.getActiveLanguage()).toBe(language)
  })

  it('should be possible to set the language using navigator language', () => {
    expect(multilanguagejs.getActiveLanguage()).toBe('')

    const language = 'pt-BR'

    jest.spyOn(window.navigator, 'language', 'get').mockReturnValue(language)
    
    multilanguagejs.setLanguageByBrowser()

    expect(multilanguagejs.getActiveLanguage()).toBe(language)
  })

  it('should not be possible to set a unaccepted language', () => {
    const multilanguageSpy = jest.spyOn(multilanguagejs, 'setLanguage')

    const language = 'es-ES'
    multilanguagejs.setLanguage(language)

    expect(multilanguageSpy).toHaveBeenCalledTimes(2)
    expect(multilanguageSpy).toHaveBeenNthCalledWith(1, language)
    expect(multilanguageSpy).toHaveBeenNthCalledWith(2, defaultLanguage)
  })
})

describe('Content interaction', () => {
  describe('With all content translated', () => {
    let multilanguagejs
    const contentsOnPage = 9

    beforeEach(() => {
      multilanguagejs = new MultilanguageJS(acceptedLanguages, defaultLanguage)

      mountPage(pageWithContent)
    })

    it('should not have rendered content before language is set', () => {
      expect(queryAllByTestId(document, 'document-title')).toHaveLength(0)
      expect(queryAllByTestId(document, 'body-title')).toHaveLength(0)
      expect(queryAllByTestId(document, 'f-paragraph')).toHaveLength(0)
      expect(queryAllByTestId(document, 's-paragraph')).toHaveLength(0)
      expect(queryAllByTestId(document, 't-paragraph')).toHaveLength(0)
      expect(queryAllByTestId(document, 'list-f-item')).toHaveLength(0)
      expect(queryAllByTestId(document, 'list-s-item')).toHaveLength(0)
      expect(queryAllByTestId(document, 'list-complete')).toHaveLength(0)

      expect(multilanguagejs.getLanguageTemplates()).toHaveLength(contentsOnPage)
    })

    it('should render the content for selected language', () => {
      multilanguagejs.setLanguage('en-US')

      expect(getByText(document, 'My page')).toBeTruthy()
      expect(document.querySelectorAll('[language="en-US"]')).toHaveLength(contentsOnPage)
    })

    it('should rerender content after language change', () => {
      multilanguagejs.setLanguage('en-US')
      expect(document.querySelectorAll('[language="en-US"]')).toHaveLength(contentsOnPage)
      
      multilanguagejs.setLanguage('pt-BR')
      expect(getByText(document, 'Minha página')).toBeTruthy()
      expect(document.querySelectorAll('[language="pt-BR"]')).toHaveLength(contentsOnPage)
    })

    it(`should get ${contentsOnPage} language templates when call getLanguageTemplates`, () => {
      expect(multilanguagejs.getLanguageTemplates()).toHaveLength(contentsOnPage)
    })
  })

  describe.skip('With partial translated content', () => {

  })

  describe('Without content to translate', () => {
    let multilanguagejs
    const contentsOnPage = 0

    beforeEach(() => {
      multilanguagejs = new MultilanguageJS(acceptedLanguages, defaultLanguage)

      mountPage(pageWithouContent)
    })

    it('should have rendered content', () => {
      expect(getByText(document, 'My page')).toBeTruthy()
    })

    it(`should get ${contentsOnPage} language templates when call getLanguageTemplates`, () => {
      expect(multilanguagejs.getLanguageTemplates()).toHaveLength(contentsOnPage)
    })
  })
})