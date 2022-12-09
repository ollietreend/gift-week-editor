import List from '@editorjs/list';

class ExportableList extends List {
  static toMarkdown(data) {
    const { items, style } = data;
    const format = {
      ordered: (item, index) => (`${index + 1}. ${item}`),
      unordered: (item) => (`- ${item}`),
    };
    return items.map(format[style]).join("\n");
  }

  // Override the default pasteConfig to fix bug
  // https://github.com/codex-team/editor.js/issues/2208
  static get pasteConfig() {
    return {
      tags: ['ul', 'ol', 'li'],
    }
  }
}

export default {
  class: ExportableList
};
