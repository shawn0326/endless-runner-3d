import { Object3D, PBRMaterial, Mesh, BoxGeometry } from "t3d";
import GameConfig from "../GameConfig";

const { TRACK_X, PLAYER_Z } = GameConfig;

export default class Player extends Object3D {
  constructor(resources) {
    super();

    const playerMaterial = new PBRMaterial();

    const playerGeometry = new BoxGeometry(1, 1);

    const playerMesh = new Mesh(playerGeometry, playerMaterial);
    this.add(playerMesh);

    this._track = 1;
  }

  pose() {
    this._track = 1;
    this.position.set(TRACK_X[this._track], 0, PLAYER_Z);
  }

  // direction: -1 for left, 1 for right
  move(direction) {
    // TODO: Use tween to animate the movement

    console.log(`Player is moving to ${direction === -1 ? "left" : "right"}`);

    let track = this._track + direction;
    if (track < 0) track = 0;
    if (track > 2) track = 2;
    this._track = track;

    this.position.set(TRACK_X[this._track], 0, PLAYER_Z);
  }
}
