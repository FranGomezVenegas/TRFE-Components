import { LitElement, html, css } from 'lit';

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  let mql = window.matchMedia(mediaQuery);
  mql.addListener((e) => layoutChangedCallback(e.matches));
  layoutChangedCallback(mql.matches);
}

export const commonLangConfig = {
  "cancelDialogButton": {
    "label_en": "Cancel", 
    "label_es": "Cancelar"
  },
  "confirmDialogButton": {
    "label_en": "Accept", 
    "label_es": "Aceptar"
  }
}

export class CommonCore extends LitElement {
  static get styles() {
    return css`
      p.attemptsphraseblue {
        color: #464dbb;
      }
      p.attemptsphrasered {
        color: #f3371680;
        animation-duration: 2s;
        animation-name: slidein;
      }
      @keyframes slidein {
        from {
          margin-left: 30%;
        }
        to {
          margin-left: 0%;
        }
      }           
    `
  }

  static get properties() {
    return {
      config: { type: Object },
      flag: { type: String },
      lang: { type: String },
      attempt: { type: Number },
      maxFails: { type: Number },
      fieldErrMsg: { type: Object },
      desktop: { type: Boolean },
      userName: { type: String }
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userName = "";
    this.lang = "en";
    this.attempt = 0;
    this.maxFails = 3;
  }

  firstUpdated() {
    installMediaQueryWatcher(`(min-width: 461px)`, desktop => this.desktop = desktop );
  }

  updated(updates) {
    if (updates.has('config') && JSON.stringify(this.config) != "{}" && sessionStorage.getItem("userSession")) {
      this.authorized()
    }
    if (updates.has("lang")) {
      this.changeFlag()
      this.dispatchEvent(new CustomEvent('change-lang', {
        detail: {lang: this.lang},
        bubbles: true,
        composed: true
      }))  
    }
  }

  setAttempts() {
    let txt = this.lang == "en" ? 
      `*** Attempts: ${this.attempt} of 3` : 
      `*** Intentos: ${this.attempt} de ${this.maxFails}`
    return html`<p class=${this.attempt==0?'attemptsphraseblue':'attemptsphrasered'}>${txt}</p>`
  }

  // Override this method once authorized
  authorized() {
    console.log(JSON.parse(sessionStorage.getItem("userSession")))
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   * @param {*} log will be logged into notifications or no? default true
   * @param {*} feedback will be show up the user feedback
   */
  fetchApi(urlParams, log=true, feedback=true) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      if (feedback) {
        this.dispatchEvent(new CustomEvent('success', {
          detail: {...j, log: log},
          bubbles: true,
          composed: true
        }))
      }
      return j
    }).catch(e => {
      this.dispatchEvent(new CustomEvent("error", {
        detail: {...e, log: true},
        bubbles: true,
        composed: true
      }))
      this.error(e)
      return
    })
  }

  error(e) { }

  showPwd(e) {
    if (e.pointerId == -1) {
      e.target.type = e.target.type == "password" ? "text" : "password";
    }
  }

  changeLang() {
    if (this.flag == "en") {
      this.lang = "en"
      this.flag = "es"
    } else {
      this.lang = "es"
      this.flag = "en"
    }
    return this.flag
  }

  changeFlag() {
    if (this.lang == "en") {
      this.flag = "es"
    } else {
      this.flag = "en"
    }
  }
}