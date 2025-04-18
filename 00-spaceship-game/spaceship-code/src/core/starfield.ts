import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene } from "three";

export class Starfield {
  private declare starField: Points

  constructor(
    private readonly scene: Scene,
    private readonly starQuantity: number = 30000,
    private readonly range: number = 1000,
  ) {
    this.createStarfield()
  }

  private createStarfield(): void {
    const positions = new Float32Array(this.starQuantity * 3);

    for (let i = 0; i < this.starQuantity; i++) {
      positions[i * 3] = Math.random() * this.range - this.range / 2; // x position
      positions[i * 3 + 1] = Math.random() * this.range - this.range / 2; // y position
      positions[i * 3 + 2] = Math.random() * this.range - this.range / 2; // z position
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3 ))

    const material = new PointsMaterial({
      color: 0xcccccc,
      size: 1,
      transparent: true,
      opacity: 0.75,
      depthTest: true
    })

    this.starField = new Points(geometry, material)

    this.scene.add(this.starField)
  }
}