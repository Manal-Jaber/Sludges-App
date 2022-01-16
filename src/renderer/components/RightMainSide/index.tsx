import React, { useState } from 'react';
import ContourDiagram from '../ContourDiagram';
import SurfacePlot from '../SurfacePlot';
import Tab from '../Tab';
import Volume from '../Volume';
import { Point, data } from 'renderer/components/Types/index';
import './index.scss';
import { ids } from 'webpack';

interface RightMainSide {
  generatedPoints: Point[][];
}

const RightMainSide: React.FC<RightMainSide> = ({ generatedPoints }) => {
  // Points sent to diagrams
  const data: data = {
    id: [],
    name: [],
    x: [],
    y: [],
    z: [],
  };
  let i = 0;
  let zTemp: number[] = [];
  generatedPoints.forEach((collection, collectionIndex) => {
    collection.forEach((point, pointIndex) => {
      const diagramPoint = (({ color, alpha, r, ...o }) => o)(point);
      Object.entries(diagramPoint).map((attribute, attributeIndex) => {
        const key = attribute[0];
        const value = attribute[1];
        switch (key) {
          case 'point':
            data.name.push(value);
            break;
          case 'x':
            data.x.push(value);
            break;
          case 'y':
            data.y.push(value);
            break;
          case 'z':
            zTemp.push(value);
            break;
          default:
            break;
        }
      });
      data.id.push(i++);
    });
  });
  data.id.forEach((id) => {
    let newArr = new Array(data.id.length).fill(0);
    newArr[id] = zTemp[id];
    data.z.push(newArr);
  });
  console.log(data);
  const tabs = ['3D Surface Plot', 'Contour Diagram', 'Volume'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = (data: data) => {
    if (selectedIndex === 0) {
      return <SurfacePlot data={data} />;
    } else if (selectedIndex === 1) {
      return <ContourDiagram data={data} />;
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
      {renderedComponent(data)}
    </div>
  );
};

export default RightMainSide;
