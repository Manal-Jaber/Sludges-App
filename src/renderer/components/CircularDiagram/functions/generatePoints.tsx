import { getBoundX, getBoundY } from './bound-relative-coordinates';
import { drawPoint, removePoint } from './drawPoint';
import { data, Point } from 'renderer/components/Types';

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
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  data: data,
  setData: React.Dispatch<React.SetStateAction<data>>
) => {
  setRenderInput(false);
  setMarker(true);
  const pointsArray: Point[] = [];
  const generatedPointsLength = generatedPoints.reduce(
    (count, row) => count + row.length,
    0
  );
  if (numberOfPoints < 0) {
    return window.prompt('Please input a positive number');
  } else if (numberOfPoints == 0) {
    return;
  } else if (numberOfPoints == 1) {
    const xBound = getBoundX(radius, xPoint);
    const yBound = getBoundY(radius, yPoint);
    const name = namePoint + '0';
    drawPoint(name, xBound, yBound, 'point', color);
    pointsArray.push({
      id: generatedPointsLength + 1,
      point: name,
      x: xPoint,
      y: yPoint,
      r: rPoint,
      z: zPoint,
      color: color,
    });
    setData((prev) => {
      let idIndex = prev.id.length;
      let xIndex = prev.x.length;
      let yIndex = prev.y.length;
      return {
        id: [...prev.id, idIndex],
        name: [...prev.name, name],
        x: [...prev.x, xPoint],
        y: [...prev.y, yPoint],
        zData: [
          ...prev.zData,
          { zValue: zPoint, xIndex: xIndex, yIndex: yIndex },
        ],
        z: prev.z,
      };
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
        const name = namePoint + i;
        pointsArray.push({
          id: generatedPointsLength + i + 1,
          point: name,
          x: x,
          y: y,
          r: rPoint,
          z: zPoint,
          color: color,
        });
        setData((prev) => {
          let idIndex = prev.id.length;
          let xIndex = prev.x.length;
          let yIndex = prev.y.length;
          return {
            id: [...prev.id, idIndex],
            name: [...prev.name, name],
            x: [...prev.x, x],
            y: [...prev.y, y],
            zData: [
              ...prev.zData,
              { zValue: zPoint, xIndex: xIndex, yIndex: yIndex },
            ],
            z: prev.z,
          };
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
        const name = namePoint + i;
        pointsArray.push({
          id: generatedPointsLength + i + 1,
          point: name,
          x: x,
          y: y,
          r: r,
          z: zPoint,
          color: color,
        });
        setData((prev) => {
          let idIndex = prev.id.length;
          let xIndex = prev.x.length;
          let yIndex =
            prev.y.length === 0
              ? 0
              : i === 0
              ? prev.y.length
              : prev.y.length - 1;
          return {
            id: [...prev.id, idIndex],
            name: [...prev.name, name],
            x: [...prev.x, x],
            y: i === 0 ? [...prev.y, y] : prev.y,
            zData: [
              ...prev.zData,
              { zValue: zPoint, xIndex: xIndex, yIndex: yIndex },
            ],
            z: prev.z,
          };
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
  setData((prev) => {
    let xIndex = prev.x.length;
    let yIndex = prev.y.length;
    let zArr = new Array(yIndex).fill(0).map(() => new Array(xIndex).fill(0));
    prev.zData.forEach(
      (point) => (zArr[point.yIndex][point.xIndex] = point.zValue)
    );
    return {
      id: prev.id,
      name: prev.name,
      x: prev.x,
      y: prev.y,
      zData: prev.zData,
      z: zArr,
    };
  });

  return pointsArray;
};
