export abstract class MapTemplate {
  getMap() {}
  getMapRows(): number {
    return 0;
  }
  getMapColumns(): number {
    return 0;
  }
  hasObstacle(row: number, column: number): boolean {
    return false;
  }
  createObstacles(): void {}
}
