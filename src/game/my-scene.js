import Scene from "../core/scene";

const WIDTH = 1000;
const HEIGHT = 600;

export default class MyScene extends Scene {
  constructor() {
    super("MyScene");
  }

  create() {
    this.sprite = this.add.sprite(400, 300, "helloWorld.logoImg");
  }

  update(time, deltaTime) {
    this.sprite.setPosition((400 + time) % WIDTH, HEIGHT / 2);
  }
}
