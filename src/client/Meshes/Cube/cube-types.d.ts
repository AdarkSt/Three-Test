interface CubeOptions {
  width?: number;
  height?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}

type MaterialsUnion =
  | THREE.MeshBasicMaterial
  | THREE.MeshDepthMaterial
  | THREE.MeshDistanceMaterial
  | THREE.MeshLambertMaterial
  | THREE.MeshMatcapMaterial
  | THREE.MeshNormalMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshPhysicalMaterial;

type MaterialsParams =
  | THREE.MeshBasicMaterialParameters
  | THREE.MeshDepthMaterialParameters
  | THREE.MeshDistanceMaterialParameters
  | THREE.MeshLambertMaterialParameters
  | THREE.MeshMatcapMaterialParameters
  | THREE.MeshNormalMaterialParameters
  | THREE.MeshPhongMaterialParameters
  | THREE.MeshPhysicalMaterialParameters;

type CubeMaterial = THREE.MeshPhongMaterial
type CubeTextureOptions = THREE.MeshPhongMaterialParameters;
type CubeTextureOptionKey = keyof CubeTextureOptions;
