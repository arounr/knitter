export const patternMatrixToGrid = (
  patternMatrix: string[],
  rows: number,
  width: number,
): number[][] => {
  const grid: number[][] = [];

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    const matrixRow = patternMatrix[r] || '';
    for (let w = 0; w < width; w++) {
      const cellValue = matrixRow[w] ? parseInt(matrixRow[w], 10) : 0;
      row.push(cellValue);
    }
    grid.push(row);
  }

  return grid;
};

export const gridToPatternMatrix = (grid: number[][]) => {
  const patternMatrix = [];

  for (let r = 0; r < grid.length; r++) {
    const row: string = '';
    for (let w = 0; w < grid[0].length; w++) {
      const cellValue = grid[r][w].toString();
      row.concat(cellValue);
    }
    patternMatrix.push(row);
  }
};
