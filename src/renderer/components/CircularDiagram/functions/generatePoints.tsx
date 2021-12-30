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
  xPoint: number,
  yPoint: number,
  rPoint: number,
  numberOfPoints: number,
  pointsOption: boolean
) => {
  const pointsArray = [];
  if (pointsOption) {
    // false -> linear, true -> radial
    const theta = calculateAngle(yPoint, rPoint);
    const separatingAngle = (2 * Math.PI) / numberOfPoints;
    for (var i = 0; i < numberOfPoints; i++) {
      const alpha = theta + i * separatingAngle;
      const x = calculateX(rPoint, alpha);
      const y = calculateY(rPoint, alpha);
      pointsArray.push({ x: x, y: y });
    }
  } else {
    const xBound = Math.sqrt(rPoint ** 2 - yPoint ** 2);
    const distance = 2 * xBound;
    const separatingDistance = distance / (numberOfPoints + 2);
    for (var i = 0; i < numberOfPoints; i++) {
      const x = xBound + (i + 1) * separatingDistance;
      const y = yPoint;
      pointsArray.push({ x: x, y: y });
    }
  }
  console.log(pointsArray);
  return pointsArray;
};
