import Boot from '../../src/core/boot';

describe('Boot', () => {
    let boot;

    beforeEach(() => {
        boot = new Boot();
        boot.scene = { start: jest.fn() };
    });

    describe('create', () => {
        beforeEach(() => boot.create());

        test('calls the loader', () => {
            expect(boot.scene.start).toHaveBeenCalledWith('Loader');
        });
    });
});
