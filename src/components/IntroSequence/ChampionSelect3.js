import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import champSelect from './champSelect.css'
const ChampionSelect3 = () => {
    const gameContainer = useRef(null); // Reference to the div container
    const phaserGame = useRef(null); // Store the Phaser instance

    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            parent: gameContainer.current,
            backgroundColor: "#222",
            width: window.innerWidth,  
            height: window.innerHeight, 
            scene: {
                create: createScene,
            },
            scale: {
                mode: Phaser.Scale.RESIZE, // Allow resizing dynamically
                autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
            },
        };
        
        function createScene() {
            const { width, height } = this.scale; // Get the current screen size
        
            const graphics = this.add.graphics();
            graphics.fillStyle(0xffffff, 1); // White color
            graphics.fillCircle(width / 2, height / 2, 50); // Centered circle
        }
        // Initialize Phaser game
        phaserGame.current = new Phaser.Game(config);

        return () => {
            phaserGame.current.destroy(true);
        };
    }, []);

    function createScene() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1); // White color
        graphics.fillCircle(200, 200, 50); // Draw circle at center
    }

    return <div ref={gameContainer}  id="phaser-container"  />;
};

export default ChampionSelect3;
