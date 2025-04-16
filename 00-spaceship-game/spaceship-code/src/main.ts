import './style.css'

import { Scene, PerspectiveCamera, WebGLRenderer } from "three"

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const scene = new Scene();
const renderer = new WebGLRenderer({ canvas, antialias: true });

const perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
  console.log("Animating...");
  renderer.render(scene, perspectiveCamera)
  requestAnimationFrame(animate);
}

animate();