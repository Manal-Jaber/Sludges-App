import React, { useState, useEffect } from 'react';
import Button from '../Button';
import './index.scss';

// importing for color picker
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

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
  modifyColor,
} from './functions/modificationFunctions';
import { undo, redo } from './functions/undoRedo';
import { Point } from 'renderer/components/Types/index';
import { drawPoint } from './functions/drawPoint';

// Constants
export const radius = 100;
export const width =
  document.querySelector('#circle')?.getBoundingClientRect()?.width || 260;
export const height =
  document.querySelector('#circle')?.getBoundingClientRect()?.height || 260;

interface CircularDiagram {
  generatedPoints: Point[][];
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>;
}
const CircularDiagram: React.FC<CircularDiagram> = ({
  generatedPoints,
  setGeneratedPoints,
}) => {
  // React states
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);
  const [rVal, setRVal] = useState(0);
  const [zVal, setZVal] = useState(0);
  const [xPoint, setXPoint] = useState(0);
  const [yPoint, setYPoint] = useState(0);
  const [rPoint, setRPoint] = useState(0);
  const [zPoint, setZPoint] = useState(0);
  const [namePoint, setNamePoint] = useState('A');
  const [marker, setMarker] = useState(true);
  const [numberOfPoints, setNumberOfPoints] = useState(1);
  const [pointsOption, setPointsOptions] = useState(false); // false -> linear, true -> radial
  const [renderInput, setRenderInput] = useState(false);
  const [color, setColor] = useState('#A47A51');
  const [alpha, setAlpha] = useState(100);
  const [undoStack, setUndoStack] = useState<Point[][]>([]);
  const [redoStack, setRedoStack] = useState<Point[][]>([]);

  useEffect(() => {
    // console.log('gen');
    // console.log(
    //   'gen',
    //   generatedPoints,
    //   'undoStack',
    //   undoStack,
    //   'redoStack',
    //   redoStack
    // );
  }, [generatedPoints]);

  return (
    <div className="circular-diagram">
      <div className="circle-wrapper" id="circle-wrapper">
        <svg
          className={`circle ${marker ? 'marker' : 'no-marker'}`}
          id="circle"
          onMouseMove={(e) => hoverCoordinates(e, setXVal, setYVal, setRVal)}
          onClick={(e: any) =>
            assignCoordinates(
              e,
              namePoint,
              setRenderInput,
              setMarker,
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
      <div className="first-row">
        <span className="name-point">{namePoint}</span>
        <div className="buttons">
          <Button
            text="Undo"
            className="undo-redo-btn"
            disabled={undoStack === []}
            listener={() =>
              undo(
                undoStack,
                setUndoStack,
                redoStack,
                setRedoStack,
                generatedPoints,
                setGeneratedPoints,
                setNamePoint
              )
            }
          />
          <Button
            text="Redo"
            className="undo-redo-btn"
            disabled={redoStack === []}
            listener={() =>
              redo(
                undoStack,
                setUndoStack,
                redoStack,
                setRedoStack,
                generatedPoints,
                setGeneratedPoints,
                setNamePoint
              )
            }
          />
        </div>
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
          <ColorPicker
            color={color}
            alpha={alpha}
            onChange={(e: any) => modifyColor(e, setColor, setAlpha)}
            // onClose={closeHandler}
            placement="topLeft"
            className="color-picker"
          />
        </div>
        <Button
          text="Generate Points"
          listener={() =>
            generatePoints(
              namePoint,
              setNamePoint,
              setRenderInput,
              setMarker,
              generatedPoints,
              setGeneratedPoints,
              xPoint,
              yPoint,
              rPoint,
              zPoint,
              setZPoint,
              numberOfPoints,
              pointsOption,
              color,
              alpha,
              setUndoStack,
              setRedoStack
            )
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
