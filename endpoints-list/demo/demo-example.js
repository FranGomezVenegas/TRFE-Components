import { LitElement, html, css } from 'lit';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
//import '../endpoints-list';
import '../src/endpoints-list-styles-main'

class DemoExample extends LitElement {
  static get styles() {
    return css`
        div[hidden] {
          display: none;
        }
      `
  }

  static get properties() {
    return {
      auth: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.auth = false;
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{
        this.auth=e.target.auth;
        this.el.config=this.pLogin.config;}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <button @click=${()=>this.pLogin.logout()}>Logout</button><br><br>
        <endpoints-list2></endpoints-list2>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get el() {
    return this.shadowRoot.querySelector("endpoints-list")
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
    }
  }
}
customElements.define('demo-example', DemoExample);
