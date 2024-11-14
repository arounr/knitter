'use client';

import { useEffect, useState } from 'react';
import SubmitButton from '@/ui/submit-button';

export default function PatternEditingPage() {
  const [name, setName] = useState(' ');
  const [colors, setColors] = useState(4);
  const [color, setColor] = useState([
    '#A8DADC',
    '#A7D49B',
    '#CDB4DB',
    '#F7D794',
  ]);
  const [width, setWidth] = useState(30);
  const [rows, setRows] = useState(30);
  const [tempWidth, setTempWidth] = useState(width);
  const [tempRows, setTempRows] = useState(rows);
  const [grid, setGrid] = useState<number[][]>([]); // Store color indices as numbers (0, 1, 2, 3)
  const [activeColorIndex, setActiveColorIndex] = useState(0); // Track the selected color index
  const [history, setHistory] = useState<any[]>([]);

  const handleGridCellClick = (rowIdx: number, colIdx: number) => {
    saveToHistory();
    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIdx && cIdx === colIdx ? activeColorIndex : cell,
        ),
      );
      return updatedGrid;
    });
  };

  const saveToHistory = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        grid: JSON.parse(JSON.stringify(grid)),
        width: width,
        rows: rows,
        color: [...color],
      },
    ]);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setWidth(previousState.width);
      setRows(previousState.rows);
      setColor(previousState.color);
      setActiveColorIndex(0);
      setGrid(previousState.grid);
    }
  };

  useEffect(() => {
    setGrid((prevGrid) => {
      const newGrid = [];

      // Adjust rows
      for (let r = 0; r < rows; r++) {
        if (prevGrid[r]) {
          // Adjust columns for existing rows
          newGrid[r] = [
            ...prevGrid[r].slice(0, width), // Slice off columns to new width
            ...Array(Math.max(width - prevGrid[r].length, 0)).fill(0), // add index 0 (first color) to new cells if width increased
          ];
        } else {
          // Add new rows with index 0 if the number of rows increased
          newGrid[r] = Array(width).fill(0);
        }
      }

      return newGrid;
    });
  }, [width, rows]);

  return (
    <main className="mt-8">
      <div className="mt-8 p-4 max-w-lg mx-auto">
        {/* Pattern Name and Public Checkbox */}
        <div className="flex justify-between mb-4">
          <div className="flex flex-col w-full mr-4">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[var(--color-text-secondary)]"
            >
              Pattern Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength={1}
              maxLength={128}
              size={20}
              onChange={(e) => setName(e.target.value)}
              defaultValue=""
              className="w-full px-4 py-2 mt-1 bg-[var(--color-input-bg)] rounded-md focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-6">
            <label
              htmlFor="public"
              className="text-sm font-medium text-[var(--color-text-secondary)] mr-2"
            >
              Public
            </label>
            <input type="checkbox" id="public" name="public" defaultChecked />
          </div>
        </div>

        {/* Width and Rows Selector with Apply Changes */}
        <section className="flex flex-col items-center p-4 border border-[var(--color-text-secondary)] rounded-md mb-4">
          <div className="flex justify-between w-full mb-4">
            {/* Width Input */}
            <div className="flex items-center">
              <label className="mr-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Set Width:
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={tempWidth}
                onChange={(e) => setTempWidth(Number(e.target.value))}
                className="w-20 h-8 text-center bg-[var(--color-input-bg)] border border-gray-300 rounded p-2"
              />
            </div>

            {/* Rows Input */}
            <div className="flex items-center ml-4">
              <label className="mr-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Set Rows:
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={tempRows}
                onChange={(e) => setTempRows(Number(e.target.value))}
                className="w-20 h-8 text-center bg-[var(--color-input-bg)] border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          {/* Apply Changes Button */}
          <button
            onClick={() => {
              saveToHistory();
              setWidth(tempWidth);
              setRows(tempRows);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
          >
            Apply Changes
          </button>
        </section>

        <section className="flex justify-between mb-4">
          {/* Color Selectors */}
          <ol className="flex flex-wrap space-x-4 mb-4">
            {color.map((colorValue, index) =>
              index < colors ? (
                <li key={index} className="flex flex-col items-center">
                  <label
                    htmlFor={'Color' + index}
                    className="text-sm text-[var(--color-text-secondary)]"
                  >
                    Color {index + 1}
                  </label>
                  <input
                    type="color"
                    value={colorValue}
                    onChange={(e) => {
                      saveToHistory();
                      const newColorValue = e.target.value;
                      setColor((prevColors) => {
                        const updatedColors = [...prevColors];
                        updatedColors[index] = newColorValue;
                        return updatedColors;
                      });
                    }}
                    className="w-16 h-10"
                    onClick={() => setActiveColorIndex(index)}
                  />
                </li>
              ) : null,
            )}
          </ol>

          {/* Undo button */}
          <button
            onClick={undo}
            className="bg-red-500 text-white py-2 px-4 rounded mb-4 w-32 h-16"
            disabled={history.length === 0}
          >
            Undo
          </button>
        </section>

        {/* Display Rows and Width */}
        <div className="flex w-full items-center justify-between text-sm font-medium text-[var(--color-text-secondary)]">
          <p>Rows: {rows}</p>
          <p>Width: {width}</p>
        </div>
      </div>

      {/* Display Grid */}
      <div
        className="grid mt-4"
        style={{
          gridTemplateColumns: `repeat(${width}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellColorIndex, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: color[cellColorIndex], // Fetch hex color based on index
                width: '15px',
                height: '15px',
                border: '0.5px solid rgba(255, 255, 255, 0.5)',
              }}
              className="border cursor-pointer"
              onClick={() => handleGridCellClick(rowIndex, colIndex)}
            ></div>
          )),
        )}
      </div>

      <div className="flex item-center justify-center">
        {/* Save Pattern Button */}
        <SubmitButton
          className="w-32 mt-8 py-2 font-medium text-[var(--color-primary-text)] bg-[var(--color-button-bg)] rounded-md hover:bg-[var(--color-button-bg-hover)] focus:ring-2 focus:ring-[var(--color-button-bg)] focus:outline-none"
          text="Save Pattern"
        />
      </div>
    </main>
  );
}
