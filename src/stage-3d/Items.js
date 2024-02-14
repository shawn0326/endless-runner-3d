import { Object3D } from "t3d";

export default class Items extends Object3D {
  constructor(resources) {
    super();

    this._activeItems = []; // { type: <ItemTypes>, position: <Vector3>, alive: <boolean> }
    this._pool = new Map([
      [ItemTypes.SHIELD, []],
      [ItemTypes.FOG, []],
      [ItemTypes.COIN, []],
      [ItemTypes.OBSTACLE, []],
    ]);
  }

  emit(deltaTime) {
    // TODO
  }

  scroll(delta) {
    // TODO
  }

  collide(player) {
    // TODO
  }
}

const ItemTypes = {
  SHIELD: 1,
  FOG: 2,
  COIN: 3,
  OBSTACLE: 4,
};

const ItemPowerChange = {
  [ItemTypes.SHIELD]: 0,
  [ItemTypes.FOG]: 0,
  [ItemTypes.COIN]: +2,
  [ItemTypes.OBSTACLE]: -10,
};
