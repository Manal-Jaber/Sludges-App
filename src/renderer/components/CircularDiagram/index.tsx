import React, { useState, useEffect } from 'react';
import Button from '../Button';
import * as htmlToImage from 'html-to-image';
import { toJpeg, toPng } from 'html-to-image';
import './index.scss';

interface CircularDiagram {}

const CircularDiagram: React.FC<CircularDiagram> = () => {
  // React states
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

  // Constants
  const radius = 100;

  // Setting Values of Circle
  // const width = document
  // .querySelector('#circle')
  // ?.getBoundingClientRect()?.width;
  // const height = document
  // .querySelector('#circle')
  // ?.getBoundingClientRect()?.height;
  useEffect(() => {
    return () => {
      setWidth(
        document.querySelector('#circle')?.getBoundingClientRect()?.width || 0
      );
      setHeight(
        document.querySelector('#circle')?.getBoundingClientRect()?.height || 0
      );
    };
  });

  // Listeners
  // to reset coordinates on mouse movement
  const changeCoordinates = (e: any) => {
    // X and Y coordinates relative to the boundary of the circle
    const xBound = e.nativeEvent.offsetX;
    const yBound = e.nativeEvent.offsetY;
    // X and Y relative coordinates ranging in [-100, 100]
    const xRelative = (xBound / width) * 2 * radius - radius; // /width*200 to have 200 as width and -100 to have negative and positive values
    const yRelative = radius - (yBound / height) * 2 * radius;
    // radius
    const rRelative = Math.sqrt(xRelative ** 2 + yRelative ** 2);
    setXVal(Math.round(xRelative * 100) / 100);
    setYVal(Math.round(yRelative * 100) / 100);
    setRVal(Math.round(rRelative * 100) / 100);
  };

  // to assign coordinates on mouse click
  const assignCoordinates = (e: any) => {
    console.log(e);
    // change to input
    setRenderInput(true);
    // X and Y coordinates relative to the boundary of the circle
    const xBound = e.nativeEvent.offsetX;
    const yBound = e.nativeEvent.offsetY;
    // X and Y relative coordinates ranging in [-100, 100]
    const xRelative = (xBound / width) * 2 * radius - radius; // /width*200 to have 200 as width and -100 to have negative and positive values
    const yRelative = radius - (yBound / height) * 2 * radius;
    // radius
    const rRelative = Math.sqrt(xRelative ** 2 + yRelative ** 2);
    // setting coordinates to the nearest hundredth
    setXPoint(Math.round(xRelative * 100) / 100);
    setYPoint(Math.round(yRelative * 100) / 100);
    setRPoint(Math.round(rRelative * 100) / 100);
    // Drawing the point
    // const node = document.create
    //   <svg
    //     className="center"
    //     width="5"
    //     height="5"
    //     viewBox="0 0 5 5"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <circle cx="2.5" cy="2.5" r="2.5" fill="#A47A51" />
    //   </svg>
    // );
    var svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    let newElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    newElement.setAttribute('fill', '#A47A51');
    newElement.setAttribute('cx', '2.5');
    newElement.setAttribute('cy', '2.5');
    newElement.setAttribute('r', '2.5');
    svgElement.appendChild(newElement);
    svgElement.setAttribute('position', 'absolute');
    svgElement.setAttribute('left', `${xPoint}`);
    svgElement.setAttribute('top', `${yPoint}`);
    svgElement.setAttribute('height', '5');
    svgElement.setAttribute('width', '5');
    document.querySelector('#circle')?.appendChild(svgElement);
  };

  // Changing X
  const changeXValue = (e: any) => {
    const newX = e.target.value;
    setXPoint(newX);
    // changing r based on x
    const newR = Math.sqrt(newX ** 2 + yPoint ** 2);
    setRPoint(Math.round(newR * 100) / 100);
  };

  // Changing Y
  const changeYValue = (e: any) => {
    const newY = e.target.value;
    setYPoint(newY);
    // changing r based on y
    const newR = Math.sqrt(newY ** 2 + xPoint ** 2);
    setRPoint(Math.round(newR * 100) / 100);
  };

  // Changing Radius
  const changeRValue = (e: any) => {
    const newR = e.target.value;
    setRPoint(newR);
    // changing y based on r
    const newY = Math.sqrt(newR ** 2 - xPoint ** 2);
    setYPoint(Math.round(newY * 100) / 100);
  };

  const exportDiagram = () => {
    htmlToImage
      .toPng(document.getElementById('circle-wrapper')!, {
        quality: 0.95,
      })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'circle.jpeg';
        link.href = dataUrl;
        link.click();
      });
  };

  const generatePoints = () => {};
  const numberChange = (e: any) => setNumberOfPoints(e.target.value);
  const changePointsOptions = () => setPointsOptions((prev) => !prev);

  return (
    <div className="circular-diagram">
      <div className="circle-wrapper" id="circle-wrapper">
        <div
          className="circle"
          id="circle"
          onMouseMove={changeCoordinates}
          onClick={assignCoordinates}
        >
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
      </div>
      <div className="data-table">
        <div className="data-def">
          <span className="data-name">X: </span>
          {renderInput ? (
            <input
              className="x-input"
              type="number"
              value={xPoint}
              onChange={changeXValue}
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
              onChange={changeYValue}
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
              onChange={changeRValue}
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
              value={zVal}
              onChange={(e: any) => setZPoint(e.target.value)}
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
        <Button text="Generate Points" listener={generatePoints} />
      </div>
      <div className="export-btn">
        <Button text="Export Diagram" listener={exportDiagram} />
      </div>
    </div>
  );
};

export default CircularDiagram;
