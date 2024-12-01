import Phaser from 'phaser';

export default class TextAnimator {
    constructor(scene) {
        this.scene = scene;
    }

    /**
     * Typewriter effect
     * @param {Phaser.GameObjects.Text} textObject - The text object to animate.
     * @param {string} fullText - The full string to reveal.
     * @param {number} speed - Delay in ms between each character.
     * @param {function} onComplete - Callback when the animation is finished.
     */
    typewriter(textObject, fullText, speed = 50, onComplete = () => {}) {
        textObject.setText(''); // Start with empty text
        let currentChar = 0;

        const timer = this.scene.time.addEvent({
            delay: speed,
            callback: () => {
                textObject.setText(fullText.substring(0, currentChar + 1));
                currentChar++;
                if (currentChar === fullText.length) {
                    timer.remove();
                    onComplete();
                }
            },
            loop: true,
        });
    }

    /**
     * Fade-in effect for text
     * @param {Phaser.GameObjects.Text} textObject - The text object to animate.
     * @param {number} duration - Duration of the fade-in in ms.
     * @param {function} onComplete - Callback when the animation is finished.
     */
    fadeIn(textObject, duration = 1000, onComplete = () => {}) {
        textObject.setAlpha(0); // Start invisible
        this.scene.tweens.add({
            targets: textObject,
            alpha: 1,
            duration: duration,
            ease: 'Power2',
            onComplete: () => onComplete(),
        });
    }

    /**
     * Bounce effect for text
     * @param {Phaser.GameObjects.Text} textObject - The text object to animate.
     * @param {number} scaleFactor - How much to scale the text (e.g., 1.5 for 150%).
     * @param {number} duration - Duration of the bounce in ms.
     * @param {function} onComplete - Callback when the animation is finished.
     */
    bounce(textObject, scaleFactor = 1.5, duration = 500, onComplete = () => {}) {
        const originalScaleX = textObject.scaleX;
        const originalScaleY = textObject.scaleY;

        this.scene.tweens.add({
            targets: textObject,
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            yoyo: true,
            ease: 'Bounce.easeOut',
            duration: duration,
            onComplete: () => {
                textObject.setScale(originalScaleX, originalScaleY); // Reset scale
                onComplete();
            },
        });
    }
}
