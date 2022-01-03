import React, { useState, useEffect } from 'react';
import Button from '../Button';
import './index.scss';

// importing functions
import { generatePoints } from './functions/generatePoints';
import { exportDiagram } from './functions/exportDiagram';
import { hoverCoordinates } from './functions/hoverCoordinates';
import { assignCoordinates } from './functions/assignCoordinates';
import {
  modifyXValue,
  modifyYValue,
  modifyZValue,
  modifyRValue,
  modifyNumber,
  modifyPointsOptions,
} from './functions/modificationFunctions';

interface CircularDiagram {}

const CircularDiagram: React.FC<CircularDiagram> = () => {
  // React states
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);
  const [rVal, setRVal] = useState(0);
  const [zVal, setZVal] = useState(0);
  const [xPoint, setXPoint] = useState(0);
  const [yPoint, setYPoint] = useState(0);
  const [rPoint, setRPoint] = useState(0);
  const [zPoint, setZPoint] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(5);
  const [pointsOption, setPointsOptions] = useState(false); // false -> linear, true -> radial
  const [renderInput, setRenderInput] = useState(false);
  const [generatedPoints, setGeneratedPoints] = useState([]);

  // Constants
  const radius = 100;
  const width =
    document.querySelector('#circle')?.getBoundingClientRect()?.width || 0;
  const height =
    document.querySelector('#circle')?.getBoundingClientRect()?.height || 0;

  return (
    <div className="circular-diagram">
      <div className="circle-wrapper" id="circle-wrapper">
        <svg
          className="circle"
          id="circle"
          onMouseMove={(e) =>
            hoverCoordinates(
              e,
              radius,
              width,
              height,
              setXVal,
              setYVal,
              setRVal
            )
          }
          onClick={(e: any) =>
            assignCoordinates(
              e,
              radius,
              width,
              height,
              setRenderInput,
              setXPoint,
              setYPoint,
              setRPoint
            )
          }
        >
          <svg
            className="center"
            width="5"
            height="5"
            x="50%"
            y="50%"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="2.5" r="2.5" fill="#A47A51" />
          </svg>
        </svg>
      </div>
      <div className="data-table">
        <div className="data-def">
          <span className="data-name">X: </span>
          {renderInput ? (
            <input
              className="x-input"
              type="number"
              value={xPoint}
              onChange={(e: any) =>
                modifyXValue(e, yPoint, setXPoint, setRPoint)
              }
            />
          ) : (
            <span className="data-value">{xVal}</span>
          )}
        </div>
        <div className="data-def">
          <span className="data-name">Y: </span>
          {renderInput ? (
            <input
              className="y-input"
              type="number"
              value={yPoint}
              onChange={(e: any) =>
                modifyYValue(e, xPoint, setYPoint, setRPoint)
              }
            />
          ) : (
            <span className="data-value">{yVal}</span>
          )}
        </div>
        <div className="data-def">
          <span className="data-name">R: </span>
          {renderInput ? (
            <input
              className="r-input"
              type="number"
              value={rPoint}
              onChange={(e: any) =>
                modifyRValue(e, xPoint, setRPoint, setYPoint)
              }
            />
          ) : (
            <span className="data-value">{rVal}</span>
          )}
        </div>
        <div className="data-def">
          <span className="data-name">Z: </span>
          {renderInput ? (
            <input
              className="z-input"
              type="number"
              value={zPoint}
              onChange={(e: any) => modifyZValue(e, setZPoint)}
            />
          ) : (
            <span className="data-value">{zVal}</span>
          )}
        </div>
      </div>
      <div className="points-generation">
        <div className="points-options">
          <div className="number-options">
            <span className="number-key">Number</span>
            <input
              type="number"
              className="number-value"
              onChange={(e: any) => modifyNumber(e, setNumberOfPoints)}
              value={numberOfPoints}
              min={0}
            />
          </div>
          <div className="data-state">
            <span className="state-one">linear</span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => modifyPointsOptions(setPointsOptions)}
                checked={pointsOption}
              />
              <span className="slider round"></span>
            </label>
            <span className="state-two">radial</span>
          </div>
        </div>
        {/* <Button text="Generate Points" listener={generatePoints} /> */}
        <Button
          text="Generate Points"
          listener={() =>
            generatePoints(xPoint, yPoint, rPoint, numberOfPoints, pointsOption)
          }
        />
      </div>
      <div className="export-btn">
        <Button text="Export Diagram" listener={exportDiagram} />
      </div>
    </div>
  );
};

export default CircularDiagram;
