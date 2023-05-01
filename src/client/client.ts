import { ThreeEnvironment } from "./ThreeEnvironment";
import { Cube } from "./Meshes/Cube";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { ExtendedPerspectiveCamera } from "./ThreeCameras";
import { isMeshInViewport } from "./utils/isMeshInViewport";

import "./style.scss";

const widthInput = document.getElementById("width-input") as HTMLInputElement;
const depthInput = document.getElementById("depth-input") as HTMLInputElement;
const setButton = document.getElementById("set-button") as HTMLButtonElement;
const frontBtn = document.getElementById("front-btn") as HTMLButtonElement;
const backBtn = document.getElementById("back-btn") as HTMLButtonElement;

const threeEnvoirenment = new ThreeEnvironment();
const textureLoader = new THREE.TextureLoader();

const cube = new Cube(
  { height: 8 },
  {
    map: textureLoader.load("assets/Wood_Planks_010_COLOR.jpg"),
    displacementMap: textureLoader.load("assets/Wood_Planks_010_DISP.png"),
    displacementScale: 0.005,
    normalMap: textureLoader.load("assets/Wood_Planks_010_NORM.jpg"),
    normalScale: new THREE.Vector2(10, 10),
    bumpMap: textureLoader.load("assets/bumpmap.jpg"),
    bumpScale: 10,
  }
);
const scene = threeEnvoirenment.getScene();
const camera = threeEnvoirenment.getCamera();
const renderer = threeEnvoirenment.getRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight();
scene.add(light);

scene.background = new THREE.Color(0xffffff);
camera.position.z = 2;

cube.renderCube(scene);

threeEnvoirenment.animate(() => {});

function moveCameraToFront() {
  if (!isMeshInViewport(camera, cube.getCubeMesh())) {
    return;
  }
  ExtendedPerspectiveCamera.moveCamera(camera, "z", -0.2);
  controls.update();
}

function moveCameraToBack() {
  ExtendedPerspectiveCamera.moveCamera(camera, "z", 0.2);
  controls.update();
}

setButton.addEventListener("click", () => {
  Cube.changeSizesFromField(widthInput, "width", cube);
  Cube.changeSizesFromField(depthInput, "depth", cube);
});

frontBtn.addEventListener("click", moveCameraToFront);
backBtn.addEventListener("click", moveCameraToBack);

window.addEventListener(
  "resize",
  threeEnvoirenment.onWindowResize,
  false
);
