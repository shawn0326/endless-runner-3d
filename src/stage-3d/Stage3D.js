import { Scene, Camera, TEXEL_ENCODING_TYPE, Vector3, AmbientLight, DirectionalLight } from "t3d";
import { OrbitControls } from "t3d/addons/controls/OrbitControls.js";
import { AxisHelper } from "t3d/addons/objects/AxisHelper.js";
import GameConfig from "../GameConfig.js";
import Resources from "./Resources.js";
import Renderer from "./Renderer.js";
import SkyPlane from "./SkyPlane.js";
import Road from "./Road.js";
import Player from "./Player.js";
import Items from "./Items.js";

const { CAMERA_FOV, CAMERA_IDLE_POSITION } = GameConfig;

export default class Stage3D {
  constructor() {
    let width = window.innerWidth || 2;
    let height = window.innerHeight || 2;

    this._resources = new Resources();
    this._renderer = new Renderer(width, height);

    const scene = new Scene();

    const camera = new Camera();
    camera.outputEncoding = TEXEL_ENCODING_TYPE.SRGB;
    camera.position.fromArray(CAMERA_IDLE_POSITION);
    camera.setPerspective(CAMERA_FOV, width / height, 1, 5000);
    scene.add(camera);

    this.scene = scene;

    this._initLights();

    this._resources.load().then(() => {
      this._init();
    });

    const upAxis = new Vector3(0, 1, 0);
    const cameraTarget = new Vector3(0, 0, 0);

    const controls = new OrbitControls(camera, this._renderer.element);

    let currentTime = 0;

    const loop = (time) => {
      requestAnimationFrame(loop);

      const deltaTime = time - currentTime;
      currentTime = time;

      this._loop(deltaTime);

      camera.lookAt(cameraTarget, upAxis);
      controls.update();

      this._renderer.render(scene, camera);
    };
    requestAnimationFrame(loop);

    const onWindowResize = () => {
      width = window.innerWidth || 2;
      height = window.innerHeight || 2;

      camera.setPerspective(CAMERA_FOV, width / height, 1, 5000);

      this._renderer.resize(width, height);
    };
    window.addEventListener("resize", onWindowResize, false);
  }

  movePlayer(direction) {
    this.player.move(direction);
  }

  _init() {
    const resources = this._resources;

    this.scene.add(new AxisHelper(5));

    // Sky
    const skyPlane = new SkyPlane(resources);
    skyPlane.position.set(0, 80, -1000);
    this.scene.add(skyPlane);

    // Road
    const road = new Road(resources);
    road.position.set(0, -0.5, 0);
    this.scene.add(road);

    // Player
    const player = new Player(resources);
    player.pose();
    this.scene.add(player);

    // Items
    const items = new Items(resources);
    this.scene.add(items);

    this.road = road;
    this.player = player;
    this.items = items;
  }

  _initLights() {
    const ambientLight = new AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.6);
    this.scene.add(directionalLight);
    directionalLight.position.set(100, 100, -100);
    directionalLight.lookAt(new Vector3(0, 0, 0), new Vector3(0, 1, 0));
  }

  _loop(deltaTime) {
    if (!this._resources.loaded) return;

    const translate = deltaTime * 0.01;

    this.road.scroll(translate);

    this.items.emit(deltaTime);
    this.items.scroll(translate);

    this.items.collide(this.player);
  }
}
