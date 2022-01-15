import React, { useState } from 'react';
import CircularDiagram from '../CircularDiagram';
import Tab from '../Tab';
import Table from '../Table';
import { Point } from '../Types';
import './index.scss';

interface LeftMainSide {
  generatedPoints: Point[][];
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>;
  namePoint: string;
  setNamePoint: React.Dispatch<React.SetStateAction<string>>;
}

const LeftMainSide: React.FC<LeftMainSide> = ({
  generatedPoints,
  setGeneratedPoints,
  namePoint,
  setNamePoint,
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
          namePoint={namePoint}
          setNamePoint={setNamePoint}
        />
      );
    } else {
      return (
        <Table
          generatedPoints={generatedPoints}
          setGeneratedPoints={setGeneratedPoints}
        />
      );
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
