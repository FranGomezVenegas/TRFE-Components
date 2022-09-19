import { html, css } from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CredDialog } from '@trazit/cred-dialog';

export function DialogsFunctions(base) {
    return class extends base {

        dialogAccept(selected=true) {
          console.log('dialogAccept before run credsChecker')
            if (selected) {
                this.credsChecker(this.actionBeingPerformedModel.actionName, this.selectedItems[0].sample_id, this.jsonParamCommons(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel)
            } else {
                this.credsChecker(this.actionBeingPerformedModel.actionName, null, this.jsonParamCommons(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel)
            }
            //this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel, this.selectedItems[0])
        }

  /**
   * 
   * @param {*} actionName 
   * @param {*} objId -1 will show up the creds dialog, e.g user profile open the creds dialog. 
   * @param {*} params ref of this.reqParams
   * @param {*} action ref of action object
   */
  credsChecker(actionName, objId, params={}, action) {
    console.log('credsChecker')
    this.actionObj = action || {}
    this.reqParams = params
    if (actionName) {
      this.actionName = actionName
      if (objId == -1) {
        this.credDialog.show()
      } else {
        this.objectId = objId
        let noNeedCreds = this.checkProcList()
        if (noNeedCreds) {
          this.nextRequest()
        } else {
          if (this.type == "confirm") {
            this.confirmDialog.show()
          } else {
            this.credDialog.show()
          }
        }
      }
    }
  }
  
  /**
   * set the justification type, generate justification list for non text type
   */
   checkProcList() {
    console.log('checkProcList')
    let bypass = true
    // this.justificationType = null
    // this.justificationList = null
    // let procList2 = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    // bypass = true
    // procList2.forEach(p => {
    //   //let idx = p.actions_with_confirm_user.findIndex(p => p == this.actionName)
    //   //if (p.actions_with_esign[idx][this.actionName].type) {
    //     //this.justificationType = p.actions_with_esign[idx][this.actionName].type
    //     //if (this.justificationType != "TEXT") {
    //     //  this.justificationList = p.actions_with_esign[idx][this.actionName].list_entries
    //     //}
    //   //}
    // })
    // this.type = "esign"
    // bypass = false
    // return bypass



    // // this.type = "confirm"
    // // bypass = false
    // // alert('Temporalmente en credDialog, toda acción requiere confirmacion')
    // // return bypass
    // alert('Temporalmente en credDialog, se ha deshabilitado el tema de las confirmaciones ... ')
    // return true
    this.justificationType = null
    this.justificationList = null
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    bypass = true
    procList.forEach(p => {
      if (p.actions_with_esign.indexOf(this.actionName) >= 0) {
        let idx = p.actions_with_esign.findIndex(p => p == this.actionName)
        --idx // the object is on the previous index
        if (p.actions_with_esign[idx][this.actionName].type) {
          this.justificationType = p.actions_with_esign[idx][this.actionName].type
          if (this.justificationType != "TEXT") {
            this.justificationList = p.actions_with_esign[idx][this.actionName].list_entries
          }
        }
        this.type = "esign"
        bypass = false
      } else if (p.actions_with_confirm_user.indexOf(this.actionName) >= 0) {
        let idx = p.actions_with_confirm_user.findIndex(p => p == this.actionName)
        --idx // the object is on the previous index
        if (p.actions_with_confirm_user[idx][this.actionName].type) {
          this.justificationType = p.actions_with_confirm_user[idx][this.actionName].type
          if (this.justificationType != "TEXT") {
            this.justificationList = p.actions_with_confirm_user[idx][this.actionName].list_entries
          }
        }
        this.type = "user"
        bypass = false
      } else if (p.actions_with_justification_phrase.indexOf(this.actionName) >= 0) {
        let idx = p.actions_with_justification_phrase.findIndex(p => p == this.actionName)
        --idx // the object is on the previous index
        if (p.actions_with_justification_phrase[idx][this.actionName].type) {
          this.justificationType = p.actions_with_justification_phrase[idx][this.actionName].type
          if (this.justificationType != "TEXT") {
            this.justificationList = p.actions_with_justification_phrase[idx][this.actionName].list_entries
          }  
        }
        this.type = "justification"
        bypass = false
      } else if (p.actions_with_action_confirm.indexOf(this.actionName) >= 0) {
        this.type = "confirm"
        bypass = false
      }
    })
    // bypass / no need creds process
    if (bypass) return true
  }  

  nextRequest() {
    //alert('nextRequest')
    let credArguments = {}
    if (this.userTxtFld) {credArguments.userToCheck=this.userTxtFld}
    if (this.pwd) {credArguments.spasswordToCheck=this.pwd.value}
    if (this.esg) {credArguments.esignPhraseToCheck=this.esg.value}
    if (this.jst) {credArguments.auditReasonPhrase=this.jst.value}
    // credArguments = {
    //   // ...this.reqParams,
    //   // finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
    //   // dbName: this.config.dbName,
    //   // actionName: this.actionName,
    //   //sampleId: this.objectId,
    //   userToCheck: this.userName,
    //   passwordToCheck: this.pwd ? this.pwd.value : "",
    //   esignPhraseToCheck: this.esg ? this.esg.value : "",
    //   auditReasonPhrase: this.jst ? this.jst.value: ""
    // }

    // Now here
    console.log('nextRequest', 'credArguments', credArguments)
    this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel, this.selectedItems[0], {}, credArguments)

    let cleanParams = {}
    Object.entries(this.reqParams).map(([key, value]) => {
      if (value != null || value != undefined) {
        cleanParams[key] = value
      }
    })
    this.reqParams = cleanParams
    if (this.credDialog) {
      this.credDialog.close()
    }
  }  

    }
}