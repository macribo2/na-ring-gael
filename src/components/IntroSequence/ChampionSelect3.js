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
            width: 400,
            height: 400,
            parent: gameContainer.current,
            backgroundColor: "#222", // Dark background
            scene: {
                create: createScene,
            },
        };

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
