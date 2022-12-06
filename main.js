import './style.css';

import EditorJS from '@editorjs/editorjs';

import tools from './editor/tools';

import markdown from './__fixtures__/service-standard.md?raw';
import loadMarkdown from './editor/loadMarkdown';

const outputTo = document.querySelector('#output code');
const renderOutput = async function (api) {
  const data = await api.saver.save();
  outputTo.innerText = JSON.stringify(data, null, 2);
}

const editor = new EditorJS({
  holder: 'editorjs',

  tools,

  placeholder: "Write something inspirational...",
  autofocus: true,
  data: {},

  onChange: renderOutput,

  onReady: () => {
    loadMarkdown({ editor, markdown });
  },
});

// For live debugging in browser console
window.editor = editor;

const currentBlockTo = document.querySelector('#current-block');
const updateCurrentBlock = () => {
  const current = editor.blocks.getCurrentBlockIndex();
  currentBlockTo.innerText = current;
};

document.addEventListener("keydown", updateCurrentBlock);
document.addEventListener("mousedown", updateCurrentBlock);
