import { MapTemplate } from "./MapTemplate";

export class MarsMap extends MapTemplate {
  private map: Number[][];
  private rows: number;
  private columns: number;
  constructor(mapSize: string) {
    super();
    this.map = [];
    this.rows = Number(mapSize.split(" ")[0]);
    this.columns = Number(mapSize.split(" ")[1]);
    this.create2dMap();
  }
  override getMap() {
    return this.map;
  }
  override getMapRows(): number {
    return this.rows;
  }
  override getMapColumns(): number {
    return this.columns;
  }
  create2dMap() {
    for (var row = 0; row < this.rows; row++) {
      this.map[row] = [];
      for (var column = 0; column < this.columns; column++) {
        this.map[row][column] = 0;
      }
    }
  }
  public override createObstacles(): void {
    this.map[3][0] = 1;
  }
  override hasObstacle(row: number, column: number): boolean {
    if (this.map[row][column] === 1) return true;
    return false;
  }
}
