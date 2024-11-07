// TorchEmitters.js

import Phaser from 'phaser';

export default class TorchEmitters {
    constructor(scene, x1, y1, x2, y2) {
        this.scene = scene;

        // Create the emitters but set them to invisible initially
        this.torch1Emitter = this.createTorchEmitter(x1, y1);
        this.torch2Emitter = this.createTorchEmitter(x2, y2);
    }

    // Method to create individual emitters
    createTorchEmitter(x, y) {
        return this.scene.add.particles(x, y, 'spark', {
            
            tint: [0xff6600, 0xffcc00, 0xff3300],
            alpha: { start: 1, end: 1, ease: 'Sine.easeInOut', duration: 1000 },
            gravityY: -5,
            speed: { min: 0.1, max: 3 },
            scale: { start: 1, end: 0.2, ease: 'Sine.easeInOut' },
            lifespan: 2000,
            quantity: 10,
            frequency: 200,
            angle: { min: -180, max: 180 },
            blendMode: 'ADD',
            maxParticles: 200,
            emit: true
        }).setVisible(false);
    }

    // Method to show both emitters
    activateEmitters() {
        if (this.torch1Emitter) this.torch1Emitter.setVisible(true).setDepth(99);
        if (this.torch2Emitter) this.torch2Emitter.setVisible(true).setDepth(99);
    }

    // Optionally add a method to hide the emitters again
    deactivateEmitters() {
        if (this.torch1Emitter) this.torch1Emitter.setVisible(false);
        if (this.torch2Emitter) this.torch2Emitter.setVisible(false);
    }
}
