import { LitElement, html, css } from 'lit';
import './flowchartConverter'; 

class DiagramComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        my-diagram {
            width: 100%;
            height: 100%;
        }
    `;

    render() {
        return html`<my-diagram></my-diagram>`;
    }
}       

customElements.define('diagram-component', DiagramComponent);
