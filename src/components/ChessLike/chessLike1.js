import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory
import './chess-like.css'

const PhaserGame = () => {
    let currentWordPairIndex = 0;
    let posGaText, negGaText;
    let hearts = 3;
    const heartSprites = []; // Array to store heart sprites
    const phaserGameRef = useRef(null);

    function moveOnToNextWordPair() {
        currentWordPairIndex++;
        console.log('Moving to next word pair. Index:', currentWordPairIndex);

        if (currentWordPairIndex < wordPairs.length) {
            const nextWordPair = wordPairs[currentWordPairIndex];
            posGaText.setText(nextWordPair.posGa);
            negGaText.setText(nextWordPair.negGa);
        } else {
            console.log('End of game');
        }
    }

    useEffect(() => {
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
    }, []);

    function preload() {
        this.load.image('heart', './phaser-resources/images/heart.png');
    }

    function create() {
        const scene = this;

        const firstWordPair = wordPairs[0];
        const textStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
        };
        const posX = 100;
        const posY = 100;
        const negX = 300;
        const negY = 100;
        posGaText = scene.add.text(posX, posY, firstWordPair.posGa, textStyle).setOrigin(0);
        negGaText = scene.add.text(negX, negY, firstWordPair.negGa, textStyle).setOrigin(0);

        posGaText.setInteractive();
        negGaText.setInteractive();

        posGaText.on('pointerdown', () => {
            handleWrongAnswer(scene);
            moveOnToNextWordPair();
        });

        negGaText.on('pointerdown', () => {
            moveOnToNextWordPair();
        });

        // Create heart sprites representing game lives
        for (let i = 0; i < hearts; i++) {
            const heartX = 20 + i * 30;
            const heartY = 20;
            const heartSprite = scene.add.sprite(heartX, heartY, 'heart').setScale(0.1);
            heartSprites.push(heartSprite); // Add heart sprite to array
        }

        function handleWrongAnswer(scene) {
            hearts--;


            // Remove heart sprite from array and destroy it
            if (heartSprites.length > 0) {
                const removedHeart = heartSprites.pop();
                if (removedHeart) {
                    removedHeart.destroy();
                }
            }

            if (hearts === 0) {
                window.location.href = '/gameOver';
            }
        }
    }

    function update() {}

    return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;
