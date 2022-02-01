import { Point, data } from 'renderer/components/Types/index';

export const zTableModify = (
  e: any,
  collectionIndex: number,
  pointIndex: number,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>,
  setData: React.Dispatch<React.SetStateAction<data>>
) => {
  let pointId = generatedPoints[collectionIndex][pointIndex].id;
  setGeneratedPoints((prev) => {
    let newGeneratedPoints = [...prev];
    let newCollection = [...newGeneratedPoints[collectionIndex]];
    let newPoint = newCollection[pointIndex];
    newPoint.z = e.target.value;
    return newGeneratedPoints;
  });
  setData((prev) => {
    let modifiedZData = prev.zData;
    modifiedZData[pointId].zValue = e.target.value;
    let xIndex = prev.x.length;
    let yIndex = prev.y.length;
    let zArr = new Array(yIndex).fill(0).map(() => new Array(xIndex).fill(0));
    modifiedZData.forEach(
      (point) => (zArr[point.yIndex][point.xIndex] = point.zValue)
    );
    return {
      id: prev.id,
      name: prev.name,
      x: prev.x,
      y: prev.y,
      zData: modifiedZData,
      z: zArr,
    };
  });
};
