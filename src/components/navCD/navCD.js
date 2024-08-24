import Phaser from "phaser";
import ireData from "../ChessLike/ireData";

export default class NavCD extends Phaser.Scene {

    
    constructor() {
        super({ key: "NavCD" });
        this.countyBackgrounds = {
            "antrim": "antrim",
            "armagh": "armagh",
            "carlow": "carlow",
            "cavan": "cavan",
            "clare": "clare",
            "cork": "cork",
            "derry": "derry",
            "donegal": "donegal",
            "down": "down",
            "dublin": "dublin",
            "fermanagh": "fermanagh",
            "galway": "galway",
            "kerry": "kerry",
            "kildare": "kildare",
            "kilkenny": "kilkenny",
            "laois": "laois",
            "leitrim": "leitrim",
            "limerick": "limerick",
            "longford": "longford",
            "louth": "louth",
            "mayo": "mayo",
            "meath": "meath",
            "monaghan": "monaghan",
            "offaly": "offaly",
            "roscommon": "roscommon",
            "sligo": "sligo",
            "tipperary": "tipperary",
            "tyrone": "tyrone",
            "waterford": "waterford",
            "westmeath": "westmeath",
            "wexford": "wexford",
            "wicklow": "wicklow",
            "ireland": "ireland"
        };
     this.provinceGraphics = {
            "Connacht": "connachtMap",
            "Leinster": "leinsterMap",
            "Munster": "munsterMap",
            "Ulster": "ulsterMap"
        };
        
        // Initialize class properties
        this.prevLocation = null; // or some default value
        this.countyBG = null;
        this.minX = 0;
        this.maxX = 0;
        this.locationPositions = [];
        this.currentPlayerLocation = 1;
        this.currentCounty = null;
        this.navigationLevel = "location";
    this.isToggling= true;
        // Bind event handlers
        this.handleLeftButtonPress = this.handleLeftButtonPress.bind(this);
        this.handleRightButtonPress = this.handleRightButtonPress.bind(this);
        this.buttonNavLeft = null; // Define buttonNavLeft first
        this.buttonNavRight = null; // Define buttonNavRight first
        this.buttonNavMiddle = null; // Define buttonmiddle first
        
        this.exitPoints = {
            "west": { x: 100, y: 100 }, // Example exit point for Connacht
            "east": { x: 300, y: 200 }, // Example exit point for Leinster
            "south": { x: 200, y: 300 },  // Example exit point for Munster
            "north": { x: 100, y: 100 }     // Example exit point for Ulster
        };

        this.overlay = null;
        this.enCurrentPlaceText = null;
        this.isToggling = false;
    }
    
    // Function to move player and puca off the screen based on direction
    
    preload() {
        this.load.image("pucaLeaps", "/phaser-resources/images/startCDNav.png");
        this.load.image("stonebg", "/phaser-resources/images/fogblue.png");
      
      let champID = localStorage.getItem("champID");
      this.load.image("glassbg", "/phaser-resources/images/big-glass.png");
    this.load.image("overlay", "/phaser-resources/images/overlay.png");
    this.load.image("actionBtn", "/phaser-resources/images/ui/a-btn.png");
    this.load.image("button-up", "/phaser-resources/images/ui/pad-u.png");
    this.load.image("button-down", "/phaser-resources/images/ui/pad-d.png");
    this.load.image("button-left", "/phaser-resources/images/ui/pad-l.png");
    this.load.image("button-right", "/phaser-resources/images/ui/pad-r.png");
    this.load.image(
      "button-middle-lit",
      "/phaser-resources/images/ui/middle-a.png",
    );
    this.load.image(
      "button-middle",
      "/phaser-resources/images/ui/middle-b.png",
    );
    this.load.image("pucaBlack", "/phaser-resources/images/npcs/pooka0.png");
    this.load.image("pucaWhite", "/phaser-resources/images/npcs/pooka1.png");
        this.load.image(
        "puca-mounted",
        "/phaser-resources/images/npcs/pookaMounted.png",
        );
    this.load.image(
      "player",
      `/phaser-resources/images/champions/${champID}.png`,
    );
    this.load.image("fullscreen", "/phaser-resources/images/ui/full-screen.png");
    this.load.image("westmeath", "/countyMaps/westmeath.png");
    this.load.image("galway", "/countyMaps/galway.png");
    this.load.image("antrim", "/countyMaps/antrim.png");
    this.load.image("armagh", "/countyMaps/armagh.png");
    this.load.image("carlow", "/countyMaps/carlow.png");
    this.load.image("cavan", "/countyMaps/cavan.png");
    this.load.image("clare", "/countyMaps/clare.png");
    this.load.image("cork", "/countyMaps/cork.png");
    this.load.image("derry", "/countyMaps/derry.png");
    this.load.image("donegal", "/countyMaps/donegal.png");
    this.load.image("down", "/countyMaps/down.png");
    this.load.image("dublin", "/countyMaps/dublin.png");
    this.load.image("fermanagh", "/countyMaps/fermanagh.png");
    this.load.image("kerry", "/countyMaps/kerry.png");
    this.load.image("kildare", "/countyMaps/kildare.png");
    this.load.image("kilkenny", "/countyMaps/kilkenny.png");
    this.load.image("laois", "/countyMaps/laois.png");
    this.load.image("leitrim", "/countyMaps/leitrim.png");
    this.load.image("limerick", "/countyMaps/limerick.png");
    this.load.image("longford", "/countyMaps/longford.png");
    this.load.image("louth", "/countyMaps/louth.png");
    this.load.image("mayo", "/countyMaps/mayo.png");
    this.load.image("meath", "/countyMaps/meath.png");
    this.load.image("monaghan", "/countyMaps/monaghan.png");
    this.load.image("offaly", "/countyMaps/offaly.png");
    this.load.image("roscommon", "/countyMaps/roscommon.png");
    this.load.image("sligo", "/countyMaps/sligo.png");
    this.load.image("tipperary    ", "/countyMaps/tipperary.png");
    this.load.image("tyrone", "/countyMaps/tyrone.png");
    this.load.image("waterford", "/countyMaps/waterford.png");
    this.load.image("wexford", "/countyMaps/wexford.png");
    this.load.image("wicklow", "/countyMaps/wicklow.png");
    this.load.image("ulsterMap", "/phaser-resources/images/ulsterMap.png");
    this.load.image("leinsterMap", "/phaser-resources/images/leinsterMap.png");
    this.load.image("connachtMap", "/phaser-resources/images/connachtMap.png");
    this.load.image("munsterMap", "/phaser-resources/images/munsterMap.png");
    this.load.image("ireland", "/phaser-resources/images/ire0.png");
    this.load.image("waves", "/countyMaps/waves.png");



  }

