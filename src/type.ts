export interface ICell {
  x: number;
  y: number;
}

export interface IMap {
  color: string;
  isVisited: boolean;
};

export interface IGraphicalMap {
  map: IMap[][];
  width: number;
  height: number
}