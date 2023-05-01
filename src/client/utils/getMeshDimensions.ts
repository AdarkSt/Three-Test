import * as THREE from "three";

/**
Returns the dimensions (width, height, and depth) of a given mesh
@param mesh - The mesh whose dimensions will be calculated
@returns An object containing the width, height, and depth of the mesh
*/

export const getMeshDimensions = (
  mesh: THREE.Mesh
): { width: number; height: number; depth: number } => {
  const bbox = new THREE.Box3().setFromObject(mesh);
  const width = bbox.max.x - bbox.min.x;
  const height = bbox.max.y - bbox.min.y;
  const depth = bbox.max.z - bbox.min.z;
  return { width, height, depth };
};
