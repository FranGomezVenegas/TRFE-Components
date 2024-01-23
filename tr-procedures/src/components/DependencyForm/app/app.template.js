import { html } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-textfield";
import "@material/mwc-switch";
import "@material/mwc-list/mwc-list-item";

import { elementTypes } from "../config";

export const template = (props) => {
  let items = [];
  items = sessionStorage.getItem('actionName') == "SCRIPT_UPDATE_STEP" ? props.endpoints.find((item) => item.keyName == JSON.parse(sessionStorage.getItem('rowSelectedData')).action_name)?.arguments_array : props.params;
  console.log("afdsafdsafsdasdf", props.endpoints, 'items', items);
  return html`
    <div class="container">
      <form id="#endpoint-form" action="/" method="get">
        <div class="item-container">
          <mwc-select
            required
            fixedMenuPosition
            @change=${props.handleChangeEndpoint}
            id="endpoint"
            name="endpoint"
            label="endpoint"
            value=${props!==undefined&&props.rowSelectedData!==null&&props.rowSelectedData!==undefined&&props.rowSelectedData.action_name!==undefined?
              props.rowSelectedData.action_name:''}
          >
           ${ props.endpoints.map((endpoint, idx) => 
                endpoint.keyName != props.rowSelectedData?.action_name ?
                html `                
                  <mwc-list-item value=${endpoint.keyName}>
                    ${endpoint.keyName}
                  </mwc-list-item>
                ` : 
                html `                
                  <mwc-list-item value=${props.rowSelectedData.action_name}>
                    ${props.rowSelectedData.action_name}
                  </mwc-list-item>
                `
              )
            }
          </mwc-select>
        </div>

        <div class="form-fields">
          ${
            items.map((param, idx) => {
            const required = param["is_mandatory?"];
            const str = html`<mwc-switch
                name=${param.name}
                @click=${props.toggleChanged(param.name)}
              />`;
            const new_category =
              param.name == "category" ? html`<mwc-select></mwc-select>` : ``;
            if ((param.type === elementTypes.Number) || (param.type === elementTypes.Integer) ) {
              return html`
                <mwc-textfield
                  ?required=${required}
                  outlined
                  type="number"
                  label=${param.name}
                  name=${param.name}
                  @blur=${props.checkValidity}
                  value=3
                ></mwc-textfield>
              `;
            } else if ((param.type === elementTypes.Text) || (param.type === elementTypes.TextArr) || (param.type === elementTypes.TextObjectsArr) ) {
              let arg = "argument_0" + (idx + 1);
              return html`
                <mwc-formfield>
                  ${str}
                  ${props.toggles[param.name]
                    ? html`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Step"}
                          name=${param.name + "_step"}
                          style="width: 100%"
                          @change=${props.handleChangeStep(param.name)}
                        ></mwc-textfield>
                         <mwc-textfield
                            type="text"
                            ?required=${required}
                            label=${"Object Type"}
                            name=${param.name + "_object_posic"}
                            style="width: 100%"
                            value=${props.objectTypes}
                          ></mwc-textfield>                       
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Object Posic"}
                          name=${param.name + "_object_posic"}
                          style="width: 100%"
                          defaultValue=${1}
                        ></mwc-textfield>
                      `
                    :
                    html `
                    <mwc-textfield
                      ?required=${required}
                      type="text"
                      label=${param.name}
                      name=${param.name}
                      @blur=${props.checkValidity}
                      value=${sessionStorage.getItem('actionName') == "SCRIPT_UPDATE_STEP" ? props.rowSelectedData && props.rowSelectedData[arg] ? props.rowSelectedData[arg] : "" : ""}
                      style="width: 100%"
                    ></mwc-textfield> ` }
                </mwc-formfield>
              `;
            } else if (param.type === elementTypes.TextArr2) {
              console.log("elementTypes.TextArr2");
              return html`
                <mwc-formfield>
                  ${str}
                  ${props.toggles[param.name]
                    ? html`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Step"}
                          name=${param.name + "_step"}
                          style="width: 100%"
                          @change=${props.handleChangeStep(param.name)}
                        ></mwc-textfield>
                        ${props.objectTypes.length > 0 ? 
                          html`
                         <mwc-select
                          required
                          fixedMenuPosition
                          id="objectType"
                          name=${param.name + "_object_type"}
                          label="objectType"
                        >
                          ${props.objectTypes.map((objectType, idx) => {
                            return html`
                              <mwc-list-item value=${objectType}>
                                ${objectType}
                              </mwc-list-item>
                            `;
                          })}
                          </mwc-select>
                          ` : html ` <mwc-textfield
                                type="text"
                                ?required=${required}
                                label=${"Object Type"}
                                name=${param.name + "_object_posic"}
                                style="width: 100%"
                                value=${props.objectTypes}
                              ></mwc-textfield>`
                        }
                       
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Object Posic"}
                          name=${param.name + "_object_posic"}
                          style="width: 100%"
                          defaultValue=${1}
                        ></mwc-textfield>
                      `
                    : html`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${param.name}
                          name=${param.name}
                          @blur=${props.checkValidity}
                          style="width: 100%"
                        ></mwc-textfield>
                      `}
                </mwc-formfield>
              `;
            }
            return html`${param.type}`;
            })
          }
          <mwc-formfield label="Expected successful?">
            <mwc-checkbox name="expectedSyntaxis"></mwc-checkbox>
          </mwc-formfield>
          <mwc-select
            fixedMenuPosition
            id="notification"
            name="notification"
            label="notification"
          >
            ${props.notifications.map((notif, idx) => {
              return html`
                <mwc-list-item value=${notif.keyName}>
                  ${notif["keyValue_" + props.lang]}
                </mwc-list-item>
              `;
            })}
          </mwc-select>
        </div>
      </form>
    </div>
  `;
};
