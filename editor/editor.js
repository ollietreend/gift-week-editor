import EditorJS from '@editorjs/editorjs';
import tools from './tools';
import loadMarkdown from './loadMarkdown';

const DEFAULT_CONFIG = {
  holder: 'editorjs',
  tools,
  placeholder: "Write something inspirational...",
  autofocus: true,
};

const createEditor = (config = {}) => {
  if (config.markdown) {
    const { markdown } = config;
    delete config.markdown;
    config.onReady = () => {
      loadMarkdown({ editor, markdown });
    };
  }

  const editor = new EditorJS({
    ...DEFAULT_CONFIG,
    ...config
  });

  return editor;
};

export default createEditor;
