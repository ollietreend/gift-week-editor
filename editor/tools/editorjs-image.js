import ImageTool from "@editorjs/image";

class ExportableImage extends ImageTool {
  static get toolbox() {
    return {
      ...super.toolbox,
      title: 'Editor.js Image'
    };
  }

  static toMarkdown(data) {
    let url = data.file.url;

    if (url.length > 100) {
      url = url.slice(0, 100) + "...";
    }

    return `![${data.caption}](${url})`;
  }
}

export default {
  class: ExportableImage,
  config: {
    endpoints: {
      byFile: '/.netlify/functions/upload-image/file',
      byUrl: '/.netlify/functions/upload-image/url',
    }
  }
};
