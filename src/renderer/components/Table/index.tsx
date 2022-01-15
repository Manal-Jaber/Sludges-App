import React from 'react';
import Button from '../Button';
import XLSX from 'xlsx';
import { Point2 } from './Types';

import './index.scss';
import { Point } from 'renderer/components/Types/index';

// importing functions
import { zTableModify } from 'renderer/components/Table/functions/zTableModify';

interface Table {
  generatedPoints: Point[][];
  setGeneratedPoints: React.Dispatch<React.SetStateAction<Point[][]>>;
}

const Table: React.FC<Table> = ({ generatedPoints, setGeneratedPoints }) => {
  // Listeners
  const exportTable = () => {
    // here we should apply the data stored in the state holding the array of generated points
    const worksheetArray: Point[] = [];
    generatedPoints.forEach((collection) => {
      collection.forEach((item) => {
        const worksheetPoint = (({ color, alpha, ...o }) => o)(item);
        worksheetArray.push(worksheetPoint);
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetArray);
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
          {generatedPoints.map((collection, collectionIndex) => {
            return (
              <>
                {collection.map((point, pointIndex) => {
                  return (
                    <tr key={pointIndex}>
                      {Object.entries(point)
                        .slice(0, -3)
                        .map((attribute, key) => {
                          const value = attribute[1];
                          const roundedValue =
                            typeof value === 'number'
                              ? Math.round(value * 100) / 100
                              : value;
                          return (
                            <td
                              key={key}
                              style={{ color: key === 0 ? point.color : '' }}
                            >
                              {roundedValue}
                            </td>
                          );
                        })}
                      <td>
                        <input
                          className="z-input"
                          value={point.z}
                          min={0}
                          type="number"
                          onChange={(e) =>
                            zTableModify(
                              e,
                              collectionIndex,
                              pointIndex,
                              setGeneratedPoints
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
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
