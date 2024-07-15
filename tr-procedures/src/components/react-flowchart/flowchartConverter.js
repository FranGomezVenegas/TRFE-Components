import MyDiagramComponent from './reactFlowchart.jsx';
import r2wc from "@r2wc/react-to-web-component";

const MyDiagramWebComponent = r2wc(MyDiagramComponent);
customElements.define('my-diagram', MyDiagramWebComponent);
