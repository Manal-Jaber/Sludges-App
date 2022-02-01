import React, { useState } from 'react';
import CircularDiagram from '../CircularDiagram';
import Tab from '../Tab';
import Table from '../Table';
import { data, Point } from '../Types';
import './index.scss';

interface LeftMainSide {
  generatedPoints: Point[][];
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>;
  namePoint: string;
  setNamePoint: React.Dispatch<React.SetStateAction<string>>;
  data: data;
  setData: React.Dispatch<React.SetStateAction<data>>;
}

const LeftMainSide: React.FC<LeftMainSide> = ({
  generatedPoints,
  setGeneratedPoints,
  namePoint,
  setNamePoint,
  data,
  setData,
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
          data={data}
          setData={setData}
        />
      );
    } else {
      return (
        <Table
          generatedPoints={generatedPoints}
          setGeneratedPoints={setGeneratedPoints}
          setData={setData}
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
