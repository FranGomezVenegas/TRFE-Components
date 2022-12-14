import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { CredDialog } from '@trazit/cred-dialog';
import '@material/mwc-icon';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@trazit/tr-dialog/tr-dialog';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import { ProceduresModel } from '../../ProceduresModel';
export class AuditDialog extends ButtonsFunctions(CredDialog) {
  static get styles() {
    return [
      Layouts,
      css`
        tr-dialog {
          --mdc-dialog-max-width: 90vw;
          position: relative;
          z-index:999;
        }
        sp-tooltip[hidden] {
          display: none;
        }
        sp-tooltip {
          max-width: 100%;
          width: 100%;
          --spectrum-tooltip-info-background-color: rgb(144 215 215 / 12%);
          color: #3f51b5;
        }
        sp-tooltip.sub {
          --spectrum-tooltip-info-background-color: #c8f3ff;
        }
        mwc-icon.sign {
          cursor: pointer;
        }
        mwc-icon[hidden] {
          display: none;
        }
        div[hidden] {
          display: none;
        }
        .ball {
          margin-left: -13px;
          cursor: pointer;
          background: transparent;
        }
      `
    ];
  }

  static get properties() {
    return {
      lang: { type: String },
      audits: { type: Array },
      sampleAuditRevisionMode: { type: Boolean },
      sampleAuditChildRevisionRequired: { type: Boolean },
      selectedItems:{type: Array},
      actionBeingPerformedModel:{type: Object},
      procInstanceName: { type: String },
      filterName: { type: String },
      viewName: { type: String },
      windowOpenable: { type: Boolean },
      sopsPassed: { type: Boolean },
      config:{type: Object},
      localProceduresModels: { type: Object},
      viewModelFromProcModel: { type: Object},
      objectId: {type: String},
      ObjectType: {type: String},
    };
  }

  constructor() {
    super();
    this.lang = "en";
    this.audits = [];
    this.sampleAuditRevisionMode = true;
    this.sampleAuditChildRevisionRequired = true;
    this.selectedItems=[]
    this.actionBeingPerformedModel={}
    this.config={}
    this.localProceduresModels=ProceduresModel
    this.viewModelFromProcModel={}
  }

  updated(updates) {
    if (updates.has('audits') && this.audits.length) {
      this.setPrintContent()
    }
  }

  setPrintContent() {
    this.printObj = {
      header: `${this.objectType} Audit for ${this.objectId}`,
      content: this.setContent()
    }
  }

