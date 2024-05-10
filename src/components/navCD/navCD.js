import Phaser from "phaser";
import ireData from "../ChessLike/ireData";

export default class NavCD extends Phaser.Scene {
  constructor() {
    super({ key: "NavCD" });

    // Initialize class properties
    this.westmeath = null;
    this.minX = 0;
    this.maxX = 0;
    this.locationPositions = [];
    this.currentPlayerLocation = 1;
    this.currentCounty = null;
    this.navigationLevel = "location";

    // Bind event handlers
    this.handleLeftButtonPress = this.handleLeftButtonPress.bind(this);
    this.handleRightButtonPress = this.handleRightButtonPress.bind(this);
  }


  preload() {
    this.load.image("stonebg", "./phaser-resources/images/fog5.png");

    let champID = localStorage.getItem("champID");
    this.load.image("glassbg", "./phaser-resources/images/big-glass.png");
    this.load.image("overlay", "./phaser-resources/images/overlay.png");
    this.load.image("actionBtn", "./phaser-resources/images/ui/a-btn.png");
    this.load.image("button-up", "./phaser-resources/images/ui/pad-u.png");
    this.load.image("button-down", "./phaser-resources/images/ui/pad-d.png");
    this.load.image("button-left", "./phaser-resources/images/ui/pad-l.png");
    this.load.image("button-right", "./phaser-resources/images/ui/pad-r.png");
    this.load.image(
      "button-middle-lit",
      "./phaser-resources/images/ui/middle-a.png",
    );
    this.load.image(
      "button-middle",
      "./phaser-resources/images/ui/middle-b.png",
    );
    this.load.image("pucaBlack", "./phaser-resources/images/npcs/pooka0.png");
    this.load.image("pucaWhite", "./phaser-resources/images/npcs/pooka1.png");
    this.load.image(
      "puca-mounted",
      "./phaser-resources/images/npcs/pookaMounted.png",
    );
    this.load.image(
      "player",
      `./phaser-resources/images/champions/${champID}.png`,
    );

    
    this.load.image("westmeath", "./countyMaps/westmeath.png");
    this.load.image("galway", "./countyMaps/galway.png");
    this.load.image("antrim", "./countyMaps/antrim.png");
    this.load.image("armagh", "./countyMaps/armagh.png");
    this.load.image("carlow", "./countyMaps/carlow.png");
    this.load.image("cavan", "./countyMaps/cavan.png");
    this.load.image("clare", "./countyMaps/clare.png");
    this.load.image("cork", "./countyMaps/cork.png");
    this.load.image("derry", "./countyMaps/derry.png");
    this.load.image("donegal", "./countyMaps/donegal.png");
    this.load.image("down", "./countyMaps/down.png");
    this.load.image("dublin", "./countyMaps/dublin.png");
    this.load.image("fermanagh", "./countyMaps/fermanagh.png");
    this.load.image("kerry", "./countyMaps/kerry.png");
    this.load.image("kildare", "./countyMaps/kildare.png");
    this.load.image("kilkenny", "./countyMaps/kilkenny.png");
    this.load.image("laois", "./countyMaps/laois.png");
    this.load.image("leitrim", "./countyMaps/leitrim.png");
    this.load.image("limerick", "./countyMaps/limerick.png");
    this.load.image("longford", "./countyMaps/longford.png");
    this.load.image("louth", "./countyMaps/louth.png");
    this.load.image("mayo", "./countyMaps/mayo.png");
    this.load.image("meath", "./countyMaps/meath.png");
    this.load.image("monaghan", "./countyMaps/monaghan.png");
    this.load.image("offaly", "./countyMaps/offaly.png");
    this.load.image("roscommon", "./countyMaps/roscommon.png");
    this.load.image("sligo", "./countyMaps/sligo.png");
    this.load.image("tipperary    ", "./countyMaps/tipperary.png");
    this.load.image("tyrone", "./countyMaps/tyrone.png");
    this.load.image("waterford", "./countyMaps/waterford.png");
    this.load.image("westmeath", "./countyMaps/westmeath.png");
    this.load.image("wexford", "./countyMaps/wexford.png");
    this.load.image("wicklow", "./countyMaps/wicklow.png");
    this.load.image("ulster", "./countyMaps/ulster.png");
    this.load.image("leinster", "./countyMaps/leinster.png");
    this.load.image("connacht", "./countyMaps/connacht.png");
    this.load.image("munster", "./countyMaps/munster.png");

  }



