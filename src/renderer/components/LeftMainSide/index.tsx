import React, { useState } from 'react';
import CircularDiagram from '../CircularDiagram';
import Tab from '../Tab';
import Table from '../Table';
import './index.scss';

interface LeftMainSide {}

const LeftMainSide: React.FC<LeftMainSide> = () => {
  const tabs = ['Circular Diagram', 'Table'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = () => {
    if (selectedIndex === 0) {
      return <CircularDiagram />;
    } else {
      return <Table />;
    }
  };

  return (
    <div className="left-main-side">
      <Tab
        tabs={tabs}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {renderedComponent()}
    </div>
  );
};

export default LeftMainSide;
