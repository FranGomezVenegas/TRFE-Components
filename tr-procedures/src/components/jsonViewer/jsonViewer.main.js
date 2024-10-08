import { LitElement } from 'lit';
import { template } from './jsonViewer.template.js';
import { styles } from './jsonViewer.css.js';


export class JsonViewer extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Object },
      lang: { type: String }
    };
  }

  render() {
    return template(this.elem, this.data, this.lang);
  }
}

customElements.define('json-viewer', JsonViewer);
