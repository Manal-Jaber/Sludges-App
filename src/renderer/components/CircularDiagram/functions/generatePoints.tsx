import { getBoundX, getBoundY } from './bound-relative-coordinates';
import { drawPoint, removePoint } from './drawPoint';
import { radius } from '..';
import { Point } from 'renderer/components/Types';

const calculateAngle = (y: number, r: number) => {
  return Math.asin(y / r);
};

const calculateX = (r: number, alpha: number) => {
  return r * Math.cos(alpha);
};

const calculateY = (r: number, alpha: number) => {
  return r * Math.sin(alpha);
};

const calculateR = (x: number, y: number) => {
  return Math.sqrt(x ** 2 + y ** 2);
};

export const generatePoints = (
  namePoint: string,
  setNamePoint: React.Dispatch<React.SetStateAction<string>>,
  setRenderInput: React.Dispatch<React.SetStateAction<boolean>>,
  setMarker: React.Dispatch<React.SetStateAction<boolean>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>,
  xPoint: number,
  yPoint: number,
  rPoint: number,
  zPoint: number,
  setZPoint: React.Dispatch<React.SetStateAction<number>>,
  numberOfPoints: number,
  pointsOption: boolean,
  color: string,
  alpha: number,
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>
) => {
  setRenderInput(false);
  setMarker(true);
  const pointsArray: Point[] = [];
  if (numberOfPoints < 0) {
    return window.prompt('Please input a positive number');
  } else if (numberOfPoints == 0) {
    return;
  } else if (numberOfPoints == 1) {
    const xBound = getBoundX(xPoint);
    const yBound = getBoundY(yPoint);
    drawPoint(namePoint + '0', xBound, yBound, 'point', color, alpha);
    pointsArray.push({
      point: namePoint + '0',
      x: xPoint,
      y: yPoint,
      r: rPoint,
      z: zPoint,
      color: color,
      alpha: alpha,
    });
  } else {
    if (pointsOption) {
      // false -> linear, true -> radial
      const theta = calculateAngle(yPoint, rPoint);
      const separatingAngle = (2 * Math.PI) / numberOfPoints;
      for (var i = 0; i < numberOfPoints; i++) {
        const alpha = theta + i * separatingAngle;
        const x = calculateX(rPoint, alpha);
        const y = calculateY(rPoint, alpha);
        pointsArray.push({
          point: namePoint + i,
          x: x,
          y: y,
          r: rPoint,
          z: zPoint,
          color: color,
          alpha: alpha,
        });
        const xBound = getBoundX(x);
        const yBound = getBoundY(y);
        drawPoint(namePoint + i, xBound, yBound, 'point', color, alpha);
      }
    } else {
      const xAround = Math.sqrt(radius ** 2 - yPoint ** 2);
      const distance = 2 * xAround;
      const separatingDistance = distance / (1 + numberOfPoints * 1.0);
      for (var i = 0; i < numberOfPoints; i++) {
        const x = -xAround + (i + 1) * separatingDistance;
        const y = yPoint;
        const r = calculateR(x, y);
        pointsArray.push({
          point: namePoint + i,
          x: x,
          y: y,
          r: r,
          z: zPoint,
          color: color,
          alpha: alpha,
        });
        const xBound = getBoundX(x);
        const yBound = getBoundY(y);
        drawPoint(namePoint + i, xBound, yBound, 'point', color, alpha);
      }
    }
  }
  setUndoStack((prev) => [...prev, ...generatedPoints]);
  setRedoStack([]);
  setGeneratedPoints((prev) => [...prev, pointsArray]);
  removePoint(namePoint);
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) + 1));
  setZPoint(0);

  return pointsArray;
};
