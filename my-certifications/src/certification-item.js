import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

export class CertificationItem extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        margin: 10px;
      }
      :host([hidden]) {
        display: none;
      }
      .card {
        background-image: url(/images/SOP-blue.png);
        background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 5px;
        box-shadow: 1px 1px #888888;
        padding: 20px 20px 30px;
        width: 250px;
        height: 200px;
        line-height: 1.5;
        font-size: 12px;
      }
      @media (max-width: 460px) {
      }
    `];
  }

  static get properties() {
    return {
      cert: { type: Object },
      divHeight: { type: String }
    };
  }

  constructor() {
    super();
    this.cert = {};
    this.divHeight = "";
  }

  render() {
    return html`
      <div class="card layout vertical center">
        <mwc-icon-button icon="picture_as_pdf" @click=${()=>window.open(this.cert.file_link, '_blank').focus()} ?disabled=${!this.cert.file_link}></mwc-icon-button>
        <div><b>Procedure: </b>${this.cert.procedure_name}</div>
        <div><b>Name: </b>${this.cert.method_name ? this.cert.method_name : this.cert.sop_name}</div>
        ${this.cert.brief_summary ?
          html`<div><b>Summary: </b>${this.cert.brief_summary}</div>` :
          nothing
        }
        <div class="layout horizontal center">
          <span><b>My Certification Status: </span>
          <mwc-icon style="color:${this.cert.status=="PASS"?'green':'red'}">${this.cert.status=="PASS"?'bookmark':'warning'}</mwc-icon>
        </div>
        <div>${this.cert.status=="NOT_PASS" ? 
          html`<mwc-icon-button title="Mark Completed" icon="replay" 
            @click=${e=>{e.target.disabled=true;this.dispatchEvent(new CustomEvent('mark-complete', {
            detail: this.cert,
            bubbles: true,
            composed: true
          }))}}></mwc-icon-button>` : null 
        }</div>
      </div>
    `;
  }
}
window.customElements.define('certification-item', CertificationItem);