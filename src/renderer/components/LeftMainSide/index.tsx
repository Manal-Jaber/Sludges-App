import React, { useState } from 'react';
import CircularDiagram from '../CircularDiagram';
import Tab from '../Tab';
import Table from '../Table';
import './index.scss';

interface LeftMainSide {
  generatedPoints: {}[];
  setGeneratedPoints: React.Dispatch<React.SetStateAction<{}[]>>;
}

const LeftMainSide: React.FC<LeftMainSide> = ({
  generatedPoints,
  setGeneratedPoints,
}) => {
  const tabs = ['Circular Diagram', 'Table'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = () => {
    if (selectedIndex === 0) {
      return (
        <CircularDiagram
          generatedPoints={generatedPoints}
          setGeneratedPoints={setGeneratedPoints}
        />
      );
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
