import * as THREE from "three";

/**
Calculates the viewport height of an object relative to a perspective camera.
@param camera - The perspective camera used to view the object
@param object - The object whose viewport height will be calculated
@returns The calculated viewport height of the object
*/

export const calculateViewportHeight = (
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D
): number => {
  const distance = camera.position.distanceTo(object.position);
  const fov = (camera.fov * Math.PI) / 180; // Convert to radians
  const viewportHeight = 2 * Math.tan(fov / 2) * distance;
  return viewportHeight;
};
