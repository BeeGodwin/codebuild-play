import MyScene from '../../src/game/my-scene';

describe('MyScene', () => {
    let myScene;
    beforeEach(() => {
        myScene = new MyScene();
        myScene.add = { sprite: jest.fn() };
    });

    describe('create', () => {
        beforeEach(() => myScene.create());
        test('adds a sprite', () => {
            expect(myScene.add.sprite).toHaveBeenCalled();
        });
    });
});
