import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { data } from 'renderer/components/Types/index';

import './index.scss';

interface SurfacePlot {
  data: data;
}

const SurfacePlot: React.FC<SurfacePlot> = ({ data }) => {
  // Listeners
  const onTitleChange = (e: any) => {
    e.target.id === 'diagramTitle' && setDiagramTitle(e.target.value);
  };

  // React states
  const [diagramTitle, setDiagramTitle] = useState('');

  return (
    <div className="surface-plot">
      <div className="input-control">
        <input
          placeholder="3D Surface Plot Title"
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
            type: 'surface',
            zsmooth: 'best',
            labels: data.name,
            // colorscale: 'Viridis',
            mode: 'gauge+number+delta',
            marker: { color: 'red' },
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

export default SurfacePlot;
