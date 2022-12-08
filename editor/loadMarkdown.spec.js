import { beforeEach, describe, expect, it, vi } from "vitest";
import loadMarkdown from "./loadMarkdown";
import theredoc from 'theredoc';

describe('Loading Markdown into the Editor', () => {
  let mockEditor;

  beforeEach(() => {
    mockEditor = {
      blocks: {
        renderFromHTML: vi.fn(),
      },
    };
  });

  it('converts Markdown to HTML and calls EditorJS #renderFromHTML', async () => {
    const markdown = theredoc`
      ## Heading 2

      A paragraph of text.

      A paragraph with **bold text** and [embedded links](https://example.com).

      1. List item one
      2. List item two
      3. List item three
    `;

    const expectHTML = theredoc`
      <h2>Heading 2</h2>
      <p>A paragraph of text.</p>
      <p>A paragraph with <strong>bold text</strong> and <a href="https://example.com">embedded links</a>.</p>
      <ol>
      <li>List item one</li>
      <li>List item two</li>
      <li>List item three</li>
      </ol>
    `;

    await loadMarkdown({
      markdown,
      editor: mockEditor,
    });

    expect(mockEditor.blocks.renderFromHTML).toHaveBeenCalledWith(expectHTML);
  });
});
