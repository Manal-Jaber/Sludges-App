import React, { useState } from 'react';
import './index.scss';

interface CircularDiagram {}

const CircularDiagram: React.FC<CircularDiagram> = () => {
  // React states
  const [xVal, setXVal] = useState(5);
  const [yVal, setYVal] = useState(100);
  const [rVal, setRVal] = useState(95);
  const [zVal, setZVal] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(5);
  const [pointsOption, setPointsOptions] = useState(false); // false -> linear, true -> radial

  // Listeners
  const generatePoints = () => {};
  const numberChange = (e: any) => setNumberOfPoints(e.target.value);
  const changePointsOptions = () => setPointsOptions((prev) => !prev);

  return (
    <div className="circular-diagram">
      <div className="circle">
        <svg
          className="center"
          width="5"
          height="5"
          viewBox="0 0 5 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="#A47A51" />
        </svg>
      </div>
      <div className="data-table">
        <div className="data-def">
          <span className="data-name">X: </span>
          <span className="data-value">{xVal}</span>
        </div>
        <div className="data-def">
          <span className="data-name">Y: </span>
          <span className="data-value">{yVal}</span>
        </div>
        <div className="data-def">
          <span className="data-name">R: </span>
          <span className="data-value">{rVal}</span>
        </div>
        <div className="data-def">
          <span className="data-name">Z: </span>
          <span className="data-value">{zVal}</span>
        </div>
      </div>
      <div className="points-generation">
        <div className="points-options">
          <div className="number-options">
            <span className="number-key">Number</span>
            <input
              type="number"
              className="number-value"
              onChange={numberChange}
              value={numberOfPoints}
              min={0}
            />
          </div>
          <div className="data-state">
            <span className="state-one">linear</span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={changePointsOptions}
                checked={pointsOption}
              />
              <span className="slider round"></span>
            </label>
            <span className="state-two">radial</span>
          </div>
        </div>
        <button className="points-generation-btn" onClick={generatePoints}>
          Generate Points
        </button>
      </div>
    </div>
  );
};

export default CircularDiagram;
