import './style.css'

import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from "three"
import { GLTFLoader, GLTF } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const scene = new Scene();
const renderer = new WebGLRenderer({ canvas, antialias: true });
const perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const gltfLoader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
perspectiveCamera.position.set(0, 8, -10);
perspectiveCamera.lookAt(0, 0, 0);

const ambientLight = new AmbientLight(0x404040, 2); // soft white light
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

gltfLoader.load("/spaceship.glb", (gltf: GLTF) => {
  const model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  scene.add(model);
})

function animate() {
  console.log("Animating...");
  renderer.render(scene, perspectiveCamera)
  requestAnimationFrame(animate);
}

animate();