import './style.css';
import sampleData from './sample-data.json';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

const editor = new EditorJS({
  holder: 'editorjs',

  tools: {
    header: Header
  },

  placeholder: "Write something inspirational...",
  data: sampleData,
});
