import './style.css'

import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from "three"
import { GLTFLoader, GLTF } from 'three/examples/jsm/Addons.js';

class App {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  scene = new Scene();
  renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
  perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  gltfLoader = new GLTFLoader();

  constructor() {
    this.config();
    this.createLights();
    this.loadModel();
    this.animate();
  }

  config() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  createLights() {
    const ambientLight = new AmbientLight(0x404040, 2); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }

  loadModel() {
    this.gltfLoader.load("/spaceship.glb", (gltf: GLTF) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      this.scene.add(model);
    })
  }

  animate() {
    console.log("Animating...");
    this.renderer.render(this.scene, this.perspectiveCamera)
    requestAnimationFrame(this.animate.bind(this));
  }

}

new App();
