export class MarsMap {
  private map: Number[][];
  private rows: number;
  private columns: number;
  constructor(mapSize: string) {
    this.map = [];
    this.rows = Number(mapSize.split(" ")[0]);
    this.columns = Number(mapSize.split(" ")[1]);
    for (var row = 0; row < this.rows; row++) {
      this.map[row] = [];
      for (var column = 0; column < this.columns; column++) {
        this.map[row][column] = 0;
      }
    }
  }
  getMap() {
    return this.map;
  }
  getMapRows() {
    return this.rows;
  }
}
