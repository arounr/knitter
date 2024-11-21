'use client';

import React, { useState, useEffect, useRef } from 'react';

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
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (rowIndex: number, cellIndex: number) => {
    setIsHoldingDown(true);
    onCellClick(rowIndex, cellIndex);
  };

  const handleMouseUp = () => {
    setIsHoldingDown(false);
  };

  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isHoldingDown) {
      onCellClick(rowIndex, cellIndex);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsHoldingDown(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const numCols = matrix[0]?.length || 0;

  return (
    <div className="overflow-auto w-full h-full" onMouseUp={handleMouseUp}>
      <div
        ref={gridRef}
        className="grid border border-gray-200"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          width: '100%',
          height: '100%',
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cellValue, cellIndex) => {
            const cellColor = cellValue === 0 ? 'gray' : colors[cellValue - 1];
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className="border border-gray-200"
                style={{
                  backgroundColor: cellColor,
                  aspectRatio: '1 / 1',
                  width: '100%',
                  height: 'auto',
                }}
                onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default ColorMatrixTable;
