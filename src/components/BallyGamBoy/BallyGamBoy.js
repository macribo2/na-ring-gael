import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';


const BallyGamboyGame = () => {

    const gameRef = useRef(null);

    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
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

    return <div id="ballygamboy-game-container"></div>;
};

export default BallyGamboyGame;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }



    preload() {
        // Load assets
        this.load.audio('rabbitTown', './phaser-resources/audio/rabbitTown.ogg');
        let champID = localStorage.getItem('champID');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', './phaser-resources/images/placeholders/gamboy.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image
        
        }

    create() {
        const music = this.sound.add('rabbitTown');
        music.play();
        // Add background sprite
        const background = this.add.sprite(0, 0, 'background').setOrigin(0);

        // Calculate scale to contain the background within the game dimensions
        const scaleX = this.sys.game.config.width / background.width;
        const scaleY = this.sys.game.config.height / background.height;
        const scale = Math.max(scaleX, scaleY);

        // Set the scale of the background
        background.setScale(scale).setScrollFactor(0);

        // Add player sprite
        this.player = this.add.sprite(100, 350, 'player');

        // Create a duplicate of the original player sprite
        this.tintedPlayer = this.add.sprite(this.player.x, this.player.y, 'player');

        // Apply the tint to the duplicate sprite
        this.tintedPlayer.setTintFill(0xb98ae0, 0x9793c1, 0x9793c1, 0xd7bbf0); // Use the hexadecimal color codes here
        this.tintedPlayer.alpha = 0.65; // Set the transparency (alpha) level

        // Define the position of the directional pad buttons
        const buttonX = this.sys.game.config.width - 150; // Right side of the screen
        const buttonY = this.sys.game.config.height / 2 + 50;

        // Add directional pad buttons with fixed positions
        this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive();
        this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive();
        this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive();
        this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive();

        // Add middle button
        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive();

        // Set up event listeners for button clicks
        this.buttonUp.on('pointerdown', () => this.movePlayer('up'));
        this.buttonDown.on('pointerdown', () => this.movePlayer('down'));
        this.buttonLeft.on('pointerdown', () => this.movePlayer('left'));
        this.buttonRight.on('pointerdown', () => this.movePlayer('right'));
    }

    movePlayer(direction) {
        const speed = 300; // Adjust the speed as needed
        const distance = 250; // Adjust the distance as needed

        let x = this.player.x;
        let y = this.player.y;

        switch (direction) {
            case 'up':
                y -= distance;
                break;
            case 'down':
                y += distance;
                break;
            case 'left':
                x -= distance;
                break;
            case 'right':
                x += distance;
                break;
        }

        // Tween the player sprite to the new position
        this.tweens.add({
            targets: this.player,
            x: x,
            y: y,
            duration: speed,
            ease: 'Linear',
            onUpdate: () => {
                // Update the position of the tinted player to match the player sprite
                this.tintedPlayer.setPosition(this.player.x, this.player.y);
            }
        });
        // Play background music
     
        
    }

}
