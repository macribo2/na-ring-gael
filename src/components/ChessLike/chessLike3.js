import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './chess-like.css';

const PhaserGame = () => {
    const phaserGameRef = useRef(null);

    useEffect(() => {
        const loadFont = () => {
            if (document.fonts && document.fonts.ready) {
                return document.fonts.ready.then(() => true);
            } else {
                return Promise.resolve(true);
            }
        };

        const initializeGame = () => {
            const container = phaserGameRef.current;
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            const config = {
                type: Phaser.AUTO,
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    width: containerWidth,
                    height: containerHeight,
                },
                scene: {
                    preload: preload,
                    create: create,
                    update: update,
                },
            };

            const game = new Phaser.Game(config);

            return () => {
                game.destroy(true);
            };
        };

        loadFont().then(initializeGame);
    }, []);

    const notes = {
        silence: "0000",
        A: "0001",
        Bb: "0010",
        B: "0011",
        C: "0100",
        Db: "0101",
        D: "0110",
        Eb: "0111",
        E: "1000",
        F: "1001",
        Gb: "1010",
        G: "1011",
        Ab: "1100"
    };

    const knightMoves = [
        { move: "0001", offset: [-2, -1] },
        { move: "0010", offset: [-2, 1] },
        { move: "0011", offset: [-1, -2] },
        { move: "0100", offset: [-1, 2] },
        { move: "0101", offset: [1, -2] },
        { move: "0110", offset: [1, 2] },
        { move: "0111", offset: [2, -1] },
        { move: "1000", offset: [2, 1] }
    ];

    const nextRingMoves = [
        { move: "0001", offset: [-3, -2] },
        { move: "0010", offset: [-3, 2] },
        { move: "0011", offset: [-2, -3] },
        { move: "0100", offset: [-2, 3] },
        { move: "0101", offset: [2, -3] },
        { move: "0110", offset: [2, 3] },
        { move: "0111", offset: [3, -2] },
        { move: "1000", offset: [3, 2] }
    ];

    function preload() {
        this.load.image('player', './path/to/player/image.png');
    }

    function create() {
        const scene = this;

        // Create the chessboard
        const boardSize = 8;
        const squareSize = Math.min(scene.scale.width, scene.scale.height) / (boardSize + 2);
        const boardCenterX = scene.scale.width / 2;
        const boardCenterY = scene.scale.height / 2;

        const boardContainer = scene.add.container(boardCenterX - squareSize * boardSize / 2, boardCenterY - squareSize * boardSize / 2);

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const squareColor = (row + col) % 2 === 0 ? 0x2E8B57 : 0xFFC600;
                const square = scene.add.rectangle(col * squareSize, row * squareSize, squareSize, squareSize, squareColor);
                square.setOrigin(0);
                boardContainer.add(square);
            }
        }

        // Position the player in the center of the screen
        const playerX = boardCenterX;
        const playerY = boardCenterY;
        const player = scene.add.image(playerX, playerY, 'player').setScale(1.5).setOrigin(0.5, 0.5);
        boardContainer.add(player);

        // Function to create binary bars for a given move
        function createBinaryBars(binaryString, x, y, alpha = 1) {
            const barWidth = squareSize / 8;
            const barHeight = squareSize / 2;
            for (let i = 0; i < binaryString.length; i++) {
                const color = binaryString[i] === '1' ? 0xFFFFFF : 0x000000;
                const bar = scene.add.rectangle(x + i * barWidth, y, barWidth, barHeight, color).setOrigin(0);
                bar.alpha = alpha;
            }
        }

        // Display possible moves with binary bars around the player
        knightMoves.forEach(move => {
            const [offsetRow, offsetCol] = move.offset;
            const moveX = playerX + offsetCol * squareSize;
            const moveY = playerY + offsetRow * squareSize;
            createBinaryBars(move.move, moveX - squareSize / 2, moveY - squareSize / 4);
        });

        // Display the next ring of moves with semi-transparent bars
        nextRingMoves.forEach(move => {
            const [offsetRow, offsetCol] = move.offset;
            const moveX = playerX + offsetCol * squareSize;
            const moveY = playerY + offsetRow * squareSize;
            createBinaryBars(move.move, moveX - squareSize / 2, moveY - squareSize / 4, 0.5);
        });
    }

    function update() {}

    return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;
