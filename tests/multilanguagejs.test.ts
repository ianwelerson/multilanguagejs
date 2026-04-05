import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getByText, queryAllByTestId } from '@testing-library/dom'
import MultilanguageJS from '../src/index'
import {
  pageWithoutContent,
  pageWithMissingContent,
  pageWithContent,
  pageWithI18nAttributes,
} from './fixtures/pages'

function mountPage(pageString: string) {
  document.documentElement.innerHTML = pageString
  return document
}

function getPageContentByLanguage(language: string) {
  return document.querySelectorAll(`[language="${language}"]`)
}

const acceptedLanguages = ['pt-BR', 'en-US']
const defaultLanguage = 'pt-BR'

describe('instance', () => {
  let ml: MultilanguageJS

  beforeEach(() => {
    ml = new MultilanguageJS({
      languages: acceptedLanguages,
      defaultLanguage,
    })
  })

  it('should instantiate with default values', () => {
    const instance = new MultilanguageJS({ languages: [] })

    expect(instance.getAcceptedLanguages()).toHaveLength(0)
    expect(instance.getDefaultLanguage()).toBeNull()
    expect(instance.getActiveLanguage()).toBeNull()
  })

  it('should use first language as default when none specified', () => {
    const instance = new MultilanguageJS({ languages: ['en-US', 'pt-BR'] })

    expect(instance.getDefaultLanguage()).toBe('en-US')
  })

  it('should create an instance of MultilanguageJS', () => {
    expect(ml).toBeInstanceOf(MultilanguageJS)
  })

  it(`should have the default language as: ${defaultLanguage}`, () => {
    expect(ml.getDefaultLanguage()).toBe(defaultLanguage)
  })

  it(`should have the accepted languages as: ${acceptedLanguages}`, () => {
    expect(ml.getAcceptedLanguages()).toEqual(acceptedLanguages)
  })

  it('should not have an active language', () => {
    expect(ml.getActiveLanguage()).toBeNull()
  })

  it('should set the language manually', () => {
    expect(ml.getActiveLanguage()).toBeNull()

    ml.setLanguage('pt-BR')

    expect(ml.getActiveLanguage()).toBe('pt-BR')
  })

  it('should set the language using navigator language', () => {
    expect(ml.getActiveLanguage()).toBeNull()

    vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt-BR')

    ml.setLanguageFromBrowser()

    expect(ml.getActiveLanguage()).toBe('pt-BR')
  })

  it('should fall back to default for an unaccepted language', () => {
    ml.setLanguage('es-ES')

    expect(ml.getActiveLanguage()).toBe(defaultLanguage)
  })
})

describe('content interaction', () => {
  describe('with all content translated', () => {
    let ml: MultilanguageJS
    const contentsOnPage = 9

    beforeEach(() => {
      ml = new MultilanguageJS({
        languages: acceptedLanguages,
        defaultLanguage,
      })
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

      expect(ml.getLanguageTemplates()).toHaveLength(contentsOnPage)
    })

    it('should render the content for selected language', () => {
      ml.setLanguage('en-US')

      expect(getByText(document, 'My page')).toBeTruthy()
      expect(getPageContentByLanguage('en-US')).toHaveLength(contentsOnPage)
    })

    it('should rerender content after language change', () => {
      ml.setLanguage('en-US')
      expect(getPageContentByLanguage('en-US')).toHaveLength(contentsOnPage)

      ml.setLanguage('pt-BR')
      expect(getByText(document, 'Minha página')).toBeTruthy()
      expect(getPageContentByLanguage('pt-BR')).toHaveLength(contentsOnPage)
    })

    it(`should get ${contentsOnPage} language templates`, () => {
      expect(ml.getLanguageTemplates()).toHaveLength(contentsOnPage)
    })
  })

  describe('with partial translated content', () => {
    const partialAcceptedLanguages = ['en-US', 'pt-BR']
    const partialDefaultLanguage = 'en-US'

    let ml: MultilanguageJS
    const contentsOnPage = 10
    const enContents = 9
    const ptContents = 6

    beforeEach(() => {
      ml = new MultilanguageJS({
        languages: partialAcceptedLanguages,
        defaultLanguage: partialDefaultLanguage,
      })
      mountPage(pageWithMissingContent)
    })

    it('should render the default language correctly', () => {
      expect(ml.getLanguageTemplates()).toHaveLength(contentsOnPage)
      expect(getPageContentByLanguage('en-US')).toHaveLength(0)

      ml.setLanguage(partialDefaultLanguage)

      // One of the contents is with an unaccepted language
      expect(getPageContentByLanguage('en-US')).toHaveLength(
        contentsOnPage - 1
      )
    })

    it('should complement missing translations with default language', () => {
      ml.setLanguage('pt-BR')

      expect(getPageContentByLanguage('pt-BR')).toHaveLength(ptContents)
      expect(getPageContentByLanguage(partialDefaultLanguage)).toHaveLength(
        enContents - ptContents
      )
    })
  })

  describe('without content to translate', () => {
    let ml: MultilanguageJS

    beforeEach(() => {
      ml = new MultilanguageJS({
        languages: acceptedLanguages,
        defaultLanguage,
      })
      mountPage(pageWithoutContent)
    })

    it('should have rendered content', () => {
      expect(getByText(document, 'My page')).toBeTruthy()
    })

    it('should get 0 language templates', () => {
      expect(ml.getLanguageTemplates()).toHaveLength(0)
    })
  })
})

