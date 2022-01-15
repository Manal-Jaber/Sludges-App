import { Point } from 'renderer/components/Types/index';

export const zTableModify = (
  e: any,
  collectionIndex: number,
  pointIndex: number,
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>
) => {
  setGeneratedPoints((prev) => {
    let newGeneratedPoints = [...prev];
    let newCollection = [...newGeneratedPoints[collectionIndex]];
    let newPoint = newCollection[pointIndex];
    newPoint.z = e.target.value;
    return newGeneratedPoints;
  });
};
