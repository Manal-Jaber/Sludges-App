import { getBoundX, getBoundY } from './bound-relative-coordinates';
import { drawPoint, removePoint } from './drawPoint';
import { radius } from '..';

const calculateAngle = (y: number, r: number) => {
  return Math.asin(y / r);
};

const calculateX = (r: number, alpha: number) => {
  return r * Math.cos(alpha);
};

const calculateY = (r: number, alpha: number) => {
  return r * Math.sin(alpha);
};
export const generatePoints = (
  namePoint: string,
  setNamePoint: React.Dispatch<React.SetStateAction<string>>,
  setRenderInput: React.Dispatch<React.SetStateAction<boolean>>,
  setMarker: React.Dispatch<React.SetStateAction<boolean>>,
  setGeneratedPoints: React.Dispatch<React.SetStateAction<{}[]>>,
  xPoint: number,
  yPoint: number,
  rPoint: number,
  numberOfPoints: number,
  pointsOption: boolean
) => {
  setRenderInput(false);
  setMarker(true);
  const pointsArray: {}[] = [];
  if (numberOfPoints < 0) {
    return window.prompt('Please input a positive number');
  } else if (numberOfPoints == 0) {
    return;
  } else if (numberOfPoints == 1) {
    const xBound = getBoundX(xPoint);
    const yBound = getBoundY(yPoint);
    drawPoint(namePoint + '0', xBound, yBound, 'point');
    return [{ name: namePoint + '0', x: xPoint, y: yPoint }];
  } else {
    if (pointsOption) {
      // false -> linear, true -> radial
      const theta = calculateAngle(yPoint, rPoint);
      const separatingAngle = (2 * Math.PI) / numberOfPoints;
      for (var i = 0; i < numberOfPoints; i++) {
        const alpha = theta + i * separatingAngle;
        const x = calculateX(rPoint, alpha);
        const y = calculateY(rPoint, alpha);
        pointsArray.push({ x: x, y: y });
        const xBound = getBoundX(x);
        const yBound = getBoundY(y);
        drawPoint(namePoint + i, xBound, yBound, 'point');
      }
    } else {
      const xAround = Math.sqrt(radius ** 2 - yPoint ** 2);
      const distance = 2 * xAround;
      const separatingDistance = distance / (1 + numberOfPoints * 1.0);
      for (var i = 0; i < numberOfPoints; i++) {
        const x = -xAround + (i + 1) * separatingDistance;
        const y = yPoint;
        pointsArray.push({ x: x, y: y });
        const xBound = getBoundX(x);
        const yBound = getBoundY(y);
        drawPoint(namePoint + i, xBound, yBound, 'point');
      }
    }
    setGeneratedPoints((prev) => [...prev, pointsArray]);
    removePoint(namePoint);
    setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) + 1));

    return pointsArray;
  }
};
