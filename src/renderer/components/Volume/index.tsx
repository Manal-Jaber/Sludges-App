import React, { useState } from 'react';
import Button from '../Button';
import './index.scss';

interface Volume {}

const Volume: React.FC<Volume> = () => {
  // React states
  const [diameter, setDiameter] = useState(0);
  const [height, setHeight] = useState(0);
  const [result, setResult] = useState({
    render: false,
    value: 0,
  });

  // Listeners
  const inputChange = (e: any) => {
    e.target.id === 'height' && setHeight(e.target.value);
    e.target.id === 'diameter' && setDiameter(e.target.value);
  };

  const exportDocument = () => {};

  const calcVolume = () => {
    setResult({
      render: true,
      value: +diameter + +height, // dummy equation
    });
  };

  return (
    <div className="volume">
      <div className="input-field">
        <label htmlFor="diameter" className="input-label">
          Diameter of Tank (m)
        </label>
        <input
          className="input-value"
          id="diameter"
          onChange={inputChange}
          value={diameter}
          type="number"
          min={0}
        />
      </div>
      <div className="input-field">
        <label htmlFor="height" className="input-label">
          Height of conic base of Tank (m)
        </label>
        <input
          className="input-value"
          id="height"
          onChange={inputChange}
          value={height}
          type="number"
          min={0}
        />
      </div>
      <Button
        text="Calculate Volume"
        className="calc-action"
        listener={calcVolume}
      />
      <div className="result-info">Volume of Sludge</div>
      <div className="symbol">=</div>
      {result.render && (
        <div className="result">
          {result.value} m<sup>3</sup>
        </div>
      )}
      <Button
        text="Export Whole Document"
        className="export-action"
        listener={exportDocument}
      />
    </div>
  );
};

export default Volume;
