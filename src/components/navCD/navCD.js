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
        this.currentPlaceText = this.add.text(200, this.cameras.main.height - 300, currentLocation, { fontFamily:'aonchlo', fontSize: '3em', fill: '#fff' }).setDepth(31);
       
        const stonebg = this.add.sprite(0, 0, 'stonebg').setOrigin(0);
        stonebg.displayWidth = this.sys.game.config.width;
        stonebg.displayHeight = this.sys.game.config.height;
        // Initialize navigation UI elements and logic

        const buttonX = this.sys.game.config.width - 100; // Adjust the offset as needed
        const buttonY = this.sys.game.config.height / 2 + 100; // Adjust the vertical position as needed

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
this.buttonNavUp.setInteractive().on('pointerup', () => {
    // Handle up buttonNav press
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

this.buttonNavDown.setInteractive().on('pointerup', () => {
    // Handle down buttonNav press
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
        this.scene.stop('NavCD');
    }
    this.updateCurrentPlaceText();
});

this.buttonNavLeft.setInteractive().on('pointerup', () => {
    // Handle left buttonNav press
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

this.buttonNavRight.setInteractive().on('pointerup', () => {
    // Handle right buttonNav press
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
