import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from "three"
import { Spaceship } from "./spaceship";
import { InputController } from "./input.controller";
import { Starfield } from "./starfield";
import { CameraController } from "./camera.controller";

export class App {
  private canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private scene = new Scene();
  private renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  private perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private readonly inputController = new InputController();
  private spaceship = new Spaceship(this.scene, this.inputController, 0.2);
  private readonly cameraController = new CameraController(this.perspectiveCamera, this.spaceship);

  constructor() {
    this.config();
    this.createLights();
    this.createInstances();
    this.animate();
    window.addEventListener('resize', this.onResize.bind(this))
  }

  createInstances() {
    this.spaceship.loadModel()
    new Starfield(this.scene)
  }

  private config(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  private createLights(): void {
    const ambientLight = new AmbientLight(0x404040, 10); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2);
    this.scene.add(directionalLight);
  }

  private animate(): void {
    this.renderer.render(this.scene, this.perspectiveCamera)
    this.spaceship.update();
    this.cameraController.update()
    requestAnimationFrame(this.animate.bind(this));
  }

  private onResize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    this.perspectiveCamera.updateProjectionMatrix()
  }

}