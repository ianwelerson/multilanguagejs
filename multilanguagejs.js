/*
 * -----------------------------------------------------------------------------
 * MultilanguageJS - Multi language for static sites.
 * v0.1.0
 * Licensed under the MIT License.
 * ----------------------------------------------------------------------------
 * Copyright (C) 2019 Ian Welerson
 * http://ianwelerson.com
 * --------------------------------------------------------------------------
 */

class MultilanguageJS {
  /*
     * Constructor for MultilanguageJS
     * - acceptedLanguages: required array of accepted languages
     * - defaultLanguage: the fallback language
    */
  constructor(acceptedLanguages = [], defaultLanguage = null) {
    this._language = null
    this._defaultLanguage = defaultLanguage
    this._acceptedLanguages = acceptedLanguages
  }

  /*
     * Set the the content language
     * - newLanguage: a string with the language you are setting
    */
  setLanguage(newLanguage) {
    // Checking if the language is in acceptedLanguages
    if (!this._acceptedLanguages.includes(newLanguage)) {
      this.setLanguage(this.getDefaultLanguage())

      return
    }

    this.cleanActualContent()

    this._language = newLanguage

    this.showNewContent()
  }

  /*
     * Set the page language by browser language
    */
  setLanguageByBrowser() {
    const browserLanguage = navigator.language

    this.setLanguage(browserLanguage)
  }

  /*
     * Get the active language
    */
  getActiveLanguage() {
    return this._language ? this._language : null
  }

  /*
     * Get the array of accepted languages
    */
  getAcceptedLanguages() {
    return this._acceptedLanguages
  }

  /*
     * Get the the default language, used as a fallback
    */
  getDefaultLanguage() {
    const fallbackLanguage = this._acceptedLanguages[0] ?? null

    return this._defaultLanguage ? this._defaultLanguage : fallbackLanguage
  }

  /*
     * Search in page for any language 'template' and return all found elements
    */
  getLanguageTemplates() {
    const templates = document.querySelectorAll('template[type=language-group]')

    return templates
  }

  /*
     * Use 'template' elements found to show page content according to language
    */
  showNewContent() {
    const templates = this.getLanguageTemplates()
    const actualLanguage = this._language
    const defaultLanguage = this._defaultLanguage

    templates.forEach((template) => {
      const languageContent =
        template.content.cloneNode(true).querySelector(`[language=${actualLanguage}]`) ??
        template.content.cloneNode(true).querySelector(`[language=${defaultLanguage}]`)

      if (!languageContent) {
        return
      }

      template.parentNode.insertBefore(languageContent, template)
    })
  }

  /*
     * Remove any element with attr 'language'
    */
  cleanActualContent() {
    const elements = document.querySelectorAll('[language]')

    elements.forEach((element) => {
      element.remove()
    })
  }
}

export default MultilanguageJS
