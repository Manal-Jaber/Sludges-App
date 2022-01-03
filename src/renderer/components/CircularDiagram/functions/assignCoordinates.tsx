// to assign coordinates on mouse click
export const assignCoordinates = (
  e: any,
  radius: number,
  width: number,
  height: number,
  setRenderInput: React.Dispatch<React.SetStateAction<boolean>>,
  setXPoint: React.Dispatch<React.SetStateAction<number>>,
  setYPoint: React.Dispatch<React.SetStateAction<number>>,
  setRPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  // change to input
  setRenderInput(true);
  // X and Y coordinates relative to the boundary of the circle
  const xBound = e.nativeEvent.offsetX;
  const yBound = e.nativeEvent.offsetY;
  // X and Y relative coordinates ranging in [-100, 100]
  const xRelative = (xBound / width) * 2 * radius - radius; // /width*200 to have 200 as width and -100 to have negative and positive values
  const yRelative = radius - (yBound / height) * 2 * radius;
  // radius
  const rRelative = Math.sqrt(xRelative ** 2 + yRelative ** 2);
  // setting coordinates to the nearest hundredth
  setXPoint(Math.round(xRelative * 100) / 100);
  setYPoint(Math.round(yRelative * 100) / 100);
  setRPoint(Math.round(rRelative * 100) / 100);
  // Drawing the point
  // const node = document.create
  //   <svg
  //     className="center"
  //     width="5"
  //     height="5"
  //     viewBox="0 0 5 5"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <circle cx="2.5" cy="2.5" r="2.5" fill="#A47A51" />
  //   </svg>
  // );
  var svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  let newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  newElement.setAttribute('fill', '#A47A51');
  newElement.setAttribute('cx', '2.5');
  newElement.setAttribute('cy', '2.5');
  newElement.setAttribute('r', '2.5');
  svgElement.appendChild(newElement);
  // svgElement.setAttribute('position', 'absolute');
  svgElement.setAttribute('x', xBound);
  svgElement.setAttribute('y', yBound);
  svgElement.setAttribute('height', '5');
  svgElement.setAttribute('width', '5');
  document.querySelector('#circle')?.appendChild(svgElement);
};
