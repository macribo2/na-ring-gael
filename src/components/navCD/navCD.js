import Phaser from 'phaser';
import ireData from '../ChessLike/ireData';

export default class NavCD extends Phaser.Scene {
    constructor() {
        super({ key: 'NavCD' });

        // Define directional pad buttonNavs and action buttonNav as class properties
        this.buttonNavUp = null;
        this.buttonNavDown = null;
        this.buttonNavLeft = null;
        this.buttonNavRight = null;
        this.actionBtn = null;

        this.currentPlayerLocation = 0; // Initial location index
        this.currentCountyIndex = 0; // Initial county index
        this.currentProvinceIndex = 0; // Initial province index

        // Define province, county, and location data
        this.provinces = ireData.provinces;
        this.currentProvince = this.provinces[this.currentProvinceIndex];
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];

        // Track navigation level
        this.navigationLevel = 'location'; // Initial navigation level is at location
        this.currentPlayerLocation = 0; // Initial location index
        this.currentCountyIndex = 0; // Initial county index
        this.currentProvinceIndex = 0; // Initial province index

        // Define province, county, and location data
        this.provinces = ireData.provinces;
        this.currentProvince = this.provinces[this.currentProvinceIndex];
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];

        // Track navigation level
        this.navigationLevel = 'location'; // Initial navigation level is at location

        // Track previous navigation state
        this.prevNavigationLevel = null;
        this.prevCountyIndex = null;
        this.prevProvinceIndex = null;
        this.prevLocation = null;

    }


    preload() {
        this.load.image('stonebg', './phaser-resources/images/fog5.png');

        let champID = localStorage.getItem('champID');
        this.load.image('glassbg', './phaser-resources/images/big-glass.png');
        this.load.image('overlay', './phaser-resources/images/overlay.png');
        this.load.image('actionBtn', './phaser-resources/images/ui/a-btn.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('pucaBlack', './phaser-resources/images/npcs/pooka0.png');
        this.load.image('pucaWhite', './phaser-resources/images/npcs/pooka1.png');
        this.load.image('puca-mounted', './phaser-resources/images/npcs/pookaMounted.png');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
    }

    create() {
        const puca = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'puca-mounted');

        // Set up the player sprite
        const player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
    
        // Ensure the player sprite is rendered above the puca sprite
        puca.setDepth(21); // Set a higher depth value for the player sprite
        player.setDepth(1); // Set a higher depth value for the player sprite
    
        // Optionally, you can adjust the scale of the player sprite to fit better
        player.setScale(1.3); // Adjust the scale as needed
        puca.setScale(0.3); // Adjust the scale as needed
    
        // You can adjust the positions of the puca and player sprites as needed
        puca.setOrigin(0.7, 0.4); // Center the puca sprite
        player.setOrigin(0.5, 0.5); // Center the player sprite
    
   // Tween to make the sprites bob up and down
   const bobTween = this.tweens.add({
    targets: [puca, player],
    y: '+=10', // Move the sprites down by 20 pixels
    duration: 2000, // Duration of the downward movement
    ease: 'Sine.easeInOut', // Easing function for smooth acceleration and deceleration
    yoyo: true, // Repeat the tween in reverse
    repeat: -1 // Repeat indefinitely
});


        // Set the current province index to 0 and the current county index to 0 initially
       // Set the current province index and county index to the initial values
this.currentProvinceIndex = 1;
this.currentCountyIndex = 1;

// Get the current province and county data from ireData
this.currentProvince = ireData.provinces[this.currentProvinceIndex];
this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];

