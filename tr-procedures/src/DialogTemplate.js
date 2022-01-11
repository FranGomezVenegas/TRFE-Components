import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';

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
        selectedDialogAction: { type: Object }
      }
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
        @closing=${()=>this.enterResults=[]}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id}</label>` : nothing
        }
        <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
          @selected-items-changed=${e => {
            this.selectedResults = e.detail.value
          }}
          .detailsOpenedItems=${this.selectedResults}
          ${gridRowDetailsRenderer(this.detailRenderer)}>
          <vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>
          ${this.erList()}
        </vaadin-grid>
      </tr-dialog>
      `
    }

    detailRenderer(result) {
      return html`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval ?
            html`${result.spec_eval=='IN' ?
              html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
              html`${result.is_locked ?
                html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
                html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
              }`
            }` :
            html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
          }</p>
          <p>Range Evaluation: ${result.spec_eval}</p>
          <p>Range Rule: ${result.spec_eval_detail}</p>
          <p>Lock Reason: ${result.is_locked?result.is_locked["message_"+ this.lang]:null}</p>
        </div>
      `
    }

    erList() {
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) => 
        html`${i==0 ?
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
            html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
          }`
        }`
      )
    }

    specRenderer(result) {
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.is_locked) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }

    valRenderer(result) {
      if (!result.raw_value || result.spec_eval == "IN") {
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
              type="number" value=${result.raw_value?result.raw_value:0.00} disabled></mwc-textfield>`
          } else {
            return html`<mwc-textfield 
              type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00} 
              @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
          }
        }
      } else {
        if (result.is_locked) {
          return html`
            <div style="width: 100%;height: 55px;position: relative;">
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
                type="number" value=${result.raw_value?result.raw_value:0.00} disabled></mwc-textfield>`
            } else {
              return html`<mwc-textfield 
                type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00} 
                @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
            }
          }
        }
      }
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
        resultId: result.result_id
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      if (result.raw_value) {
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
        @closing=${()=>{this.microorganismList=[];this.reload()}}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id}</label>` : nothing
        }
        <div class="layout vertical flex">
          ${this.selectedAction.clientMethod!="getMicroorganismItem" ?
            html`
              <mwc-textfield id="mAddHoc" label="${this.langConfig.fieldText.addhocInput['label_'+this.lang]}"></mwc-textfield>
              <sp-button size="xl" variant="secondary" @click=${()=>this.setMicroorganism(true)}>
                ${this.langConfig.fieldText.addhocBtn["label_" + this.lang]}</sp-button>
            ` : nothing
          }
          <vaadin-grid id="moGrid" theme="row-dividers" all-rows-visible multi-sort
            .selectedItems="${this.selectedMicroorganisms}"
            @active-item-changed="${e => {
              const item = e.detail.value;
              this.selectedMicroorganisms = item ? [item] : [];
            }}">
            <vaadin-grid-sort-column resizable flex-grow=1 path="name" header="${this.langConfig.microorganismHeader.name['label_'+this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
          ${this.selectedAction.clientMethod=="getMicroorganismItem" ?
            html`
              <sp-button size="xl" variant="cta" @click=${this.unsetMicroorganism}>
                ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            ` :
            html`
              <sp-button size="xl" variant="cta" @click=${()=>this.setMicroorganism()}>
                ${this.langConfig.fieldText.addBtn["label_" + this.lang]}</sp-button>
            `
          }
        </div>
      </tr-dialog>
      `
    }

    get moGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#moGrid")
    }
  
    get microorganismDialog() {
      return this.shadowRoot.querySelector("tr-dialog#microorganismDialog")
    }
  
    get mAddHoc() {
      return this.shadowRoot.querySelector("mwc-textfield#mAddHoc")
    }

    setMicroorganism(addhoc=false) {
      if (Number(this.selectedSamples[0].raw_value) == this.selectedSamples[0].microorganism_count) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            message_en: "This addition would be "+ (this.selectedSamples[0].microorganism_count+1) +" what is greater than the reading "+ this.selectedSamples[0].microorganism_count +" what is not allowed.",
            message_es: "Está adición sumaría un total de "+ (this.selectedSamples[0].microorganism_count+1) +", mayor a la lectura identificada, "+ this.selectedSamples[0].microorganism_count +", lo que no es permitido."
          },
          bubbles: true,
          composed: true
        }))
        return console.log("This addition would be "+ (this.selectedSamples[0].microorganism_list_array.length+1) +" what is greater than the reading "+ this.selectedSamples[0].microorganism_list_array.length +" what is not allowed.")
      }
      // get value from selected item
      if (!addhoc) {
        if (!this.selectedMicroorganisms.length) return
        this.targetValue = {
          microorganismName: this.selectedMicroorganisms[0].name
        }
        let checkMicroItems = this.checkMicroItems(this.selectedMicroorganisms[0].name)
        console.log(checkMicroItems)
        if (!checkMicroItems) {
          this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
          this.actionMethod(this.selectedDialogAction, false)
        }
      // get value from text input
      } else {
        if (!this.mAddHoc.value) return
        this.targetValue = {
          microorganismName: this.mAddHoc.value
        }
        let checkMicroItems = this.checkMicroItems(this.mAddHoc.value)
        console.log(checkMicroItems)
        if (!checkMicroItems) {
          this.selectedDialogAction = this.selectedAction.dialogInfo.action[1]
          this.actionMethod(this.selectedDialogAction, false)
        }
      }
    }

    unsetMicroorganism() {
      if (!this.selectedMicroorganisms.length) return
      this.targetValue = {
        microorganismName: this.selectedMicroorganisms[0].name
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    checkMicroItems(name) {
      let existItem = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == name)
      if (existItem.length) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            message_en: "The microorganism is already set, please select or input another name",
            message_es: "El microorganismo ya está configurado, seleccione o ingrese otro nombre"
          },
          bubbles: true,
          composed: true
        }))
        return "The microorganism is already set, please select or input another name"
      }
    }

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
          <vaadin-grid id="asGrid" theme="row-dividers"
            @active-item-changed=${e=>this.selectedAssigns=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedAssigns}">
            ${this.asList()}
          </vaadin-grid>
          <div style="margin-top:30px;text-align:center">
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

    /** Point Template Dialog part */
    pointTemplate() {
      return html`
      <tr-dialog id="pointDialog" .open=${this.selectedSamples&&this.selectedSamples.length}
        @closed=${e=>{if(e.target===this.pointDialog)this.grid.activeItem=null}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div class="layout horizontal justified flex">
            <sp-button size="m" variant="secondary" dialogAction="accept">
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="m" @click=${this.setLogSample}>${this.langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
          </div>
          <mwc-select label="${this.langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
            ${this.langConfig.fieldText.shift.items.map((c,i) => 
              html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
            )}
          </mwc-select>
          <mwc-select label="${this.langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
            ${this.langConfig.fieldText.lot.items.map((c,i) => 
              html`<mwc-list-item value="${c.lot_name}" ?selected=${i==0}>${c.lot_name}</mwc-list-item>`
            )}
          </mwc-select>
          ${this.selectedSamples.length&&this.selectedSamples[0].card_info.map(f => 
            html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
          )}
        </div>
      </tr-dialog>
      `
    }

    get pointDialog() {
      return this.shadowRoot.querySelector("tr-dialog#pointDialog")
    }

    get shiftInput() {
      return this.shadowRoot.querySelector("mwc-select#shift")
    }

    get lotInput() {
      return this.shadowRoot.querySelector("mwc-select#lot")
    }

    get programInput() {
      return this.shadowRoot.querySelector("mwc-textfield[name=program_name]")
    }

    get locationInput() {
      return this.shadowRoot.querySelector("mwc-textfield[name=location_name]")
    }

    setLogSample() {
      this.targetValue = {
        sampleTemplate: this.templates.dataApi.sample_config_code,
        sampleTemplateVersion: this.templates.dataApi.sample_config_code_version,
        fieldValue: `${this.shiftInput.value}*String|${this.lotInput.value}*String`
      }
      this.actionMethod(null, false, 1)
    }

    /** Lot Template Dialog part */
    lotTemplate() {
      return html`
      <tr-dialog id="lotDialog"
        @closed=${e=>{if(e.target===this.lotDialog)this.grid.activeItem=null}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="lotInput" 
            label="${this.selectedAction.actionName=="EM_NEW_PRODUCTION_LOT" ?
              this.langConfig.fieldText.newLot["label_"+ this.lang] :
              this.langConfig.fieldText.activateLot["label_"+ this.lang]
            }" 
            .value=${this.selectedAction.actionName=="EM_ACTIVATE_PRODUCTION_LOT"&&this.selectedSamples.length ?
              this.selectedSamples[0].lot_name :
              ''
            }
            dialogInitialFocus
            @keypress=${e=>e.keyCode==13&&this.lotAction()}></mwc-textfield>
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

    lotAction() {
      if (this.lotInput.value) {
        this.dialogAccept(false)
      }
    }
  }
}