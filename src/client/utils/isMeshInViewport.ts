import { calculateViewportHeight } from "./calculateViewportHeight";
import { calculateViewportWidth } from "./calculateViewportWidth";
import { getMeshDimensions } from "./getMeshDimensions";

/**
Checks if a given mesh is fully visible within the viewport of a given camera.
@param camera - The camera object.
@param mesh - The mesh object.
@returns True if the mesh is fully visible within the viewport of the camera, false otherwise.
*/

export const isMeshInViewport = (
  camera: THREE.PerspectiveCamera,
  mesh: THREE.Mesh
) => {
  const viewportHeight = calculateViewportHeight(camera, mesh);
  const viewportWidth = calculateViewportWidth(camera, mesh);

  const meshDimensions = getMeshDimensions(mesh);

  if (
    viewportHeight < meshDimensions.height ||
    viewportWidth < meshDimensions.width
  ) {
    return false;
  }
  return true;
};
