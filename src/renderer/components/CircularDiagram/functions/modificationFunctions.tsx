// Changing X Input
export const modifyXValue = (
  e: any,
  yPoint: number,
  setXPoint: React.Dispatch<React.SetStateAction<number>>,
  setRPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  const newX = e.target.value;
  setXPoint(newX);
  // changing r based on x
  const newR = Math.sqrt(newX ** 2 + yPoint ** 2);
  setRPoint(Math.round(newR * 100) / 100);
};

// Changing Y Input
export const modifyYValue = (
  e: any,
  xPoint: number,
  setYPoint: React.Dispatch<React.SetStateAction<number>>,
  setRPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  const newY = e.target.value;
  setYPoint(newY);
  // changing r based on y
  const newR = Math.sqrt(newY ** 2 + xPoint ** 2);
  setRPoint(Math.round(newR * 100) / 100);
};

// Changing Z Input
export const modifyZValue = (
  e: any,
  setZPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  setZPoint(e.target.value);
};

// Changing Radius Input
export const modifyRValue = (
  e: any,
  xPoint: number,
  setRPoint: React.Dispatch<React.SetStateAction<number>>,
  setYPoint: React.Dispatch<React.SetStateAction<number>>
) => {
  const newR = e.target.value;
  setRPoint(newR);
  // changing y based on r
  const newY = Math.sqrt(newR ** 2 - xPoint ** 2);
  setYPoint(Math.round(newY * 100) / 100);
};

// Changing Number Input
export const modifyNumber = (
  e: any,
  setNumberOfPoints: React.Dispatch<React.SetStateAction<number>>
) => {
  setNumberOfPoints(e.target.value);
};

// Changing Point Options Radio Input
export const modifyPointsOptions = (
  setPointsOptions: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setPointsOptions((prev) => !prev);
};
