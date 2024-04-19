export class rover {
  private position: point = { x: 1, y: 1 };
  private orientation: string = "N";
  constructor(initalPosition: point, initalorientation: string) {
    this.position = initalPosition;
    this.orientation = initalorientation;
  }

  getPosition() {
    return this.position;
  }
  getOrientation() {
    return this.orientation;
  }
}

export type point = {
  x: number;
  y: number;
};
