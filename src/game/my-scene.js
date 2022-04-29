import Scene from "../core/scene";

const WIDTH = 1000;
const HEIGHT = 600;

export default class MyScene extends Scene {
  constructor() {
    super("MyScene");
  }

  create() {
    this.origin = { x: 400, y: 300};
    this.sprite = this.add.sprite(origin.x, origin.y, "helloWorld.logoImg");
  }

  update(time, deltaTime) {
    this.sprite.setPosition((this.origin.x + time) % WIDTH, HEIGHT / 2);
  }
}

