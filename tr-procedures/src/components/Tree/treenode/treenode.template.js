import { html } from 'lit-element';
import '@material/mwc-icon-button';

export const template = (props) => {
  const {
    data,
    specification,
    selectedItems,
    handleSelectItem,
    showChildren,
    handleShowChildren,
    level,
    handleClickItem
  } = props;

  const children = data[specification[level].children];
  const key = data[specification[level].key];
  const label = data[specification[level].label];
  const hasChildren = children && children.length > 0;
  const isSelected = selectedItems[key];

  const handleShowChildrenItem = (event) => {
    event.stopPropagation();
    handleShowChildren();
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('item', JSON.stringify(data));
  };

  return html`
    <div class="accordion ${isSelected ? 'selected' : ''}">
      <div class="accordion-item">
        <div class="accordion-summary" @click=${handleShowChildrenItem} @dragstart=${handleDragStart} draggable="true">
          <span class="accordion-label">${label}</span>
          ${hasChildren
            ? html`<mwc-icon-button class="accordion-icon" icon="${showChildren ? 'expand_less' : 'expand_more'}"></mwc-icon-button>`
            : ''}
        </div>
        ${showChildren && children
          ? html`
            <div class="accordion-details">
              <ul>
                <tree-view
                  .data=${children}
                  .selectedItems=${selectedItems}
                  .handleSelectItem=${handleSelectItem}
                  .specification=${specification}
                  .level=${level + 1}
                ></tree-view>
              </ul>
            </div>
          `
          : ''}
      </div>
    </div>
  `;
};
