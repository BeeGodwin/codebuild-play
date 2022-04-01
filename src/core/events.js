let instance;

export const eventEmitter = () => {
    const instance = getInstance();
    return {
        instance,
        emit: (e) => instance.emit(e),
        on: (e, fn) => instance.on(e, fn),
    };
};

const getInstance = () => {
    if (instance === undefined) {
        instance = new Phaser.Events.EventEmitter();
    }
    return instance;
};
