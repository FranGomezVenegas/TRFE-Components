import { LitElement, html, css, unsafeCSS } from 'lit';
import { centerAligned, centerJustified, displayFlex, horizontal } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-button';

export class DataMiningTab extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .tabWrap {
        ${unsafeCSS(displayFlex)}
        ${unsafeCSS(horizontal)}
        ${unsafeCSS(centerJustified)}
      }
      .tabContainer {
        overflow: auto;
        ${unsafeCSS(displayFlex)}
        ${unsafeCSS(horizontal)}
        ${unsafeCSS(centerAligned)}
      }
      .tabContainer::-webkit-scrollbar {
        display: none;
      }
      .tabContainer > * {
        display: inline-block;
        flex-shrink: 0;
      }
      mwc-button {
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 12px;
        margin: 2px;
      }
      mwc-icon-button[hidden] {
        display: none;
      }
    `;
  }
  listObjectSelected(e){
    //console.log('listObjectSelected', e.target.value)
    this.tabChanged(this.tabs[e.target.value]) 
  }
  listElementLabel(){
    return this.viewModelFromProcModel.tabsListElement["label_"+this.lang]
  }
  render() {
    //console.log(this.tabs)
    // @change=${()=>this.tabChanged(t)}
    return html`
      <div class="layout flex vertical">

      <mwc-select style="width:100%;" class="layout flex vertical" outlined id="kpiList" label="${this.listElementLabel()}" @change=${this.listObjectSelected}>
        ${this.tabs&&this.tabs.map((p,i) => 
          html`<mwc-list-item value="${i}" ?selected=${i==0}>${p['label_'+this.lang]}</mwc-list-item>`
        )}
      </mwc-select>      

    <!--
        <mwc-icon-button icon="navigate_before" @click=${this.prevTab} ?hidden=${!this.prev}></mwc-icon-button>
        <div class="tabContainer">
          ${this.tabs.map(t=>
            html`<mwc-button class="tab-item" outlined aria-label=${t['label_'+this.lang]} label=${t['label_'+this.lang]} @click=${()=>this.tabChanged(t)}></mwc-button>`
          )}
        </div>
        <mwc-icon-button icon="navigate_next" @click=${this.nextTab} ?hidden=${!this.next}></mwc-icon-button>
        -->
      </div>
    `;
  }

  get tabContainer() {
    return this.shadowRoot.querySelector(".tabContainer")
  }

  get tabElems() {
    return this.shadowRoot.querySelectorAll('.tab-item')
  }

  prevTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft - 200
  }

  nextTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft + 200
  }

  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
    this.tabElems.forEach(t => {
      if (t.label == this.selectedTab['label_'+this.lang]) {
        t.raised = true
      } else {
        t.raised = false
      }
    })
  }

  updated(updates) {
    if (updates.has('tabs') && this.tabs.length) {
      this.updateComplete.then(() => {
        this.tabChanged(this.tabs[0])
      })  
    }
  }

  XfirstUpdated() {
    // this.tabContainer.addEventListener('scroll', ()=>{
    //   if (this.tabContainer.scrollLeft == 0) {
    //     this.prev = false
    //   } else {
    //     this.prev = true
    //   }
    //   if (this.tabContainer.offsetWidth + this.tabContainer.scrollLeft == this.tabContainer.scrollWidth) {
    //     this.next = false
    //   } else {
    //     this.next = true
    //   }
    // })
  }

  tabChanged(tab) {
    this.selectedTab = tab
    this.tabElems.forEach(t => {
      if (t.label == this.selectedTab['label_'+this.lang]) {
        t.raised = true
        t.outlined = false
      } else {
        t.outlined = true
        t.raised = false
      }
    })
    this.dispatchEvent(new CustomEvent('tab-changed'))
  }

  static get properties() {
    return {
      lang: { type: String },
      tabs: { type: Array },
      selectedTab: { type: Object }, // current selected tab
      prev: { type: Boolean },
      next: { type: Boolean },
      viewModelFromProcModel: {type: Object}
    };
  }

  constructor() {
    super();
    this.prev = false;
    this.next = false;
    this.tabs = [];
    this.selectedTab = {};
    this.viewModelFromProcModel = {}
  }
}
customElements.define('datamining-tab', DataMiningTab);