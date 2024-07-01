import { css } from 'lit-element';

export const styles = css`
  :host {
    display: block;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    --accordion-background: #ffffff;
    --accordion-hover-background: #f0f0f0;
    --accordion-border-color: #e0e0e0;
    --accordion-selected-color: #e0e0e0; /* Classic selected background color */
    --accordion-summary-color: #333;
    --accordion-icon-color: #24c0eb; /* Sky blue color for expand icon */
  }

  .accordion {
    border: 1px solid var(--accordion-border-color);
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: var(--accordion-background);
  }

  .accordion-item {
    border-bottom: 1px solid var(--accordion-border-color);
    transition: background-color 0.3s, color 0.3s;
  }

  .accordion-item:last-child {
    border-bottom: none;
  }

  .accordion-summary {
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: var(--accordion-background);
    color: var(--accordion-summary-color);
    transition: background-color 0.3s, color 0.3s;
  }

  .accordion-summary:hover {
    background-color: var(--accordion-hover-background);
  }

  .accordion.selected .accordion-summary {
    background-color: var(--accordion-selected-color);
    color: var(--accordion-summary-color);
  }

  .accordion-label {
    font-size: 16px;
    font-weight: 500;
  }

  .accordion-icon {
    --mdc-icon-button-size: 24px;
    color: var(--accordion-icon-color);
  }

  .accordion-details {
    padding: 10px 16px;
    background-color: var(--accordion-background);
  }

  ul {
    padding-left: 20px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    padding: 5px 0;
  }

  ul li:hover {
    background-color: #f0f0f0;
  }

  tree-view {
    display: block;
  }
`;
