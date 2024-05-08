import Phaser from 'phaser';
import ireData from '../ChessLike/ireData';

export default class NavCD extends Phaser.Scene {
    constructor() {
        super({ key: 'NavCD' });

        // Define directional pad buttons and action button as class properties
        this.buttonUp = null;
        this.buttonDown = null;
        this.buttonLeft = null;
        this.buttonRight = null;
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
    }


    preload() {
        let champID = localStorage.getItem('champID');
        this.load.image('glassbg', './phaser-resources/images/mapFrame4.png');
        this.load.image('stonebg', './phaser-resources/images/fog5.png');
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
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
    }

    create() {
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
        this.currentPlaceText = this.add.text(200, this.cameras.main.height - 200, currentLocation, { fontFamily:'aonchlo', fontSize: '24px', fill: '#fff' }).setDepth(31);
       
        // Initialize navigation UI elements and logic
        const stonebg = this.add.sprite(0, 0, 'stonebg').setOrigin(0);
        stonebg.displayWidth = this.sys.game.config.width;
        stonebg.displayHeight = this.sys.game.config.height;
        const buttonX = this.sys.game.config.width - 100; // Adjust the offset as needed
        const buttonY = this.sys.game.config.height / 2 + 100; // Adjust the vertical position as needed
        
        // Add the buttons
        const buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(31);
        const buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(31);
        const buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(31);
        const buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(31);
        const buttonMiddle = this.add.sprite(buttonX, buttonY ,'button-middle').setDepth(31);

        // this.actionBtn = this.add.sprite(100, this.cameras.main.height - 50, 'actionBtn').setDepth(31);
        console.log(buttonUp.parentContainer);
        console.log(buttonUp.parentContainer);
        console.log(buttonUp.parentContainer);
        console.log(buttonUp.parentContainer+"kdddkdkd");

        // Check if sprites are loaded
        console.log(this.buttonUp, this.buttonDown, this.buttonLeft, this.buttonRight, this.actionBtn);
    
        // Add input listeners only if sprites are properly loaded

   
        if (this.buttonUp && this.buttonDown && this.buttonLeft && this.buttonRight && this.actionBtn) {
       // Add input listeners to directional pad buttons
// Add input listeners to directional pad buttons
buttonUp.setInteractive();
buttonUp.on('pointerup', () => {
    console.log('Up button clicked!');
    // Handle up button press
    if (this.navigationLevel === 'location') {
        // Move to county level
        this.navigationLevel = 'county';
    } else if (this.navigationLevel === 'county') {
        // Move to provincial level
        this.navigationLevel = 'province';
        // Update the current location to the first location of the new county
        this.currentLocation = this.currentCounty.locations[0];
    }
    this.updateCurrentPlaceText();
});

this.buttonDown.setInteractive().on('pointerup', () => {
    // Handle down button press
    if (this.navigationLevel === 'province') {
        // Move to county level
        this.navigationLevel = 'county';
        // Update the current county to the first county of the current province
        this.currentCounty = this.currentProvince.counties[0];
        // Update the current location to the first location of the new county
        this.currentLocation = this.currentCounty.locations[0];
    } else if (this.navigationLevel === 'county') {
        // Move to location level
        this.navigationLevel = 'location';
    } else if (this.navigationLevel === 'location') {
        // Close the NavCD scene
        // this.scene.stop('NavCD');
    }
    this.updateCurrentPlaceText();
});

this.buttonLeft.setInteractive().on('pointerup', () => {
    // Handle left button press
    switch (this.navigationLevel) {
        case 'province':
            // Cycle through provinces
            this.currentProvinceIndex = (this.currentProvinceIndex - 1 + this.provinces.length) % this.provinces.length;
            this.currentProvince = this.provinces[this.currentProvinceIndex];
            break;
        case 'county':
            // Cycle through counties within the current province
            this.currentCountyIndex = (this.currentCountyIndex - 1 + this.currentProvince.counties.length) % this.currentProvince.counties.length;
            this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
            // Update the current location to the first location of the new county
            this.currentLocation = this.currentCounty.locations[0];
            break;
        case 'location':
            // Cycle through locations within the current county
            this.currentPlayerLocation = (this.currentPlayerLocation - 1 + this.currentCounty.locations.length) % this.currentCounty.locations.length;
            this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
            break;
    }
    this.updateCurrentPlaceText();
});

this.buttonRight.setInteractive().on('pointerup', () => {
    // Handle right button press
    switch (this.navigationLevel) {
        case 'province':
            // Cycle through provinces
            this.currentProvinceIndex = (this.currentProvinceIndex + 1) % this.provinces.length;
            this.currentProvince = this.provinces[this.currentProvinceIndex];
            break;
        case 'county':
            // Cycle through counties within the current province
            this.currentCountyIndex = (this.currentCountyIndex + 1) % this.currentProvince.counties.length;
            this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
            // Update the current location to the first location of the new county
            this.currentLocation = this.currentCounty.locations[0];
            break;
        case 'location':
            // Cycle through locations within the current county
            this.currentPlayerLocation = (this.currentPlayerLocation + 1) % this.currentCounty.locations.length;
            this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
            break;
    }
    this.updateCurrentPlaceText();
});

        }
    
    }            
    
    update() {
        // No need to set input listeners again in update()
    }

    updateCurrentPlaceText() {
        // Set the text based on the navigation level
        let textString;
        switch (this.navigationLevel) {
            case 'province':
                textString = this.currentProvince.gaProvince; // Display province name in Irish
                break;
            case 'county':
                textString = this.currentCounty.gaCoName; // Display county name in Irish
                break;
            case 'location':
            default:
                textString = this.currentLocation.irishName; // Display location name in Irish
                break;
        }
        this.currentPlaceText.setText(textString);
    }

}
