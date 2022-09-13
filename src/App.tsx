import React, { useState } from 'react';

import Inputs from './Inputs';
import Map from './Map';

import { ICell, IGraphicalMap, IMap } from './type';

import './App.css';

const App = (): React.ReactElement => {
  const [map, setMap] = useState<IGraphicalMap>({ height: 0, width: 0, map: [] });
  const [biggestAreaStack, setAreaStack] = useState<ICell[]>([]);
  const [solvedColor, setSolvedColor] = useState('');
  const [isSolved, setSolving] = useState(false);

  // Create a random color list
  const generateColors = (colors: string): string[] => {
    const listOfColors: string[] = [];
    const colorNumber: Number = parseInt(colors);

    while (listOfColors.length < colorNumber) {
      const color: string = Math.random().toString(16).substr(-6);
      if (!listOfColors.includes(color)) {
        listOfColors.push(color);
      }
    }
    return listOfColors;
  };

  // Generate the map with the right props
  const generateMap = (generatedWidth: string, generatedHeight: string, generatedColors: string) => {
    // We declare all the converted value to
    // avoid calling the ParseInt function everytime
    // in each loop
    const getColors: string[] = generateColors(generatedColors);
    const getWidth: number = parseInt(generatedWidth);
    const getHeight: number = parseInt(generatedHeight);
    const colorNumber: number = parseInt(generatedColors);
    const newMap: IGraphicalMap = { height: getHeight, width: getWidth, map: [] };

    for (let i = 0; i < getHeight; i++) {
      newMap.map.push([]);
      for (let k = 0; k < getWidth; k++) {
        const cellColor: string = getColors[Math.floor((Math.random() * 100) % colorNumber)];
        newMap.map[i].push({ color: `#${cellColor}`, isVisited: false });
      }
    }
    console.log(newMap);
    setMap(newMap);
  };

  // Solving function for the generated map
  const solve = () => {
    const solvedMap = map.map;
    let areaStack: { y: number, x: number }[] = []
    let colorFound = '';
    let maxSize = 0;
    let size = 1;

    // Check if the targeted cell value is visited and
    // if it's a cell with the same color
    const checkAround = (x: number, y: number, stack: ICell[], currentCell: ICell, solvedMap: IMap[][]) => {
      if (solvedMap[y] && solvedMap[y][x] && !areaStack.find((element) => element.y === y && element.x === x) && solvedMap[currentCell.y][currentCell.x].color === solvedMap[y][x].color) {
        solvedMap[y][x].isVisited = true;
        stack.push({ y: y, x: x });
        areaStack.push({ y: y, x: x });
        size += 1;
      }
    };


    // Check all the cells around the processed cell
    const computeCell = (solvedMap: IMap[][], x: number, y: number): number => {
      const stack: ICell[] = [];

      stack.push({ y: y, x: x });
      areaStack.push({ y: y, x: x });

      while (stack.length) {
        let currentCell = stack.pop();

        if (!currentCell)
          break;
        solvedMap[y][x].isVisited = true;
        checkAround(currentCell.x - 1, currentCell.y, stack, currentCell, solvedMap);
        checkAround(currentCell.x + 1, currentCell.y, stack, currentCell, solvedMap);
        checkAround(currentCell.x, currentCell.y + 1, stack, currentCell, solvedMap);
        checkAround(currentCell.x, currentCell.y - 1, stack, currentCell, solvedMap);
      }
      return size;
    };

    // Main loop to check every non-visited cells
    solvedMap.forEach((_, y) => {
      solvedMap[y].forEach((_, x) => {
        if (!solvedMap[y][x].isVisited)
          size = computeCell(solvedMap, x, y);
        if (size > maxSize) {
          maxSize = size;
          colorFound = solvedMap[y][x].color;
          setSolvedColor(colorFound);
          setAreaStack(areaStack);
        }
        size = 1;
        areaStack = [];
      })
    })
  };

  return (
    <div className="App">
      <Inputs
        generateMap={generateMap}
        solvedColor={solvedColor}
        isSolved={isSolved}
        setSolving={setSolving}
        biggestAreaStack={biggestAreaStack}
        solve={solve}
      />

      <Map
        map={map}
        biggestAreaStack={biggestAreaStack}
        isSolved={isSolved}
      />
    </div>
  );
}

export default App;
