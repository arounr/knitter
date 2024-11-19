export async function fetchBackgroundPattern(
  backgroundName: string,
): Promise<Array<Array<number>>> {
  try {
    const path = '/backgrounds/'.concat(backgroundName);
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch background pattern file: ${response.statusText}`,
      );
    }

    const backgroundText = await response.text();

    // process text file into array:

    const backgroundMatrix: Array<Array<number>> = backgroundText
      .split('\n')
      .map((line) => line.split(' ').map(Number));

    return backgroundMatrix;
  } catch (e) {
    console.error('Error parsing background into matrix:', e);
    return [];
  }
}

export function addBackground(
  matrix: Array<Array<number>>,
  backgroundSmallest: Array<Array<number>>,
  backgroundStarts = [],
  matrixBackgroundColor = 0,
  border = true,
  borderColor = 0,
  backgroundColors = [0, 3],
) {
  const n = matrix.length;
  const m = matrix[0].length;

  backgroundSmallest = backgroundSmallest.slice(0, -2);
  backgroundSmallest = backgroundSmallest.map((row) => row.slice(0, -1));

  const backgroundSmallestN = backgroundSmallest.length;
  const backgroundSmallestM = backgroundSmallest[0].length;

  // Adjust background matrix values
  for (let i = 0; i < backgroundSmallestN; i++) {
    for (let j = 0; j < backgroundSmallestM; j++) {
      backgroundSmallest[i][j] = backgroundSmallest[i][j] === 1 ? 11 : 10;
    }
  }

  // expand background vertically
  const wholeMultiplesVertical = Math.floor(n / backgroundSmallestN);
  let background = Array(wholeMultiplesVertical)
    .fill(backgroundSmallest)
    .flat();
  const remainingBackgroundHeight = n - background.length;
  if (remainingBackgroundHeight > 0) {
    background = background.concat(
      backgroundSmallest.slice(0, remainingBackgroundHeight),
    );
  }

  //expand background horizontally
  const wholeMultiplesHorizontal = Math.floor(m / backgroundSmallestM);
  background = background.map((row) => {
    const expandedRow = Array(wholeMultiplesHorizontal).fill(row).flat();
    const remainingBackgroundLength = m - expandedRow.length;
    return remainingBackgroundLength > 0
      ? expandedRow.concat(row.slice(0, remainingBackgroundLength))
      : expandedRow;
  });

  // Initialize flood-fill from corners or custom starts
  const toVisit =
    backgroundStarts.length > 0
      ? [...backgroundStarts]
      : [
          [0, 0],
          [n - 1, 0],
          [0, m - 1],
          [n - 1, m - 1],
        ];

  const nonBorderColors = [matrixBackgroundColor, 10, 11, 13];

  while (toVisit.length > 0) {
    const current: [number, number] = toVisit.shift() as [number, number]; // Explicitly type `current`
    if (!current) break;
    const [i, j] = current;
    let borderEncountered = false;

    // Define directions (up, down, left, right)
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    directions.forEach(([di, dj]) => {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < n && nj >= 0 && nj < m) {
        if (
          matrix[ni][nj] === matrixBackgroundColor &&
          !toVisit.some(([x, y]) => x === ni && y === nj)
        ) {
          toVisit.push([ni, nj]);
        }
        if (!nonBorderColors.includes(matrix[ni][nj])) {
          borderEncountered = true;
        }
      }
    });

    if (border && borderEncountered) {
      matrix[i][j] = 13;
    } else {
      matrix[i][j] = background[i][j];
    }
  }

  // Replace values in the matrix
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 11) matrix[i][j] = backgroundColors[1];
      if (matrix[i][j] === 10) matrix[i][j] = backgroundColors[0];
      if (border && matrix[i][j] === 13) matrix[i][j] = borderColor;
    }
  }

  return matrix;
}
