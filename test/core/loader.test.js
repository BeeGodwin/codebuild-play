import Loader from '../../src/core/loader';
import atlas from '../../src/assets/atlas';
import mockAtlas from '../mock/assets/atlas';
import mockPack from '../mock/assets/shared/mock-pack.json';
import config from '../../ci/default';

jest.mock('../../src/assets/atlas');

describe('Loader', () => {
    let loader;

    beforeEach(() => {
        atlas.getAll.mockImplementation(() => mockAtlas.getAll());

        loader = new Loader();

        loader.load = {
            json: jest.fn(),
            start: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            image: jest.fn(),
        };

        loader.scene = {
            start: jest.fn(),
            manager: { getAt: jest.fn().mockReturnValue(2) },
        };

        loader.cache = { json: { get: jest.fn().mockReturnValue(mockPack) } };
    });

    describe('preload', () => {
        beforeEach(() => loader.preload());

        test('loads a json for each pack in the atlas', () => {
            expect(loader.load.json).toHaveBeenCalled();
        });

        describe('calls loadAssets once complete', () => {
            beforeEach(() => {
                const onceCompleteCallback = loader.load.once.mock.calls[0][1];
                onceCompleteCallback();
            });
            test('gets json from cache, one per pack', () => {
                expect(loader.cache.json.get).toHaveBeenCalled();
            });
            test('loads images as per json', () => {
                expect(loader.load.image).toHaveBeenCalledWith(
                    'bar.someImg',
                    `${config.aws.prefix}/assets/shared/some-img.png`
                );
            });
        });

        describe('starts the top of the game on complete', () => {
            beforeEach(() => {
                const onCompleteCallback = loader.load.on.mock.calls[0][1];
                onCompleteCallback();
            });
            test('starts the game top', () => {
                expect(loader.scene.start).toHaveBeenCalledWith(2);
            });
        });
    });
});
