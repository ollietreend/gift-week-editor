import createEditor from './editor/editor';
import markdown from './__fixtures__/service-standard.md?raw';

/**
 * Live output of EditorJS data
 */
const outputTo = document.querySelector('#output code');
const renderOutput = async function (api) {
  const data = await api.saver.save();
  outputTo.innerText = JSON.stringify(data, null, 2);
}

const editor = createEditor({
  onChange: renderOutput,
  markdown,
});

// For live debugging in the browser console
window.editor = editor;

/**
 * Show the current block index
 */
const currentBlockTo = document.querySelector('#current-block');
const updateCurrentBlock = () => {
  const current = editor.blocks.getCurrentBlockIndex();
  currentBlockTo.innerText = current;
};
document.addEventListener("keydown", updateCurrentBlock);
document.addEventListener("mousedown", updateCurrentBlock);
