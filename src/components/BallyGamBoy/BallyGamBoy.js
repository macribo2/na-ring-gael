import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import molly from '../../images/draoi0.gif'
import Easca from '../easca/easca2';

let glassTextA = [
    `Translations and comments go here. json soon. This is glassTextA[0]`,
];
const BallyGamboyGame = () => {

    let championName = localStorage.getItem('championName');
    const gameRef = useRef(null);
    const [showEasca, setShowEasca] = useState(false); // State to control visibility of Easca component

    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth, // Set width to match the browser window width
                height: window.innerHeight, // Set height to match the browser window height
                scene: [GameScene],
                parent: 'ballygamboy-game-container'
            };

            gameRef.current = new Phaser.Game(config);
        };

        initializeGame();

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []);

    const toggleOverlay = () => {
        setShowEasca(!showEasca); // Toggle the visibility state
    };

    return (
        <>
            <div id="ballygamboy-game-container"></div>;
            <div className="chess-like-frame-container">
                <img src={molly} className="og-opponent molly" alt="black molly" />
                {championName && <div className="question-text county-text">Cad a feiceann<br /> {championName}?</div>}
            </div>
            {showEasca && <Easca />}
        </>
    );
};

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load assets
        this.load.audio('rabbitTown', './phaser-resources/audio/rabbitTown.ogg');
        let champID = localStorage.getItem('champID');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', './phaser-resources/images/placeholders/ultima-like.png');
        this.load.image('glassbg0', './phaser-resources/images/glass0.png');
        this.load.image('greenRingLeft', './phaser-resources/images/ciorcal-glass8.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('pad-g', './phaser-resources/images/ui/pad-g.png');
        this.load.image('bally0map', './phaser-resources/images/map0.png');
        this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image
    }

    create() {
        const music = this.sound.add('rabbitTown');
        music.play();

        // Add background sprite
        const background = this.add.sprite(0, 0, 'background').setOrigin(0);
        const glassbg0 = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg0.setAlpha(0.5);

        // Calculate scale to contain the background within the game dimensions
        const scaleX = this.sys.game.config.width / background.width;
        const scaleY = this.sys.game.config.height / background.height;
        const scale = Math.max(scaleX, scaleY);

        // Set the scale of the background
        background.setScale(scale).setScrollFactor(0);

        // Create the bally0map element
        this.bally0map = this.add.sprite(0, 0, 'bally0map').setOrigin(0);
        const bally0mapScale = Math.max(this.sys.game.config.width, this.sys.game.config.height) / Math.max(this.bally0map.width, this.bally0map.height) * 2;
        this.bally0map.setScale(bally0mapScale);
        this.bally0map.x = (this.sys.game.config.width - this.bally0map.displayWidth) / 2;
        this.bally0map.y = (this.sys.game.config.height - this.bally0map.displayHeight) / 2;

        // Add green frame image
        let greenFrame = this.add.image(0, 0, 'greenRingLeft').setOrigin(0);

        // Calculate scale to cover the entire screen without distortion
        const scaleXGreen = this.sys.game.config.width / greenFrame.width;
        const scaleYGreen = this.sys.game.config.height / greenFrame.height;
        const scaleGreen = Math.max(scaleXGreen, scaleYGreen);

        // Set the scale of the green frame image to cover the entire screen
        greenFrame.setScale(scaleGreen).setScrollFactor(0);

        // Position the green frame image at the top-left corner of the screen
        greenFrame.setPosition(0, 0);

        // Add player sprite
        const playerX = this.sys.game.config.width / 4;
        const playerY = this.sys.game.config.height / 2;
        this.player = this.add.sprite(playerX, playerY, 'player');
        this.player.setScale(1.5);

        // Create the overlay container
        this.overlay = this.add.container(0, 0);
        this.overlay.setVisible(false); // Initially hide the overlay

        // Add a transparent background to cover the entire screen
        const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg.displayWidth = this.sys.game.config.width;
        glassbg.displayHeight = this.sys.game.config.height;
        this.overlay.add(glassbg);

        // Add translations and text to the overlay
        const text = this.add.text(100, 100, glassTextA[0], { color: '#ffffff' });
        this.overlay.add([glassbg0, text]);

        // Define the position of the directional pad buttons
        const buttonX = this.sys.game.config.width - 150; // Right side of the screen
        const buttonY = this.sys.game.config.height / 2 + 50;

        // Add directional pad buttons with fixed positions
        this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive();
        this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive();
        this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive();
        this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive();

        // Add the button to the overlay and hide it initially
        const buttonG = this.add.sprite(buttonX - 50, buttonY, 'pad-g').setInteractive().setVisible(false);
        this.buttonG = buttonG; // Store the button as a class member

        // Add middle button
        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive();

        // Set up event listeners for button clicks
        this.buttonMiddle.on('pointerdown', () => this.toggleOverlay());
        this.buttonUp.on('pointerdown', () => this.moveElement('up'));
        this.buttonDown.on('pointerdown', () => this.moveElement('down'));
        this.buttonLeft.on('pointerdown', () => this.moveElement('left'));
        this.buttonRight.on('pointerdown', () => this.moveElement('right'));
    }

    moveElement(direction) {
        const speed = 500; // Adjust the speed as needed

        let x = this.bally0map.x;
        let y = this.bally0map.y;

        switch (direction) {
            case 'up':
                y += 64;
                break;
            case 'down':
                y -= 64;
                break;
            case 'left':
                x += 64;
                break;
            case 'right':
                x -= 64;
                break;
        }

        // Tween the sprite to the new position
        this.tweens.add({
            targets: this.bally0map,
            x: x,
            y: y,
            duration: speed,
            ease: 'Linear'
        });
    }

    toggleOverlay() {
        this.overlay.setVisible(!this.overlay.visible);
        this.buttonG.setVisible(this.overlay.visible); // Toggle button visibility based on overlay visibility
    }
}

export default BallyGamboyGame;
