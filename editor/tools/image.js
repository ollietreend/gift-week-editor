import App from './image/App.svelte';
import { IconPicture } from '@codexteam/icons';

class Image {
  static get toolbox() {
    return {
      title: 'Image',
      icon: IconPicture,
    };
  }

  constructor({ data, api, config, readOnly, block }) {
    // ... use or store arguments as you want
    // console.log({ data, api, config, readOnly, block });
    this.api = api;
    this.app = null;
  }

  render() {
    const target = document.createElement('div');
    target.classList.add(this.api.styles.block);
    this.app = new App({ target });
    return target;
  }

  destroy() {
    if (this.app) {
      // Destroy the Svelte component
      this.app.$destroy();
      this.app = null;
    }
  }

  save() {
    const data = this.app.data();
    return {
      caption: data.caption,
    };
  }

  static toMarkdown(data) {
    return `![${data.caption ?? ''}](example.jpg)`;
  }
}

export default {
  class: Image
};
