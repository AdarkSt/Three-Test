import { ThreeEnvironment } from "./ThreeEnvironment";
import { Cube } from "./Meshes/Cube";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import "./style.scss";
import { SizeCalculator } from "./utils/SizeCalculator";

const widthInput = document.getElementById("width-input") as HTMLInputElement;
const depthInput = document.getElementById("depth-input") as HTMLInputElement;
const setButton = document.getElementById("set-button") as HTMLButtonElement;
const frontBtn = document.getElementById("front-btn") as HTMLButtonElement;
const backBtn = document.getElementById("back-btn") as HTMLButtonElement;

const threeEnvoirenment = new ThreeEnvironment();
const textureLoader = new THREE.TextureLoader();
const cubeInitialSize = SizeCalculator.feetToMeter(8);

const woodTexture = textureLoader.load("assets/wood.jpg", (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(SizeCalculator.feetToCm(cubeInitialSize) / 10, 1);
});

const cube = new Cube(
  { width: cubeInitialSize, height: cubeInitialSize, depth: cubeInitialSize },
  {
    map: woodTexture,
    displacementMap: textureLoader.load("assets/wood-diffuse.jpg"),
    displacementScale: 0.005,
    normalMap: textureLoader.load("assets/wood-normal.jpg"),
    normalScale: new THREE.Vector2(10, 10),
    bumpMap: textureLoader.load("assets/wood-bump.jpg"),
    bumpScale: 10,
    side: THREE.DoubleSide,
  }
);

const scene = threeEnvoirenment.getScene();
const camera = threeEnvoirenment.getCamera();
const renderer = threeEnvoirenment.getRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight();
scene.add(light);
const {
  width: cubeWidth = 0,
  height: cubeHeight = 0,
  depth: cubeDepth = 0,
} = cube.getCubeOptions();
controls.minDistance = Math.max(cubeWidth, cubeHeight, cubeDepth) + 0.5;

scene.background = new THREE.Color(0xffffff);
camera.position.z = 8;

cube.renderCube(scene);

threeEnvoirenment.animate(() => {});

function moveCameraToFront() {
  camera.position.set(0, 0, 10);
  controls.target.set(0, 0, 0);
  controls.update();
}

function moveCameraToBack() {
  camera.position.set(-10, 0, 0);
  controls.target.set(0, 0, 0);
  controls.update();
}

setButton.addEventListener("click", () => {
  Cube.changeSizesFromField(
    widthInput,
    "width",
    cube,
    SizeCalculator.feetToMeter
  );
  Cube.changeSizesFromField(
    depthInput,
    "depth",
    cube,
    SizeCalculator.feetToMeter
  );
  const {
    width: cubeWidth = 0,
    height: cubeHeight = 0,
    depth: cubeDepth = 0,
  } = cube.getCubeOptions();
  controls.minDistance = Math.max(cubeWidth, cubeHeight, cubeDepth) + 0.5;
  woodTexture.repeat.set(SizeCalculator.meterToCm(cubeWidth) / 10, 1);
});

frontBtn.addEventListener("click", moveCameraToFront);
backBtn.addEventListener("click", moveCameraToBack);

window.addEventListener("resize", threeEnvoirenment.onWindowResize, false);
