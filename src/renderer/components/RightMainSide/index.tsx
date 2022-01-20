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

  // fitting data
  var fitCurve = require('fit-curve');
  const dataNew: number[][] = [];
  generatedPoints.forEach((collection, collectionIndex) => {
    collection.forEach((point, pointIndex) => {
      const dataPoint = (({ color, alpha, r, point, ...o }) => o)(point);
      const pointCoordinates: number[] = [];
      Object.entries(dataPoint).map((attribute, attributeIndex) => {
        const key: string = attribute[0];
        const value: number = attribute[1];
        pointCoordinates.push(value);
      });
      dataNew.push(pointCoordinates);
    });
  });
  const curvePoints = fitCurve(dataNew);
  console.log(curvePoints);
  const tabs = ['3D Surface Plot', 'Contour Diagram', 'Volume'];

  // React states
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderedComponent = (dataNew: number[][]) => {
    if (selectedIndex === 0) {
      return <SurfacePlot data={dataNew} />;
    } else if (selectedIndex === 1) {
      return <ContourDiagram data={dataNew} />;
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
      {renderedComponent(dataNew)}
    </div>
  );
};

export default RightMainSide;
