import React from 'react';

import { ICell, IGraphicalMap, IMap } from './type';

export interface MapProps {
  biggestAreaStack: ICell[];
  isSolved: boolean
  map: IGraphicalMap;
}

const Map = (props: MapProps): React.ReactElement => {
  const {
    biggestAreaStack,
    isSolved,
    map,
  } = props;

  // Display the content of the map
  const displayCell = () => {
    return map.map.map((row: IMap[], y): React.ReactElement => {
      return <div className={`width: ${50 / map.map.length}vmin`}>
        {row.map((cell: IMap, x): React.ReactElement => {
          const isSolvedCell = isSolved
            && biggestAreaStack.find((element) => element.y === y && element.x === x);
          return <div
            style={{
              height: `${50 / row.length}vmin`,
              width: `${50 / map.map.length}vmin`,
              backgroundColor: `${cell.color}`,
              border: `solid 0.5px black`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isSolvedCell && (
                <div>{biggestAreaStack.length}</div>
            )}
          </div>;
        })}
      </div>
    });
  }

  return (
    <body className="map">
      <div className="Generated-map">
        {displayCell()}
      </div>
    </body>
  );
};

export default Map;