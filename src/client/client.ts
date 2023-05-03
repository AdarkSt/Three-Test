import { ThreeEnvironment } from "./ThreeEnvironment";
import { Cube } from "./Meshes/Cube";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import _cloneDeep from "lodash/cloneDeep";

import "./style.scss";
import { SizeCalculator } from "./utils/SizeCalculator";

// declaring user interface elements 
const widthInput = document.getElementById("width-input") as HTMLInputElement;
const depthInput = document.getElementById("depth-input") as HTMLInputElement;
const setButton = document.getElementById("set-button") as HTMLButtonElement;
const frontBtn = document.getElementById("front-btn") as HTMLButtonElement;
const leftBtn = document.getElementById("left-btn") as HTMLButtonElement;

// setup for Three.js envoirement and Three.js utilites
const threeEnvoirenment = new ThreeEnvironment();
const textureLoader = new THREE.TextureLoader();
const cubeInitialSize = SizeCalculator.feetToMeter(8);

// creating separate material for each side of cube
const materialsForCube: Array<any> =
  [];
for (let i = 0; i < 6; ++i) {
  const woodTexture = textureLoader.load("assets/wood.jpg", (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(SizeCalculator.meterToCm(cubeInitialSize) / 10, 8);
  });
  materialsForCube.push({
    map: woodTexture,
    side: THREE.DoubleSide,
    trasparent: true,
    displacementMap: textureLoader.load("assets/wood-diffuse.jpg"),
    displacementScale: 0.005,
    normalMap: textureLoader.load("assets/wood-normal.jpg"),
    normalScale: new THREE.Vector2(10, 10),
    bumpMap: textureLoader.load("assets/wood-bump.jpg"),
    bumpScale: 10,
  });
}

// creating cube 
const cube = new Cube(
  {
    width: cubeInitialSize,
    height: cubeInitialSize,
    depth: cubeInitialSize,
  },
  materialsForCube
);

const scene = threeEnvoirenment.getScene();
const camera = threeEnvoirenment.getCamera();
const renderer = threeEnvoirenment.getRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight();
scene.add(light);

scene.background = new THREE.Color(0xffffff);
camera.position.z = 8;
controls.zoomSpeed = 0.5;

cube.renderCube(scene);

threeEnvoirenment.animate(() => {});

function moveCameraToFront() {
  camera.position.set(0, 0, 10);
  controls.target.set(0, 0, 0);
  controls.update();
}

function moveCameraToLeft() {
  camera.position.set(-10, 0, 0);
  controls.target.set(0, 0, 0);
  controls.update();
}

// function which trigers when user setting new sizes 
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
  const { width: cubeWidth = 0, depth: cubeDepth = 0 } = cube.getCubeOptions();
  camera.position.set(0, 0, Math.max(cubeWidth, cubeDepth) + 2);
  controls.target.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  materialsForCube.forEach((material, index) => {
    if (index === 0 || index === 1) {
      material.map?.repeat.set(SizeCalculator.meterToCm(cubeDepth) / 10, 8);
      material.needsUpdate = true;
    } else if (index === 4 || index === 5) {
      material.map?.repeat.set(SizeCalculator.meterToCm(cubeWidth) / 10, 8);
      material.needsUpdate = true;
    }
  });
  cube.setCubeMaterial(materialsForCube);
});

frontBtn.addEventListener("click", moveCameraToFront);
leftBtn.addEventListener("click", moveCameraToLeft);

window.addEventListener("resize", threeEnvoirenment.onWindowResize, false);
