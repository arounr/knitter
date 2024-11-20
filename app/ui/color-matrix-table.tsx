import React from 'react';

const ColorMatrixTable = ({ matrix, colors }: { matrix: Array<Array<number>>, colors: Array<string> }) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto border-collapse">
        <tbody>
          {matrix.map((row: number[], rowIndex: React.Key | null | undefined) => (
            <tr key={rowIndex}>
              {row.map((cellValue: number, cellIndex: React.Key | null | undefined) => {
                // Skip if cellValue is 0 (assuming 0 represents a transparent or empty cell)
                if (cellValue === 0) {
                  return (
                    <td key={cellIndex} className="w-1 h-1 border border-gray-200">
                      {/* Empty cell */}
                    </td>
                  );
                }

                // Get the color corresponding to the cellValue
                const cellColor = colors[cellValue - 1] || '#FFFFFF';

                return (
                  <td
                    key={cellIndex}
                    className="w-1 h-1"
                    style={{ backgroundColor: cellColor }}
                    onClick={() => {

                    }}
                  ></td>
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