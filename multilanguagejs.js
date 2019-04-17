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
    constructor(acceptedLanguages = [], defaultLanguage = '') {

        this._language = '';
        this._defaultLanguage = defaultLanguage;
        this._acceptedLanguages = acceptedLanguages;

    }

    /*
     * Set the the content language
     * - newLanguage: a string with the language you are setting
    */
    setLanguage(newLanguage) {
        
        // Checking if the language is in acceptedLanguages
        if(!this._acceptedLanguages.includes(newLanguage)) {

            console.log('[Multilanguage] An unaccepted language is trying to be used. The default language or first accepted language has been applied.');
            
            this.setLanguage(this.getDefaultLanguage());

            return;

        }

        this.cleanActualContent();

        this._language = newLanguage;
        
        this.showNewContent();

    }

    /*
     * Set the page language by browser language
    */
    setLanguageByBrowser() {
        
        let browserLanguage = navigator.language || navigator.userLanguage; 

        this.setLanguage(browserLanguage);

    }

    /*
     * Get the active language
    */
    getActiveLanguage() {

        return this._language;

    }
    
    /*
     * Get the array of accepted languages
    */
    getAcceptedLanguages() {

        return this._acceptedLanguages;

    }

    /*
     * Get the the default language, used as a fallback
    */
    getDefaultLanguage() {

        return this._defaultLanguage ? this._defaultLanguage : this._acceptedLanguages[0];
        
    }

    /*
     * Search in page for any language 'template' and return all found elements
    */
    getLanguageTemplates() {
    
        let templates = document.querySelectorAll(`template[type=language-group]`);
        
        return templates;
    
    }
    
    /*
     * Use 'template' elements found to show page content according to language
    */
    showNewContent() {

        let templates = this.getLanguageTemplates();
        let actualLanguage = this._language;
        
        // Show a log with the language and templates found
        console.log(`[Multilanguage] ${templates.length} contents translated to ${this._language}.`);

        templates.forEach(function(template) {

            let languageContent = template.content.cloneNode(true).querySelector(`[language=${actualLanguage}]`);
            
            template.parentNode.insertBefore(languageContent, template);

        });      
        
    }
    
    /*
     * Remove any element with attr 'language'
    */
    cleanActualContent() {

        let elements = document.querySelectorAll(`[language]`);
        
        elements.forEach(function(element) {
            element.remove();
        });

    }
 
}

export default MultilanguageJS;
