import { TEXEL_ENCODING_TYPE } from "t3d";
import { Texture2DLoader } from "t3d/addons/loaders/Texture2DLoader.js";

export default class Resources {
  constructor() {
    this._textureLoader = new Texture2DLoader();

    this.tasks = [
      {
        name: "sky",
        type: "image",
        uri: "images/uv_grid.jpg",
      },
      {
        name: "road",
        type: "image",
        uri: "images/uv_grid.jpg",
      },
    ];

    this._map = new Map();

    this._loaded = false;
  }

  load() {
    const promises = this.tasks.map((task) => this._loadTask(task));
    return Promise.all(promises).then(() => {
      this._loaded = true;
      return this._map;
    });
  }

  get(name) {
    return this._map.get(name);
  }

  get loaded() {
    return this._loaded;
  }

  _loadTask(task) {
    switch (task.type) {
      case "image":
        return this._loadImage(task);
      default:
        throw new Error(`Unknown task type: ${task.type}`);
    }
  }

  _loadImage(task) {
    return this._textureLoader.loadAsync(`./${task.uri}`).then((texture) => {
      texture.encoding = TEXEL_ENCODING_TYPE.SRGB;
      this._map.set(task.name, texture);
    });
  }
}
