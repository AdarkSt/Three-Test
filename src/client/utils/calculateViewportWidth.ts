/**
Calculates the viewport width of an object relative to a perspective camera.
@param camera - The perspective camera used to view the object
@param object - The object whose viewport width will be calculated
@returns The calculated viewport width of the object
*/

export const calculateViewportWidth = (camera: THREE.PerspectiveCamera, object: THREE.Object3D): number => {
    const distance = camera.position.distanceTo(object.position);
    const aspectRatio = camera.aspect;
    const fov = (camera.fov * Math.PI) / 180; // Convert to radians
    const viewportWidth = 2 * Math.tan(fov / 2) * distance * aspectRatio;
    return viewportWidth;
  }
  