  create() {


    this.westmeath = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "westmeath").setScale(4);

// Define the bounds for the background image movement
this.minX = 0; // Minimum x-coordinate
this.maxX = 400 - this.cameras.main.height; // Maximum x-coordinate
// Set the initial position of the background sprite
// const initialX = this.cameras.main.centerX;
// const initialY = this.cameras.main.centerY;
this.westmeath.setPosition(initialX, initialY);

  // Define the bounds for the background image movement
  this.minX = 0; // Minimum x-coordinate
  this.maxX = 400 - this.cameras.main.height; // Maximum x-coordinate
  const minX = this.minX;
  const maxX = this.maxX;
  this.locationPositions = [
    { x: 100, y: 100 }, // Location 1
    { x: 300, y: 200 }, // Location 2
    { x: 200, y: 300 }, // Location 3
    { x: 100, y: 200 }, // Location 4
    { x: 200, y: 100 }, // Location 5
    { x: 300, y: 300 }, // Location 6
  ];
  console.log("Scene created");
  const puca = this.add.sprite(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    "puca-mounted",
  );

  // Set up the player sprite
  const player = this.add.sprite(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    "player",
  );

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
    y: "+=10", // Move the sprites down by 20 pixels
    duration: 2000, // Duration of the downward movement
    ease: "Sine.easeInOut", // Easing function for smooth acceleration and deceleration
    yoyo: true, // Repeat the tween in reverse
    repeat: -1, // Repeat indefinitely
  });

  // Set the current province index to 0 and the current county index to 0 initially
  // Set the current province index and county index to the initial values
  this.currentProvinceIndex = 1;
  this.currentCountyIndex = 1;

  // Get the current province and county data from ireData
  this.currentProvince = ireData.provinces[this.currentProvinceIndex];

    // Get the current province and county data from ireData
    this.currentProvinceIndex = 0; // Set the initial province index
    this.currentProvince = ireData.provinces[this.currentProvinceIndex];

    // Check if currentProvince is defined
    if (this.currentProvince) {
        // Initialize this.provinces with the province data
        this.provinces = ireData.provinces;
    } else {
        // Handle the case where currentProvince is undefined
        console.error("Current province data is undefined.");
        return; // Abort further initialization
    }

  this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];

  // Get the first location within the county
  let currentLocation = this.currentCounty.locations[0].irishName;

  console.log("Current Location:", currentLocation);
  // Set up the text to display the name of the current location
  this.currentPlaceText = this.add
    .text(200, this.cameras.main.height - 300, currentLocation, {
      fontFamily: "aonchlo",
      fontSize: "3em",
      fill: "#fff",
    })
    .setDepth(31);

  const stonebg = this.add.sprite(0, 0, "stonebg").setOrigin(0);

  stonebg.displayWidth = this.sys.game.config.width;
  stonebg.displayHeight = this.sys.game.config.height;

  this.westmeath.setAlpha(0.4);

  this.westmeath.setPosition(initialX, initialY);

  // Define the amount of scroll when pressing the directional pad
  const scrollAmount = 50; // Adjust as needed

  const buttonX = this.sys.game.config.width - 100; // Adjust the offset as needed

  this.buttonNavUp = this.add
    .sprite(buttonX, this.cameras.main.height - 150, "button-up")
    .setDepth(31);
  this.buttonNavDown = this.add
    .sprite(buttonX, this.cameras.main.height - 50, "button-down")
    .setDepth(31);
  this.buttonNavLeft = this.add
    .sprite(buttonX - 50, this.cameras.main.height - 100, "button-left")
    .setDepth(31);
    this.buttonNavLeft.setInteractive().on("pointerdown", this.handleLeftButtonPress);
    
    this.buttonNavRight = this.add.sprite(buttonX + 50, this.cameras.main.height - 100, "button-right").setDepth(31);
  this.buttonNavRight.setInteractive().on("pointerdown", this.handleRightButtonPress);

  this.buttonNavMiddle = this.add
    .sprite(buttonX, this.cameras.main.height - 100, "button-middle")
    .setDepth(20);
  this.actionBtn = this.add
    .sprite(250, this.cameras.main.height - 800, "actionBtn")
    .setDepth(31);

  // Check if sprites are loaded
  console.log(
    this.buttonNavUp,
    this.buttonNavDown,
    this.buttonNavLeft,
    this.buttonNavRight,
    this.actionBtn,
  );

  // Add input listeners only if sprites are properly loaded

  if (
    this.buttonNavUp &&
    this.buttonNavDown &&
    this.buttonNavLeft &&
    this.buttonNavRight &&
    this.actionBtn
  ) {
    // Add input listeners to directional pad buttonNavs
    // Add input listeners to directional pad buttonNavs

    let upButtonTapCount = 0; // Variable to track the number of taps on the up button
    let prevNavigationLevel = "location"; // Variable to track the previous navigation level
    let prevCountyIndex = this.currentCountyIndex; // Variable to track the previous county index
    let prevProvinceIndex = this.currentProvinceIndex; // Variable to track the previous province index
    let prevPlayerLocation = this.currentPlayerLocation; // Variable to track the previous player location

    this.buttonNavUp.setInteractive().on("pointerup", () => {
      // Disable button interaction to prevent multiple clicks
      this.buttonNavUp.disableInteractive();

      // Handle up button press
      if (this.navigationLevel === "location") {
        // Move to county level
        this.navigationLevel = "county";
      } else if (this.navigationLevel === "county") {
        // Move to provincial level
        this.navigationLevel = "province";
        // Update the current location to the first location of the new county
        if (this.currentCounty) {
          this.currentLocation = this.currentCounty.locations[0];
        }
      }
      this.updateCurrentPlaceText();
      setTimeout(() => {
        this.buttonNavUp.setInteractive();
      }, 500); // Adjust the delay as needed
    });

    // Add input listeners to directional pad buttons
    this.buttonNavDown.setInteractive().on("pointerup", () => {
      console.log("Down button clicked!");
      this.buttonNavDown.disableInteractive();

      // Handle down button press
      if (this.navigationLevel === "province") {
        // Move to county level
        this.navigationLevel = "county";
        // Reset the current county index to 0 for the current province
        this.currentCountyIndex = 0;
        this.currentCounty =
          this.currentProvince.counties[this.currentCountyIndex];
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
        // Restore the previous location within the county
        if (this.prevNavigationLevel === "location") {
          this.currentLocation = this.prevLocation;
          this.currentPlayerLocation = this.currentCounty.locations.findIndex(
            (location) => location.irishName === this.prevLocation.irishName,
          );
        }
      } else if (this.navigationLevel === "location") {
        // If previously navigated horizontally, reset the indices and navigate back to the original county
        if (this.prevNavigationLevel === "county") {
          // Restore the previous county and location
          this.currentCountyIndex = this.prevCountyIndex;
          this.currentCounty =
            this.currentProvince.counties[this.currentCountyIndex];
          this.currentLocation = this.prevLocation;
          this.currentPlayerLocation = this.currentCounty.locations.findIndex(
            (location) => location.irishName === this.prevLocation.irishName,
          );

          // Update the navigation level to 'county'
          this.navigationLevel = "county";
        } else {
          // Perform dismount if at location level and press down
          this.scene.stop("NavCD");
          // Optionally, start another scene or perform any other necessary actions
        }
      }
      // Update the previous navigation level and indices
      this.prevNavigationLevel = this.navigationLevel;
      this.prevCountyIndex = this.currentCountyIndex;
      this.prevProvinceIndex = this.currentProvinceIndex;
      this.prevLocation = this.currentLocation;
      this.updateCurrentPlaceText();
      setTimeout(() => {
        this.buttonNavDown.setInteractive();
      }, 500); // Adjust the delay as needed
    });

    // Add a flag to track if the button is currently being pressed
    // Add boolean flags to track button press state
    let isButtonNavLeftPressed = false;
    let isButtonNavRightPressed = false;



    // Left button event listeners
    // Left button event listeners
 // Left button event listeners
this.buttonNavLeft.setInteractive()
.on('pointerdown', () => {
  if (!isButtonNavLeftPressed) {
      isButtonNavLeftPressed = true;
      // Handle left button press logic directly here
      if (this.currentPlayerLocation > 0) {
          this.currentPlayerLocation--;
          const newPosition = this.locationPositions[this.currentPlayerLocation];
          const newX = Phaser.Math.Clamp(newPosition.x, this.minX, this.maxX);
          this.westmeath.setPosition(newX, newPosition.y);
      }
      // Debugging: Log the current location index and its corresponding position
      console.log("Current player location index:", this.currentPlayerLocation);
      console.log("Position:", this.locationPositions[this.currentPlayerLocation]);
  }
})
.on('pointerup', () => {
  isButtonNavLeftPressed = false;
});

  }
 
    // Add Westmeath background image
    this.westmeath = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "westmeath").setScale(4).setAlpha(0.3);
    
    // Define the bounds for the background image movement
    this.minX = 0;
    this.maxX = 400 - this.cameras.main.height;

    // Set the initial position of the background sprite
    const initialX = this.cameras.main.centerX;
    const initialY = this.cameras.main.centerY;
    this.westmeath.setPosition(initialX, initialY);
    
    // Define location positions (sample data)
    this.locationPositions = [
        { x: 100, y: 100 }, // Location 1
        { x: 300, y: 200 }, // Location 2
        { x: 200, y: 300 }, // Location 3
        { x: 100, y: 200 }, // Location 4
        { x: 200, y: 100 }, // Location 5
        { x: 300, y: 300 }, // Location 6
    ];

    // Add event listeners to navigation buttons
    this.buttonNavLeft.setInteractive().on("pointerdown", this.handleLeftButtonPress);
    this.buttonNavRight.setInteractive().on("pointerdown", this.handleRightButtonPress);
    
    // Other create code...
  }

  handleLeftProvince() {
    // Move to the previous province
    this.currentProvinceIndex = (this.currentProvinceIndex - 1 + this.provinces.length) % this.provinces.length;
    this.currentProvince = this.provinces[this.currentProvinceIndex];
    // Reset the current county index for the new province
    this.currentCountyIndex = 0;
    // Update current county and location
    if (this.currentProvince) {
        this.currentCounty = this.currentProvince.counties[this.currentCountyIndex];
        if (this.currentCounty) {
            this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
            console.log("Current location:", this.currentLocation);
        } else {
            this.currentLocation = undefined;
        }
    } else {
        this.currentCounty = undefined;
        this.currentLocation = undefined;
    }
    // Update the displayed location name after the navigation changes
    this.updateCurrentPlaceText();
}

