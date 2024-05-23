import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }

  .label {
    cursor: pointer;
  }

  .label:hover {
    color: blue;
  }

  .hasChildren.opened::before {
    content: "-"
  }

  .hasChildren.closed::before {
    content: "+"
  }

  .selected {
    color: red;
  }



    vaadin-accordion-panel {
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
    }    

    vaadin-accordion-heading {
      background-color: #f7f7f7;
      border-bottom: 1px solid #ddd;
      padding: 10px;
      font-weight: bold;
      font-size: 16px;
      color: #333;
    }

    vaadin-accordion-panel[expanded]::part(summary) {
      background-color: #e0e0e0;
    }

    vaadin-accordion-panel::part(content) {
      padding: 10px;
      background-color: #fff;
    }

    vaadin-vertical-layout {
      padding: 10px;
    }

    vaadin-accordion-panel ul {
      width:100%;
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
`