  create() {
 
  
        // Display the message and graphic
        const message = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Léim an Púca súas sa spéir!', {
            fontSize: '32px',
            
            fill: '#fff'
        }).setOrigin(0.5).setDepth(699);

        const pucaLeaps= this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'pucaLeaps').setOrigin(0.5).setDepth(600);
   // Calculate the scale factors
   const scaleX = this.cameras.main.width / pucaLeaps.width;
   const scaleY = this.cameras.main.height / pucaLeaps.height;
   const scale = Math.max(scaleX, scaleY);

   // Apply the scale
   pucaLeaps.setScale(scale);
        // Hide the message and graphic after a delay
        this.time.delayedCall(3500, () => {
            message.destroy();
            pucaLeaps.destroy();
        });

        // Update the flag in local storage
        localStorage.setItem('isFirstCatch', 'true');
    

   // Add and configure overlay
   this.overlay = this.add.container(0, 0).setDepth(3);
   const glassbg = this.add.sprite(0, 0, 'glassbg').setOrigin(0);
   glassbg.displayWidth = this.gameWidth;
   glassbg.displayHeight = this.gameHeight;
   this.overlay.add(glassbg);
   this.overlay.setVisible(false); // Start as invisible

   // Add and configure text
   this.enCurrentPlaceText = this.add.text(400, 300, 'Overlay Text', { fontSize: '32px', fill: '#fff' });
   this.enCurrentPlaceText.setDepth(4); // Make sure text is above the overlay
   this.enCurrentPlaceText.setVisible(false); // Start as invisible

   // Add and configure middle button
   this.buttonMiddle = this.add.sprite(400, 500, 'buttonImage'); // Make sure 'buttonImage' is preloaded
   this.buttonMiddle.setInteractive();

   // Bind the context for methods
   this.handleMiddleButtonPress = this.handleMiddleButtonPress.bind(this);

   // Set up event listeners
   this.buttonMiddle.on('pointerdown', this.handleMiddleButtonPress);

   console.log("Scene created");

   const centerX = this.cameras.main.width / 2;
   const centerY = this.cameras.main.height / 2;

   this.puca = this.add.sprite(centerX, centerY, "puca-mounted");
   this.puca.setDepth(921);
   this.puca.setScale(0.3);
   this.puca.setOrigin(0.7, 0.4);

   this.player.setDepth(920);
   this.player.setScale(1.3);
   this.player.setOrigin(0.5, 0.5);

 
    this.tweens.add({
        targets: [this.puca, this.player],
        y: "+=10",
        duration: 2000,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
    });

    this.exitPoints = {
        west: { x: -50, y: this.cameras.main.height / 2 },
        east: { x: this.cameras.main.width + 50, y: this.cameras.main.height / 2 },
        north: { x: this.cameras.main.width / 2, y: -50 },
        south: { x: this.cameras.main.width / 2, y: this.cameras.main.height + 50 },
    };
    
    this.countyBG = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, this.countyBackgrounds["westmeath"]).setScale(4);
   

    this.provincialMapSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, this.countyBackgrounds["ireland"]).setDepth(66);
    this.provincialMapSprite.alpha = 0;

    this.minX = 0;
    this.maxX = 400 - this.cameras.main.height;

    const initialX = this.cameras.main.centerX;
    const initialY = this.cameras.main.centerY;
    this.countyBG.setPosition(initialX, initialY);

    this.locationPositions = [
        { x: 0, y: 0 },
        { x: -300, y: 0 },
        { x: 0, y: 300 },
        { x: 300, y: 500 },
        { x: -200, y: 0 },
        { x: 100, y: 200 },
    ];

    const bobTween = this.tweens.add({
        targets: [this.puca, this.player],
        y: "+=10",
        duration: 2000,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
    });

    this.currentProvinceIndex = 4;
    this.currentCountyIndex = 3;

    this.currentProvince = ireData.provinces[this.currentProvinceIndex];

    this.currentProvinceIndex = 0;
    this.currentProvince = ireData.provinces[this.currentProvinceIndex];

    if (this.currentProvince) {
        this.provinces = ireData.provinces;
    } else {
        console.error("Current province data is undefined.");
        return;
    }

    this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
    let currentLocation = this.currentCounty.locations[0].irishName;

    console.log("Current Location:", currentLocation);

    this.gaCurrentPlaceText = this.add
        .text(200, this.cameras.main.height - 300, currentLocation, {
            fontFamily: "aonchlo",
            fontSize: "3em",
            fill: "#fff",
        })
        .setDepth(31);

    this.enCurrentPlaceText = this.add
        .text(200, this.cameras.main.height - 100, currentLocation, {
            fontFamily: "Anaphora",
            fontSize: "2em",
            fill: "#fff",
        })
        .setDepth(32)
        .setVisible();

    this.isToggling = false;

    this.overlay = this.add.container(0, 0).setVisible(false);

    const stonebg = this.add.sprite(0, 0, "stonebg").setOrigin(0);
    stonebg.displayWidth = this.sys.game.config.width;
    stonebg.displayHeight = this.sys.game.config.height;

    this.countyBG.setAlpha(0.4);

    this.countyBG.setPosition(initialX, initialY);

    const buttonX = this.sys.game.config.width - 100;

    this.buttonNavUp = this.add
        .sprite(buttonX, this.cameras.main.height - 150, "button-up")
        .setDepth(31);
    this.buttonNavDown = this.add
        .sprite(buttonX, this.cameras.main.height - 50, "button-down")
        .setDepth(31);
    this.buttonNavLeft = this.add
        .sprite(buttonX - 50, this.cameras.main.height - 100, "button-left")
        .setDepth(31)
        .setInteractive()
        .on("pointerdown", this.handleLeftButtonPress.bind(this));
    this.buttonNavRight = this.add
        .sprite(buttonX + 50, this.cameras.main.height - 100, "button-right")
        .setDepth(31)
        .setInteractive()
        .on("pointerdown", this.handleRightButtonPress.bind(this));
    this.buttonMiddle = this.add
        .sprite(buttonX, this.cameras.main.height - 100, "button-middle")
        .setDepth(20)
        .setInteractive()
        .on("pointerdown", this.handleMiddleButtonPress.bind(this));
    this.actionBtn = this.add
        .sprite(250, this.cameras.main.height - 800, "actionBtn")
        .setDepth(31);

    this.fullscreenButton = this.add.sprite(50, 50, 'fullscreen').setInteractive();
    this.fullscreenButton.on('pointerdown', this.toggleFullscreen, this);

    console.log(
        this.buttonNavUp,
        this.buttonNavDown,
        this.buttonNavLeft,
        this.buttonNavRight,
        this.actionBtn,
    );

    if (
        this.buttonNavUp &&
        this.buttonNavDown &&
        this.buttonNavLeft &&
        this.buttonNavRight &&
        this.actionBtn
    ) {
        this.buttonNavUp.setInteractive().on("pointerup", () => {
            this.buttonNavUp.disableInteractive();
            if (this.navigationLevel === "location") {
                this.navigationLevel = "county";
                const centerX = this.cameras.main.width / 2;
                const centerY = this.cameras.main.height / 2;
                this.tweens.add({
                    targets: this.countyBG,
                    x: centerX,
                    y: centerY,
                    duration: 500,
                    ease: 'Linear',
                });
                this.tweens.add({
                    targets: this.countyBG,
                    scale: 2,
                    duration: 500,
                    ease: 'Linear',
                    onComplete: () => {
                        if (this.currentCounty) {
                            this.currentLocation = this.currentCounty.locations[0];
                        }
                        this.updateCurrentPlaceText();
                        this.buttonNavUp.setInteractive();
                    }
                });
            } else if (this.navigationLevel === "county") {
                this.navigationLevel = "province";
                this.tweens.add({
                    targets: [this.provincialMapSprite],
                    alpha: 0.5,
                    duration: 500,
                    ease: 'Linear',
                    scale: 0.7
                });
                if (this.currentProvince) {
                    this.currentLocation = this.currentProvince.counties[0].locations[0];
                }
                this.updateCurrentPlaceText();
                this.buttonNavUp.setInteractive();
                this.tweens.add({
                    targets: this.countyBG,
                    scale: 0.5,
                    alpha: 0,
                    duration: 500,
                    ease: 'Linear',
                    onComplete: () => {
                        if (this.currentCounty) {
                            this.currentLocation = this.currentCounty.locations[0];
                        }
                        this.updateCurrentPlaceText();
                        this.buttonNavUp.setInteractive();
                    }
                });
            }
            setTimeout(() => {
                this.buttonNavUp.setInteractive();
            }, 55);
        });

        let isButtonNavDownClickable = true;
        const navCooldownDuration = 500; // milliseconds
        
        this.buttonNavDown.setInteractive().on("pointerup", () => {
            if (!isButtonNavDownClickable) {
                return; // If the button is not clickable, exit the function
            }
        
            // Disable the button temporarily
            isButtonNavDownClickable = false;
        
            console.log("Down button clicked!");
        
            if (this.navigationLevel === "province") {
                let direction;
                let provinceIndex = this.currentProvinceIndex;
                switch (provinceIndex) {
                    case 0:
                        direction = "west";
                        break;
                    case 1:
                        direction = "east";
                        break;
                    case 2:
                        direction = "north";
                        break;
                    case 3:
                        direction = "south";
                        break;
                    default:
                        console.error("Invalid provincial Index!");
                        return;
                }
                console.log(provinceIndex);
        
                // Perform animation based on the direction
                this.moveOffScreen(direction);
        
                this.tweens.add({
                    targets: [this.provincialMapSprite], // An array of targets for the tween
                    alpha: 0, // Fade out by setting alpha to 0
                    duration: 500, // Duration of the animation in milliseconds
                    ease: 'Linear', // Easing function for smooth animation
                    scale: 1
                });
                this.tweens.add({
                    targets: this.countyBG,
                    scale: 2,
                    alpha: 0.3,
                    duration: 500,
                    ease: 'Linear',
                    onComplete: () => {
                        if (this.currentCounty) {
                            this.currentLocation = this.currentCounty.locations[0];
                        }
                        this.updateCurrentPlaceText();
                        this.buttonNavUp.setInteractive();
                    }
                });
                // Move to county level
                this.navigationLevel = "county";
                // Reset the current county index to 0 for the current province
                this.currentCountyIndex = 0;
                this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
                // Restore the previous location within the county
                if (this.prevNavigationLevel === "location") {
                    this.currentLocation = this.prevLocation;
                    this.currentPlayerLocation = this.currentCounty.locations.findIndex(
                        (location) => location.irishName === this.prevLocation.irishName,
                    );
                }
            } else if (this.navigationLevel === "county") {
                // Move to location level
                this.navigationLevel = "location";
                // Update the current location based on the accessed county
                this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        
                // Set the current location to the first location in the county
                this.currentLocation = this.currentCounty.locations[0];
                this.currentPlayerLocation = 0;
                // Refresh the location display
                this.refreshLocationDisplay();
                // Store previous navigation level and location
                this.prevNavigationLevel = "county";
                this.prevLocation = this.currentLocation;
                // Tween to zoom in
                this.player.setScale(1.3); // Adjust the scale as needed
                this.puca.setScale(0.3);
                this.tweens.add({
                    targets: this.countyBG,
                    scale: 4, // Zoom in to 4x scale
                    duration: 500, // Duration of the zoom-in effect
                    ease: 'Linear', // Easing function
                    onComplete: () => {
                        // Update the displayed location name after the navigation changes
                        this.updateCurrentPlaceText();
                        isButtonNavDownClickable = true; // Re-enable the button
                    }
                });
            } else if (this.navigationLevel === "location") {
                // If previously navigated horizontally, reset the indices and navigate back to the original county
                if (this.prevNavigationLevel === "county") {
                    // Restore the previous county and location
                    this.currentCountyIndex = this.prevCountyIndex;
                    this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
                    this.currentLocation = this.prevLocation;
                    this.currentPlayerLocation = this.currentCounty.locations.findIndex(
                        (location) => location.irishName === this.prevLocation.irishName,
                    );
        
                    // Update the navigation level to 'county'
                    this.navigationLevel = "county";
                } else {
                  let  url = this.currentLocation.url;
                    window.location.href = 'https://www.na-ring-gael.com/'+ url;
                    // Optionally, start another scene or perform any other necessary actions
                }
                isButtonNavDownClickable = true; // Re-enable the button
            } else {
                isButtonNavDownClickable = true; // Re-enable the button if none of the conditions are met
            }
        
            // Update the previous navigation level and indices
            this.prevNavigationLevel = this.navigationLevel;
            this.prevCountyIndex = this.currentCountyIndex;
            this.prevProvinceIndex = this.currentProvinceIndex;
            this.prevLocation = this.currentLocation;
        
            setTimeout(() => {
                this.buttonNavDown.setInteractive();
                isButtonNavDownClickable = true; // Re-enable the button after the timeout
            }, navCooldownDuration);
        });
        
    

    }

    
        // Add countyBG background image
        console.log("Current County:33333333", this.currentCounty);
    this.countyBG = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, this.countyBackgrounds[this.currentCounty.name]).setScale(4).setAlpha(0.3);
  
        // Define the bounds for the background image movement
        this.minX = 0;
        this.maxX = 400 - this.cameras.main.height;
        // this.waves = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'waves').setScale(1).setDepth(0);
        // Set the initial position of the background sprite
        this.countyBG.setPosition(initialX, initialY);
        
        // Define location positions (sample data)
    // Define location positions
    this.locationPositions = [
        { x: 0, y: 0 }, // Location 1
        { x: -300, y: 0 }, // Location 2
        { x: 0, y: 300 }, // Location 3
        { x: 300, y: 500 }, // Location 6
        { x: -200, y: 0 }, // Location 5
        { x: 100, y: 200 }, // Location 4
    ];


        // Add event listeners to navigation buttons
            this.buttonNavLeft.setInteractive().on("pointerdown", this.handleLeftButtonPress);
        this.buttonNavRight.setInteractive().on("pointerdown", this.handleRightButtonPress);

        
        
        
        // Other create code...

        ;
        this.buttonNavRight = this.buttonNavRight.setInteractive().on("pointerdown", this.handleRightButtonPress.bind(this));
        this.handleMiddleButtonPress = this.handleMiddleButtonPress.bind(this);


        this.buttonNavLeft = this.buttonNavLeft.setInteractive().on("pointerdown", this.handleLeftButtonPress.bind(this))
        let location = this.locationPositions[this.playerLocation];

        let isToggling = false; // Flag to track if overlay is currently toggling

        
        const enTextStyle = {
            fontSize: '4em',
            fontFamily: 'anaphora',
            color: '#ffffff',
            stroke: '#000000', // Stroke color
            strokeThickness: 3, // Stroke thickness
        };
        
        let enText = this.add.text(0, 0, '', enTextStyle).setOrigin(0).setDepth(9);
        this.overlay.add(enText);
        
        // Define behavior for pointer events (e.g., hover, click)
      
      
