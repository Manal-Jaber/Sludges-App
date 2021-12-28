import React from 'react';
import Button from '../Button';
import XLSX from 'xlsx';
import { Point } from './Types';
import './index.scss';

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
  const exportTable = () => {
    // here we should apply the data stored in the state holding the array of generated points
    const worksheet = XLSX.utils.json_to_sheet([
      {
        id: 1,
        name: 'Mohammad',
        age: 22,
      },
      {
        id: 2,
        name: 'Manal',
        age: 22,
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'points');
    // Buffer
    XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // Binary string
    XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    // Download
    XLSX.writeFile(workbook, 'points_sheet.xlsx');
  };

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
