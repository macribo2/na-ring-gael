import Phaser from 'phaser';

export default class NavCD extends Phaser.Scene {
    constructor() {
        super({ key: 'NavCD' });
    }

    preload() {
        // Preload any assets needed for the navigation component
    }

    create() {
        // Initialize navigation UI elements and logic
        alert();
    }

    update() {
        // Update navigation logic, handle input, etc.
    }
}