// function toggleOverlay() {
//     if (this.overlay !== null && this.overlay !== undefined) {
//         this.overlay.setVisible(this.overlay.visible);
//         setTimeout(()=>{
//             isToggling=true;
//         },200)
//     }
// }
        this.buttonMiddle.on('pointerover', () => {
// Set up event listener for button clicks
this.buttonMiddle.on('pointerdown', () => {
    if (this.isToggling) { // Check if not already toggling
        isToggling = false; // Set flag to true
        this.toggleOverlay();
    }
});
            // Change the button texture to the lit state image when hovered
            this.buttonMiddle.setTexture('button-middle-lit');
            setTimeout(() => {
                this.buttonMiddle.setTexture('button-middle');
            },500);});



    // Define mapping of province names to graphics

    // Get the current province
    const currentProvince = this.provinces[this.currentProvinceIndex];

    // Check if the current province is defined
    if (currentProvince) {
        // Get the graphic for the current province
        const provinceGraphicKey = this.provinceGraphics[currentProvince.enProvince];
        
        // Check if the graphic key exists
        if (provinceGraphicKey) {
            // Set the province map sprite based on the graphic key
            this.provincialMapSprite.setTexture(provinceGraphicKey)
            this.provincialMapSprite.alpha = 0; // Set alpha to make it visible
        } else {
            console.error("Graphic key not found for current province:", currentProvince.enProvince);
        }
    } else {
        console.error("Current province is undefined.");
    }

    // Other initialization code...
        // Create a fullscreen button sprite
        this.fullscreenButton = this.add.sprite(50, 50, 'fullscreen').setInteractive();
            
        // Set up event listener for pointer events on the button sprite
        this.fullscreenButton.on('pointerdown', this.toggleFullscreen, this);

    // Function to move player and puca off-screen
    // Function to move player and puca off-screen
    this.moveOffScreen = (direction) => {
        // Ensure exitPoints is initialized
        if (!this.exitPoints) {
            console.error('exitPoints is not initialized.');
            return;
        }

        // Ensure direction is valid
        if (!this.exitPoints[direction]) {
            console.error(`No exit point found for direction: ${direction}`);
            return;
        }

        // Access exit points based on direction
        const exitPoint = this.exitPoints[direction];
        const exitX = exitPoint.x;
        const exitY = exitPoint.y;

        // Debugging logs to verify the values
        console.log(`Exit point for direction "${direction}": x=${exitX}, y=${exitY}`);

        // Ensure player and puca are defined
        if (!this.player || !this.puca) {
            console.error('Player or Puca sprite is not initialized.');
            return;
        }

        // Log initial positions
        console.log(`Initial Player Position: x=${this.player.x}, y=${this.player.y}`);
        console.log(`Initial Puca Position: x=${this.puca.x}, y=${this.puca.y}`);

        // Animate the player to move off the screen
        this.tweens.add({
            targets: this.player,
            x: exitX,
            y: exitY,
            angle: 360, // Rotate player by 360 degrees (1 full rotation)
            duration: 550, // Adjust the duration as needed
            onComplete: () => {
                console.log('Player tween completed');
                console.log(`Final Player Position: x=${this.player.x}, y=${this.player.y}`);
                // Optionally, hide or destroy the player sprite after moving off the screen
                // this.player.setVisible(false);
                // Or this.player.destroy();
            }
        });

        // Animate the puca to move off the screen
        this.tweens.add({
            targets: this.puca,
            x: exitX,
            y: exitY,
            duration: 400, // Adjust the duration as needed
            onComplete: () => {
                console.log('Puca tween completed');
                console.log(`Final Puca Position: x=${this.puca.x}, y=${this.puca.y}`);
                // Optionally, hide or destroy the puca sprite after moving off the screen
                // this.puca.setVisible(false);
                // Or this.puca.destroy();

                // Restore player and puca to center after a delay
                setTimeout(() => {
                    const centerX = this.cameras.main.width / 2;
                    const centerY = this.cameras.main.height / 2;
                    this.player.setX(centerX);
                    this.player.setY(centerY);
                    this.puca.setX(centerX);
                    this.puca.setY(centerY);
                }, 1000); // Adjust the delay as needed
            }
        });
    };


    }
    
    //////////////////////////
    
    
    
    ///////////////////////
    
    
            toggleFullscreen() {
            // Check if the game is currently in fullscreen mode
            const fullscreen = this.scale.isFullscreen;
        
            // Toggle fullscreen mode
            if (!fullscreen) {
                // Enter fullscreen mode
                this.scale.startFullscreen();
            } else {
                // Exit fullscreen mode
                this.scale.stopFullscreen();
            }
        }



            
            
         
  refreshLocationDisplay() {
    // Logic to update the location display based on the current location
    // For example:
    this.updateCurrentPlaceText(); // Call the function responsible for updating the location text
    // Other logic related to refreshing the location display
}