// Get the first location within the county
let currentLocation = this.currentCounty.locations[0].irishName;



        console.log("Current Location:", currentLocation);
        // Set up the text to display the name of the current location
        this.currentPlaceText = this.add.text(200, this.cameras.main.height - 300, currentLocation, { fontFamily:'aonchlo', fontSize: '3em', fill: '#fff' }).setDepth(31);
       
        const stonebg = this.add.sprite(0, 0, 'stonebg').setOrigin(0);
        stonebg.displayWidth = this.sys.game.config.width;
        stonebg.displayHeight = this.sys.game.config.height;
        // Initialize navigation UI elements and logic

        const buttonX = this.sys.game.config.width - 100; // Adjust the offset as needed

        this.buttonNavUp = this.add.sprite(buttonX , this.cameras.main.height - 150, 'button-up').setDepth(31);
        this.buttonNavDown = this.add.sprite(buttonX , this.cameras.main.height - 50, 'button-down').setDepth(31);
        this.buttonNavLeft = this.add.sprite(buttonX -50, this.cameras.main.height - 100, 'button-left').setDepth(31);
        this.buttonNavRight = this.add.sprite(buttonX +50, this.cameras.main.height - 100, 'button-right').setDepth(31);
        this.buttonNavMiddle = this.add.sprite(buttonX , this.cameras.main.height - 100, 'button-middle').setDepth(20);
        this.actionBtn = this.add.sprite(250, this.cameras.main.height - 800, 'actionBtn').setDepth(31);
    
        // Check if sprites are loaded
        console.log(this.buttonNavUp, this.buttonNavDown, this.buttonNavLeft, this.buttonNavRight, this.actionBtn);
    
        // Add input listeners only if sprites are properly loaded

   
        if (this.buttonNavUp && this.buttonNavDown && this.buttonNavLeft && this.buttonNavRight && this.actionBtn) {
       // Add input listeners to directional pad buttonNavs
// Add input listeners to directional pad buttonNavs


let upButtonTapCount = 0; // Variable to track the number of taps on the up button
let prevNavigationLevel = 'location'; // Variable to track the previous navigation level
let prevCountyIndex = this.currentCountyIndex; // Variable to track the previous county index
let prevProvinceIndex = this.currentProvinceIndex; // Variable to track the previous province index
let prevPlayerLocation = this.currentPlayerLocation; // Variable to track the previous player location

this.buttonNavUp.setInteractive().on('pointerup', () => {
    console.log('Up button clicked!');
    // Handle up button press
    if (this.navigationLevel === 'location') {
        // Move to county level
        this.navigationLevel = 'county';
    } else if (this.navigationLevel === 'county') {
        // Move to provincial level
        this.navigationLevel = 'province';
        // Update the current location to the first location of the new county
        if (this.currentCounty) {
            this.currentLocation = this.currentCounty.locations[0];
        }
    }
    this.updateCurrentPlaceText();
});

 // Add input listeners to directional pad buttons
 this.buttonNavDown.setInteractive().on('pointerup', () => {
    console.log('Down button clicked!');
    // Handle down button press
    if (this.navigationLevel === 'province') {
        // Move to county level
        this.navigationLevel = 'county';
        // Reset the current county index to 0 for the current province
        this.currentCountyIndex = 0;
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        // Restore the previous location within the county
        if (this.prevNavigationLevel === 'location') {
            this.currentLocation = this.prevLocation;
            this.currentPlayerLocation = this.currentCounty.locations.findIndex(location => location.irishName === this.prevLocation.irishName);
        }
    } else if (this.navigationLevel === 'county') {
        // Move to location level
        this.navigationLevel = 'location';
        // Restore the previous location within the county
        if (this.prevNavigationLevel === 'location') {
            this.currentLocation = this.prevLocation;
            this.currentPlayerLocation = this.currentCounty.locations.findIndex(location => location.irishName === this.prevLocation.irishName);
        }
    } else if (this.navigationLevel === 'location') {
        // If previously navigated horizontally, reset the indices and navigate back to the original county
        if (this.prevNavigationLevel === 'county') {
            // Restore the previous county and location
            this.currentCountyIndex = this.prevCountyIndex;
            this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
            this.currentLocation = this.prevLocation;
            this.currentPlayerLocation = this.currentCounty.locations.findIndex(location => location.irishName === this.prevLocation.irishName);
        } else {
            // Perform dismount if at location level and press down
            this.scene.stop('NavCD');
            // Optionally, start another scene or perform any other necessary actions
        }
    }
    // Update the previous navigation level and indices
    this.prevNavigationLevel = this.navigationLevel;
    this.prevCountyIndex = this.currentCountyIndex;
    this.prevProvinceIndex = this.currentProvinceIndex;
    this.prevLocation = this.currentLocation;
    this.updateCurrentPlaceText();
});

this.buttonNavLeft.setInteractive().on('pointerup', () => {
        console.log('Left button clicked!');
        // Handle left button press
        switch (this.navigationLevel) {
            case 'province':
                // Cycle through provinces
                this.currentProvinceIndex = (this.currentProvinceIndex - 1 + this.provinces.length) % this.provinces.length;
                this.currentProvince = this.provinces[this.currentProvinceIndex];
                // Reset the current county index to 0 for the new province
                this.currentCountyIndex = 0;
                this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
                // Reset the current location index to 0 for the new county
                this.currentPlayerLocation = 0;
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                break;
            case 'county':
                // Cycle through counties within the current province
                this.currentCountyIndex = (this.currentCountyIndex - 1 + this.currentProvince.counties.length) % this.currentProvince.counties.length;
                this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
                // Reset the current location index to 0 for the new county
                this.currentPlayerLocation = 0;
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                break;
            case 'location':
                // Cycle through locations within the current county
                this.currentPlayerLocation = (this.currentPlayerLocation - 1 + this.currentCounty.locations.length) % this.currentCounty.locations.length;
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                break;
        }
        this.updateCurrentPlaceText();
    });
    
    
    this.buttonNavRight.setInteractive().on('pointerup', () => {
        console.log('Right button clicked!');
        // Handle right button press
        switch (this.navigationLevel) {
            case 'province':
                // Move to the next province
                this.currentProvinceIndex = (this.currentProvinceIndex + 1) % this.provinces.length;
                this.currentProvince = this.provinces[this.currentProvinceIndex];
                // Reset the current county index for the new province
                this.currentCountyIndex = 0;
                // Check if currentProvince is defined
                if (this.currentProvince) {
                    // Update currentCounty if defined, otherwise reset to undefined
                    this.currentCounty = this.currentProvince.counties[this.currentCountyIndex] || undefined;
                    // Update currentLocation if currentCounty is defined
                    if (this.currentCounty) {
                        this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                    } else {
                        this.currentLocation = undefined;
                    }
                } else {
                    this.currentCounty = undefined;
                    this.currentLocation = undefined;
                }
                break;
            case 'county':
                // Move to the next county within the current province
                this.currentCountyIndex = (this.currentCountyIndex + 1) % this.currentProvince.counties.length;
                this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
                // Update currentLocation if currentCounty is defined
                if (this.currentCounty) {
                    this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                } else {
                    this.currentLocation = undefined;
                }
                break;
            case 'location':
                // Move to the next location within the current county
                this.currentPlayerLocation = (this.currentPlayerLocation + 1) % this.currentCounty.locations.length;
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                break;
        }
        this.updateCurrentPlaceText();
    });
    
            
        }}    
    update() {
        // No need to set input listeners again in update()
    }

    updateCurrentPlaceText() {
        // Set the text based on the navigation level
        let textString;
        switch (this.navigationLevel) {
            case 'province':
                textString = this.currentProvince ? this.currentProvince.gaProvince : ''; // Display province name in Irish if defined
                break;
            case 'county':
                textString = this.currentCounty ? this.currentCounty.gaCoName : ''; // Display county name in Irish if defined
                break;
            case 'location':
            default:
                textString = this.currentLocation ? this.currentLocation.irishName : ''; // Display location name in Irish if defined
                break;
        }
        this.currentPlaceText.setText(textString);
    }
    

}
