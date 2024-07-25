export const styles = `
  .table-container {
    position: relative;
    width: 600px;
    height: 600px;
  }

  .table {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: inline-block;
    position: absolute;
  }

  .table h3 {
    margin: 0;
    font-size: 1.2em;
    color: #333;
  }

  .field {
    padding: 5px;
    margin: 5px 0;
    border-radius: 4px;
    color: #fff;
  }
  
  .connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Ensure the SVG is on top */
  }

  .line {
    stroke-width: 2;
    stroke: #000;
    marker-end: url(#arrowhead);
  }
`;
