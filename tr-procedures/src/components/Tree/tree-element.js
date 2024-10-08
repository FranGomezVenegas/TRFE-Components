import { LitElement, html, css } from 'lit';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { TreeFunctions } from './tree-functions';
import { DialogsFeatures } from '../GenericDialogs/CommonFunctions/DialogsFeatures';
import { BuildLabelsFunctions } from '../../0TRAZiT-Paradigm/BuildLabels';
class TreeElement extends BuildLabelsFunctions(TreeFunctions(DialogsFeatures(LitElement))) {
  static get properties() {
    return {
      data: { type: Array },
      specification: { type: Object },
      selectedItems: { type: Object },
      showChildren: { type: Object },
      value: { type: String },
      label: { type: String },
      expanded:{type: Boolean},
      lang: { type: String },
      config: { type: Object },
      labelWhenNoSelection: { type: Object },
    };
  }

  constructor() {
    super();
    this.data = [];
    this.config = {};
    this.specification = {};
    this.selectedItems = {};
    this.showChildren = {};
    this.expanded=false
    this.value = '';
    this.label = 'Select an item';
    this.labelWhenNoSelection ={
      label_en:'Select an item',
      label_es:'Selecciona valor'
    }
    
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        color: rgba(49, 130, 189, 1);
      }

      .main {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 56px;
      }

      .label {
        position: absolute;
        top: 0px;
        left: 18px;
        font-size: 12px;
        color: #999;
        transition: 0.2s ease all;
        pointer-events: none;
      }

      .label.selected {
        color: #24c0eb;
      }

      .value {
        display: flex;
        align-items: center;
        padding: 6px;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
        background-color: #fff;
        height: 56px;
        font-family: 'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        color: rgba(49, 130, 189, 1);
      }
      .list-item-label{
        font-family: 'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        color: rgba(49, 130, 189, 1);
      }
      .value.selected {
        border-color: #24c0eb;
      }

      .dropdown {
        display: none;
        position: absolute;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        max-height: 300px;
        overflow-y: auto;
        background-color: #fff;
        z-index: 1;
      }

      .dropdown.show {
        display: block;
      }

      mwc-list-item {
        display: flex;
        align-items: center;
        padding: 4px 16px;
        transition: height 0.3s;
      }

      .icon-left {
        margin-right: 8px;
        --mdc-icon-size: 16px;
      }

      .clear-icon {
        margin-left: auto;
        cursor: pointer;
        --mdc-icon-size: 20px;
      }

      .accordion-details {
        flex-wrap: wrap;
        gap: 4px;
        padding: 4px 0;
      }

      .expanded {
        height: auto;
      }

      .collapsed {
        height: 32px;
      }

      .accordion-details > mwc-list-item {
        /*flex: 1 1 calc(33.333% - 8px); */ /* Ajustar el porcentaje para controlar el número de elementos por fila */
      }

      .selected-text {
        color: #24c0eb;
      }
    `;
  }

  handleToggleDropdown(e) {
    e.stopPropagation();
    this.showChildren = !this.showChildren;
    this.expanded=true
    this.requestUpdate();
  }

  handleSelectItem(item, specification, e) {
    console.log('value', item[specification.key], 'item', item, specification)
    this.value = item[specification.key];
    e.stopPropagation();
    this.label = item[specification.key];
    this.showChildren = false;

    this.requestUpdate();
  }

  handleToggleChildren(key, event) {
    event.stopPropagation();
    this.showChildren = { ...this.showChildren, [key]: !this.showChildren[key] };
    this.requestUpdate();
  }
  setClosed() {
    this.expanded = false;
    this.requestUpdate();
  }

  handleClearSelection(event) {
    event.stopPropagation();
    this.value = '';
    this.label = this.labelWhenNoSelection["label_"+this.lang];
    this.selectedItems = {};
    this.requestUpdate();
  }

  renderItem(data, specification, level = 0) {
    const childrenKey = specification.children;
    const children = data[childrenKey];
    const key = data[specification.key];
    //const label = data[specification.label] || data[specification.key];
    const label = this.buildLabel(this.lang, specification, data) || data[specification.key];
    const hasChildren = children && children.length > 0;
    const isSelected = this.value === key;
    const isExpanded = this.showChildren[key];

    return html`
      <mwc-list-item
        class="${isExpanded ? 'expanded' : 'collapsed'}"
        graphic="icon"
        .twoline=${hasChildren}
        .hasMeta=${hasChildren}
      >
        ${hasChildren
          ? html`
              <mwc-icon-button
                class="icon-left"
                slot="graphic"
                icon="chevron_right"
                @click=${(e) => this.handleToggleChildren(key, e)}
              ></mwc-icon-button>
            `
          : ''}
        <span
          class="list-item-label ${isSelected ? 'selected-text' : ''}"
          @click=${(e) => this.handleSelectItem(data, specification, e)}
        >
          ${label}
        </span>
        ${isExpanded && hasChildren
          ? html`
              <div class="accordion-details">
                ${children.map((child) => this.renderItem(child, specification.children_definition, level + 1))}
              </div>
            `
          : ''}
      </mwc-list-item>
    `;
  }

  render() {
    const hasValue = !!this.value;
    const selectedItem = this.findSelectedItem(this.data, this.specification, this.value);
    const selectedLabel = selectedItem ? this.buildLabel(this.lang, this.specification, this.data) || selectedItem[this.specification.key] : '';        
    let fieldLabel = this.fieldLabel(this.config)
    if (fieldLabel===undefined){
      fieldLabel="Select an item"
    }
    this.data=this.treeListEntries(this.config, this.data)
    return html`
      <div class="main">
        <div class="value ${hasValue ? 'selected' : ''}" @click=${this.handleToggleDropdown}>
          ${selectedLabel || this.label}
          ${hasValue
            ? html`
                <mwc-icon-button
                  class="clear-icon"
                  icon="clear"
                  @click=${this.handleClearSelection}
                ></mwc-icon-button>
              `
            : ''}
        </div>
        <div class="label ${hasValue ? 'selected' : ''}">${fieldLabel}</div>
        ${this.expanded?html`
          <div class="dropdown ${this.showChildren ? 'show' : ''}">
            <mwc-list>
              ${this.data.map((item) => this.renderItem(item, this.specification))}
            </mwc-list>
          </div>
        `:html``}
      </div>
    `;
  }

  findSelectedItem(data, specification, value) {
    for (const item of data) {
      if (item[specification.key] === value) {
        return item;
      }
      const childrenKey = specification.children;
      const children = item[childrenKey];
      if (children && children.length > 0) {
        const childItem = this.findSelectedItem(children, specification.children_definition, value);
        if (childItem) {
          return childItem;
        }
      }
    }
    return null;
  }
}

customElements.define('tree-element', TreeElement);