handleMiddleButtonPress() {
    if (this.middlePressInProgress) {
        return;
    }
this.middlePressInProgress = true;
setTimeout(()=>{



    console.log('handleMiddleButtonPress called'); // Debugging log
    console.log('Context (this):', this); // Log the context
    if (!this.enCurrentPlaceText || !this.overlay) {
        console.error('enCurrentPlaceText or overlay is not initialized.');
        return;
    }

    this.toggleOverlay(); // Call the toggleOverlay method
this.middlePressInProgress = false;

},200)
}

toggleOverlay() {
    if (this.overlay !== null && this.overlay !== undefined) {
        console.log('Overlay visibility before:', this.overlay.visible);
        this.overlay.setVisible(!this.overlay.visible);
        console.log('Overlay visibility after:', this.overlay.visible);

        this.enCurrentPlaceText.setVisible(!this.enCurrentPlaceText.visible);
        console.log('enCurrentPlaceText visibility:', this.enCurrentPlaceText.visible);

        // alert("Overlay visibility toggled.");
        setTimeout(() => {
            this.isToggling = false; // Reset flag to allow future toggles
        }, 500); // Adjust delay as needed
    }
}


 
  handleLeftProvince() {
    // Check if the function is already in progress
    if (this.leftProvinceInProgress) {
        return;
    }

    // Set a flag to indicate that the function is in progress
    this.leftProvinceInProgress = true;

    // Move to the previous province after a delay
    setTimeout(() => {
        // Update the current province index
        this.currentProvinceIndex = (this.currentProvinceIndex - 1 + this.provinces.length) % this.provinces.length;
        this.currentProvince = this.provinces[this.currentProvinceIndex];
        
        // Reset the current county index for the new province
        this.currentCountyIndex = 0;

        // Update current county and location if the current province is defined
        if (this.currentProvince) {
            this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
            if (this.currentCounty) {
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                console.log("Current location:", this.currentLocation);
            } else {
                this.currentLocation = undefined;
            }
        } else {
            // Reset county and location if the current province is undefined
            this.currentCounty = undefined;
            this.currentLocation = undefined;
        }

        // Update the displayed location name after the navigation changes
        this.updateCurrentPlaceText();

        // Reset the flag after the function completes
        this.leftProvinceInProgress = false;
    }, 55);
}

