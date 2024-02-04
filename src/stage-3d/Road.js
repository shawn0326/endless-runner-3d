import { Object3D, PBRMaterial, Mesh, PlaneGeometry } from "t3d";

export default class Road extends Object3D {
  constructor(resources) {
    super();

    const roadMaterial = new PBRMaterial();
    roadMaterial.diffuseMap = resources.get("road");

    for (let i = 0; i < ROAD_SEGMENTS; i++) {
      const roadGeometry = new PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);

      const roadMesh = new Mesh(roadGeometry, roadMaterial);
      roadMesh.position.z = i * -ROAD_LENGTH;
      this.add(roadMesh);
    }
  }

  scroll(delta) {
    this.children.forEach((child) => {
      child.position.z += delta;
      if (child.position.z > ROAD_LENGTH) {
        let times = Math.floor(child.position.z / ROAD_LENGTH);
        child.position.z = child.position.z % ROAD_LENGTH;
        child.position.z -= (ROAD_SEGMENTS - (times % ROAD_SEGMENTS)) * ROAD_LENGTH;
      }
    });
  }
}

const ROAD_WIDTH = 8,
  ROAD_LENGTH = 100,
  ROAD_SEGMENTS = 5;
