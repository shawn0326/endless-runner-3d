import { WebGLRenderer, RenderTargetBack, TEXEL_ENCODING_TYPE } from "t3d";
import { EffectComposer } from "t3d-effect-composer";

export default class Renderer {
  constructor(width, height) {
    const pixelRatio = window.devicePixelRatio || 1;

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    document.body.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
    });
    const renderer = new WebGLRenderer(gl);
    renderer.setClearColor(0, 0, 0, 1);

    const effectComposer = new EffectComposer(width, height, {
      webgl2: true,
      samplerNumber: Math.min(renderer.capabilities.maxSamples, 5),
      floatColorBuffer: !!renderer.capabilities.getExtension("EXT_color_buffer_float"),
    });
    effectComposer.sceneMSAA = true;
    effectComposer.getBuffer("SceneBuffer").setOutputEncoding(TEXEL_ENCODING_TYPE.SRGB);

    const backRenderTarget = new RenderTargetBack(canvas);

    this._pixelRatio = pixelRatio;
    this._canvas = canvas;
    this._renderer = renderer;
    this._effectComposer = effectComposer;
    this._backRenderTarget = backRenderTarget;
  }

  get element() {
    return this._canvas;
  }

  resize(width, height) {
    const { _pixelRatio, _canvas, _effectComposer, _backRenderTarget } = this;

    _canvas.style.width = width + "px";
    _canvas.style.height = height + "px";
    _effectComposer.resize(width * _pixelRatio, height * _pixelRatio);
    _backRenderTarget.resize(width * _pixelRatio, height * _pixelRatio);
  }

  render(scene, camera) {
    const { _renderer, _effectComposer, _backRenderTarget } = this;

    scene.updateMatrix();
    scene.updateRenderStates(camera);
    scene.updateRenderQueue(camera);

    _effectComposer.render(_renderer, scene, camera, _backRenderTarget);
  }
}
