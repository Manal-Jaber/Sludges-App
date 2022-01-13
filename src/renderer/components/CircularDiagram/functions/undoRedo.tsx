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
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) - 1));
  setUndoStack((prev) => {
    prev.pop();
    return prev;
  });
  setRedoStack([...redoStack, generatedPoints.pop() || []]);
  generatedPoints.pop()?.forEach((item) => removePoint(item.point));
  console.log(generatedPoints.pop());
  setGeneratedPoints((prev) => {
    prev.pop();
    return prev;
  });
  console.log('undo');
  console.log(
    'gen',
    generatedPoints,
    'undoStack',
    undoStack,
    'redoStack',
    redoStack
  );
};

export const redo = (
  undoStack: Point[][],
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  redoStack: Point[][],
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>,
  setNamePoint: React.Dispatch<React.SetStateAction<string>>
) => {
  redoStack.pop()?.forEach((item) => {
    const xBound = getBoundX(item.x);
    const yBound = getBoundY(item.y);
    return drawPoint(
      item.point,
      xBound,
      yBound,
      'point',
      item.color,
      item.alpha
    );
  });
  setNamePoint((prev) => String.fromCharCode(prev.charCodeAt(0) + 1));
  setUndoStack((prev) => [...prev, generatedPoints.pop() || []]);
  setGeneratedPoints((prev) => [...prev, redoStack.pop() || []]);
  setRedoStack((prev) => {
    prev.pop();
    return prev;
  });
  console.log('redo', generatedPoints);
  console.log(
    'gen',
    generatedPoints,
    'undoStack',
    undoStack,
    'redoStack',
    redoStack
  );
};
