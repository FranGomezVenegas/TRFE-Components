import {LitElement} from 'lit-element';
import {template} from './treenode.template';
import {styles} from './treenode.css';

export class TreeNode extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: {type: Object},
      specification: {type: Array},
      selectedItems: {type: Object},
      handleSelectItem: {type: Function},
      showChildren: {type: Boolean},
      level: {type: Number},
    };
  }

  constructor() {
    super();
    this.data = {};
    this.specification = [];
    this.selectedItems = [];
    this.showChildren = false;
    this.level = 0;
  }

  render() {
    return template({
      data: this.data,
      specification: this.specification,
      selectedItems: this.selectedItems,
      handleSelectItem: this.handleSelectItem,
      showChildren: this.showChildren,
      handleShowChildren: this._handleShowChildren,
      level: this.level,
    });
  }

  _handleShowChildren = () => {
    this.showChildren = !this.showChildren;
  };
}

window.customElements.define('tree-node', TreeNode);
