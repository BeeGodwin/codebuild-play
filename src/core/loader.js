import 'phaser';
import process from 'process';
import atlas from '../assets/atlas';
import config from '../config/default-config';

const GAME_TOP = 2; // index of first non generic scene

export default class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    preload() {
        runLoader(this);
    }
}

const runLoader = (scene) => {

    // let env;
    // const prefix = env === 'dev' ? `/${config.publish.prefix}` : '';
    atlas
        .getAll()
        .forEach((pack) => scene.load.json(pack.key, `/assets/${pack.path}`)); // `${prefix}/assets/${pack.path}`
    scene.load.start();
    scene.load.once('complete', () => {
        loadAssets(scene);
    });
    scene.load.on('complete', () =>
        scene.scene.start(scene.scene.manager.getAt(GAME_TOP))
    );
};

const loadAssets = (scene) => {
    atlas.getAll().forEach((pack) => {
        const packJson = scene.cache.json.get(pack.key);
        packJson.assets.forEach((asset) => {
            scene.load.image(
                `${pack.prefix}.${asset.key}`,
                `/assets/${asset.path}`
            );
        });
    });
    scene.load.start();
};
