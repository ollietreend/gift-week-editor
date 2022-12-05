import './style.css';
import sampleData from './sample-data.json';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

const outputTo = document.querySelector('#output code');
const renderOutput = async function (api) {
  const data = await api.saver.save();
  outputTo.innerText = JSON.stringify(data, null, 2);
}

const editor = new EditorJS({
  holder: 'editorjs',

  tools: {
    header: Header
  },

  placeholder: "Write something inspirational...",
  data: sampleData,

  onChange: renderOutput,
});