handleLeftCounty() {
    // Spin the map out before changing the county
    this.spinOutLeft(this.countyBG).then(() => {
        // Move to the previous county within the current province
        this.currentCountyIndex = (this.currentCountyIndex - 1 + this.currentProvince.counties.length) % this.currentProvince.counties.length;
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        // Update current location
        if (this.currentCounty) {
            this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
            console.log("Current location:", this.currentLocation);
        } else {
            this.currentLocation = undefined;
        }
        // Update the displayed location name after the navigation changes
        this.updateCountyBackground();
        // Spin the map back in after changing the county
        this.spinInLeft(this.countyBG);
        this.updateCurrentPlaceText();
    });
}





updateCountyBackground() {

    
    console.log("Current County Name:", this.currentCounty ? this.currentCounty.name : "Undefined");
    console.log("County Backgrounds:", this.countyBackgrounds);

    // Check if the current county is defined and has a name
    if (this.currentCounty && this.currentCounty.name) {
        // Get the county background image key based on the current county
        let countyBackgroundKey = this.countyBackgrounds[this.currentCounty.name];

        // Check if the county background image key exists
        if (countyBackgroundKey) {
            // Set the county background image
            this.countyBG.setTexture(countyBackgroundKey);
        } else {
            console.error("County background key not found for:", this.currentCounty.name);
        }
    } else {
        console.error("Current county is undefined or does not have a name.");
    }
}
handleLeftLocation() {
   // Check if the function is already in progress
   if (this.leftLocationInProgress) {
    return;
}

// Set a flag to indicate that the function is in progress
this.rightLocationInProgress = true;

// Store the reference to 'this' in a variable to access it inside the setTimeout callback
const self = this;

// Move to the next location within the current county after a delay
setTimeout(function() {
    self.currentPlayerLocation++;
    if (self.currentPlayerLocation >= self.currentCounty.locations.length) {
        // If the index exceeds the array length, wrap around to the beginning
        self.currentPlayerLocation = 0;
    }
    self.moveBackgroundToLocation(self.currentPlayerLocation);
    
    // Update the displayed location name after the navigation changes
    self.updateCurrentPlaceText();

    // Reset the flag after the function completes
    self.leftLocationInProgress = false;

}, 55);

// Update the current location immediately (outside the setTimeout)
this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
console.log("Current location:", this.currentLocation);
console.log("Current County:", this.currentCounty);

}


