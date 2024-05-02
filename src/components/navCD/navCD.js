import Phaser from 'phaser';
import ireData from '../ChessLike/ireData'
export default class NavCD extends Phaser.Scene {
    constructor() {
        super({ key: 'NavCD' });
    
        // Define directional pad buttons and action button as class properties
        this.buttonUp = null;
        this.buttonDown = null;
        this.buttonLeft = null;
        this.buttonRight = null;
        this.actionBtn = null;
        
        this.currentPlayerLocation = 1;
        // Initialize current place index
        this.currentPlaceIndex = [1, 0]; // Initial index
        // Call updateCurrentPlaceText to ensure it's initialized properly
        this.updateCurrentPlaceText();
    }
    updateCurrentPlaceText() {
        // Check if currentPlaceIndex is defined and has the expected structure
        if (this.currentPlaceIndex ) {
        // Get current province and county data from ireData
        let currentProvince = ireData.provinces[this.currentPlaceIndex[1]];
        let currentCounty = currentProvince.counties[this.currentPlaceIndex[1]];
        
        // Get the first location within the county (assuming Galway City is the first location)
        let currentLocation = currentCounty.locations[this.currentPlayerLocation]; 
        
        // Construct text string
        let textString = `${currentLocation}`;
    
        // this.currentPlaceText = this.add.text(400, this.cameras.main.height - 100, 'Current Place: ', { fontSize: '24px', fill: '#fff' }).setDepth(31);
    
        // Assuming you have a text object to display this information:
        this.currentPlaceText.setText(textString);
    }
}

     preload() {
        let champID = localStorage.getItem('champID');    
        this.load.image('glassbg', './phaser-resources/images/big-glass.png');
    
        this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image
    
    
            this.load.image('actionBtn', './phaser-resources/images/ui/a-btn.png'); // Replace 'path/to/glass_circle.png' with the actual path to your button image
            this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
            this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
            this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
            this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
            this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
            this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
            this.load.image('pucaBlack', './phaser-resources/images/npcs/pooka0.png');
            this.load.image('pucaWhite', './phaser-resources/images/npcs/pooka1.png');
            this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
        }
    
        create() {
            // Get current county data from the current province
            // Get current province data from ireData
            let currentProvince = ireData.provinces[this.currentPlaceIndex[0]];
            this.currentCounty = currentProvince.counties[this.currentPlaceIndex[1]];


            this.currentPlaceText = this.add.text(400, this.cameras.main.height - 100, this.updateCurrentPlaceText(), { fontSize: '24px', fill: '#fff' }).setDepth(31);
        
            // Initialize navigation UI elements and logic
            const glassbg = this.add.sprite(0, 0, 'glassbg').setOrigin(0);
        
            // Add directional pad buttons
            this.buttonUp = this.add.sprite(100, this.cameras.main.height - 150, 'button-up').setDepth(31);
            this.buttonDown = this.add.sprite(100, this.cameras.main.height - 50, 'button-down').setDepth(31);
            this.buttonLeft = this.add.sprite(50, this.cameras.main.height - 100, 'button-left').setDepth(31);
            this.buttonRight = this.add.sprite(150, this.cameras.main.height - 100, 'button-right').setDepth(31);
            this.buttonMiddle = this.add.sprite(100, this.cameras.main.height - 100, 'button-middle').setDepth(20);
        
            // Add action button
            this.actionBtn = this.add.sprite(250, this.cameras.main.height - 100, 'actionBtn').setDepth(31);
        
        //     // Add text indicator
        //    let currentPlaceText = this.add.text(400, this.cameras.main.height - 100, 'Current Place: ', { fontSize: '24px', fill: '#fff' }).setDepth(31);
        
            // Check if sprites are loaded
            console.log(this.buttonUp);
            console.log(this.buttonDown);
            console.log(this.buttonLeft);
            console.log(this.buttonRight);
            console.log(this.actionBtn);
        
            // Add input listeners only if sprites are properly loaded
            if (this.buttonUp && this.buttonDown && this.buttonLeft && this.buttonRight && this.actionBtn) {
                // Add input listeners to directional pad buttons
                this.buttonUp.setInteractive().on('pointerdown', () => {
                    // Handle up button press
                    
                this.currentPlaceText.setText(this.updateCurrentPlaceText());
                });
        
                this.buttonDown.setInteractive().on('pointerdown', () => {
                    // Handle down button press

    this.scene.stop('NavCD'); // Close the NavCD scene
                });
        
             // Inside the create() method
this.buttonLeft.setInteractive().on('pointerdown', () => {
    // Handle left button press
    this.currentPlayerLocation = (this.currentPlayerLocation - 1 + this.currentCounty.locations.length) % this.currentCounty.locations.length;
    this.updateCurrentPlaceText();
});

this.buttonRight.setInteractive().on('pointerdown', () => {
    // Handle right button press
    this.currentPlayerLocation = (this.currentPlayerLocation + 1) % this.currentCounty.locations.length;
    this.updateCurrentPlaceText();
});

                // Add input listener to action button
                this.actionBtn.setInteractive().on('pointerdown', () => {
                    // Handle action button press
                });
            } else {
                console.error('One or more sprites failed to load properly.');
            }
         
        }
        updateCurrentPlaceText() {
            // Check if currentPlaceIndex is defined and has the expected structure
            if (this.currentPlaceIndex) {
                // Get current province and county data from ireData
                let currentProvince = ireData.provinces[1];
                let currentCounty = currentProvince.counties[1];
                
                // Get the first location within the county (assuming Galway City is the first location)
                let currentLocation = currentCounty.locations[this.currentPlayerLocation]; 
                
                // Construct text string

                return `${currentLocation.irishName}`;

            }
            return ''; // Return an empty string if data is not available
        }
        update() {
            this.buttonUp.setInteractive().on('pointerdown', () => {
                // Handle up button press to navigate to the province level
                this.currentPlaceIndex[1] = 0; // Reset to the first county within the province
                this.updateCurrentPlaceText();
            });
        
            this.buttonDown.setInteractive().on('pointerup', () => {
                // Handle down button press
                this.currentPlaceIndex[1]++; // Move to the next location
                this.currentPlaceText.setText(this.updateCurrentPlaceText());
            });
        
            this.buttonLeft.setInteractive().on('pointerup', () => {
                // Handle left button press
                // this.currentPlaceIndex[0]--; // Move to the previous county
                this.currentPlaceText.setText(this.updateCurrentPlaceText());
            });
        
            this.buttonRight.setInteractive().on('pointerup', () => {
                // Handle right button press
                // this.currentPlaceIndex[0]++; // MFove to the next county
                this.currentPlaceText.setText(this.updateCurrentPlaceText());
            });
        
            // Add input listener to action button
            this.actionBtn.setInteractive().on('pointerdown', () => {
                // Handle action button press
            });
        }
        
           
}
