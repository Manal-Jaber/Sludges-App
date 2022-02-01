import { type } from 'os';

export interface Point {
  id: number;
  point: string;
  x: number;
  y: number;
  r: number;
  z: number;
  color?: string;
}
export interface data {
  id: number[];
  name: string[];
  x: number[];
  y: number[];
  zData: zData[];
  z: number[][];
}
type zData = { zValue: number; xIndex: number; yIndex: number };
