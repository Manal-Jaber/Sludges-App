import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

import './index.scss';

interface ContourDiagram {}

const ContourDiagram: React.FC<ContourDiagram> = () => {
  // To remove the plottly library link
  useEffect(() => {
    const plotlyElement = document.getElementsByClassName(
      'modebar-btn plotlyjsicon'
    )[0];
    if (plotlyElement) {
      plotlyElement.remove();
    }
  }, []);

  return (
    <div className="contour-diagram">
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 3, 1, 3],
            z: [1, 2, 3],
            type: 'contour',
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

export default ContourDiagram;
