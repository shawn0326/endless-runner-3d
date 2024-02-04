import { Object3D, BasicMaterial, Mesh, PlaneGeometry } from "t3d";

export default class SkyPlane extends Object3D {
  constructor(resources) {
    super();

    const skyMaterial = new BasicMaterial();
    skyMaterial.fog = false;
    skyMaterial.diffuseMap = resources.get("sky");

    const skyGeometry = new PlaneGeometry(1080, 472);

    const skyMesh = new Mesh(skyGeometry, skyMaterial);
    skyMesh.euler.x = Math.PI / 2;
    this.add(skyMesh);
  }
}
