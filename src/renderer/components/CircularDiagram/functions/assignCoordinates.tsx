import { getRelativeX, getRelativeY } from './bound-relative-coordinates';
import { drawPoint } from './drawPoint';
// to assign coordinates on mouse click
export const assignCoordinates = (
  e: any,
  namePoint: string,
  setRenderInput: React.Dispatch<React.SetStateAction<boolean>>,
  setMarker: React.Dispatch<React.SetStateAction<boolean>>,
  setXPoint: React.Dispatch<React.SetStateAction<number>>,
  setYPoint: React.Dispatch<React.SetStateAction<number>>,
  setRPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  // change to input
  setRenderInput(true);
  setMarker(false);
  // X and Y coordinates relative to the boundary of the circle
  const xBound = e.nativeEvent.offsetX;
  const yBound = e.nativeEvent.offsetY;
  // X and Y relative coordinates ranging in [-100, 100]
  const xRelative = getRelativeX(xBound);
  const yRelative = getRelativeY(yBound);
  // radius
  const rRelative = Math.sqrt(xRelative ** 2 + yRelative ** 2);
  // setting coordinates to the nearest hundredth
  setXPoint(Math.round(xRelative * 100) / 100);
  setYPoint(Math.round(yRelative * 100) / 100);
  setRPoint(Math.round(rRelative * 100) / 100);
  drawPoint(namePoint, parseInt(xBound), parseInt(yBound), 'marker');
};
