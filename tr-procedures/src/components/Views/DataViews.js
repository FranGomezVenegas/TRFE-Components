import { html, css, nothing} from 'lit';
//import { columnBodyRenderer } from 'lit-vaadin-helpers';
//import { ApiFunctions } from '../Api/ApiFunctions';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import { AuditFunctions} from '../Audit/AuditFunctions';
import '../Audit/audit-dialog';

import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';
import { ProceduresModel } from '../../ProceduresModel';
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import {TrazitReactivateObjectsDialog} from '../GenericDialogs/TrazitReactivateObjectsDialog';
import {TrazitEnterResultWithSpec} from '../GenericDialogs/TrazitEnterResultWithSpec';
import {ModuleEnvMonitDialogsMicroorganism} from '../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism';
import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';
import { ModuleInstrumentsDialogs} from '../../module_instruments/ModuleInstrumentsDialogs'

import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';


export function DataViews(base) {
    return class extends TrazitCredentialsDialogs(AuditFunctions(ModuleInstrumentsDialogs(TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(TrazitReactivateObjectsDialog(TrazitGenericDialogs(ModuleEnvMonitClientMethods(AuditFunctions(ButtonsFunctions(base))))))))))) {

        kpiChartFran(elem){
            //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
            return html`
              ${elem.display_chart !==true ? nothing :
              html`        
                ${this.chartStyle(elem.chart_name)}    
                  <google-chart id="${elem.chart_name}" title="${elem.chart_title["label_"+this.lang]}" type="${elem.chart_type}" 
                    .data="${this.getChartData(elem)}" .options="${this.getChartOptions(elem)}"></google-chart>
            `} 
            `   
        }

        jsonViewer(elem, data = {}){
        console.log('jsonViewer', 'elem', elem, 'data', data, 'dataToDisplay', data[elem.endPointResponseObject])
        return html`
            ${elem===undefined||data===undefined ? nothing : html`
            <json-viewer>${JSON.stringify(data[elem.endPointResponseObject])}</json-viewer>       
            `}
        `   
        }     
        kpiReportTitle(elem){
            return html`    
             <h1 style="${this.kpiStyleByStringAttribute("h1", elem)}" id="reportTitle">${elem.title["label_"+this.lang]}<h1>
            `
        }             

        kpiRecoveryRate(){
            //console.log('kpiRecoveryRate', this.data.recoveryrate_datatable)
            return html`
              ${!this.data.recoveryrate_datatable||!this.data.recoveryrate_datatable.data ? 
                nothing : 
              html`
                <lit-datatable .data="${this.data.recoveryrate_datatable.data}" .conf="${this.data.recoveryrate_datatable.conf}"></lit-datatable>
              `}
            `
        }
        kpiGrid(elem, data = this.data){
            //console.log('kpiGrid', elem, "data", this.data[elem.elementName])
            var fldsToDisplay=[]
            for (var i=0;i<elem.fieldsToDisplay.length;i++){
              if (elem.fieldsToDisplay[i]["label_"+this.lang]!==undefined){
                elem.fieldsToDisplay[i].header=elem.fieldsToDisplay[i]["label_"+this.lang]
              }
            }
        
            return html`
              
              ${!data[elem.elementName]||!elem.fieldsToDisplay ? 
                nothing : 
              html`
                <lit-datatable .data="${data[elem.elementName]}" .conf="${elem.fieldsToDisplay}"></lit-datatable>
              `}
            `
        }
        readOnlyTable(elem, data) {
          //console.log(elem, data)
          return html`
          <style>
          .styled-table {
            display: -webkit-inline-box;
            margin-top: 0px;
            margin-bottom: 3px;
            color: #4285f4;
            font-size:2vmin;
            border-collapse: collapse;
            margin: 25px 0;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px #44cbe6;
          }            
          .styled-table thead tr {
            background-color: #2989d8;
            color: #ffffff;
            text-align: left;
          }   
          .styled-table th,
          .styled-table td {
            color: #032bbc; 
            padding: 12px 15px;
          }  
          .styled-table tbody tr {
            border-bottom: 1px solid #207cca;
          }
          .styled-table tbody tr:nth-of-type(even) {
            background-color: #c2f2ff5c;
          }
          .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
          }      
          .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
          }          
          </style>
            ${elem.title===undefined ? nothing : html`<h2>${elem.title["label_"+this.lang]}</h2>`}
            <table class="styled-table">
              <thead>          
                <tr>
                  ${elem.columns.map(fld =>
                    html`
                    <th>${fld["label_"+ this.lang]}</th>
                    `
                  )}                  
                </tr>
              </thead>
              <tbody>
              ${data===undefined ? nothing : 
              html`
                ${data.map(p => 
                  html`
                  <tr>
                    ${elem.columns.map(fld =>
                      html`
                        ${fld.name==='pretty_spec' ?
                        html `
                          <td>
                            <span style="color:green">${p["spec_text_green_area_"+ this.lang]}</span>
                            <span style="color:orange">${p["spec_text_yellow_area_"+ this.lang]}</span>
                            <span style="color:red">${p["spec_text_red_area_"+ this.lang]}</span>
                          </td>
                          `:
                        html`<td>
                        ${fld.fix_value_prefix!==undefined ? fld.fix_value_prefix : ''}${p[fld.name]}${fld.fix_value_suffix!==undefined ? fld.fix_value_suffix : ''}
                        ${fld.fix_value2_prefix!==undefined ? fld.fix_value2_prefix : ''}${fld.name2!==undefined ? p[fld.name2] : ''}${fld.fix_value2_suffix!==undefined ? fld.fix_value2_suffix : ''}
                        ${fld.fix_value3_prefix!==undefined ? fld.fix_value3_prefix : ''}${fld.name3!==undefined ? p[fld.name3] : ''}${fld.fix_value3_suffix!==undefined ? fld.fix_value3_suffix : ''}
                        </td>`
                      }
                      `
                    )}
                  </tr>
                  `
                )}
              `}
              </tbody>
            </table>
          `;
        }        
        kpiCardSomeElementsSingleObject(elem, data){
            return html`  
            ${this.kpiCardSomeElementsMain(elem, data[elem.endPointResponseObject])}
            ` 
        }
        cardSomeElementsRepititiveObjects(elem, data){
            console.log('cardSomeElementsRepititiveObjects', 'elem', elem, 'data', data)
            return html`  
            ${data[elem.endPointResponseObject].map(d => 
                html`
                ${this.kpiCardSomeElementsMain(elem, d)}
                `
            )}
            ` 
        }        
        kpiCardSomeElementsMain(elem, data){
            //console.log('kpiCardSomeElementsMain', 'elem', elem, 'data', data)
            return html`            
            ${data===undefined ? html`nothing to do` :
                html`
                ${elem.fieldsToDisplay.map(d =>                    
                    html`                    
                    <li>${this.fieldLabel(d)}: ${data[d.name]}</li>`
                )}
            `}`
        }
        fieldLabel(d){
            return d["label_"+this.lang]!==undefined ? d["label_"+this.lang] : d.name
            
        }
        dialogs(){
          return html`
          ${this.credentialsDialog()}
          ${this.genericFormDialog()}
    
          `
        }

        loadDialogs(){
          console.log('DataViews loadDialogs')
          return html`
          ${this.credentialsDialog()}
          ${this.genericFormDialog()}
          ${this.reactivateObjectsDialog()}
          ${this.moduleEnvMonitMicroorganismsDialogAdd()}
          ${this.moduleEnvMonitMicroorganismsDialogRemove()}
          ${this.pointTemplate()}
          ${this.resultTemplate()}
          ${this.investigationTemplate()}
          ${this.filterName=="open" ?
            html`${this.decisionTemplate()}` : nothing
          }  
          ${this.decisionTemplate()}
        `}


        kpiCard(elem, data=this.data, ){
          let myDataArr=[]
          if (Array.isArray(data)){
            myDataArr=data
          }else{
            myDataArr.push(data)
          }

            //console.log('kpiCard', 'elem', elem, 'data', this.data)
            return html`
              ${!data ? nothing :
              html`
              <style>
              li.cardelement{color: #032bbc;}
              .card {
                position: relative;
                display: inline-block;
                margin: 10px;
              }
              .ribbon {
                width: 0;
                height: 0;
                border-top: 50px solid #F44336;
                content: "";
              }
              <div class="ribbons"><p>New</p></div>
              .ribbon::before {
                width: 0;
                height: 0;
                border-left: 60px solid transparent;
                content: "";
              }
              
              .ribbon p {
                position: absolute;
                margin: 0;
                padding: 5px 15px;
                color: #fff;
                transform: rotate(45deg);
                background-color: #F44336;
                font-size: 14px;
                z-index:9;
              }
              </style>
              <div class="layout horizontal flex wrap">
                ${myDataArr.map(curData =>                
                  html`                
                  ${this.loadDialogs()}
                  <div class="card">
                  
                  <sp-card-ext heading="${elem.title["label_"+this.lang]===undefined ? '-' : elem.title["label_"+this.lang]}" 
                    subheading="${elem.subtitle["label_"+this.lang]===undefined ? '-' : elem.subtitle["label_"+this.lang]}">
                    <div slot="ribbon"></div>
                    <div slot="footer">
                    <div class="layout horizontal center flex wrap">${this.getButton(elem, curData)}</div>                  
                      ${elem.fieldsToDisplay.map(d =>
                        html`<li class="cardelement">
                        
                        ${d["label_"+this.lang]}: ${curData[d.field_name]}${d.fix_value_suffix!==undefined ? d.fix_value_suffix : ''}
                        ${d.fix_value2_prefix!==undefined ? d.fix_value2_prefix : ''}${d.name2!==undefined ? curData[d.field_name2] : ''}${d.fix_value2_suffix!==undefined ? d.fix_value2_suffix : ''}
                        ${d.fix_value3_prefix!==undefined ? d.fix_value3_prefix : ''}${d.name3!==undefined ? curData[d.field_name3] : ''}${d.fix_value3_suffix!==undefined ? d.fix_value3_suffix : ''}
                        
                        </li>`
                      )}
                    </div>                  
                  </sp-card-ext>
                </div>
                  <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
                  .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
                  .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
                  .viewModelFromProcModel=${this.viewModelFromProcModel}
                  .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>                
                  `
                  )}
              `}
              </div>
            `
        }
        kpiStyleByStringAttribute(elType, elem){
            var defaultOptions=""    
            if (elType = "title"){
              defaultOptions="width:300px;color:blue;"    
            }
            if (elType = "div"){
              defaultOptions="display:flex"    
            }
            let chartObj=this.shadowRoot.querySelector(elType+"#"+elem.elementName)    
            var chartOptions={}
            if (elem.style===undefined){
              return defaultOptions //"color:red;"
            } else {
              return elem.style
            }
            return 
        }
        kpiChartFran(elem){
            //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
            return html`
              ${elem.display_chart !==true ? nothing :
              html`        
                ${this.chartStyle(elem.chart_name)}    
                  <google-chart id="${elem.chart_name}" title="${elem.chart_title["label_"+this.lang]}" type="${elem.chart_type}" 
                    .data="${this.getChartData(elem)}" .options="${this.getChartOptions(elem)}"></google-chart>
              `} 
              `   
        }
        chartStyle(chartName){
            let chartObj=this.shadowRoot.querySelector("google-chart#"+chartName)    
            if (chartObj!==undefined&&chartObj!==null){
              chartObj.style.setProperty("width", "500px")
            }
            console.log('chartStyle', 'chartName', chartName, chartObj)
        }
          
        addNumericValue(rule, value){
            if (rule==undefined){return true;}
            if (value==undefined){return false;}
            if (rule.min_allowed!=undefined){if (value<=rule.min_allowed){return false;}}
            if (rule.min_allowed_included<undefined){if (value<rule.min_allowed_included){return false;}}
            if (rule.max_allowed!=undefined){if (value>=rule.max_allowed){return false;}}
            if (rule.max_allowed_included>undefined){if (value>rule.max_allowed_included){return false;}}
            if (rule.value!=undefined){if (rule.value==value){return false;}}
            return true;
        }
        getChartData(elem){
           // console.log('getChartData', elem, 'chartData', this.data[elem.chart_name])
            var chartData=[]
            chartData=[[elem.label_item, elem.label_value]]
            if (this.data[elem.chart_name]!==undefined){
              var dataForChart=this.data[elem.chart_name]
              for (var i = 0; i < dataForChart.length; i++) {
                if (!elem.grouper_exclude_items.includes(dataForChart[i][elem.grouper_field_name])){
                  if (this.addNumericValue(elem.counterLimits, dataForChart[i][elem.counter_field_name])){
                    var curchtval=[]
                    chartData.push([
                      this.labelPossibleReplacement(elem, dataForChart[i][elem.grouper_field_name]), 
                      dataForChart[i][elem.counter_field_name] 
                    ])
                  }
                }
              }
            }
            //console.log('getChartData', 'chartData', chartData)
            return chartData
        }
        labelPossibleReplacement(elem, labelValue){
            if (elem.label_values_replacement!==undefined){
              var fld=elem.label_values_replacement[labelValue]
              if (fld!==undefined){
                return fld["label_"+this.lang]
              }
              //console.log('labelPossibleReplacement', labelValue, 'fld', fld)
            }
            return labelValue
        }
        getChartOptions(elem){
            var defaultChartOptions={
              width:"300px",
              backgroundColor:"transparent",
              is3D:true
            }
            var chartOptions={}
            if (elem.chart_title!==undefined){    
              chartOptions.title=elem.chart_title["label_"+this.lang] 
            }
            if (elem.chartStyle===undefined){
              Object.entries(defaultChartOptions).map(([key, val]) => {
                //console.log(key, val)
                chartOptions[key]=val
              })      
            } else {
              Object.entries(elem.chartStyle).map(([key, val]) => {
                //console.log(key, val)
                chartOptions[key]=val
              })            
            }
            return chartOptions
        }
        
        kpiCharts(elem){
            return html`
            <datamining-google-chart-ext id="chart1" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></datamining-google-chart-ext>
          <datamining-google-chart-ext id="chart2" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></datamining-google-chart-ext>
            `
        }  

        EnvMonAirSampleBrowser() {
          if (this.data.sampleFieldToRetrieve===undefined)return html`` 
          let header = `Report for the `
          header += `sample ${this.data.sampleFieldToRetrieve.sample_id}`
          return html`${this.data.sampleFieldToRetrieve ? 
            html`
              <sp-card-ext heading="Report for the sample" subheading="${this.data.sampleFieldToRetrieve.sample_id}">
                <div slot="footer">
                  ${this.data.sampleFieldsToDisplay.map(d =>
                    html`<li>${d.field_name}: ${d.field_value}</li>`
                  )}
                </div>
              </sp-card-ext>
              <sp-card-ext heading="Stages" nonSubHeading>
                <div slot="footer" class="layout vertical">
                  ${this.data.stages.map(d =>
                    html`
                      ${this.stageTitle(d.current_stage)}
                      ${this.stageTimingCapture(d)}
                      <sp-card-ext heading="${d.current_stage}" ?nonSubHeading=${!d.started_on} subheading="${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}">
                        <div slot="footer">
                          ${d.current_stage == "Sampling" ?
                            html`
                              ${d.data.map(data => 
                                html`<li>${data.field_name}: ${data.field_value}</li>`
                              )}
                            ` :
                            html`${d.current_stage == "Incubation" ?
                              html`
                                ${d.data.map(data => 
                                  html`
                                    <sp-card-ext heading="Incubation 1" nonSubHeading>
                                      <div slot="footer">
                                        ${data.incubation_1.map(f =>
                                          html`${f.field_name ?
                                            html`<li>${f.field_name}: ${f.field_value}</li>` :
                                            nothing
                                          }`
                                        )}
                                      </div>
                                    </sp-card-ext>
                                    <sp-card-ext heading="Incubation 2" nonSubHeading>
                                      <div slot="footer">
                                        ${data.incubation_2.map(f =>
                                          html`${f.field_name ?
                                            html`<li>${f.field_name}: ${f.field_value}</li>` :
                                            nothing
                                          }`
                                        )}
                                      </div>
                                    </sp-card-ext>
                                  `
                                )}
                              ` :
                              html`${d.current_stage == "PlateReading" ?
                                html`
                                  ${d.data.map(data => 
                                    html`${data.field_name == "raw_value" ?
                                      html`<li>Number of Colonies: ${data.field_value}</li>` : nothing
                                    }`
                                  )}
                                ` :
                                html`${d.current_stage == "MicroorganismIdentification" ?
                                html`
                                  ${d.data.map(data =>                                      
                                    html`${data.field_name === "microorganism_count"||data.field_name === "microorganism_list" ?                       
                                      html`<li>${data.field_name}: ${data.field_value}</li>` : nothing}`
                                    
                                  )}
                                ` :
                                  html`
                                    ${d.data.map(data => 
                                      html`${data.field_name == "name" ?
                                        html`${data.field_name}: ${data.field_value}` : nothing
                                      }`
                                    )}
                                  `                            
                                }`
                              }`
                            }`
                          }
                        </div>
                        ${d.current_stage == "Sampling" ?
                          html`<mwc-icon slot="actions" title="Open" placement="bottom-end" 
                            ?hidden=${this.data.sampleFieldToRetrieve.current_stage=="END"}
                            @click=${this.openSample}>file_open</mwc-icon>` :
                          nothing
                        }
                      </sp-card-ext>
                    `
                  )}
                </div>
              </sp-card-ext>
            ` : 
              html`Sample ID: ${data.sample_id}`      
          }`
        }
        EnvMonAirSampleReportTitle(){
          return 'Report for the sample '+this.data.buttonActionInfo.objectId
        }
        EnvMonAirSampleReportContent() {
          let strContent = `<h2>Summary</h2>`
          this.data.sampleFieldsToDisplay.forEach(d => {
            strContent += `<li>${d.field_name}: ${d.field_value}</li>`
          })
          strContent += `<h2>Stages</h2>`
          this.data.stages.forEach(d => {
            strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`
            if (d.current_stage == "Sampling") {
              d.data.forEach(data => {
                strContent += `Sampling Date: ${data.sampling_date}`
              })
            } else if (d.current_stage == "Incubation") {
              d.data.forEach(data => {
                strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`
                strContent += `<td>`
                data.incubation_1.forEach(f => {
                  if (f.field_name) {
                    strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                  }
                })
                strContent += `</td><td>`
                data.incubation_2.forEach(f => {
                  if (f.field_name) {
                    strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                  }
                })
                strContent += `</td></tr></table>`
              })
            } else if (d.current_stage == "PlateReading") {
              d.data.forEach(data => {
                if (data.field_name == "raw_value") {
                  strContent += `Number of Colonies: ${data.field_value}`
                }
              })
            } else if (d.current_stage == "MicroorganismIdentification") {
              d.data.forEach(data => {
                if (data.field_name == "microorganism_list") {
                  strContent += `Colonies Identified: ${data.field_value}`
                }
              })              
            } else {
              d.data.forEach(data => {
                strContent += `<li>${data.name}: ${data.items}</li>`
              })
            }
            strContent += `</td></tr></table>`
          })
          return strContent
        } 

        EnvMonAirIncubatorBrowser() {
          return html`${this.data.incubatorFieldToRetrieve ? 
            html`
              <div class="layout horizontal flex wrap">
                <sp-card-ext heading="Report for the incubator" subheading="${this.data.incubatorFieldToRetrieve.name}">
                  <div slot="footer">
                    ${this.data.incubatorFieldsToDisplay.map(d =>
                      html`<li>${d.field_name}: ${d.field_value}</li>`
                    )}
                  </div>
                </sp-card-ext>
                <google-chart-ext id="chart1" 
                  @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
                    detail: { imgUri: e.target.imageURI }
                  }))} 
                  style="margin: 5px 5px 30px 8px" 
                  type="line" 
                  options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
              </div>
            ` : nothing
          }`
        }
      
        EnvMonAirBatchBrowser() {
          return html`${this.data.batchFieldToRetrieve ? 
            html`
              <div class="layout horizontal flex wrap">
                <sp-card-ext heading="Report for the batch" subheading="${this.data.batchFieldToRetrieve.name}">
                  <div slot="footer">
                    ${this.data.batchFieldsToDisplay.map(d =>
                      html`<li>${d.field_name}: ${d.field_value}</li>`
                    )}
                  </div>
                </sp-card-ext>
                <google-chart-ext id="chart1" 
                  @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
                    detail: { imgUri: e.target.imageURI }
                  }))} 
                  style="margin: 5px 5px 30px 8px" 
                  type="line" 
                  options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
              </div>
              <sp-card-ext heading="Batch Content (${this.data.NUM_SAMPLES} samples)" nonSubHeading>
                <div slot="footer" class="layout horizontal flex wrap">
                  ${this.data.SAMPLES_ARRAY.map((d,i) =>
                    html`${d.sample_id}${i<this.data.SAMPLES_ARRAY.length-1 ? ', ' : ''}`
                  )}
                </div>
              </sp-card-ext>
            ` : nothing
          }`
        }
      
        EnvMonProductionLotBrowser() {
          return html`${this.data.prodLotFieldToRetrieve ? 
            html`
              <div class="layout horizontal flex wrap">
                <sp-card-ext heading="Report for the production lot" subheading="${this.data.prodLotFieldToRetrieve.name}">
                  <div slot="footer">
                    ${this.data.prodLotFieldsToDisplay.map(d =>
                      html`<li>${d.field_name}: ${d.field_value}</li>`
                    )}
                  </div>
                </sp-card-ext>
                <google-chart-ext id="chart1" 
                  @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
                    detail: { imgUri: e.target.imageURI }
                  }))} 
                  style="margin: 5px 5px 30px 8px" 
                  type="line" 
                  options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
                <google-chart-ext id="chart2" 
                  @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
                    detail: { imgUri: e.target.imageURI }
                  }))} 
                  style="margin: 5px 5px 30px 8px" 
                  type="line" 
                  options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
              </div>
              <div class="layout horizontal flex center-justified">
                <mwc-button label='Download Sample' @click=${this.downloadSample}></mwc-button>
              </div>
            ` : nothing
          }`
        }
      
        stageTitle(currentStage){
          return html`
            <h1>${currentStage}</h1>
          `
        }
        stageTimingCapture(stageData){
          return html`
            <h3>${stageData.started_on} --> ${stageData.ended_on}</h3>
          `
        } 
      
        EnvMonAirIncubatorReportContent(strContent) {

          if (this.data.incubatorFieldsToDisplay) {
            this.data.incubatorFieldsToDisplay.forEach(d => {
              strContent += `<li>${d.field_name}: ${d.field_value}</li>`
            })
            //strContent += this.incubatorChartContent()
          }
          return strContent
        }
        chartContent() {
          let imgs = `` // ${this.kpiStyleByStringAttribute("div", undefined)}
          this.chartImgs.forEach(img => {
            imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`
          })
          return imgs
        }        
        incubatorContentTitle(){
          return 'Report for the incubator '+this.data.incubatorFieldToRetrieve.name
        }

      
        EnvMonAirBatchReportContent(strContent) {
          if (this.sampleData.batchFieldsToDisplay) {
            this.sampleData.batchFieldsToDisplay.forEach(d => {
              strContent += `<li>${d.field_name}: ${d.field_value}</li>`
            })
            strContent += this.chartContent()
            let batches = this.sampleData.SAMPLES_ARRAY.map(d => d.sample_id)
            strContent += `<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${this.sampleData.NUM_SAMPLES} samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`
          }
          return strContent
        }
      
        EnvMonProductionLotReportContent(strContent) {
          if (this.data.prodLotFieldsToDisplay) {
            this.data.prodLotFieldsToDisplay.forEach(d => {
              strContent += `<li>${d.field_name}: ${d.field_value}</li>`
            })
            strContent += this.chartContent()
            strContent += `<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">`
            strContent += `<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>`
            this.data.sample.forEach(s => {
              if (s.spec_code) {
                strContent += `<tr><td>${s.sample_id}</td><td>${s.sampling_date}</td><td>${s.sampling_date_end}</td><td>${s.raw_value?s.raw_value:''}</td></tr>`
              }
            })
            strContent += `</table>`  
          }
          return strContent
        }  
        EnvMonProductionLotReportTitle(){
          return 'Report for the Production Lot '+this.data.prodLotFieldToRetrieve.lot_name
        }


        sampleContent(strContent) {
          if (this.data.sampleFieldsToDisplay && this.activeTab.label_en == "Sample") {
            this.data.sampleFieldsToDisplay.forEach(d => {
              strContent += `<li>${d.field_name}: ${d.field_value}</li>`
            })
            strContent += `<h2>Stages</h2>`
            this.data.stages.forEach(d => {
              strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`
              if (d.current_stage == "Sampling") {
                d.data.forEach(data => {
                  strContent += `Sampling Date: ${data.sampling_date}`
                })
              } else if (d.current_stage == "Incubation") {
                d.data.forEach(data => {
                  strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`
                  strContent += `<td>`
                  data.incubation_1.forEach(f => {
                    if (f.field_name) {
                      strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                    }
                  })
                  strContent += `</td><td>`
                  data.incubation_2.forEach(f => {
                    if (f.field_name) {
                      strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                    }
                  })
                  strContent += `</td></tr></table>`
                })
              } else if (d.current_stage == "PlateReading") {
                d.data.forEach(data => {
                  if (data.field_name == "raw_value") {
                    strContent += `Number of Colonies: ${data.field_value}`
                  }
                })
              } else {
                d.data.forEach(data => {
                  strContent += `<li>${data.name}: ${data.items}</li>`
                })
              }
              strContent += `</td></tr></table>`
            })
          }
          return strContent
        } 
        
        get audit() {return this.shadowRoot.querySelector("audit-dialog")}          
    }
}