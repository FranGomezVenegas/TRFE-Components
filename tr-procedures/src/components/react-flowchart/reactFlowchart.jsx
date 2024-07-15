import React, { useEffect } from 'react';
import createEngine, {
    DefaultNodeModel,
    DiagramModel,
    DefaultLinkModel,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

const MyDiagramComponent = () => {
    useEffect(() => {
        const engine = createEngine();

        const model = new DiagramModel();

        const node1 = new DefaultNodeModel({
            name: 'Node 1',
            color: 'rgb(0,192,255)',
        });
        node1.setPosition(100, 100);
        const port1 = node1.addOutPort('Out');

        const node2 = new DefaultNodeModel({
            name: 'Node 2',
            color: 'rgb(192,255,0)',
        });
        node2.setPosition(400, 100);
        const port2 = node2.addInPort('In');

        const link = port1.link(port2);
        link.addLabel('Hello World!');

        model.addAll(node1, node2, link);

        engine.setModel(model);

        const diagramDiv = document.getElementById('react-diagram-container');
        diagramDiv.innerHTML = '';
        diagramDiv.appendChild(<CanvasWidget engine={engine} />);
    }, []);

    return <div id="react-diagram-container" style={{ height: '100%', width: '100%' }}></div>
};

export default MyDiagramComponent;
    