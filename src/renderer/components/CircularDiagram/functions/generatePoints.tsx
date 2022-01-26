import { getBoundX, getBoundY } from './bound-relative-coordinates';
import { drawPoint, removePoint } from './drawPoint';
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
  radius: number,
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
    const xBound = getBoundX(radius, xPoint);
    const yBound = getBoundY(radius, yPoint);
    drawPoint(namePoint + '0', xBound, yBound, 'point', color);
    pointsArray.push({
      point: namePoint + '0',
      x: xPoint,
      y: yPoint,
      r: rPoint,
      z: zPoint,
      color: color,
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
        });
        const xBound = getBoundX(radius, x);
        const yBound = getBoundY(radius, y);
        drawPoint(namePoint + i, xBound, yBound, 'point', color);
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
        });
        const xBound = getBoundX(radius, x);
        const yBound = getBoundY(radius, y);
        drawPoint(namePoint + i, xBound, yBound, 'point', color);
      }
    }
  }
  // setUndoStack((prev) => [...prev, ...generatedPoints]);
  setUndoStack(generatedPoints);
  setRedoStack([]);
  setGeneratedPoints((prev) => [...prev, pointsArray]);
  removePoint(namePoint);
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) + 1));
  setZPoint(0);

  return pointsArray;
};
