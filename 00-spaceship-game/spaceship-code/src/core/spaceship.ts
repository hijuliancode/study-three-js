import { Object3D, Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { InputController } from "./input.controller";

export class Spaceship {
  private declare model: Object3D;
  private readonly gltfLoader = new GLTFLoader();
  private readonly speed = 0.2;
  private readonly rotationSpeed = 0.05;

  constructor(
    private readonly scene: Scene,
    private readonly inputController: InputController,
    private readonly scale: number
  ) {
    this.scene = scene; 
  }

  public loadModel(): void {
    this.gltfLoader.load("/spaceship.glb", (gltf: GLTF) => {
      this.model = gltf.scene;
      this.model.scale.set(this.scale, this.scale, this.scale);
      this.scene.add(this.model);
    })
  }

  public update(): void {
    if (!this.model) return;

    // Movement
    if (this.inputController.isPressed("KeyW") || this.inputController.isPressed("ArrowUp")) {
      this.model.translateZ(this.speed);
    }
    if (this.inputController.isPressed("KeyS") || this.inputController.isPressed("ArrowDown")) {
      this.model.translateZ(-this.speed);
    }
    if (this.inputController.isPressed("KeyA") || this.inputController.isPressed("ArrowLeft")) {
      this.model.translateX(this.speed);
    }
    if (this.inputController.isPressed("KeyD") || this.inputController.isPressed("ArrowRight")) {
      this.model.translateX(-this.speed);
    }

    // Rotation
    if (this.inputController.isPressed("KeyQ")) {
      this.model.rotateY(+this.rotationSpeed);
    }
    if (this.inputController.isPressed("KeyE")) {
      this.model.rotateY(-this.rotationSpeed);
    }
    if (this.inputController.isPressed("Space")) {
      this.model.translateY(-this.speed);
    }
    if (this.inputController.isPressed("ShiftLeft")) {
      this.model.translateY(this.speed);
    }

    // jumps
    if (this.inputController.isPressed("KeyJ")) {
      this.model.translateZ(this.speed * 5);
    }

    // reset position
    if (this.inputController.isPressed("KeyR")) {
      this.model.position.set(0, 0, 0);
      this.model.rotation.set(0, 0, 0);
    }

  }
}