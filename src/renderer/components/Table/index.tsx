import { table } from 'console';
import React from 'react';
import Button from '../Button';
import './index.scss';
import { Point } from './Types';

interface Table {}

{
  /* TODO: to be removed after adding states and legit data */
}
const point: Point = {
  point: 'A0',
  x: 10,
  y: 20,
  r: 30,
};

const points: Point[] = [point, point, point, point, point];

const Table: React.FC<Table> = () => {
  // Listeners
  const exportTable = () => {};

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <th>Point</th>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Z</th>
        </thead>
        <tbody>
          {/* TODO: to be replaced with state */}
          {points.map((point, index) => {
            return (
              <tr key={index}>
                {Object.entries(point).map((value, key) => {
                  return <td key={key}>{value[1]}</td>;
                })}
                <td>
                  <input className="z-input" min={0} type="number" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        text="Export table"
        className="generate-pt-btn"
        listener={exportTable}
      />
    </div>
  );
};

export default Table;
