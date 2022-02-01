import React, { useState } from 'react';
import ContourDiagram from '../ContourDiagram';
import SurfacePlot from '../SurfacePlot';
import Tab from '../Tab';
import Volume from '../Volume';
import { Point, data } from 'renderer/components/Types/index';
import './index.scss';

interface RightMainSide {
  data: data;
}

const RightMainSide: React.FC<RightMainSide> = ({ data }) => {
  let zTemp = data.zData.map(({ zValue }) => zValue);
  const tabs = ['3D Surface Plot', 'Contour Diagram', 'Volume'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = (data: data) => {
    if (selectedIndex === 0) {
      return <SurfacePlot data={data} />;
    } else if (selectedIndex === 1) {
      return <ContourDiagram data={data} />;
    } else {
      return <Volume z={zTemp} />;
    }
  };

  return (
    <div className="right-main-side">
      <Tab
        tabs={tabs}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {renderedComponent(data)}
    </div>
  );
};

export default RightMainSide;
