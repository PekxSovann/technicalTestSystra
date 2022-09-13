import React, { useState } from 'react';

// Added library to get the color of the random-ed hex value generated
import { GetColorName } from 'hex-color-to-color-name';

import {ICell} from './type';

export interface InputProps {
  generateMap: (generatedWidth: string, generatedHeight: string, generatedColors: string) => void;
  solvedColor: string;
  isSolved: boolean
  setSolving: React.Dispatch<React.SetStateAction<boolean>>;
  solve: () => void;
  biggestAreaStack: ICell[];
}

const Inputs = (props: InputProps): React.ReactElement => {
  const {
    generateMap,
    biggestAreaStack,
    solvedColor,
    solve,
    isSolved,
    setSolving,
  } = props;

  const [width, setWidth] = useState("1");
  const [height, setHeight] = useState("1");
  const [colors, setColors] = useState("1");

  return (
    <header className="App-header">
      <div>
        Width:
        <input className="generate-button" type="number" name="width" min={1} max={100} value={width} onChange={(e) => setWidth(e.target.value)} />
      </div>
      <div>
        Height:
        <input className="generate-button" type="number" name="height" min={1} max={100} value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        Colors:
        <input className="generate-button" type="number" name="colors" min={1} max={100} value={colors} onChange={(e) => setColors(e.target.value)} />
      </div>
      {biggestAreaStack.length > 0 && isSolved && (<div>
        The biggest area contains {biggestAreaStack.length} cells with {GetColorName(solvedColor)} color
      </div>)}

      <div className="Form-button">
        <input
          className="generate-button"
          type="submit"
          value="Generate"
          onClick={(e) => {
            generateMap(width, height, colors);
            setSolving(false);
            e.preventDefault();
          }}
        />
        <input
          disabled={isSolved}
          className="generate-button"
          type="submit"
          value="Solve"
          onClick={(e) => {
            solve();
            setSolving(true);
            e.preventDefault();
          }}
        />
      </div>
    </header>
  );
};

export default Inputs;