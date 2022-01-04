import { width, height, radius } from '..';
// Getting coordinates Relative to  the center of the circle
export const getRelativeX = (xBound: number) => {
  return (xBound / width) * 2 * radius - radius;
  // /width*200 to have 200 as width and -100 to have negative and positive values
};
export const getRelativeY = (yBound: number) => {
  return radius - (yBound / height) * 2 * radius;
};
// Getting coordinates Relative to the Boundary of the circle
export const getBoundX = (xRelative: number) => {
  return ((xRelative + radius) * width) / (2 * radius);
};

export const getBoundY = (yRelative: number) => {
  return ((radius - yRelative) * height) / (2 * radius);
};
