import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

import './index.scss';

interface SurfacePlot {}

const SurfacePlot: React.FC<SurfacePlot> = () => {
  return (
    <div className="surface-plot">
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 3, 1, 3],
            z: [1, 2, 3],
            type: 'surface',
            mode: 'gauge+number+delta',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          title: 'A Fancy Plot',
          autosize: false,
          width: 320,
          height: 240,
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
