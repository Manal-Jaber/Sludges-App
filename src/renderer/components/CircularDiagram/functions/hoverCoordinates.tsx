// to reset coordinates on mouse movement
export const hoverCoordinates = (
  e: any,
  radius: number,
  width: number,
  height: number,
  setXVal: React.Dispatch<React.SetStateAction<number>>,
  setYVal: React.Dispatch<React.SetStateAction<number>>,
  setRVal: React.Dispatch<React.SetStateAction<number>>
) => {
  // X and Y coordinates relative to the boundary of the circle
  const xBound = e.nativeEvent.offsetX;
  const yBound = e.nativeEvent.offsetY;
  // X and Y relative coordinates ranging in [-100, 100]
  const xRelative = (xBound / width) * 2 * radius - radius; // /width*200 to have 200 as width and -100 to have negative and positive values
  const yRelative = radius - (yBound / height) * 2 * radius;
  // radius
  const rRelative = Math.sqrt(xRelative ** 2 + yRelative ** 2);
  setXVal(Math.round(xRelative * 100) / 100);
  setYVal(Math.round(yRelative * 100) / 100);
  setRVal(Math.round(rRelative * 100) / 100);
};
