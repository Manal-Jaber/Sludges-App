import { Point } from 'renderer/components/Types';
import {
  drawPoint,
  removePoint,
} from 'renderer/components/CircularDiagram/functions/drawPoint';
import {
  getBoundX,
  getBoundY,
} from 'renderer/components/CircularDiagram/functions/bound-relative-coordinates';

export const undo = (
  undoStack: Point[][],
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  redoStack: Point[][],
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>,
  setNamePoint: React.Dispatch<React.SetStateAction<string>>
) => {
  if (undoStack.length === 0 && generatedPoints.length === 0) return;
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) - 1));
  setUndoStack((prev) => prev.slice(0, -1));
  setRedoStack([...redoStack, generatedPoints[generatedPoints.length - 1]!]);
  generatedPoints[generatedPoints.length - 1]?.forEach((item) =>
    removePoint(item.point)
  );
  setGeneratedPoints((prev) => prev.slice(0, -1));
};

export const redo = (
  radius: number,
  undoStack: Point[][],
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  redoStack: Point[][],
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>,
  setNamePoint: React.Dispatch<React.SetStateAction<string>>
) => {
  redoStack[redoStack.length - 1]?.forEach((item) => {
    const xBound = getBoundX(radius, item.x);
    const yBound = getBoundY(radius, item.y);
    return drawPoint(item.point, xBound, yBound, 'point', item.color);
  });
  if (redoStack.length === 0) return;
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) + 1));
  setUndoStack((prev) =>
    generatedPoints.length !== 0
      ? [...prev, generatedPoints[generatedPoints.length - 1]]
      : [...prev]
  );
  setGeneratedPoints((prev) => [...prev, redoStack[redoStack.length - 1]]);
  setRedoStack((prev) => prev.slice(0, -1));
};
