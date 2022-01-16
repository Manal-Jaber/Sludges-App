import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { data } from 'renderer/components/Types/index';

import './index.scss';

interface ContourDiagram {
  data: data;
}

const ContourDiagram: React.FC<ContourDiagram> = ({ data }) => {
  return (
    <div className="contour-diagram">
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            z: data.z,
            // x: [
            //   6.55, 8.1, 8.14, 8.8, 8.97, 9.15, 9.74, 10.29, 10.32, 10.96,
            //   11.04, 11.97, 12.22, 17.79, 18.78,
            // ],
            // y: [
            //   8.66, 8.99, 9.23, 9.32, 9.39, 9.66, 9.69, 9.93, 10.17, 10.24,
            //   10.26, 10.73, 11.05, 11.15, 11.3,
            // ],
            // z: [
            //   [0, 0, 0, 0, 10.47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 10.18, 0, 0, 0, 0, 0],
            //   [0, 5.85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 4.58, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.29],
            //   [0, 0, 0, 0, 0, 13.59, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [10.58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6.38, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 10.2, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 10.47, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 7.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9.79, 0, 0, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12.99, 0],
            //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12.93, 0, 0, 0, 0],
            //   [0, 0, 9.77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            // ],
            type: 'surface',
            zsmooth: 'best',
            mode: 'gauge+number+delta',
            marker: { color: 'red' },
            // contours: {
            //   z: {
            //     show:true,
            //     usecolormap: true,
            //     highlightcolor:"#42f462",
            //     project:{z: true}
            //   }
            // },
          },
        ]}
        layout={{
          title: 'A Fancy Plot',
          autosize: false,
          width: 350,
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
