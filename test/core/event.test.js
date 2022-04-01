import { eventEmitter } from '../../src/core/events';

describe('EventEmitter', () => {
    let dispatcher;

    const mockEmitter = { emit: jest.fn(), on: jest.fn() };

    Phaser.Events = { EventEmitter: jest.fn(() => mockEmitter) };

    beforeEach(() => (dispatcher = eventEmitter()));
    test("is a singleton", () => {
        expect(Phaser.Events.EventEmitter).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line no-unused-vars
        const someOtherDispatcher = eventEmitter();
        expect(Phaser.Events.EventEmitter).toHaveBeenCalledTimes(1);
    })

    test('wraps a Phaser emitter', () => {
        dispatcher.emit('SOME_EVENT');
        expect(mockEmitter.emit).toHaveBeenCalledWith('SOME_EVENT');

        const mockFn = () => 'foo';
        dispatcher.on('SOME_OTHER_EVENT', mockFn);
        expect(mockEmitter.on).toHaveBeenCalledWith('SOME_OTHER_EVENT', mockFn);
    });
});
