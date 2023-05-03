import * as THREE from "three";
import { isValidNumber } from "../../utils/isValidNumber";

export class Cube {
  private geometry: THREE.BoxGeometry;
  private material: CubeMaterial | Array<CubeMaterial>;
  private readonly mesh: THREE.Mesh;
  private cubeOptions: CubeOptions;
  constructor(
    cubeOptions: CubeOptions = {},
    private cubeTextureOptions:
      | CubeTextureOptions
      | Array<CubeTextureOptions>
  ) {
    const {
      width = 1,
      height = 1,
      depth = 1,
      widthSegments = 100,
      heightSegments = 100,
      depthSegments = 100,
    } = cubeOptions;

    this.cubeOptions = {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
    };
    this.geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
    );
    this.material =
      cubeTextureOptions instanceof Array
        ? cubeTextureOptions.map(
            (option) => new THREE.MeshPhongMaterial(option)
          )
        : new THREE.MeshPhongMaterial(cubeTextureOptions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  public getGeometry(): THREE.BoxGeometry {
    return this.geometry;
  }

  public getMaterial(): CubeMaterial | Array<CubeMaterial> {
    return this.material;
  }

  public getCubeMesh(): THREE.Mesh {
    return this.mesh;
  }

  public getCubeOptions(): CubeOptions {
    return this.cubeOptions;
  }

  public getCubeTexture(): CubeTextureOptions | Array<CubeTextureOptions> {
    return this.cubeTextureOptions;
  }

  public getCubePosition(axis: "x" | "y" | "z"): number {
    return this.getCubeMesh().position[axis];
  }

  public getCubeRotation(axis: "x" | "y" | "z"): number {
    return this.getCubeMesh().rotation[axis];
  }

  public setPosition(x: number, y: number, z: number): void {
    this.getCubeMesh().position.set(x, y, z);
  }

  public setRotation(x: number, y: number, z: number): void {
    this.getCubeMesh().rotation.set(x, y, z);
  }

  public setCubeSize(cubeOptions: CubeOptions): void {
    const {
      width = this.cubeOptions.width,
      height = this.cubeOptions.height,
      depth = this.cubeOptions.depth,
    } = cubeOptions;
    const newGeometry = new THREE.BoxGeometry(width, height, depth);
    this.geometry = newGeometry;
    this.cubeOptions = { width, height, depth };
    this.getCubeMesh().geometry = newGeometry;
  }

  public setMaterialOptions = (
    options: CubeTextureOptions,
    indexOfMateria: number = 0
  ): void => {
    const material = this.getMaterial();
    if (material instanceof Array) {
      material[indexOfMateria].setValues(options);
    } else {
      material.setValues(options);
    }
  };

  public renderCube = (scene: THREE.Scene): void => {
    const cube = this.getCubeMesh();
    scene.add(cube);
  };

  public destroyCube = (scene: THREE.Scene): void => {
    const cube = this.getCubeMesh();
    const cubeGeometry = this.getGeometry();
    const cubeMaterial = this.getMaterial();

    scene.remove(cube);
    cubeGeometry.dispose();
    if (cubeMaterial instanceof Array) {
      cubeMaterial.forEach((eachMaterial) => eachMaterial.dispose());
    } else {
      cubeMaterial.dispose();
    }
  };

  public setCubeMaterial = (
    cubeTextureOptions: CubeTextureOptions | Array<CubeTextureOptions>
  ): void => {
    const newMaterial = cubeTextureOptions instanceof Array
    ? cubeTextureOptions.map(
        (option) => new THREE.MeshPhongMaterial(option)
      )
    : new THREE.MeshPhongMaterial(cubeTextureOptions);
    this.material = newMaterial
    this.getCubeMesh().material = newMaterial;
    this.cubeTextureOptions = cubeTextureOptions;
  };

  static changeSizesFromField = (
    field: HTMLInputElement,
    dimensionName: "width" | "height" | "depth",
    cube: Cube,
    converter: Function = () => {}
  ) => {
    if (isValidNumber(field.value)) {
      cube.setCubeSize({ [dimensionName]: converter(Number(field.value)) });
      field.classList.remove("error");
    } else {
      if (field.value !== "") {
        field.classList.add("error");
      }
    }
  };
}
