import MyScene from '../../src/game/my-scene';

describe('MyScene', () => {
    let myScene;
    beforeEach(() => {
        myScene = new MyScene();
        myScene.add = { image: jest.fn() };
    });

    describe('create', () => {
        beforeEach(() => myScene.create());
        test('loads an image', () => {
            expect(myScene.add.image).toHaveBeenCalled();
        });
    });
});