  setContent() {
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"
    let strContent = ``
    this.audits.forEach(a => {
      strContent += `<div>action_name: ${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</div>`
      strContent += `*performed_on: ${a.date} by ${a.person}`
      strContent += `<br>*reviewed_on: ${a.reviewed ? a.reviewed_on : ''}`
      strContent += `<li>audit_id: ${a.audit_id}</li>`
      let fu = a.fields_updated ? Object.entries(a.fields_updated).map(([key, value]) => { return {k: key, v: value}}) : null
      let strFu = ''
      if (fu) {
        fu.forEach(d => {
          strFu += `<li>${d.k}: ${d.v}</li>`
        })
      } else {
        strFu += `<br/>`
      }
      strContent += `fields_updated: ${strFu}`
      if (a.sublevel.length&&a.sublevel[0].date) {
        strContent += `<div style="margin-left: 20px;">`
        a.sublevel.forEach(s=> {
          strContent += `<p><div>action_name: ${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>`
          strContent += `*performed_on: ${s.date} by ${s.person}`
          strContent += `<br>*reviewed_on: ${s.reviewed ? s.reviewed_on : ''}`
          fu = s.fields_updated ? Object.entries(s.fields_updated).map(([key, value]) => { return {k: key, v: value}}) : null
          strFu = ''
          if (fu) {
            fu.forEach(d => {
              strFu += `<li>${d.k}: ${d.v}</li>`
            })
          } else {
            strFu += `<br/>`
          }
          strContent += `<br>fields_updated: ${strFu}`
        })
        strContent += `</div>`
      }
      strContent += `<hr>`
    })

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 75px;
        padding-top: 50px;
      }
      .page-header {
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 30px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">
        ${this.objectType} Audit for ${this.objectId} on ${sessionDate}
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate} 
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <!--place holder for the fixed-position header-->
              <div class="page-header-space"></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <!--*** CONTENT GOES HERE ***-->
              <div class="page">${strContent}</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <!--place holder for the fixed-position footer-->
              <div class="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    `
    return str
  }

  auditPrint() {
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.dialogSurface.style.padding = "20px";
      this.dialogSurface.style.width = "100vw";
    })
  }

  render() {
    return html`
    <tr-dialog id="auditDialog" ?open=${this.audits.length}  @closed=${()=>this.audits=[]} class="layout vertical"
      heading=""
      hideActions=""
      scrimClickAction="">
      ${this.countInfo()}
      <mwc-icon slot="icon1" @click=${this.auditPrint}>print</mwc-icon>
      ${this.audits.map((a,i)=>
        html`
        <div id="wrap-${a.audit_id}" class="layout horizontal flex center" style="padding:2px 0 2px 0;border-left:3px solid #ccc">
          <mwc-icon class="ball"
            @click=${()=>this.showItem(a,i)}
            style="color:${a.ballState=="open"?'#3f51b5':a.ballState=="hide"?'#eee':'#aaa'}">radio_button_checked</mwc-icon>
          <sp-tooltip open placement="right" variant="info" id="tooltip-${a.audit_id}">
            <div class="layout horizontal flex center">
              ${a.reviewed?
                html`
                <mwc-icon title="reviewed_on: ${a.reviewed_on}">grading</mwc-icon>
                `:
                html`
                <mwc-icon class="sign" title="Sign" 
                  @click=${()=>this.signAudit(a.audit_id)} ?hidden=${!this.sampleAuditRevisionMode}>edit_note</mwc-icon>
                `
              }
              <div>action_name: <b>${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</b></div>
            </div>
            <div>
              *performed_on: ${a.date} by ${a.person}
            </div>
            <div id="audit-${a.audit_id}" hidden=true>
              ${a.reviewed?html`<br>*reviewed_on: ${a.reviewed_on}`:null}
              <li>audit_id: ${a.audit_id}</li>
              fields_updated: ${a.fields_updated ? Object.entries(a.fields_updated).map(([key, value], i) => html`<li>${key}: ${value}</li>`) : ''}<br><br>
              ${a.sublevel.length&&a.sublevel[0].date?
              html`${a.sublevel.map((s,si)=>
                html`
                  <div id="wrap-${s.audit_id}" class="layout horizontal flex center" style="margin:5px">
                    <mwc-icon class="ball"
                      @click=${()=>this.showSubItem(s,i,si)}
                      style="color:${s.ballState=="hide"?'#eee':s.ballState=="close"?'#aaa':'#3f51b5'}">radio_button_checked</mwc-icon>
                    <sp-tooltip class="sub" open placement="right" variant="info" id="tooltip-${s.audit_id}">
                      <div class="layout horizontal flex center">
                        ${s.reviewed?
                          html`
                          <mwc-icon title="reviewed_on: ${s.reviewed_on}">grading</mwc-icon>
                          `:
                          html`
                          <mwc-icon class="sign" title="Sign" 
                            @click=${()=>this.signAudit(s.audit_id)} ?hidden=${!this.sampleAuditRevisionMode||!this.sampleAuditChildRevisionRequired}>edit_note</mwc-icon>
                          `
                        }
                        <div>action_name: ${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>
                      </div>
                      <div>
                        *performed_on: ${s.date} by ${s.person}
                      </div>
                      <div id="audit-${s.audit_id}">
                        ${s.reviewed?html`*reviewed_on: ${s.reviewed_on}<br>`:null}
                        fields_updated: ${s.fields_updated ? Object.entries(s.fields_updated).map(([key, value], i) => html`<li>${key}: ${value}</li>`) : ''}
                      </div>
                    </sp-tooltip>
                  </div>`
              )}
              `: null}
            </div>
          </sp-tooltip>
        </div>
        `
      )}
    </tr-dialog>
    `;
  }

  signAudit(id) {
    this.targetValue = {
      auditId: id
    }    
    console.log('signAudit', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
    //this.selectedDialogAction = this.selectedAction.dialogInfo.viewQuery
    this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel.dialogInfo.action[0], this.selectedItems[0], this.targetValue)
    //this.actionMethod(this.actionBeingPerformedModel.dialogInfo.action[0], false)
    //this.actionMethod(this.actionBeingPerformedModel, false)
  }

  xsignAuditMahdi(id) {
    this.dispatchEvent(new CustomEvent('sign-audit', {
      detail: { audit_id: id }
    }))
  }

  get dialog() {
    return this.shadowRoot.querySelector('tr-dialog')
  }

  get dialogSurface() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  showItem(item, i) {
    if (this.audits[i].ballState == "open") {
      this.audits[i].ballState = "hide"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop = "-11px"
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-11px"
    } else if (this.audits[i].ballState == "hide") {
      this.audits[i].ballState = "close"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = false
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop = ""
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = ""
    } else {
      this.audits[i].ballState = "open"
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = false
    }
    this.requestUpdate()
  }

  showSubItem(item, i, si) {
    if (this.audits[i].sublevel[si].ballState == "hide") {
      this.audits[i].sublevel[si].ballState = "close"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = false
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.margin = "5px"
    } else if (this.audits[i].sublevel[si].ballState == "close") {
      this.audits[i].sublevel[si].ballState = "open"
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = false
    } else {
      this.audits[i].sublevel[si].ballState = "hide"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = true
      if (si == this.audits[i].sublevel.length - 1) { // the last item
        this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-5px"
      } else {
        this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-11px"
      }
    }
    this.requestUpdate()
  }

  countInfo() {
    let unSigned = this.audits.filter(a => !a.reviewed)
    let str = ''
    if (unSigned.length) {
      str = html`<label slot="topLeft" style="font-size:12px;color: red">${unSigned.length}/${this.audits.length}</label>`
    } else {
      str = html`<label slot="topLeft" style="font-size:12px;color: green">${this.audits.length}/${this.audits.length}</label>`
    }
    return str
  }



}
window.customElements.define('audit-dialog', AuditDialog);