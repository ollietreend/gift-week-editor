describe('Editor', () => {
  it('can be initialised', () => {
    cy.createEditor();
    cy.get('[data-cy="editorjs"]');
    cy.get('[data-placeholder="Write something inspirational..."]');
  });

  describe('converting Markdown to Editor Blocks', () => {
    [
      {
        markdown: "## Hello world",
        expectBlocks: [
          {
            type: "header",
            data: {
              level: 2,
              text: "Hello world"
            }
          }
        ],
      },
      {
        markdown: "A regular paragraph",
        expectBlocks: [
          {
            type: "paragraph",
            data: {
              text: "A regular paragraph"
            }
          }
        ],
      },
      {
        markdown: "A paragraph [with links](https://www.gov.uk) embedded.",
        expectBlocks: [
          {
            type: "paragraph",
            data: {
              text: `A paragraph <a href="https://www.gov.uk">with links</a> embedded.`
            }
          }
        ],
      },
      {
        markdown: `
## Heading 2

A paragraph of text.

### Heading 3

Some more text [with links](https://example.com) embedded.
        `,
        expectBlocks: [
          {
            type: "header",
            data: {
              "text": "Heading 2",
              "level": 2
            }
          },
          {
            type: "paragraph",
            data: {
              text: "A paragraph of text."
            }
          },
          {
            type: "header",
            data: {
              text: "Heading 3",
              level: 3
            }
          },
          {
            type: "paragraph",
            data: {
              text: "Some more text <a href=\"https://example.com\">with links</a> embedded."
            }
          }
        ],
      },
    ].forEach((example, index) => {
      it(`renders example #${index}`, () => {
        const { markdown, expectBlocks } = example;
        cy.createEditor({ markdown }).then(async (editor) => {
          const data = await editor.save();
          expect(data).to.containSubset({
            blocks: expectBlocks
          });
        });
      });
    });
  });
});