handleLeftCounty() {
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
    this.updateCurrentPlaceText();
}

handleLeftLocation() {
    // Move to the previous location within the current county
    this.currentPlayerLocation--;
    if (this.currentPlayerLocation < 0) {
        // If the index is negative, wrap around to the end of the array
        this.currentPlayerLocation = this.currentCounty.locations.length - 1;
    }
    this.currentLocation = this.currentCounty.locations[this.currentPlayerLocation];
    console.log("Current location:", this.currentLocation);
    // Update the displayed location name after the navigation changes
    this.updateCurrentPlaceText();
}

handleLeftButtonPress() {
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
}



  updateWestmeathPosition() {
    const newPosition = this.locationPositions[this.currentPlayerLocation];
    const newX = Phaser.Math.Clamp(newPosition.x, this.minX, this.maxX);
    this.westmeath.setPosition(newX, newPosition.y);
  }


  handleRightButtonPress = () => {
  
};


  update() {
    // No need to set input listeners again in update()
  }

  updateCurrentPlaceText() {
    // Set the text based on the navigation level
    let textString;
    switch (this.navigationLevel) {
      case "province":
        textString = this.currentProvince
          ? this.currentProvince.gaProvince
          : ""; // Display province name in Irish if defined
        break;
      case "county":
        textString = this.currentCounty ? this.currentCounty.gaCoName : ""; // Display county name in Irish if defined
        break;
      case "location":
      default:
        textString = this.currentLocation ? this.currentLocation.irishName : ""; // Display location name in Irish if defined
        break;
    }
    this.currentPlaceText.setText(textString);
  }
}