handleLeftButtonPress() {
    // Check if the button is already being pressed
    if (this.leftButtonPressed) {
        return;
    }

    // Set a flag to indicate that the button is being pressed
    this.leftButtonPressed = true;

    switch (this.navigationLevel) {
        case 'province':
            this.handleLeftProvince();
            break;
        case 'county':
            this.handleLeftCounty();
            break;
        case 'location':
            this.handleLeftLocation();
            break;
        default:
            break;
    }

    // Reset the flag after a short delay to allow for the next press
    setTimeout(() => {
        this.leftButtonPressed = false;
    }, 500); // Adjust the delay as needed
}


  updatecountyBGPosition() {
    const newPosition = this.locationPositions[this.currentPlayerLocation];
    const newX = Phaser.Math.Clamp(newPosition.x, this.minX, this.maxX);
    this.countyBG.setPosition(newX, newPosition.y);
  }


  handleRightButtonPress() {
    // Check if the button is already being pressed
    if (this.rightButtonPressed) {
        return;
    }

    // Set a flag to indicate that the button is being pressed
    this.rightButtonPressed = true;

    switch (this.navigationLevel) {
        case 'province':
            this.handleRightProvince();
            break;
        case 'county':
            this.handleRightCounty();
            break;
        case 'location':
            this.handleRightLocation();
            break;
        default:
            break;
    }

    // Reset the flag after a short delay to allow for the next press
    setTimeout(() => {
        this.rightButtonPressed = false;
    }, 500); // Adjust the delay as needed
}

