import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function TrazitReactivateObjectsDialog(base) {
return class extends base {
    static get properties() {
        return {
            numDays: { type: Number },
            deactivatedObjects: { type: Array },
        }
    }
    constructor() {
        super()
        this.numDays = 7
        this.deactivatedObjects = []
    }
  
    noNegativeValues(e) {
      if (e.target.value <=0){
        this.numDays=0
        e.target.value=0
      }
      // console.log('setValidVal', e)
      return
    }    

    //${this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.fieldsObject===undefined||this.actionBeingPerformedModel.dialogInfo.fieldsObject.objectName===undefined ?          
    reactivateObjectsDialog() {
      //  console.log('reactivateObjectsDialog', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
      //if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.fieldsObject===undefined){return nothing}
        return html` 
        <tr-dialog id="reactivateObjectDialog" ?open=${this.actionBeingPerformedModel&&this.actionBeingPerformedModel.dialogInfo&&this.actionBeingPerformedModel.dialogInfo.name==='reactivateObjectDialog'} heading="" hideActions="" @open="${this.cleanReactivateObjectList}" scrimClickAction="">
        ${this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="reactivateObjectDialog" ? nothing :
        html`

        <div class="layout vertical flex center-justified">        
                <div class="layout vertical flex">
                  <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="queryNumDays" type="number" 
                      .value=${this.numDays} @change=${e => this.numDays = e.target.value}
                      @input=${e=>this.noNegativeValues(e)}
                      label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.queryNumDays["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.setDays()}></mwc-textfield>
                    <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                  </div>
                  <mwc-select id="objectToReactivateName" label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.objectName["label_" + this.lang]}" 
                    ?disabled=${!this.deactivatedObjects.length}>
                    ${!this.deactivatedObjects.length ? nothing : html`
                    ${this.deactivatedObjects.map((l, i) =>
                    html`<mwc-list-item value="${this.listItemValueToGet(l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(l)}</mwc-list-item>`
                    )}
                    `}
                  </mwc-select>
                </div>     
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline" @click="${this.cleanReactivateObjectList}">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.reactivateObjectDialogAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
        </tr-dialog>      
        `}
        `
    } 
    cleanReactivateObjectList(){
        this.deactivatedObjects= []
    }    
    setDays() {
        //console.log('setDays clicked')
        //alert(this.numDays)
        this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.viewQuery
        this.GetAlternativeViewData(this.selectedDialogAction, false)
    }  
    listItemValueToGet(entry){
        if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName===undefined){
          alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console')
          //console.log('this.actionBeingPerformedModel', this.actionBeingPerformedModel)
          return entry["name"]
        }
        return entry[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName]
    }
    listItemValueToDisplay(entry){
        if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator===undefined){
            alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console')
            //console.log('this.actionBeingPerformedModel', this.actionBeingPerformedModel)
            return entry["name"]
        }
        var lFlds=this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator
        var textToDisplay=''
        for (var i = 0; i < lFlds.length; i++) {
            if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
            if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
        }
        return textToDisplay
    }
    reactivateObjectDialogAction() {
       // console.log('reactivateObjectDialogAction', 'this.objectToReactivateName', this.objectToReactivateName)
        if (this.objectToReactivateName.value) {
          this.selectedItems[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName]=this.objectToReactivateName.value
          this.selectedDialogAction = this.actionBeingPerformedModel
          this.myActionMethod(this.selectedDialogAction, this.selectedItems, this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName)
          //this.dialogAccept(false)
          this.cleanReactivateObjectList()
        }
    } 
    myActionMethod(action, selObject, propName) {
        if (action===undefined){
          alert('viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
          return
        }
         console.log('myActionMethod','action', action, 'selObject', selObject)
          if (selObject.length) {
            this.credsCheckerCommons(action.actionName, selObject[propName], this.jsonParam(action, selObject), action)
          } else {
            this.credsCheckerCommons(action.actionName, null, this.jsonParam(action, selObject), action)
          }
    }    
    getDeactivatedObjects() {
        // console.log('getDeactivatedObjects')
        let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery
        this.deactivatedObjects = []
        let APIParams=this.getAPICommonParams(queryDefinition)
        let viewParams=this.jsonParam(queryDefinition)
        let params = this.config.backendUrl + (queryDefinition.endPoint ? queryDefinition.endPoint : this.config.SampleAPIqueriesUrl)
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)
        this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.deactivatedObjects = j
          }
        })
    }
  
    
    get reactivateObjectDialog() {return this.shadowRoot.querySelector("tr-dialog#reactivateObjectDialog")}
    get queryNumDays() {return this.shadowRoot.querySelector("mwc-textfield#queryNumDays")}  
    get objectToReactivateName() {return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")}
  
}}