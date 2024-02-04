import PlayerInput from "./PlayerInput.js";
import Stage3D from "./stage-3d/Stage3D.js";

const stage3D = new Stage3D();

const playerInput = new PlayerInput();
playerInput.addEventListener("move", (event) => {
  stage3D.movePlayer(event.direction);
});
playerInput.addEventListener("toggleDebug", () => {
  console.log("toggleDebug");
});
