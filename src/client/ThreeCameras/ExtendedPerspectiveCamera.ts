import * as THREE from 'three';

export class ExtendedPerspectiveCamera {
  private camera: THREE.PerspectiveCamera;

  constructor(fov: number, aspect: number, near: number, far: number) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  }

  public getCameraObject = () => {
    return this.camera
  }

  static moveCamera = (camera: THREE.PerspectiveCamera, axis: axis, distance: number): void => {
    const previousPosition = camera.position
    camera.position[axis] = previousPosition[axis] + distance
    camera.updateProjectionMatrix()
  }
}
