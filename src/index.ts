export type TranslationStrings = Record<string, string>
export type Translations = Record<string, TranslationStrings>

export interface MultilanguageJSOptions {
  languages: string[]
  defaultLanguage?: string
  translations?: Translations
}

export class MultilanguageJS {
  private language: string | null = null
  private defaultLanguage: string | null
  private acceptedLanguages: string[]
  private translations: Translations

  constructor(options: MultilanguageJSOptions) {
    this.acceptedLanguages = options.languages
    this.defaultLanguage = options.defaultLanguage ?? options.languages[0] ?? null
    this.translations = options.translations ?? {}
  }

  setLanguage(newLanguage: string): void {
    if (!this.acceptedLanguages.includes(newLanguage)) {
      const fallback = this.getDefaultLanguage()
      if (fallback && fallback !== newLanguage) {
        this.setLanguage(fallback)
      }
      return
    }

    this.cleanActiveContent()
    this.language = newLanguage
    this.showContent()
    this.applyTranslations()
  }

  setLanguageFromBrowser(): void {
    this.setLanguage(navigator.language)
  }

  getActiveLanguage(): string | null {
    return this.language
  }

  getAcceptedLanguages(): string[] {
    return this.acceptedLanguages
  }

  getDefaultLanguage(): string | null {
    return this.defaultLanguage ?? this.acceptedLanguages[0] ?? null
  }

  setTranslations(translations: Translations): void {
    this.translations = translations
    if (this.language) {
      this.applyTranslations()
    }
  }

  getLanguageTemplates(): NodeListOf<HTMLTemplateElement> {
    return document.querySelectorAll<HTMLTemplateElement>(
      'template[type=language-group]'
    )
  }

  private applyTranslations(): void {
    const active = this.language
    if (!active) return

    const activeStrings = this.translations[active]
    const fallbackStrings = this.defaultLanguage
      ? this.translations[this.defaultLanguage]
      : undefined

    const elements = document.querySelectorAll<HTMLElement>('[data-i18n]')

    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n')
      if (!key) return

      const value = activeStrings?.[key] ?? fallbackStrings?.[key]
      if (value !== undefined) {
        el.textContent = value
      }
    })
  }

  private showContent(): void {
    const templates = this.getLanguageTemplates()
    const active = this.language
    const fallback = this.defaultLanguage

    templates.forEach((template) => {
      const clone = template.content.cloneNode(true) as DocumentFragment
      const content =
        clone.querySelector<HTMLElement>(`[language=${active}]`) ??
        clone.querySelector<HTMLElement>(`[language=${fallback}]`)

      if (!content) return

      template.parentNode?.insertBefore(content, template)
    })
  }

  private cleanActiveContent(): void {
    document.querySelectorAll('[language]').forEach((el) => el.remove())
  }
}
