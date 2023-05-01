import * as THREE from "three";
import _identity from "lodash/identity";
import { ExtendedPerspectiveCamera } from "../ThreeCameras";

export class ThreeEnvironment {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly rendererWidth: number;
  private readonly rendererHeight: number;

  constructor(
    cameraProperties: CameraProperties = {},
    rendererOptions: RendererOptions = {},
    canvas?: HTMLCanvasElement
  ) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    const {
      width = canvas ? canvas.clientWidth : window.innerWidth,
      height = canvas ? canvas.clientHeight : window.innerHeight,
    } = rendererOptions;
    const {
      fov = 75,
      aspect = width / height,
      near = 0.1,
      far = 1000,
    } = cameraProperties;

    this.scene = new THREE.Scene();
    this.camera = new ExtendedPerspectiveCamera(fov, aspect, near, far).getCameraObject();

    this.rendererWidth = width;
    this.rendererHeight = height;

    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);
  }

  public getScene = (): THREE.Scene => {
    return this.scene;
  }

  public getCamera = (): THREE.PerspectiveCamera => {
    return this.camera;
  }

  public getRenderer = (): THREE.WebGLRenderer => {
    return this.renderer;
  }

  public getRendererWidth = (): number => {
    return this.rendererWidth;
  }

  public getRendererHeight = (): number => {
    return this.rendererHeight;
  }

  public render = (): void => {
    const renderer = this.getRenderer();
    renderer.render(this.getScene(), this.getCamera());
  }

  public onWindowResize = (): void => {
    const camera = this.getCamera();
    const renderer = this.getRenderer();
    const rendererWidth = this.getRendererWidth();
    const rendererHeight = this.getRendererHeight();

    const newWidth =
      rendererWidth > window.innerWidth ? window.innerWidth : rendererWidth;
    const newHeight =
      rendererHeight > window.innerHeight ? window.innerHeight : rendererHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);

    this.render();
  }

  public animate(animationToDo?: Function) {
    if (animationToDo === undefined) {
      animationToDo = _identity;
    }
    requestAnimationFrame(() => this.animate(animationToDo));

    animationToDo();

    this.render();
  }
}
