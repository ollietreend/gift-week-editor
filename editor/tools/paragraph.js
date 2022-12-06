import Paragraph from "@editorjs/paragraph";

/**
 * List of Markdown to Block transformations
 */
const MARKDOWN_TRANSFORMERS = [
  {
    // Headings
    regex: /^(#+)\s(.*)/,
    blockType: "header",
    blockData: (match) => ({
      text: match[2],
      level: match[1].length,
    }),
  },
  {
    // Unordered list
    regex: /^([\*\-]+)\s(.*)/,
    blockType: "list",
    blockData: (match) => ({
      style: "unordered",
      items: [match[2]],
    }),
  },
  {
    // Ordered list
    regex: /^(1\.)\s(.*)/,
    blockType: "list",
    blockData: (match) => ({
      style: "ordered",
      items: [match[2]],
    }),
  },
];

class MarkdownParagraph extends Paragraph {
  // Extend the keyup event to handle Markdown-like syntax
  onKeyUp(e) {
    super.onKeyUp(e);
    if (e.code == "Space") {
      this.#transformMarkdown();
    }
  }

  #transformMarkdown() {
    const textContent = this._element.textContent;
    const transformer = MARKDOWN_TRANSFORMERS.find((transformer) => (transformer.regex.test(textContent)));

    // No Markdown to transform
    if (transformer == undefined) return;

    const { blockType } = transformer;
    const match = textContent.match(transformer.regex);
    const blockData = transformer.blockData(match);
    const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();

    // Insert a new block. The final 'true' param causes it to replace this current block.
    this.api.blocks.insert(blockType, blockData, undefined, undefined, true, true);

    // Set focus to the new block, which now has the same index as this block originally had.
    this.api.caret.setToBlock(currentBlockIndex, 'start');
  }
}

export default {
  class: MarkdownParagraph
};
