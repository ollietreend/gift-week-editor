// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Create a wrapper and initialize the new instance of editor.js
 * Then return the instance
 *
 * @param config - config to pass to the editor
 * @returns EditorJS - created instance
 */
Cypress.Commands.add('createEditor', (config = {}) => {
  return cy.window()
    .then((window) => {
      return new Promise((resolve) => {
        const editorContainer = window.document.createElement('div');

        editorContainer.setAttribute('id', 'editorjs');
        editorContainer.dataset.cy = 'editorjs';
        editorContainer.style.border = '1px dotted #388AE5';

        window.document.body.appendChild(editorContainer);

        const editorInstance = window.createEditor(config);

        editorInstance.isReady.then(() => {
          resolve(editorInstance);
        });
      });
    });
});

/**
 * Get Markdown output from an Editor.js instance
 */
Cypress.Commands.add('getMarkdown', (editor) => {
  return cy.window()
    .then((window) => {
      return window.getMarkdown(editor);
    });
});