// Define a boolean flag to track if the right button is pressed

handleRightLocation() {
    // Check if the function is already in progress
    if (this.rightLocationInProgress) {
        return;
    }

    // Set a flag to indicate that the function is in progress
    this.rightLocationInProgress = true;

    // Store the reference to 'this' in a variable to access it inside the setTimeout callback
    const self = this;

    // Move to the next location within the current county after a delay
    setTimeout(function() {
        self.currentPlayerLocation++;
        if (self.currentPlayerLocation >= self.currentCounty.locations.length) {
            // If the index exceeds the array length, wrap around to the beginning
            self.currentPlayerLocation = 0;
        }
        self.moveBackgroundToLocation(self.currentPlayerLocation);
        
        // Update the displayed location name after the navigation changes
        self.updateCurrentPlaceText();

        // Reset the flag after the function completes
        self.rightLocationInProgress = false;

        // Call the alert function after the navigation changes
    }, 55);

    // Update the current location immediately (outside the setTimeout)
    this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
    console.log("Current location:", this.currentLocation);
    console.log("Current County:", this.currentCounty);

}
handleRightCounty() {
    // Spin the map out before changing the county
    this.spinOut(this.countyBG).then(() => {
        // Move to the next county within the current province
        this.currentCountyIndex = (this.currentCountyIndex + 1) % this.currentProvince.counties.length;
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        // Update current location
        if (this.currentCounty) {
            this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
            console.log("Current location:", this.currentLocation);
        } else {
            this.currentLocation = undefined;
        }
        // Update the displayed location name after the navigation changes
        this.updateCountyBackground();
        // Spin the map back in after changing the county
        this.spinIn(this.countyBG).then(() => {
            // Update the current place text after spinning in
            this.updateCurrentPlaceText();
        });
    });
}

// Define a function to handle spinning out animation when moving left
spinOutLeft(sprite) {
    return new Promise((resolve) => {
        sprite.scene.tweens.add({
            targets: sprite,
            angle: 0, // Rotate by -90 degrees for spinning out (opposite direction)
            duration: 100, // Duration of the animation
            ease: 'linear', // Easing function for smooth acceleration and deceleration
            onComplete: () => {
                sprite.setVisible(false); // Hide the sprite after spinning out
                resolve(); // Resolve the Promise when animation completes
            }
        });
    });
}

