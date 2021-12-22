import React, { useState } from 'react';
import ContourDiagram from '../ContourDiagram';
import SurfacePlot from '../SurfacePlot';
import Tab from '../Tab';
import Volume from '../Volume';
import './index.scss';

interface RightMainSide {}

const RightMainSide: React.FC<RightMainSide> = () => {
  const tabs = ['3D Surface Plot', 'Contour Diagram', 'Volume'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = () => {
    if (selectedIndex === 0) {
      return <SurfacePlot />;
    } else if (selectedIndex === 1) {
      return <ContourDiagram />;
    } else {
      return <Volume />;
    }
  };

  return (
    <div className="right-main-side">
      <Tab
        tabs={tabs}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {renderedComponent()}
    </div>
  );
};

export default RightMainSide;