describe('string-based translations', () => {
  const translations = {
    'en-US': {
      greeting: 'Hello',
      farewell: 'Goodbye',
      description: 'A simple page',
    },
    'pt-BR': {
      greeting: 'Olá',
      farewell: 'Adeus',
      description: 'Uma página simples',
    },
  }

  let ml: MultilanguageJS

  beforeEach(() => {
    ml = new MultilanguageJS({
      languages: ['en-US', 'pt-BR'],
      defaultLanguage: 'en-US',
      translations,
    })
    mountPage(pageWithI18nAttributes)
  })

  it('should translate elements with data-i18n attribute', () => {
    ml.setLanguage('en-US')

    expect(getByText(document, 'Hello')).toBeTruthy()
    expect(getByText(document, 'Goodbye')).toBeTruthy()
    expect(getByText(document, 'A simple page')).toBeTruthy()
  })

  it('should switch translations when language changes', () => {
    ml.setLanguage('en-US')
    expect(getByText(document, 'Hello')).toBeTruthy()

    ml.setLanguage('pt-BR')
    expect(getByText(document, 'Olá')).toBeTruthy()
    expect(getByText(document, 'Adeus')).toBeTruthy()
  })

  it('should fall back to default language for missing keys', () => {
    const partialTranslations = {
      'en-US': { greeting: 'Hello', farewell: 'Goodbye', description: 'A simple page' },
      'pt-BR': { greeting: 'Olá' },
    }

    ml = new MultilanguageJS({
      languages: ['en-US', 'pt-BR'],
      defaultLanguage: 'en-US',
      translations: partialTranslations,
    })
    mountPage(pageWithI18nAttributes)

    ml.setLanguage('pt-BR')

    expect(getByText(document, 'Olá')).toBeTruthy()
    expect(getByText(document, 'Goodbye')).toBeTruthy()
  })

  it('should update translations dynamically with setTranslations', () => {
    ml.setLanguage('en-US')
    expect(getByText(document, 'Hello')).toBeTruthy()

    ml.setTranslations({
      'en-US': { greeting: 'Hi', farewell: 'Bye', description: 'Updated page' },
      'pt-BR': { greeting: 'Oi', farewell: 'Tchau', description: 'Página atualizada' },
    })

    expect(getByText(document, 'Hi')).toBeTruthy()
    expect(getByText(document, 'Bye')).toBeTruthy()
  })

  it('should work alongside template-based translations', () => {
    const pageWithBoth = `
      <body>
        <template type="language-group">
          <h1 language='en-US'>Template Title</h1>
          <h1 language='pt-BR'>Título Template</h1>
        </template>
        <p data-i18n="greeting"></p>
      </body>
    `
    mountPage(pageWithBoth)

    ml.setLanguage('en-US')

    expect(getByText(document, 'Template Title')).toBeTruthy()
    expect(getByText(document, 'Hello')).toBeTruthy()
  })
})
