import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function DialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        selectedResults: { type: Array },
        enterResults: { type: Array },
        selectedMicroorganisms: { type: Array },
        microorganismList: { type: Array },
        selectedAssigns: { type: Array },
        assignList: { type: Array },
        targetValue: { type: Object },
        selectedDialogAction: { type: Object },
        lotDays: { type: Number },
        deactivatedLots: { type: Array },
        openInvests: { type: Array },
        selectedInvestigations: { type: Array },
        capaRequired: { type: Boolean },
        selectedStucks: { type: Array }
      }
    }

    constructor() {
      super()
      this.lotDays = 7
      this.deactivatedLots = []
      this.microorganismList = []
      this.capaRequired = false
    }

    /** Date Template Dialog part */
    dateTemplate() {
      return html`
      <tr-dialog id="dateDialog" 
        @closed=${()=>this.dateInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <input id="dateInput" 
            type="datetime-local" dialogInitialFocus
            @keypress=${e=>e.keyCode==13&&this.setNewDate()}>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setNewDate}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }
        
    get dateDialog() {
      return this.shadowRoot.querySelector("tr-dialog#dateDialog")
    }

    get dateInput() {
      return this.shadowRoot.querySelector("input#dateInput")
    }
  
    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept()
      }
    }

    /** Comment Template Dialog part */
    commentTemplate() {
      return html`
      <tr-dialog id="commentDialog" 
        @closed=${()=>this.commentInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="commentInput" label="${this.langConfig.fieldText&&this.langConfig.fieldText.comment["label_"+ this.lang]}" 
            dialogInitialFocus
            @keypress=${e=>e.keyCode==13&&this.addComment()}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addComment}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get commentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#commentDialog")
    }

    get commentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#commentInput")
    }

    addComment() {
      if (this.commentInput.value) {
        this.dialogAccept()
      }
    }

    /** Enter Result Template Dialog part */
    resultTemplate() {
      return html`
      <tr-dialog id="resultDialog" ?open=${this.enterResults.length}
        @opened=${()=>this.setCellListener()}
        @closing=${()=>this.removeEvents()}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id||this.selectedSamples[0].id}</label>` : nothing
        }
        <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
          @selected-items-changed=${e => {
            if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
              this.selectedResults = []
            } else {
              this.selectedResults = e.detail.value
            }
          }}
          .detailsOpenedItems=${this.selectedResults}
          ${gridRowDetailsRenderer(this.detailRenderer)}>
          ${this.desktop ?
            html`<vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>` :
            html`<vaadin-grid-selection-column header="" width="65px" resizable ></vaadin-grid-selection-column>`
          }
          ${this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES" ?
            html`${this.evList()}` :
            html`${this.erList()}`
          }
        </vaadin-grid>
        <div id="rowTooltip">&nbsp;</div>
      </tr-dialog>
      `
    }

    get rowTooltip() {
      return this.shadowRoot.querySelector("#rowTooltip")
    }

    setCellListener() {
      if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
        // 
      } else {
        this.rowTooltip.style.display = "block"
        this.rowTooltip.style.visibility = "hidden"
        this.rowTooltip.style.fontSize = "12px"
        this.rowTooltip.style.color = "white"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r,i) => {
          if (i > 0 && this.enterResults[i-1]) {
            r.removeEventListener('mouseenter', () => this.showLockReason(i))
            r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
          }
          if (i > 0 && this.enterResults[i-1] && (this.enterResults[i-1].is_locked || this.enterResults[i-1].warning_reason)) {
            r.addEventListener('mouseenter', () => this.showLockReason(i))
            r.addEventListener('mouseleave', this.hideLockReason.bind(this))
          }
        })
      }
    }

    showLockReason(i) {
      let labels = {
        "warning_reason_label_en":"Warning Reason", "warning_reason_label_es":"Razón Aviso",
        "locking_reason_label_en":"Locking Reason", "locking_reason_label_es":"Razón Bloqueo"
      }
      if (this.enterResults[i-1].is_locked) {
        this.rowTooltip.style.backgroundColor = "rgb(255 8 8)"
        this.rowTooltip.style.visibility = "visible"
        this.rowTooltip.textContent = labels['locking_reason_label_'+ this.lang] +": "+ (this.enterResults[i-1].locking_reason["message_"+ this.lang])
      } else if (this.enterResults[i-1].warning_reason) {
        this.rowTooltip.style.backgroundColor = "#0085ff"
        this.rowTooltip.style.visibility = "visible"
        this.rowTooltip.textContent = labels['warning_reason_label_'+ this.lang] +": "+ this.enterResults[i-1].warning_reason["message_"+ this.lang]
      }
    }

    hideLockReason() {
      this.rowTooltip.style.visibility = "hidden"
    }

    removeEvents() {
      if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
        // 
      } else {
        this.rowTooltip.textContent = ""
        this.rowTooltip.style.visibility = "hidden"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r,i) => {
          if (i > 0 && this.enterResults[i-1] && this.enterResults[i-1].is_locked) {
            r.removeEventListener('mouseenter', this.showLockReason.bind(this))
            r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
          }
        })
      }
      this.curResultRef = undefined
      this.enterResults = []
    }

    detailRenderer(result) {
      let labels = {
        "warning_reason_label_en":"Warning Reason", "warning_reason_label_es":"Razón Aviso",
        "locking_reason_label_en":"Locking Reason", "locking_reason_label_es":"Razón Bloqueo"
      }
      return html`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval ?
            html`${result.spec_eval=='IN' ?
              html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
              html`${result.spec_eval.toUpperCase().includes("OUT")&&result.spec_eval.toUpperCase().includes("SPEC") ?
                html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
                html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
              }`
            }` :
            html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
          }</p>
          <p>${this.lang=="en"?"Method":"Método"}: ${result.method_name} (${result.method_version})</p>
          <p>Range Evaluation: ${result.spec_eval}</p>
          <p>Range Rule: ${result.spec_eval_detail}</p>
          ${result.is_locked ? 
            html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_'+ this.lang]}: ${result.locking_reason["message_"+ this.lang]}</p>` : nothing
          }
          ${result.warning_reason ? 
            html`<p style="color:#0085ff">${labels['warning_reason_label_'+ this.lang]}: ${result.warning_reason["message_"+ this.lang]}</p>` : nothing
          }
        </div>
      `
    }

    erList() {
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) => 
        html`
          ${this.desktop ?
            html`
              ${i==0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  text-align="center" 
                  flex-grow="0"
                  path="${key}" 
                  header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
                html`${key=="raw_value" ?
                  html`<vaadin-grid-column 
                    ${columnBodyRenderer(this.valRenderer)}
                    text-align="center" 
                    flex-grow="1"
                    path="${key}" 
                    header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                  html`${key=="uom" ?
                    html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                    html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
                  }`
                }`
              }
            ` :
            html`
              ${i==0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  width="65px" resizable 
                  path="${key}" 
                  header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
                html`${key=="raw_value" ?
                  html`<vaadin-grid-column 
                    ${columnBodyRenderer(this.valRenderer)}
                    width="65px" resizable 
                    path="${key}" 
                    header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                  html`${key=="uom" ?
                    html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable width="65px" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                    html`<vaadin-grid-column resizable width="65px" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
                  }`
                }`
              }
            ` 
          }
        `
      )
    }

    evList() {
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) => 
        html`
          ${this.desktop ?
            html`
              ${key=="value" ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.valRenderer)}
                  text-align="center" 
                  flex-grow="1"
                  path="${key}" 
                  header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
              }
            ` :
            html`
              ${key=="value" ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.valRenderer)}
                  width="65px" resizable
                  path="${key}" 
                  header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
                html`<vaadin-grid-column resizable width="65px" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
              }
            `
          }
        `
      )
    }

    specRenderer(result) {
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC")) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }

    valRenderer(result) {
      if (result.is_locked) {
        return html`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `
      } else {
        if (result.param_type == "TEXT" || result.param_type == "qualitative") {
          if (this.selectedAction.dialogInfo.readOnly) {
            return html`<mwc-textfield type="text" value=${result.raw_value} disabled></mwc-textfield>`
          } else {
            return html`<mwc-textfield type="text" .value=${result.raw_value} 
              @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
          }
        } else {
          if (this.selectedAction.dialogInfo.readOnly) {
            return html`<mwc-textfield 
              type="number" value=${result.raw_value||result.value||0.00} disabled></mwc-textfield>`
          } else {
            return html`<mwc-textfield 
              type="number" step=0.01 .value=${result.raw_value||result.value||0.00} 
              @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
          }
        }
      }
    }

    uomRenderer(result) {
      if (result.uom && result.raw_value) {
        if (result.uom_conversion_mode) {
          let ucm = result.uom_conversion_mode.split("|")
          return html`
          <select @change=${e=>this.setUOM(result.result_id, e.target.value)}>
            ${ucm.map(u => 
              html`<option value=${u} ?selected=${u==result.uom}>${u}</option>`
            )}
          </select>
          `
        }
        return result.uom
      }
    }

    setUOM(resultId, newResultUom) {
      this.targetValue = { resultId, newResultUom }
      let actionIdx = this.selectedAction.dialogInfo.action.findIndex(a => a.clientMethod == "changeUOM")
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[actionIdx]
      this.actionMethod(this.selectedDialogAction, false)
    }

    get erGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#erGrid")
    }
  
    get resultDialog() {
      return this.shadowRoot.querySelector("tr-dialog#resultDialog")
    }
  
    get rItem() {
      return this.shadowRoot.querySelector("input[name=rItem]")
    }

    setResult(result, e) {
      this.targetValue = {
        rawValueResult: e.target.value,
        resultId: result.result_id,
        newValue: e.target.value,
        eventId: result.event_id,
        instrumentName: result.instrument,
        variableName: result.param_name
      }
      // vaadin grid field rebinding doesn't work, so let's do manually
      // ClientMethod::getResult
      this.curResultRef = { elm: e.target, resId: result.result_id, evtId: result.event_id }
      let act = JSON.stringify(this.selectedAction.dialogInfo.action[0])
      this.selectedDialogAction = JSON.parse(act)
      if (result.raw_value || result.value) {
        this.selectedDialogAction.actionName = "RE"+ this.selectedDialogAction.actionName
        this.actionMethod(this.selectedDialogAction, false)
      } else {
        this.actionMethod(this.selectedDialogAction, false)
      }
    }

    /** Microorganism Template Dialog part */
    microorganismTemplate() {
      return html`
      <tr-dialog id="microorganismDialog" ?open=${this.microorganismList.length}
        @closing=${()=>{this.microorganismList=[];this.mAddHoc.value='';this.micro1.hidden=true;this.reload()}}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id}</label>` : nothing
        }
        <div class="layout vertical flex">
          ${this.selectedAction.clientMethod!="getMicroorganismItem" ?
            html`
              <mwc-textfield id="mAddHoc" label="${this.langConfig.fieldText.addhocInput['label_'+this.lang]}"
                @input=${this.addhocChanged}></mwc-textfield>
              <mwc-textfield id="numMicroItems1" hidden type="number"></mwc-textfield>
              <sp-button size="m" variant="secondary" @click=${()=>this.setMicroorganism()}>
                ${this.langConfig.fieldText.addhocBtn["label_" + this.lang]}</sp-button>
            ` : nothing
          }
          <div style="height:35vh;overflow:auto">
            <vaadin-grid id="moGrid" theme="row-dividers" all-rows-visible multi-sort
              .items=${this.microorganismList}
              .selectedItems="${this.selectedMicroorganisms}"
              @active-item-changed="${this.selectMicroOrg}">
              <vaadin-grid-sort-column resizable auto-width path="name" header="${this.langConfig.microorganismHeader.name['label_'+this.lang]}"></vaadin-grid-sort-column>
              <vaadin-grid-sort-column resizable auto-width path="items" header="${this.langConfig.microorganismHeader.items['label_'+this.lang]}"></vaadin-grid-sort-column>
            </vaadin-grid>
          </div>
          ${this.selectedMicroorganisms&&this.selectedMicroorganisms.length ?
            html`${this.selectedAction.clientMethod=="getMicroorganismItem" ?
              html`
                <mwc-textfield id="numMicroItems2" min=0 .max=${this.getNumMicroItems()-2} label="${this.selectedMicroorganisms[0].name}" type="number" .value=${this.getNumMicroItems()-2}></mwc-textfield>
              ` :
              html`
                <mwc-textfield id="numMicroItems2" .min=${this.getNumMicroItems()} label="${this.selectedMicroorganisms[0].name}" type="number" .value=${this.getNumMicroItems()}></mwc-textfield>
              `
            }
            ` :
            nothing
          }
          ${this.selectedAction.clientMethod=="getMicroorganismItem" ?
            html`
              <sp-button size="m" variant="cta" @click=${this.unsetMicroorganism}>
                ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            ` :
            html`
              <sp-button size="m" variant="cta" @click=${()=>this.setMicroorganism(false)}>
                ${this.langConfig.fieldText.addBtn["label_" + this.lang]}</sp-button>
            `
          }
        </div>
      </tr-dialog>
      `
    }

    addhocChanged(e) {
      if (this.timeout) {  
        clearTimeout(this.timeout);
      }
      let key = e.target.value
      if (key) {
        this.timeout = setTimeout(() => {
          if (key) {
            let item = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == this.mAddHoc.value)
            this.micro1.hidden = false
            if (item.length) {
              this.micro1.min = item[0].items + 1
              this.micro1.value = item[0].items + 1
            } else {
              this.micro1.min = 1
              this.micro1.value = 1
            }
          } else {
            this.micro1.hidden = true
          }
        }, 500);
      } else {
        this.micro1.hidden = true
      }
    }  

    getNumMicroItems() {
      let item = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == this.selectedMicroorganisms[0].name)
      if (item.length) {
        return item[0].items + 1
      } else {
        return 1
      }
    }

    selectMicroOrg(e) {
      const item = e.detail.value;
      this.selectedMicroorganisms = item ? [item] : [];
    }

    get moGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#moGrid")
    }

    get micro1() {
      return this.shadowRoot.querySelector("mwc-textfield#numMicroItems1")
    }

    get micro2() {
      return this.shadowRoot.querySelector("mwc-textfield#numMicroItems2")
    }
  
    get microorganismDialog() {
      return this.shadowRoot.querySelector("tr-dialog#microorganismDialog")
    }
  
    get mAddHoc() {
      return this.shadowRoot.querySelector("mwc-textfield#mAddHoc")
    }

    setMicroorganism(addhoc=true) {
      // get value from text input
      let totalItems, microName
      // get value from text input
      if (addhoc) {
        if (!this.mAddHoc.value) return
        microName = this.mAddHoc.value
        totalItems = Number(this.micro1.value)
        this.selectedDialogAction = this.selectedAction.dialogInfo.action[1]
      // get value from selected item
      } else {
        if (!this.selectedMicroorganisms.length) return
        microName = this.selectedMicroorganisms[0].name
        totalItems = Number(this.micro2.value)
        this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      }
      let item = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == microName)
      if (item.length) {
        item = item[0].items
      } else {
        item = 0
      }
      let numItems = totalItems - item
      this.selectedSamples[0].microorganism_list_array.forEach(m => {
        if (m.name != microName) {
          totalItems += Number(m.items)
        }
      })

      if (Number(this.selectedSamples[0].raw_value) < totalItems) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "This addition would be "+ totalItems +" what is greater than the reading "+ this.selectedSamples[0].raw_value +" what is not allowed.",
            message_es: "Está adición sumaría un total de "+ totalItems +", mayor a la lectura identificada, "+ this.selectedSamples[0].raw_value +", lo que no es permitido."
          },
          bubbles: true,
          composed: true
        }))
        console.log("This addition would be "+ totalItems +" what is greater than the reading "+ this.selectedSamples[0].raw_value +" what is not allowed.")
        return
      }
      this.targetValue = {
        microorganismName: microName,
        numItems: numItems
      }
      console.log(this.targetValue)
      this.actionMethod(this.selectedDialogAction, false)
    }

    unsetMicroorganism() {
      if (!this.selectedMicroorganisms.length) return
      this.targetValue = {
        microorganismName: this.selectedMicroorganisms[0].name,
        numItems: this.selectedMicroorganisms[0].items - this.micro2.value
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    // checkMicroItems(name) {
    //   let existItem = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == name)
    //   if (existItem.length) {
    //     this.dispatchEvent(new CustomEvent("error", {
    //       detail: {
    //         is_error: true,
    //         message_en: "The microorganism is already set, please select or input another name",
    //         message_es: "El microorganismo ya está configurado, seleccione o ingrese otro nombre"
    //       },
    //       bubbles: true,
    //       composed: true
    //     }))
    //     return "The microorganism is already set, please select or input another name"
    //   }
    // }

    /** Incubation Template Dialog part */
    newBatchTemplate() {
      return html`
      <tr-dialog id="newBatchDialog" 
        @closed=${()=>this.batchInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="batchInput" label="${this.langConfig&&this.langConfig.fieldText.newBatch["label_"+ this.lang]}" 
            dialogInitialFocus @keypress=${e=>e.keyCode==13&&this.newBatch()}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.newBatch}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get newBatchDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newBatchDialog")
    }
  
    get batchInput() {
      return this.shadowRoot.querySelector("mwc-textfield#batchInput")
    }
  
    newBatch() {
      if (this.batchInput.value) {
        this.dialogAccept(false)
      }
    }

    assignTemplate() {
      return html`
      <tr-dialog id="assignDialog" ?open=${this.assignList.length}
        @closing=${()=>this.assignList=[]}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="asGrid" theme="row-dividers"
              @active-item-changed=${e=>this.selectedAssigns=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedAssigns}" all-rows-visible>
              ${this.asList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setAssign}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    asList() {
      if (this.langConfig) {
        return Object.entries(this.langConfig.assignHeader).map(([key, value], i) => 
          html`${i==0 ?
            html`<vaadin-grid-column path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
            html`<vaadin-grid-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
          }`
        )
      }
    }
  
    get assignDialog() {
      return this.shadowRoot.querySelector("tr-dialog#assignDialog")
    }
  
    get asGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#asGrid")
    }
  
    setAssign() {
      this.targetValue = {
        incubatorName: this.selectedAssigns[0].name,
        incubStage: this.selectedAssigns[0].stage
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    sampleStuckTemplate() {
      return html`
      <tr-dialog id="sampleStuckDialog" 
        heading=""
        hideActions=""
        scrimClickAction="">
        <label slot="topLeft" style="font-size:12px">${this.langConfig&&this.langConfig.fieldText.topLabel["label_"+ this.lang]}</label>
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="siGrid" theme="row-dividers" 
              @active-item-changed=${e=>this.selectedStucks=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedStucks}" all-rows-visible>
              ${this.siList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setToNext}>
              ${this.langConfig&&this.langConfig.fieldText.next["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    siList() {
      if (this.langConfig) {
        return Object.entries(this.langConfig.stuckHeader).map(([key, value], i) => 
          html`<vaadin-grid-column resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
        )
      }
    }
  
    get sampleStuckDialog() {
      return this.shadowRoot.querySelector("tr-dialog#sampleStuckDialog")
    }
  
    get siGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#siGrid")
    }
  
    setToNext() {
      let adjustAction = {
        ...this.selectedAction,
        "button": {
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          }
        }
      }
      this.credsChecker(this.selectedAction.actionName, this.selectedStucks[0].sample_id, this.jsonParam(), adjustAction)
    }

    /** Point Template Dialog part */
    pointTemplate() {
      return html`
      <tr-dialog id="pointDialog" .open=${this.selectedSamples&&this.selectedSamples.length&&this.sopsPassed}
        @closed=${e=>{if(e.target===this.pointDialog)this.grid.activeItem=null}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div class="layout horizontal justified flex">
            <sp-button size="m" variant="secondary" dialogAction="accept">
              ${commonLangConfig.closeDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="m" @click=${this.setLogSample}>${this.langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
          </div>
          <div class="layout horizontal flex around-justified wrap" style="gap: 5px;">
            <mwc-select label="${this.langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
              ${this.langConfig.fieldText.shift.items.map((c,i) => 
                html`<mwc-list-item value="${c.keyName}" ?selected=${c.keyName==this.headerInfo.shift}>${c["keyValue_"+this.lang]}</mwc-list-item>`
              )}
            </mwc-select>
            <mwc-select label="${this.langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
              ${this.langConfig.fieldText.lot.items.map((c,i) => 
                html`<mwc-list-item value="${c.lot_name}" ?selected=${i==0}>${c.lot_name}</mwc-list-item>`
              )}
            </mwc-select>
            ${this.selectedSamples.length&&this.selectedSamples[0].card_info.map(f => 
              html`${(f.name in this.langConfig.gridHeader) ?
                // html`<mwc-textfield style="width:200px" ?disabled=${this.langConfig.gridHeader[f.name]&&this.langConfig.gridHeader[f.name].confidential_value?true:false} label=${this.langConfig.gridHeader[f.name]['label_'+this.lang]} name=${f.name} type=${f.type} value=${this.langConfig.gridHeader[f.name]&&this.langConfig.gridHeader[f.name].confidential_value&&f.value?"*****":f.value}></mwc-textfield>` :
                html`<mwc-textfield disabled style="width:200px" label=${this.langConfig.gridHeader[f.name]['label_'+this.lang]} name=${f.name} type=${f.type} value=${this.langConfig.gridHeader[f.name]&&this.langConfig.gridHeader[f.name].confidential_value&&f.value?"*****":f.value}></mwc-textfield>` :
                nothing
              }
              `
            )}
          </div>
        </div>
      </tr-dialog>
      `
    }

    get pointDialog() {
      return this.shadowRoot.querySelector("tr-dialog#pointDialog")
    }

    get shiftField() {
      return this.shadowRoot.querySelector("mwc-select#shift")
    }

    get lotField() {
      return this.shadowRoot.querySelector("mwc-select#lot")
    }

    setLogSample() {
      this.targetValue = {
        sampleTemplate: this.templates.selectedProgram.sample_config_code,
        sampleTemplateVersion: this.templates.selectedProgram.sample_config_code_version,
        fieldValue: `${this.shiftField.value}*String|${this.lotField.value}*String`
      }
      this.actionMethod(null, false, 1)
    }

    /** Lot Template Dialog part */
    // lotTemplate() {
    //   return html`
    //   <tr-dialog id="lotDialog"
    //     @closed=${e=>{if(e.target===this.lotDialog)this.grid.activeItem=null}}
    //     heading=""
    //     hideActions=""
    //     scrimClickAction="">
    //     <div class="layout vertical flex center-justified">
    //       <mwc-textfield id="lotInput" 
    //         label="${this.selectedAction.actionName=="EM_NEW_PRODUCTION_LOT" ?
    //           this.langConfig.fieldText.newLot["label_"+ this.lang] :
    //           this.langConfig.fieldText.activateLot["label_"+ this.lang]
    //         }" 
    //         .value=${this.selectedAction.actionName=="EM_ACTIVATE_PRODUCTION_LOT"&&this.selectedSamples.length ?
    //           this.selectedSamples[0].lot_name :
    //           ''
    //         }
    //         dialogInitialFocus
    //         @keypress=${e=>e.keyCode==13&&this.lotAction()}></mwc-textfield>
    //       <div style="margin-top:30px;text-align:center">
    //         <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
    //           ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
    //         <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.lotAction}>
    //           ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
    //       </div>
    //     </div>
    //   </tr-dialog>
    //   `
    // }
    /** Lot Template Dialog part */
    lotTemplate() {
      return html`
      <tr-dialog id="lotDialog"
        @closed=${e=>{if(e.target===this.lotDialog)this.deactivatedLots=[]}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          ${this.selectedAction.actionName=="EM_NEW_PRODUCTION_LOT" ?
            html`
              <mwc-textfield id="lotInput" 
                label="${this.langConfig.fieldText.newLot["label_"+ this.lang]}" 
                dialogInitialFocus
                @keypress=${e=>e.keyCode==13&&this.lotAction()}></mwc-textfield>
            ` :
            html`
              <div class="layout vertical flex">
                <div class="layout horizontal flex center-center">
                  <mwc-textfield class="layout flex" id="lotNumDays" type="number" 
                    .value=${this.lotDays} @change=${e=>this.lotDays=e.target.value}
                    label="${this.langConfig.fieldText.lotDays["label_"+this.lang]}"
                    @keypress=${e=>e.keyCode==13&&this.setDays()}></mwc-textfield>
                  <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                </div>
                <mwc-select id="lotName" label="${this.langConfig.fieldText.lotName["label_"+this.lang]}" 
                  ?disabled=${!this.deactivatedLots.length}>
                  ${this.deactivatedLots.map((l,i) => 
                    html`<mwc-list-item value="${l.lot_name}" ?selected=${i==0}>${l.lot_name}</mwc-list-item>`
                  )}
                </mwc-select>
              </div>
            `
          }
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.lotAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }
  
    get lotDialog() {
      return this.shadowRoot.querySelector("tr-dialog#lotDialog")
    }

    get lotInput() {
      return this.shadowRoot.querySelector("mwc-textfield#lotInput")
    }

    get lotNumDays() {
      return this.shadowRoot.querySelector("mwc-textfield#lotNumDays")
    }

    get lotName() {
      return this.shadowRoot.querySelector("mwc-select#lotName")
    }

    setDays() {
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)      
    }

    lotAction() {
      if (this.selectedAction.actionName == "EM_ACTIVATE_PRODUCTION_LOT") {
        if (this.lotName.value) {
          this.selectedDialogAction = null
          this.dialogAccept(false)
        }
      } else {
        if (this.lotInput.value) {
          this.dialogAccept(false)
        }
      }
    }

    cleanNewInstrumentFields(){
      this.instrumentInput.value="";
      this.instrumentFamilyInput.value=""
    }

    newInstrumentsTemplate() {
      return html`
      <tr-dialog id="newInstrumentDialog" 
        @closed=${()=>this.cleanNewInstrumentFields()}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="instrumentInput" label="${this.langConfig&&this.langConfig.fieldText.newInstrument["label_"+ this.lang]}" 
            dialogInitialFocus @keypress=${e=>e.keyCode==13&&this.newInstrument()}></mwc-textfield>
            <mwc-textfield id="instrumentFamilyInput" label="${this.langConfig&&this.langConfig.fieldText.familyName["label_"+ this.lang]}" 
            dialogInitialFocus @keypress=${e=>e.keyCode==13&&this.newInstrument()}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.newInstrument}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      <tr-dialog id="undecomInstrDialog"
        @closed=${e=>{if(e.target===this.undecomInstrDialog)this.deactivatedLots=[]}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          ${this.selectedAction.actionName=="xUNDECOMMISSION_INSTRUMENT" ?
            html`
              <mwc-textfield id="instrumentInput" 
                label="${this.langConfig.fieldText.instrumentName["label_"+ this.lang]}" 
                dialogInitialFocus
                @keypress=${e=>e.keyCode==13&&this.undecomInstrument()}></mwc-textfield>
            ` :
            html`
              <div class="layout vertical flex">
                <div class="layout horizontal flex center-center">
                  <mwc-textfield class="layout flex" id="lotNumDays" type="number" 
                    .value=${this.lotDays} @change=${e=>this.lotDays=e.target.value}
                    label="${this.langConfig.fieldText.lotDays["label_"+this.lang]}"
                    @keypress=${e=>e.keyCode==13&&this.setDays()}></mwc-textfield>
                  <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                </div>
                <mwc-select id="instrumentName" label="${this.langConfig.fieldText.instrumentName["label_"+this.lang]}" 
                  ?disabled=${!this.deactivatedLots.length}>
                  ${this.deactivatedLots.map((l,i) => 
                    html`<mwc-list-item value="${l.name}" ?selected=${i==0}>${l.name}</mwc-list-item>`
                  )}
                </mwc-select>
              </div>
            `
          }
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.undecomInstrument}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }
    undecomInstrument() {
      if (this.selectedAction.actionName == "UNDECOMMISSION_INSTRUMENT") {
        if (this.instrumentName.value) {
          this.selectedDialogAction = null
          this.dialogAccept(false)
        }
      } else {
        if (this.instrumentInput.value) {
          this.dialogAccept(false)
        }
      }
    }

    get newInstrumentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newInstrumentDialog")
    }
    get undecomInstrDialog() {
      return this.shadowRoot.querySelector("tr-dialog#undecomInstrDialog")
    }
    get instrumentName() {
      return this.shadowRoot.querySelector("mwc-select#instrumentName")
    }
    

    instrumentEventTemplate() {
    return html`
      <tr-dialog id="completeInstrumentEventDialog" 
        @closed=${()=>this.cleanNewInstrumentFields()}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
            <mwc-select id="decisionInput" label="${this.langConfig&&this.langConfig.fieldText.decision["label_"+ this.lang]}">
            ${this.langConfig.fieldText.decision.items.map((c,i) => 
              html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
            )}
          </mwc-select>

          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.instrumentEventDecision}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>      
      `
    }
    get completeInstrumentEventDialog() {
      return this.shadowRoot.querySelector("tr-dialog#completeInstrumentEventDialog")
    }
    get instrumentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#instrumentInput")
    }
    get instrumentFamilyInput() {
      return this.shadowRoot.querySelector("mwc-textfield#instrumentFamilyInput")
    }
    get decisionInput() {
      return this.shadowRoot.querySelector("mwc-select#decisionInput")
    }
        
    instrumentEventDecision(){
      if (this.decisionInput.value) {
        this.dialogAccept(false)
      }
    }
    newInstrument() {
      if (this.instrumentInput.value) {
        this.dialogAccept(false)
      }
    }

    /** Investigation Template Dialog part */
    investigationTemplate() {
      return html`
      <tr-dialog id="investigationDialog" ?open=${this.openInvests.length}
        @closed=${e=>{if(e.target===this.investigationDialog){this.openInvests=[];this.grid.activeItem=null}}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div style="height:55vh;overflow:auto">
            <vaadin-grid .items=${this.openInvests} id="investigationGrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedInvestigations=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedInvestigations}" all-rows-visible>
              <vaadin-grid-sort-column width="100%" resizable text-align="center" path="id" header="Id"></vaadin-grid-sort-column>
              <vaadin-grid-filter-column width="100%" resizable text-align="center" path="created_on" .header="${this.model.langConfig.gridHeader.created_on["label_"+ this.lang]}"></vaadin-grid-filter-column>
            </vaadin-grid>
          </div>
          <div style="margin-top:10px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" 
              @click=${this.addInvestigationAction}
              ?disabled=${!this.selectedInvestigations.length}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get investigationDialog() {
      return this.shadowRoot.querySelector("tr-dialog#investigationDialog")
    }

    addInvestigationAction() {
      this.targetValue = {
        "investigationId": this.selectedInvestigations[0].id,
        "objectsToAdd": "sample_analysis_result*"+ this.selectedSamples[0].result_id
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    /** Decision Template Dialog part */
    decisionTemplate() {
      return html`
      <tr-dialog id="decisionDialog" 
        @opened=${()=>this.capaRequired=this.capaCheck.checked}
        @closed=${e=>{if(e.target===this.decisionDialog)this.grid.activeItem=null}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="systemName" label="${this.langConfig.fieldText.systemName["label_"+ this.lang]}" 
            .value=${this.selectedSamples.length&&this.selectedSamples[0].capa_external_system_name}
            dialogInitialFocus></mwc-textfield>
          <mwc-textfield id="systemId" label="${this.langConfig.fieldText.systemId["label_"+ this.lang]}"
            .value=${this.selectedSamples.length&&this.selectedSamples[0].capa_external_system_id}></mwc-textfield>
          <mwc-formfield label="${this.langConfig.fieldText.capa["label_"+ this.lang]}">
            <mwc-checkbox id="capaCheck" 
              ?checked=${this.selectedSamples.length&&this.selectedSamples[0].capa_required}
              @change=${e=>{
                this.capaRequired=e.target.checked;
                this.capaId.value="";
                this.capaName.value="";
              }}></mwc-checkbox>
          </mwc-formfield>
          <mwc-textfield id="capaName" label="${this.langConfig.fieldText.capaName["label_"+ this.lang]}"
            .value=${this.selectedSamples.length&&this.selectedSamples[0].external_system_name}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <mwc-textfield id="capaId" label="${this.langConfig.fieldText.capaId["label_"+ this.lang]}"
            .value=${this.selectedSamples.length&&this.selectedSamples[0].external_system_id}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction"
              @click=${this.setDecision}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get decisionDialog() {
      return this.shadowRoot.querySelector("tr-dialog#decisionDialog")
    }

    get systemName() {
      return this.shadowRoot.querySelector("mwc-textfield#systemName")
    }

    get systemId() {
      return this.shadowRoot.querySelector("mwc-textfield#systemId")
    }

    get capaCheck() {
      return this.shadowRoot.querySelector("mwc-checkbox#capaCheck")
    }

    get capaName() {
      return this.shadowRoot.querySelector("mwc-textfield#capaName")
    }

    get capaId() {
      return this.shadowRoot.querySelector("mwc-textfield#capaId")
    }

    setDecision() {
      let required = []
      if (!this.systemName.value) {
        required.push("System Name")
      }
      if (!this.systemId.value) {
        required.push("System Id")
      }
      if (this.capaCheck.checked) {
        if (!this.capaName.value) {
          required.push("CAPA Name")
        }
        if (!this.capaId.value) {
          required.push("CAPA Id")
        }
      }
      if (required.length) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Please fill the required fields: "+ required.join(", "),
            message_es: "Por favor, rellene los campos obligatorios: "+ required.join(", ")
          },
          bubbles: true,
          composed: true
        }))
        console.log("Please fill the required fields: "+ required.join(", "))
        return
      }

      this.targetValue = {
        "capaFieldValue": "Trackwise"+ this.systemName.value +"*String|"+ this.systemId.value +"*String|"+ this.capaName.value +"*String|"+ this.capaId.value +"*String"
      }
      this.dialogAccept(false)
    }
  
  newPlatformAdminWhiteIPListsTemplate() {
    return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${()=>this.cleanIpDialogFields()}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
        <mwc-textfield class="layout flex" id="ipValue1Input" type="number" placeholder="xxx" value="1" label="${this.langConfig.fieldText.ip_value1["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue2Input" type="number" placeholder="xxx" value="2" label="${this.langConfig.fieldText.ip_value2["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue3Input" type="number" placeholder="xxx" value="3" label="${this.langConfig.fieldText.ip_value3["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue4Input" type="number" placeholder="xxx" value="4" label="${this.langConfig.fieldText.ip_value4["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipDescriptionInput" type="text" label="${this.langConfig.fieldText.description["label_"+this.lang]}"> </mwc-textfield>
        
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.newIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    <tr-dialog id="updateIPEntryDialog"
      @closed=${()=>this.cleanIpDialogFields()}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
        <mwc-textfield class="layout flex" id="ipValue1Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value1}        
          label="${this.langConfig.fieldText.ip_value1["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue2Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value2}        
          label="${this.langConfig.fieldText.ip_value2["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue3Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value3}        
          label="${this.langConfig.fieldText.ip_value3["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue4Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value4}        
          label="${this.langConfig.fieldText.ip_value4["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipDescriptionInput" type="text" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].description}        
          label="${this.langConfig.fieldText.description["label_"+this.lang]}"> </mwc-textfield>      
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.updateIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }
  get ipValue1Input() {
    return this.shadowRoot.querySelector("mwc-textfield#ipValue1Input")
  }
  get ipValue2Input() {
    return this.shadowRoot.querySelector("mwc-textfield#ipValue2Input")
  }
  get ipValue3Input() {
    return this.shadowRoot.querySelector("mwc-textfield#ipValue3Input")
  }
  get ipValue4Input() {
    return this.shadowRoot.querySelector("mwc-textfield#ipValue4Input")
  }
  get ipDescriptionInput() {
    return this.shadowRoot.querySelector("mwc-textfield#ipDescriptionInput")
  }
  newPlatformAdminBlackIPListsTemplate() {
    return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${()=>this.cleanIpDialogFields()}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
        <mwc-textfield class="layout flex" id="ipValue1Input" type="number" placeholder="xxx" value="1" label="${this.langConfig.fieldText.ip_value1["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue2Input" type="number" placeholder="xxx" value="2" label="${this.langConfig.fieldText.ip_value2["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue3Input" type="number" placeholder="xxx" value="3" label="${this.langConfig.fieldText.ip_value3["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue4Input" type="number" placeholder="xxx" value="4" label="${this.langConfig.fieldText.ip_value4["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipDescriptionInput" type="text" label="${this.langConfig.fieldText.description["label_"+this.lang]}"> </mwc-textfield>
        
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.newIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    <tr-dialog id="updateIPEntryDialog" 
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
        <mwc-textfield class="layout flex" id="ipValue1Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value1}        
          label="${this.langConfig.fieldText.ip_value1["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue2Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value2}        
          label="${this.langConfig.fieldText.ip_value2["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue3Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value3}        
          label="${this.langConfig.fieldText.ip_value3["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipValue4Input" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].ip_value4}        
          label="${this.langConfig.fieldText.ip_value4["label_"+this.lang]}"> </mwc-textfield>
        <mwc-textfield class="layout flex" id="ipDescriptionInput" type="text" placeholder="xxx" 
          .value=${this.selectedSamples.length&&this.selectedSamples[0].description}        
          label="${this.langConfig.fieldText.description["label_"+this.lang]}"> </mwc-textfield>      
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.updateIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }
  get newIPEntryDialog() {
    return this.shadowRoot.querySelector("tr-dialog#newIPEntryDialog")
  }
  get updateIPEntryDialog() {
    return this.shadowRoot.querySelector("tr-dialog#updateIPEntryDialog")
  }
  cleanIpDialogFields(){
    this.ipValue1Input.value="";
    this.ipValue2Input.value="";
    this.ipValue3Input.value="";
    this.ipValue4Input.value="";
    this.ipDescriptionInput.value="";
  }
  newIp() {    
    if (this.ipValue1Input.value) {
      this.dialogAccept(false)
    }
  }
  updateIp() {    
    if (this.ipValue1Input.value) {
      this.dialogAccept(false)
    }
  }
  
  newPlatformAdminBusinessRulesTemplate() {
    return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${()=>this.cleanIpDialogFields()}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.newIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }
  }
}