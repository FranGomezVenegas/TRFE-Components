import { html, css, nothing} from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { ApiFunctions } from '../Api/ApiFunctions';

 

export function ButtonsFunctions(base) {
    return class extends (ApiFunctions(base)) {
    getButton(sectionModel = this.viewModelFromProcModel) {
//console.log('getButton', 'sectionModel', sectionModel)      
      return html`
        <style>
          mwc-icon-button#lang {        
            color : rgba(36, 192, 235, 1);
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-button {
            background-color: rgba(36, 192, 235, 1);
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            --mdc-theme-primary:rgba(36, 192, 235, 1);
            border-radius: 12px;
          }
          mwc-button.button {        
            color : rgba(36, 192, 235, 1);
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background: rgb(36, 192, 235) none repeat scroll 0% 0%;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            color: white;
            border-color: transparent !important;
            --mdc-button-fill-color: red;
            --mdc-button-ink-color: blue;
            border-radius: 12px;
          }            
          mwc-icon-button {        
            color : rgba(36, 192, 235, 1);
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }        
          mwc-icon-button.disabledtrue{        
            color : red;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }        
          mwc-icon-button#video {
            color : #FFFFFF;
            color : rgba(36, 192, 235, 1);
          }
          sp-button {
            background : #24C0EB;
            background : rgba(36, 192, 235, 1);
            border-color : inherit !important;
            border-radius : 35px;
            -moz-border-radius : 35px;
            -webkit-border-radius : 35px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            color : #FFFFFF;
            color : rgb(255, 255, 255);
          }
          mwc-textfield {
            border-style : Solid;
            border-color : #999999;
            border-color : rgba(153, 153, 153, 1);        
            border-width : 1px;
            border-radius : 7px;
            -moz-border-radius : 7px;
            -webkit-border-radius : 7px;   
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);     
            background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
          }
          mwc-textfield.mdc-text-field {
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);     
          }
          mwc-textfield.mdc-textfield.mdc-floating-label {
            color: red; 
          }
        </style>     
          ${sectionModel!==undefined&&sectionModel.viewQuery&&sectionModel.viewQuery.addRefreshButton&&sectionModel.viewQuery.addRefreshButton ===true?
          html`
          <mwc-icon-button 
              class="${sectionModel.viewQuery.button.class}"
              icon="${sectionModel.viewQuery.button.icon}" 
              title="${sectionModel.viewQuery.button.title['label_'+this.lang]}"             
              @click=${()=>this.GetViewData()}>
          </mwc-icon-button>` : nothing
          }
          ${sectionModel!==undefined&&sectionModel.actions&&sectionModel.actions.map(action =>
          html`
          ${this.btnHidden(action) ? nothing : 
          html`${action.button ?
              html`${action.button.icon ?
              html`<mwc-icon-button 
                  class="${action.button.class} disabled${this.btnDisabled(action, sectionModel)}"
                  icon="${action.button.icon}" 
                  title="${action.button.title['label_'+this.lang]}" 
                  ?disabled=${this.btnDisabled(action, sectionModel)}
                  ?hidden=${this.btnHidden(action)}
                  @click=${()=>this.actionMethod(action, sectionModel)}></mwc-icon-button>` :
              html`${action.button.img ?
                  html`<mwc-icon-button 
                  class="${action.button.class} disabled${this.btnDisabled(action, sectionModel)} img"
                  title="${action.button.title['label_'+this.lang]}" 
                  ?disabled=${this.btnDisabled(action, sectionModel)}
                  ?hidden=${this.btnHidden(action)}
                  @click=${()=>this.actionMethod(action, sectionModel)}>
                      <img class="iconBtn" src="images/${action.button.img}">
                  </mwc-icon-button>` :
                  html`<mwc-button dense raised 
                  label="${action.button.title['label_'+this.lang]}" 
                  ?disabled="${this.btnDisabled(action, sectionModel)}"
                  ?hidden=${this.btnHidden(action)}
                  @click=${()=>this.actionMethod(action, sectionModel)}></mwc-button>`
              }`
              }` :
              nothing
            }`
          }`
          )}
      `
      }    
    
    btnDisabled(action, viewModelFromProcModel=this.viewModelFromProcModel) {
      //console.log('btnDisabled', viewModelFromProcModel.viewName, 'action', action)            
        let d = false
        if (action.mode!==undefined && action.mode.toString().toUpperCase()==="READONLY") {
          return true        
        }   
        // if (action.buttonForQuery!==undefined && action.buttonForQuery===true) {
        //   if (action.button.requiresGridItemSelected!==undefined&&
        //     action.button.requiresGridItemSelected===true){
        //       return false
        //   }else{          
        //     return false        
        //   }
        // }           
        if (action.buttonForQuery!==undefined && action.buttonForQuery===true) {
        }else{
          d=this.disabledByCertification(action)
          //console.log('btnDisabled', 'disabledByCertification returned ', d)
          if (d) {return d}
        }
        if (action.button.requiresGridItemSelected!==undefined){
          if (action.button.requiresGridItemSelected===false){
            return false
          }

          if (viewModelFromProcModel.alternativeItemPropertyName!==undefined){
            //console.log('viewModelFromProcModel.alternativeItemPropertyName', viewModelFromProcModel.alternativeItemPropertyName)
            if (this[viewModelFromProcModel.alternativeItemPropertyName]===undefined){
              return true
            }else{
              if (this[viewModelFromProcModel.alternativeItemPropertyName].length>0){
                return false
              }else{
                return true
              }
            }
          }else{
              if (this.selectedItems===undefined){
                return true
              }else{
                if (this.selectedItems[0]!==undefined){
                  return false
                }else{
                  return true
                }
              }            
          }
        }
        return d
    }    
    btnHidden(action) {
    let d = false
    if (action.button.showWhenSelectedItem) {
        if (this.selectedItems.length && this.selectedItems[0][action.button.showWhenSelectedItem.column] == action.button.showWhenSelectedItem.value) {
          d = false
        }else{
          d = true
        }
    }else if (action.button.hideWhenSelectedItem) {
      if (this.selectedItems.length && this.selectedItems[0][action.button.hideWhenSelectedItem.column] == action.button.hideWhenSelectedItem.value) {
        d = true
      }else{
        d = false
      }        
    } else {
        d = false
    }
    // console.log('btnHidden', action, 'selectedItems', this.selectedItems, 'd', d)      
    return d
    }        
    actionMethod(action, replace = true, actionNumIdx, selectedItemPropertyName='selectedItems') {
    //this.loadDialogs()  
    console.log('actionMethod', 'action', action)
        if(action===undefined){
            alert('action not passed as argument')
            return
        }
        this.actionBeingPerformedModel=action        
        if(action.requiresDialog===undefined){
            alert('The action '+action.actionName+' has no requiresDialog property which is mandatory')
            return
        }
        if(action.requiresDialog===false){
            this.actionWhenRequiresNoDialog(action, this[selectedItemPropertyName][0])
            return
        }  
        if ( action.requiresGridItemSelected!==undefined&&action.requiresGridItemSelected===true&&
          (this[selectedItemPropertyName]===undefined||this[selectedItemPropertyName][0]===undefined) ){
          alert('Please select one item in the table prior')
          return
        }
        this.GetQueriesForDialog(action)        
        //this.loadDialogs()
        if (action.dialogInfo.name==="auditDialog"){
          this[action.clientMethod]()
          return}
        if (this[action.dialogInfo.name]){
            if (action.dialogInfo.subQueryName){
                this[action.dialogInfo.subQueryName]()
            }else{        
              this[action.dialogInfo.name].show()
                
            }
        }else{
            alert('the dialog '+action.dialogInfo.name+' does not exist')
        }
      return
    }    
    async GetViewData(){
        console.log('GetViewData', 'this.viewModelFromProcModel.viewQuery', this.viewModelFromProcModel.viewQuery)
        if (this.viewModelFromProcModel.viewQuery!==undefined&&this.viewModelFromProcModel.viewQuery.clientMethod!==undefined){
            //alert('Calling '+this.viewModelFromProcModel.viewQuery.clientMethod+' from GetViewData')            
            if (this[this.viewModelFromProcModel.viewQuery.clientMethod]===undefined){
                alert('not found any clientMethod called '+this.viewModelFromProcModel.viewQuery.clientMethod)
                return
            }
            this[this.viewModelFromProcModel.viewQuery.clientMethod]()
            return
        }
        let queryDefinition=this.viewModelFromProcModel.viewQuery
        if (queryDefinition===undefined){return}
        console.log('GetViewData', 'queryDefinition', queryDefinition)
        this.samplesReload = true
        this.selectedItems = []      
        let APIParams=this.getAPICommonParams(queryDefinition)
        let viewParams=this.jsonParam(queryDefinition)
        let params = this.config.backendUrl + (queryDefinition.endPoint ? queryDefinition.endPoint : this.config.SampleAPIqueriesUrl)
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)

        //console.log('params', params)        
        await this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.setGrid(j)
          } else {            
            this.setGrid()
          }
        })
        this.samplesReload = false
    }
    async GetAlternativeViewData(queryDefinition, selObject = {}){
        if (queryDefinition.clientMethod!==undefined){
            //alert('Calling '+queryDefinition.clientMethod+' from GetViewData')            
            if (this[queryDefinition.clientMethod]===undefined){
                alert('not found any clientMethod called '+queryDefinition.clientMethod)
                return
            }
            this[queryDefinition.clientMethod]()
            return
        }
        console.log('GetViewData', 'queryDefinition', queryDefinition)
        let APIParams=this.getAPICommonParams(queryDefinition)
        let viewParams=this.jsonParam(queryDefinition, selObject)
        let params = this.config.backendUrl + (queryDefinition.endPoint ? queryDefinition.endPoint : this.config.SampleAPIqueriesUrl)
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)

        //console.log('params', params)        
        await this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.setGrid(j)
          } else {            
            this.setGrid()
          }
        })
        this.samplesReload = false
    }    
    async GetQueriesForDialog(actionDefinition){
      if (actionDefinition.dialogQueries===undefined){return}

      let i=0
      for (i=0;i<actionDefinition.dialogQueries.length;i++){
        let currQuery=actionDefinition.dialogQueries[i]
        if (currQuery.clientMethod!==undefined){
            //alert('Calling '+currQuery.clientMethod+' from GetViewData')            
            if (this[currQuery.clientMethod]===undefined){
                alert('not found any clientMethod called '+currQuery.clientMethod)
                return
            }
            this[currQuery.clientMethod]()
            return
        }
        console.log('GetQueriesForDialog', 'currQuery', currQuery)
        let APIParams=this.getAPICommonParams(currQuery)
        let viewParams=this.jsonParam(currQuery)
        let params = this.config.backendUrl + (currQuery.endPoint ? currQuery.endPoint : this.config.SampleAPIqueriesUrl)
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)

        //console.log('params', params)        
        await this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            alert(j.length)
            this[currQuery.variableForData]=j

          } else {            
            this[currQuery.variableForData]=[]
          }
        })
      }
      this.samplesReload = false
    }
    actionWhenRequiresNoDialog(action, selectedItem, targetValue ={} ) {
        console.log('actionWhenRequiresNoDialog', 'action', action, 'selectedItem', selectedItem)
        this.selectedAction=action
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem, targetValue), action)
        } else {
          this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem, targetValue), action)
        }
        // Comentado para habilitar confirmDialogs
        // this.performActionRequestHavingDialogOrNot(action, selectedItem)
        return
    }
    performActionRequestHavingDialogOrNot(action, selectedItem, targetValue = {}, credDialogArgs ={}){ 
        if (action.alternativeAPIActionMethod!==undefined){
            this[action.alternativeAPIActionMethod]()
            return
        }       
        var extraParams=this.jsonParam(action, selectedItem, targetValue)   
        let APIParams=this.getAPICommonParams(action)
        let endPointUrl=this.getActionAPIUrl(action)
        if (String(endPointUrl).toUpperCase().includes("ERROR")){
            alert(endPointUrl)
            return
        }
        let params = this.config.backendUrl + endPointUrl
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
          + '&'+ new URLSearchParams(credDialogArgs)
        console.log('performActionRequestHavingDialogOrNot', 'action', action, 'selectedItem', selectedItem, 'extraParams', extraParams)
        
        this.fetchApi(params).then(() => {
//console.log('performActionRequestHavingDialogOrNot: into the fetchApi')
            if (action.notGetViewData===undefined||action.notGetViewData===false){
              this.GetViewData()
            }
            let action2 = this.actionBeingPerformedModel
            if (action.actionName.includes("ENTER_EVENT_RESULT")){
              this.actionMethod(this.viewModelFromProcModel.actions[1], this.selectedItems[0])
              //alert(action.actionName)
            }
            if (action.actionName.includes("ENTERRESULT")){
              this.actionMethod(this.viewModelFromProcModel.actions[1], this.selectedItems[0])
              //alert(action.actionName)
            }   
            if (action.actionName.includes("ENTER_PLATE_READING")){
              this.actionMethod(this.viewModelFromProcModel.actions[3], this.selectedItems[0])
              //alert(action.actionName)
            }                                   
            if (action!==undefined&&action.dialogInfo!==undefined&&action.dialogInfo.name!==undefined
                &&action!==null&&action.dialogInfo!==null&&action.dialogInfo.name!==null){
                  //alert('closing dialog')
                  //console.log('closing dialog')
                this[action.dialogInfo.name].close()
            }
            if (action.secondaryActionToPerform!==undefined){
                this[action.secondaryActionToPerform.name]()
            }
        })  
        return
        this.reqParams.actionName=action.actionName
        if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
            selectedItem=this[action.selObjectVariableName][0]
        }
        var extraParams=this.jsonParamCommons(action, selectedItem)      
    //    if (extraParams.includes("ERROR")){return}   
        params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
        params=params+'?' + new URLSearchParams(this.reqParams) 
        if (extraParams!==undefined){
          params=params + '&' + new URLSearchParams(extraParams)
        }
        this.fetchApi(params).then(() => {
          if (action!==undefined&&action.dialogInfo!==undefined&&action.dialogInfo.name!==undefined){
            this[action.dialogInfo.name].close()
          }
          if (action.secondaryActionToPerform!==undefined){
            this[action.secondaryActionToPerform]()
          }
        })            

    }

    disabledByCertification(action){      
      let sopsPassed = false
      let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
  
      if (this.procInstanceName===undefined||procList===undefined){return true}
      
      let procInstanceModel = procList.filter(p => p.procInstanceName == this.procInstanceName)
      if (procInstanceModel.length) {
        if (procInstanceModel.length && procInstanceModel[0].userSopMode===undefined){
          return true
        }
        if (procInstanceModel.length && procInstanceModel[0].userSopMode.toString().toUpperCase().includes("DISAB")) {
          return false
        }         

        let defView = procInstanceModel[0].new_definition.filter(d => d.lp_frontend_page_name == this.viewName)
        if (defView.length) {
          // for fake test
          // sopsPassed = false
          if (defView[0].icons) {
            defView = defView[0].icons.filter(i => i.name == this.filterName) 
          //   let sopIcon = defView[0].icons.filter(i => i.name == this.filterName) 
          //   sopsPassed = sopIcon[0].sops_passed
          // } else {
          //   sopsPassed = defView[0].sops_passed
          }
        }
        console.log('disabledByCertification', defView[0].mode)
        if (defView.length && defView[0].mode.toString().toUpperCase()==="READONLY") {
          return true
        } 
        sopsPassed = defView[0].sops_passed == true ? true : false
        return !sopsPassed  
      }      
      return !sopsPassed
    }
}
}