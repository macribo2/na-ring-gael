import Phaser from 'phaser';

class RippleManager {
    constructor(scene) {
        this.scene = scene;
        this.ripplePool = [];
        this.activeRipples = 0;
        this.baseMaxRipples = 150; // Reduced base limit
        this.maxActiveRipples = this.baseMaxRipples;
        this.intensity = 0;
        this.isActive = false;
        this.spawnRate = 280; // Slightly slower spawn rate
        this.ripplesPerSpawn = 1; // Reduced ripples per spawn
    }

    create() {
        // Create a pool of ripples, but a smaller pool
        for (let i = 0; i < this.baseMaxRipples * 10; i++) { // Reduced pool size
            const ripple = this.scene.add.graphics()
                .setDepth(9099)
                .setVisible(false)
                .setActive(false)
                .setScrollFactor(0);
            this.ripplePool.push(ripple);
        }

        this.isActive = true;

        // Storm intensity ramp-up over 5 seconds (now faster)
        this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 500 + Math.random() * 500, // Faster ramp-up time
            ease: 'Cubic.easeInOut',
            onUpdate: tween => {
                this.intensity = tween.getValue();

                // Scale up max ripples (now up to 5,000)
                this.maxActiveRipples = this.baseMaxRipples + (this.baseMaxRipples * 4 * this.intensity);

                // Fewer ripples per spawn (up to 3)
                this.ripplesPerSpawn = 1 + Math.round(this.intensity * 2);

                // Adjust spawn rate for a more controlled frequency (down to 10ms)
                this.spawnRate = Phaser.Math.Clamp(100 - (this.intensity * 90), 10, 50); // Faster spawn rate
            }
        });

        // Continuous ripple spawning
        this.scene.time.addEvent({
            delay: this.spawnRate,
            callback: this.spawnRippleCluster,
            callbackScope: this,
            loop: true
        });
    }

    spawnRippleCluster() {
        if (!this.isActive || this.activeRipples >= this.maxActiveRipples) return;

        for (let i = 0; i < this.ripplesPerSpawn; i++) {
            this.spawnRipple();
        }
    }

    spawnRipple() {
        if (!this.isActive || this.activeRipples >= this.maxActiveRipples) return;
    
        const ripple = this.ripplePool.find(r => !r.active);
        if (!ripple) return;
    
        const startSize = Phaser.Math.Between(5, 10); // Smaller size range
        const colors = [
            0x60b592, 0x4d7e61, 0xd4b1f7, 0xffe146, // Brighter pastels
            0x9bc8bc, 0x89b8e8, 0xa9ffb3, 0x9b69c7, // Pastels
            0xc8a9e8, 0xb5b0c2, 0xc5d1e1, 0xa8aad9, // Greys and blues
            0x8cc9ff, 0x79bbf2, 0x9b7ce2, 0xe06fc0, // Neons
            0xa6e1f2, 0xd3d3d3, 0x947db5, 0x7a4f98, // More purples, greys
            0x6fdc84, 0x8ae8d4, 0xff66b2, 0x70d0b3 // Neon greens and pinks
        ];
        const color = Phaser.Math.RND.pick(colors); // Random pick from new color palette
        const startAlpha = 0.5 + (Math.random() * 0.3); // Higher initial alpha for brightness
    
        ripple
            .clear()
            .setPosition(
                Phaser.Math.Between(50, this.scene.scale.width - 50),
                Phaser.Math.Between(50, this.scene.scale.height - 50)
            )
            .setVisible(true)
            .setActive(true);
    
        this.activeRipples++;
    
        this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 1000 + Math.random() * 500,
            ease: 'Cubic.Out',
            onUpdate: tween => {
                const progress = tween.getValue();
    
                // Apply perspective by stretching the size
                const sizeX = startSize + (300 * progress); // Smaller max size
                const sizeY = (startSize + (300 * progress)) / 2; // Oval effect with moderate size
    
                const alpha = startAlpha * (1 - progress); // Adjust alpha to maintain brightness
    
                ripple.clear()
                    .lineStyle(2, color, alpha) // Slightly thicker stroke for better visibility
                    .strokeEllipse(0, 0, sizeX, sizeY); // Use ellipse instead of circle
            },
            onComplete: () => {
                ripple.clear();
                ripple.setVisible(false);
                ripple.setActive(false);
                this.activeRipples--;
            }
        });
    }
    
    startTransition() {
        this.isActive = false;
    }

    clearAllRipples() {
        this.ripplePool.forEach(ripple => {
            ripple.clear();
            ripple.setVisible(false);
            ripple.setActive(false);
        });
        this.activeRipples = 0;
    }
    hide() {
        console.log('Hiding ripples...');
        this.ripplePool.forEach(ripple => {
            ripple.setAlpha(0);
            ripple.setVisible(false);
        });
        
        // Reset the ripple manager or clear the pool
        this.ripplePool = [];
    }
}

export default RippleManager;
