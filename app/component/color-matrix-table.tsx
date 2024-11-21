'use client'
import React, { useState } from 'react';

const ColorMatrixTable = ({
  matrix,
  colors,
  onCellClick,
}: {
  matrix: number[][];
  colors: string[];
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}) => {
  const [isHoldingDown, setIsHoldingDown] = useState(false);

  const handleMouseDown = (rowIndex: number, cellIndex: number) => {
    setIsHoldingDown(true);
    onCellClick(rowIndex, cellIndex); // Paint the first cell on mouse down
  };

  const handleMouseUp = () => {
    setIsHoldingDown(false);
  };

  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isHoldingDown) {
      onCellClick(rowIndex, cellIndex); // Paint cells as mouse moves while held down
    }
  };

  return (
    <div
      className="overflow-auto"
      onMouseUp={handleMouseUp} // Ensure mouse up stops the dragging behavior
    >
      <table className="table-auto border-collapse">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellValue, cellIndex) => {
                const cellColor = cellValue === 0 ? 'gray' : colors[cellValue - 1];
                return (
                  <td
                    key={cellIndex}
                    className="w-1 h-1 border border-gray-200"
                    style={{ backgroundColor: cellColor }}
                    onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorMatrixTable;