// Define a function to handle spinning in animation when moving left
// Define a function to handle spinning in animation when moving left
spinInLeft(sprite) {
    return new Promise((resolve) => {
        sprite.setVisible(true); // Show the sprite before spinning in
        sprite.scene.tweens.add({
            targets: sprite,
            angle: -90, // Rotate back to 0 degrees for spinning in
            duration: 100, // Duration of the animation
            ease: 'linear', // Easing function for smooth acceleration and deceleration
            onComplete: () => {
                sprite.angle = 0; // Reset the angle to 0 degrees after spinning in
                resolve(); // Resolve the Promise when animation completes
            }
        });
    });
}




// Define a function to handle spinning out animation
 spinOut(sprite) {
    return new Promise((resolve) => {
        sprite.scene.tweens.add({
            targets: sprite,
            angle: 90, // Rotate by 90 degrees for spinning out
            duration: 100, // Duration of the animation
            ease: 'linear', // Easing function for smooth acceleration and deceleration
            onComplete: () => {
                sprite.setVisible(false); // Hide the sprite after spinning out
                resolve(); // Resolve the Promise when animation completes
            }
        });
    });
}

// Define a function to handle spinning in animation
 spinIn(sprite) {
    return new Promise((resolve) => {
        sprite.setVisible(true); // Show the sprite before spinning in
        sprite.scene.tweens.add({
            targets: sprite,
            angle: 180, // Rotate back to 0 degrees for spinning in
            duration: 100, // Duration of the animation
            ease: 'linear', // Easing function for smooth acceleration and deceleration
            onComplete: () => {
                sprite.angle = 0; // Reset the angle to 0 degrees after spinning in
                resolve(); // Resolve the Promise when animation completes
            }        });
    });
}

handleRightProvince() {
    // Check if the function is already in progress
    if (this.rightProvinceInProgress) {
        return;
    }

    // Set a flag to indicate that the function is in progress
    this.rightProvinceInProgress = true;

    // Move to the next province after a delay
    setTimeout(() => {
        // Update the current province index
        this.currentProvinceIndex = (this.currentProvinceIndex + 1) % this.provinces.length;
        this.currentProvince = this.provinces[this.currentProvinceIndex];

        // Reset the current county index for the new province
        this.currentCountyIndex = 0;

        // Update current county and location if the current province is defined
        if (this.currentProvince) {
            this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
            if (this.currentCounty) {
                this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
                console.log("Current location:", this.currentLocation);
            } else {
                this.currentLocation = undefined;
            }
        } else {
            // Reset county and location if the current province is undefined
            this.currentCounty = undefined;
            this.currentLocation = undefined;
        }

        // Update the displayed location name after the navigation changes
        this.updateCurrentPlaceText();

        // Reset the flag after the function completes
        this.rightProvinceInProgress = false;
    }, 55);
}

updateCurrentPlaceText() {
    let gaTextString;
    let enTextString;
    switch (this.navigationLevel) {
        case "province":
            gaTextString = this.currentProvince ? this.currentProvince.gaProvince : "";
            enTextString = this.currentProvince ? this.currentProvince.enProvince : "";
         
            break;
        case "county":
            gaTextString = this.currentCounty ? this.currentCounty.gaCoName : "";
            enTextString = this.currentCounty ? this.currentCounty.enCoName : "";

            break;
        case "location":
        default:
            enTextString = this.currentLocation ? this.currentLocation.englishName : "";
            gaTextString = this.currentLocation ? this.currentLocation.irishName : "";
            break;
    }
    // Assuming `gaCurrentPlaceText` is the text object you want to update
    this.gaCurrentPlaceText.setText(gaTextString);
    this.enCurrentPlaceText.setText(enTextString)
// Initialize variables for rocking motion
this.rockingAngle = 0; // Starting angle
this.rockingSpeed = 0.001; // Speed of rocking motion
this.rockingRange = 10; // Range of rocking motion in degrees

    
}


  update() {    // Update the rocking angle
    this.rockingAngle += this.rockingSpeed;

    // Calculate the rotation angle based on a sine wave
    let rotationAngle = Math.sin(this.rockingAngle) * this.rockingRange;

    // Apply the rotation angle to the provincial map sprite
    this.provincialMapSprite.angle = rotationAngle;
        const currentProvince = this.provinces[this.currentProvinceIndex];
    if (currentProvince) {
        const provinceGraphicKey = this.provinceGraphics[currentProvince.enProvince];
        if (provinceGraphicKey) {
            this.provincialMapSprite.setTexture(provinceGraphicKey);
        }
  }}

 
  
  

  moveBackgroundToLocation(locationIndex) {
    const location = this.locationPositions[this.currentPlayerLocation]; // Retrieve the location object based on the index
    if (location) { // Check if the location object exists
      this.tweens.add({
        targets: this.countyBG,
        x: location.x,
        y: location.y,
        duration: 500, // Adjust the duration as needed
        ease: 'Linear', // Use linear easing for smooth movement
      });
    } else {
      console.error(`Location not found for index ${locationIndex}`);
    }
  }
  
}
