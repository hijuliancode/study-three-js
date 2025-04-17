import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from "three"
import { Spaceship } from "./spaceship";

export class App {
  private canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private scene = new Scene();
  private renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  private perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private spaceship = new Spaceship(this.scene)

  constructor() {
    this.config();
    this.createLights();
    this.createInstances();
    this.animate();
  }

  createInstances() {
    this.spaceship.loadModel()
  }

  private config(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  private createLights(): void {
    const ambientLight = new AmbientLight(0x404040, 2); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }

  private animate(): void {
    console.log("Animating...");
    this.renderer.render(this.scene, this.perspectiveCamera)
    requestAnimationFrame(this.animate.bind(this));
  }

}