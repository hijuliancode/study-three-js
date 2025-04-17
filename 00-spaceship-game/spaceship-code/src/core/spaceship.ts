import { Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export class Spaceship {
  private readonly gltfLoader = new GLTFLoader();

  constructor(private readonly scene: Scene) {
    this.scene = scene; 
  }

  public loadModel(): void {
    this.gltfLoader.load("/spaceship.glb", (gltf: GLTF) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      this.scene.add(model);
    })
  }
}