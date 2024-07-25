import { html } from 'lit';
import { styles } from './styles.js';

const getFieldPosition = (node, field) => {
  const [nodeX, nodeY] = node.loc.split(' ').map(Number);
  const fieldIndex = node.fields.findIndex(f => f.name === field.name);
  const fieldX = nodeX + 75; // Adjust offset to center of field
  const fieldY = nodeY + 30 + 30 * fieldIndex; // Adjust offset
  return { x: fieldX, y: fieldY };
};

export const template = (nodeDataArray, links) => html`
  <style>
    ${styles}
  </style>
  <div class="table-container">
    ${nodeDataArray.map(node => html`
      <div class="table" style="left: ${node.loc.split(' ')[0]}px; top: ${node.loc.split(' ')[1]}px;">
        <h3>${node.key}</h3>
        ${node.fields.map(field => html`
          <div class="field" style="background-color: ${field.color};">
            ${field.name}: ${field.info}
          </div>
        `)}
      </div>
    `)}
    
    <svg class="connections" viewBox="0 0 600 600">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" fill="#000">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      ${links.map(link => {
        const fromNode = nodeDataArray.find(node => node.key === link.from.key);
        const toNode = nodeDataArray.find(node => node.key === link.to.key);
        if (!fromNode || !toNode) return '';

        const fromField = fromNode.fields.find(field => field.name === link.from.field);
        const toField = toNode.fields.find(field => field.name === link.to.field);
        if (!fromField || !toField) return '';

        // Calculate exact positions of field centers
        const fromX = parseInt(fromNode.loc.split(' ')[0]) + 75; // Center horizontally
        const fromY = parseInt(fromNode.loc.split(' ')[1]) + 30 + 30 * fromNode.fields.indexOf(fromField);
        const toX = parseInt(toNode.loc.split(' ')[0]) + 75; // Center horizontally
        const toY = parseInt(toNode.loc.split(' ')[1]) + 30 + 30 * toNode.fields.indexOf(toField);

        return html`
          <line class="line" x1="${fromX}" y1="${fromY}" x2="${toX}" y2="${toY}" marker-end="url(#arrowhead)"></line>
        `;
      })}
      <line class="line" x1="175" y1="130" x2="425" y2="330" marker-end="url(#arrowhead)"></line>
    </svg>
  </div>
`;
