import Scene from '../core/scene';
// import { eventEmitter } from '../core/events';

export default class MyScene extends Scene {
    constructor() {
        super('MyScene');
    }

    create() {
        this.add.image(400, 300, 'helloWorld.logoImg');

        // const emitter = eventEmitter();
        // const rect = this.add.rectangle(100, 100, 100, 100, 0xffffff, 1);
        // emitter.on('TOGGLE_RECT', () => rect.setFillStyle(0xff0000, 1));

        // eventFirer();
    }
}

// const eventFirer = () => {
//     const emitter = eventEmitter();
//     emitter.emit('TOGGLE_RECT');
// };
