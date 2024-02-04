import { EventDispatcher } from "t3d";

export default class PlayerInput extends EventDispatcher {
  constructor() {
    super();

    this._enabled = true;

    document.addEventListener("keydown", (event) => {
      if (!this._enabled) return;

      switch (event.key) {
        case "ArrowLeft":
          this.dispatchEvent({ type: "move", direction: -1 });
          break;
        case "ArrowRight":
          this.dispatchEvent({ type: "move", direction: 1 });
          break;
        case "F8":
          this.dispatchEvent({ type: "toggleDebug" });
          break;
      }
    });

    document.addEventListener("pointerup", (event) => {
      if (!this._enabled) return;

      const direction = event.clientX > window.innerWidth / 2 ? 1 : -1;
      this.dispatchEvent({ type: "move", direction });
    });
  }

  enable() {
    this._enabled = true;
    return this;
  }

  disable() {
    this._enabled = false;
    return this;
  }

  get enabled() {
    return this._enabled;
  }
}
