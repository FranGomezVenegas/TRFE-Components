import {html} from 'lit-element';
import '../treenode';
import '@vaadin/accordion';


export const template = (props) => {
  const {data, specification, level, selectedItems, handleSelectItem, value, handleItemSelected} = props;


  
  return html`
    
      ${data.map((node) => {
        return html`
          <tree-node
            .data=${node}
            .specification=${specification}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .level=${level}
            value=${value}
          ></tree-node>
        `;
      })}
  `;
};
