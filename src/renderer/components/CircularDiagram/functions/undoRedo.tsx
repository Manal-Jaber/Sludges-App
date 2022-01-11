import { Point } from 'renderer/components/Types';

export const undo = (
  undoStack: Point[][],
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  redoStack: Point[][],
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>
) => {
  const [previousPoints, ...restOfUndo] = undoStack;
  setUndoStack(restOfUndo);
  setRedoStack([...generatedPoints, ...redoStack]);
  setGeneratedPoints((prev) => {
    prev.pop();
    return prev;
  });
};

export const redo = (
  undoStack: Point[][],
  setUndoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  redoStack: Point[][],
  setRedoStack: React.Dispatch<React.SetStateAction<Point[][]>>,
  generatedPoints: Point[][],
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>
) => {
  const [redoPoints, ...restOfRedo] = redoStack;
  setRedoStack(restOfRedo);
  setUndoStack([generatedPoints, ...undoStack]);
  setGeneratedPoints(redoPoints);
};
