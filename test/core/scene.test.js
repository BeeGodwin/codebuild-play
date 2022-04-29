import Scene from '../../src/core/scene';

describe('Scene', () => {
    let scene;

    beforeEach(() => {
        scene = new Scene();
    });

    describe("doesn't do anything yet", () => {
        test('so just has a stub test', () => {
            expect(scene.foo()).toEqual('bar');
        });
    });
});
