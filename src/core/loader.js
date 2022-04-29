import "phaser";
import atlas from "../assets/atlas";
const GAME_TOP = 2; // index of first non generic scene

export default class Loader extends Phaser.Scene {
  constructor() {
    super("Loader");
  }

  preload() {
    runLoader(this);
  }
}

const runLoader = (scene) => {
  atlas
    .getAll()
    .forEach((pack) =>
      scene.load.json(pack.key, `assets/${pack.path}`)
    );
  scene.load.start();
  scene.load.once("complete", () => {
    loadAssets(scene);
  });
  scene.load.on("complete", () =>
    scene.scene.start(scene.scene.manager.getAt(GAME_TOP))
  );
};

const loadAssets = (scene) => {
  atlas.getAll().forEach((pack) => {
    const packJson = scene.cache.json.get(pack.key);
    packJson.assets.forEach((asset) => {
      scene.load.image(
        `${pack.prefix}.${asset.key}`,
        `assets/${asset.path}`
      );
    });
  });
  scene.load.start();
};
