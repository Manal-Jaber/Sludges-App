import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { data } from 'renderer/components/Types/index';

import './index.scss';

interface ContourDiagram {
  data: data;
}

const ContourDiagram: React.FC<ContourDiagram> = ({ data }) => {
  // Listeners
  const onTitleChange = (e: any) => {
    e.target.id === 'diagramTitle' && setDiagramTitle(e.target.value);
  };

  // React states
  const [diagramTitle, setDiagramTitle] = useState('');

  return (
    <div className="contour-diagram">
      <div className="input-control">
        <input
          placeholder="Contour Diagram Title"
          id="diagramTitle"
          value={diagramTitle}
          onChange={onTitleChange}
        />
      </div>
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            z: data.z,
            labels: data.name,
            hoverlabel: {
              align: 'auto',
              bgcolor: 'green',
            },
            type: 'surface',
            mode: 'gauge+number+delta',
            marker: { color: 'red' },
            // hidesurface: true,
            // lighting: {
            //   roughness: 0.1,
            // },
            contours: {
              z: {
                show: true,
                usecolormap: true,
                highlightcolor: '#42f462',
                project: { z: true },
              },
            },
          },
        ]}
        layout={{
          title: diagramTitle,
          autosize: false,
          width: 450,
          height: 410,
          margin: {
            l: 65,
            r: 50,
            b: 65,
            t: 90,
          },
        }}
      />
    </div>
  );
};

export default ContourDiagram;
