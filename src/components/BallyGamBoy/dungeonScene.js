import Phaser from 'phaser';
import ObjectiveScene from './objectiveScene.js';
import NotificationScene from './notificationsScene.js';
import { Map , Path} from 'rot-js';
import { Scheduler, Engine, RNG, FOV } from 'rot-js';
import ActionMenu from '../actionMenu/actionMenu'
import OptionMenu from '../optionMenu/optionMenu'
import { GameEntity, PlayerEntity } from './entities';
import PhaserEntity from './phaserEntity'
import ControlSquare from '../ControlSquare/ControlSquare';
import populateDungeon from './populateDungeon'
export default class DungeonScene extends Phaser.Scene {

  constructor() {
    
    super({ key: 'DungeonScene' });

    window.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('wasFullscreen') === 'true') {
        document.documentElement.requestFullscreen().catch(err => {
        });
      }
    });
    this.lastClickedTile = null;
    this.shouldDrawPath = true;  // Flag to control whether the path should be drawn
    this.hasPlayedInitialAnimation = localStorage.getItem('dungeonInitialAnimationPlayed');

    this.hasMoved = false;
    this.pathGraphics = null; // Will hold our path drawing graphics
    this.currentPath = [];     // Stores calculated path tiles
    this.lastClickedTile = null; // For click handling
    this.stairGroup = null; // 
    this.currentLevel = 1;
    this.playerPositionHistory = new window.Map([]); // Remembers where player entered each level
    this.roomMap = []; // 2D array tracking room IDs
    this.rooms = [];    // Store room references
    this.tileSize = 32;
    this.entities = [];
    this.scheduler = new Scheduler.Simple();
    this.engine = new Engine(this.scheduler);
    this.tiles = null; // Explicit initialization
    this.minRooms = 5;          // Minimum number of rooms to generate
    this.maxAttempts = 50;      // Maximum attempts s
    this.dungeonWidth = 50; // Width of the dungeon
    this.dungeonHeight = 50; // Height of the dungeon
    this.transitioning = false;
    this.stairs = {
      up: null,
      down: null
    };
    this.stairPositions = new Set(); // Track grid positions
    this.lastFOVUpdate = 0;
    this.explored = null;
    this.stairConnections = new window.Map([]); // Track level stair links
    this.transitionDirection = null; // Track whether we're going "up" or "down"
    this.hasArisen = false;
  }
  init(data) {
    // Receive transition data from previous scene
    this.transitionFrom = data.fromScene || '';
    this.transitionFlag = data.initialTransition || false;
  }
  create() {
    this.actionMenuActive = false; // Initially, the ActionMenu is not active
    this.particles = null; // Initialize particles as null
    this.jump = this.sound.add('jump', { loop: false, volume: 1 });

    // Maintain a percentage-based position
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;
  
    const percentX = 0.45; // % from the left
    const percentY = 0.4; // % from the top
    this.itemsGroup = this.add.group(); 
  
     this.controlSquare = new ControlSquare(
  this, 
  screenWidth * 0.45, 
  screenHeight * 0.38,
  this.clearPath.bind(this), 
  this.openOptionMenu.bind(this), 
  this.closeOptionMenu.bind(this), 
  false, // for actionMenuActive parameter (assuming false initially)
  this.handleNextMenu.bind(this),
  this.handlePreviousMenu.bind(this)
) .setScrollFactor(0)
.setScale(0.5)
.setDepth(19788);


    this.controlSquare.setActionMenuActive(this.actionMenuActive);
 
          
    this.controlSquare.on('control-action', (action) => {
      if (!this.player) return;
  
      // Map control actions to direction vectors
      const directions = {
        'up-down': { dx: 0, dy: -1 },
        'down-down': { dx: 0, dy: 1 },
        'left-down': { dx: -1, dy: 0 },
        'right-down': { dx: 1, dy: 0 }
      };
  
      if (directions[action]) {
        this.player.move(directions[action].dx, directions[action].dy);
      }
    }); 
  
    this.keys = this.input.keyboard.addKeys({
      interact: Phaser.Input.Keyboard.KeyCodes.E // Or your chosen key
    });
    const characterSheetData = localStorage.getItem('characterSheet');
    if (!characterSheetData) {
      console.warn("No characterSheet found in local storage.");
      return;
    }
    
    const characterSheet = JSON.parse(characterSheetData);
    
    // Validate spriteKey
    const spriteKey = characterSheet.spriteKey;
    if (!spriteKey) {
      console.warn("Invalid spriteKey in characterSheet.");
      return;
    }
  
    // Validate the texture exists
    const textureExists = this.textures.exists('championSprites');
    if (!textureExists) {
      console.warn("Texture 'championSprites' does not exist. Please preload it.");
      return;
    }
    
    this.input.addPointer(1); // For multi-touch
    
    
    
           // Set initial zoom level
           this.cameras.main.setZoom(3.5);
        

           // Listen for the objectiveDismissed event
           this.game.events.on('objectiveDismissed', this.zoomOutCamera, this);
           this.game.events.on('arise',this.arise,this)
    
    this.pathGroup = this.add.group(); // Create a new group for path elements
    
    const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
    
    if (!this.renderer.pipelines.get('Light2D')) {
      const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
      this.renderer.pipelines.add('Light2D', new Light2DPipeline(this.game));
    }
    
    this.tiles = this.add.group();
    this.generateDungeon();
    this.drawMap(); 
    this.setupFOV();
    
    this.createPlayer(characterSheet); // Pass the characterSheet to the player creation function
    this.setupInput();
    this.engine.start();
    
    const stairsDown = { type: 'stairs', direction: 'down' };
    const stairsUp = { type: 'stairs', direction: 'up' };
    
    this.setupLighting();
    
    
    this.pathGraphics = this.add.graphics()
    .setDepth(999)
    .setDefaultStyles({
      lineStyle: { width: 3, color: 0x00FF00, alpha: 0.8 },
      fillStyle: { color: 0xFF0000, alpha: 0.5 }
    });
    
    this.setupTouchInput(); 
    
    
    
    
    let menuKey = 'defaultMenu';
    
    this.setupStairCollisions();
   
    
    // Initialize dustMotes array here if not already done
    if (!this.dustMotes) {
        this.dustMotes = [];
    }

    if (this.textures.exists('dustTexture')) {
        this.createDustMotes();
    } else {
        this.load.once('complete', () => {
            this.createDustMotes();
        });
    }
    
   // Only play if coming from PucaChase0 and hasn't played before
  //  if (this.transitionFrom === 'PucaChase0' ) { //&& !this.hasPlayedInitialAnimation
    this.playInitialAnimation();
    // 
    // ;
    localStorage.setItem('dungeonInitialAnimationPlayed', 'true');
    this.optionMenu = new OptionMenu(this, menuKey, this.closeOptionMenu.bind(this));
  // }
  this.children.add(this.optionMenu); // Use this.children instead of this.add.existing()
  this.optionMenu.setDepth(5000);
  this.actionMenu = new ActionMenu(this, menuKey, this.closeActionMenu.bind(this));
  this.add.existing(this.actionMenu).setDepth(6000); // Add to the scene, but stays hidden
  
  
  if (typeof this.actionMenu.showMenu !== 'function') {
  } 
    populateDungeon(this); // Call populateDungeon to add the Red Cent


    this.events.on('itemEquipped', (item) => {
      console.log("Received itemEquipped event with:", item);
  
      // Confirm the slot of the equipped item
      console.log("Item slot:", item.slot);
  
      if (item.slot === "body" || item.slot === "armour") {
          console.log("Calling updatePlayerSprite(true)");
          this.updatePlayerSprite(true);  // Assuming 'armour' is valid
      } else {
          console.warn("Item slot does not match expected values:", item.slot);
      }
  });
  
  
}  
  updatePlayerSprite(isWearingArmor) {
    if (!this.player || !this.player.sprite) {
        console.error("Player sprite not found!");
        return;
    }

    // Determine new texture and frame
    const newAtlas = isWearingArmor ? 'championSpritesWithKit' : 'championSpritesNoKit';
    const currentFrame = this.player.sprite.frame.name; // Keep the same animation frame

    console.log("Updating player sprite:", newAtlas, currentFrame);

    // Update the player's texture while keeping the same frame
    this.player.sprite.setTexture(newAtlas, currentFrame);
    this.events.on('itemEquipped', (item) => {
      console.log("Received itemEquipped event with:", item);
  
      // Confirm the slot of the equipped item
      console.log("Item slot:", item.slot);
  
      if (item.slot === "body" || item.slot === "armour") {
          console.log("Calling updatePlayerSprite(true)");
          this.updatePlayerSprite(true);  // When armor is equipped
      } else {
          console.warn("Item slot does not match expected values:", item.slot);
      }
  });
  
  // Add an event listener for unequipping
  this.events.on('itemUnequipped', (slot) => {
      console.log("Received itemUnequipped event, slot:", slot);
  
      // If the unequipped item was armor (body slot)
      if (slot === "body") {
          console.log("Calling updatePlayerSprite(false)");
          this.updatePlayerSprite(false);  // When armor is unequipped
      } else {
          console.warn("Item slot does not match expected value for unequip:", slot);
      }
  });
  
}

handlePreviousMenu() {
  // Instead of calling isVisible(), check a property that indicates if the menu is open
  if (this.optionMenu && this.optionMenu.visible) {  // Using the standard Phaser visible property
    this.optionMenu.previousSubmenu();
  }
}

handleNextMenu() {
  if (this.optionMenu && this.optionMenu.visible) {
    this.optionMenu.nextSubmenu();
  }
}
 openOptionMenu() {
   // Stop drawing the path
   this.shouldDrawPath = false;
  if (this.actionMenuActive) return;
  if (!this.optionMenu) {
    return;
  }
  if (this.actionMenuActive || !this.optionMenu) return;

  // Use the correct menu key that matches your JSON structure
  this.optionMenu.showMenu('optionsMenu');
}
closeOptionMenu() {
  this.shouldDrawPath = true;

 // if (this.actionMenuActive) return; // Don't open this menu if the ActionMenu is active
 this.optionMenu.hideMenu();


}
arise(){
  if (this.hasArisen) return;
  this.hasArisen = true;
  this.tweens.add({
    targets: this.player.sprite, // Apply animation to sprite
    angle: 0, // Stand upright
    duration: 400, // Faster animation
    ease: 'Back.easeOut', // Springy effect
});
if (this.jump) {
  this.jump.play();
}

}
zoomOutCamera() {
  // Tween the camera zoom out to the usual level
  this.tweens.add({
      targets: this.cameras.main,
      zoom: 2,
      duration: 500,
      ease: 'Cubic.easeOut'
  });

}

 playInitialAnimation() {
  
  if (!this.player || !this.player.sprite) {
    return;
  }
  this.scene.launch('ObjectiveScene');
  // ⚡ STEP 2: Full-screen flash ⚡
  const flash = this.add.rectangle(0, 0, this.width, this.height, 0xFFFFFF)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setDepth(9999)  // Flash on top
      .setScrollFactor(0);

  this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 2450,
      ease: 'Cubic.easeOut',
      onComplete: () => flash.destroy()
  });

  // Start lying on their back (-90 degrees)
  this.player.sprite.setAngle(-90);



  // Add lightning effect (ensuring full screen coverage)
  const lightning = this.add.image(0, 0, 'lightning'); // Position at (0, 0)
  lightning.setOrigin(0, 0); // Set origin to top-left
  lightning.setDisplaySize(this.scale.width, this.scale.height); // Scale to cover full screen
  lightning.setDepth(9998); // Ensure lightning is rendered in front of the flash
  lightning.setScrollFactor(0);  // Fade out both the lightning and darken background
  this.tweens.add({
    targets: [lightning],
    alpha: 0, // Fade them out to 0 alpha
    duration: 3000, // 3-second fade-out
    ease: 'Cubic.easeOut', // Smooth easing for the fade-out
    onComplete: () => {
      // Destroy lightning and background after the fade-out is complete
      lightning.destroy();
    }
  });

  

}


  preload() {
    this.load.audio('jump', '/phaser-resources/audio/text-message.ogg');
    this.load.audio('pickup', '/phaser-resources/audio/Pickup_Coin.wav');
    this.load.audio('menuClick','/phaser-resources/audio/MenuSelectionClick.wav')
    this.load.image('redCent', '/phaser-resources/images/items/redCent.png');
    this.load.image('armour', '/phaser-resources/images/items/armour.png');
    this.load.image('character', '/phaser-resources/images/placeholders/log0.png');
    this.load.image('settings', '/phaser-resources/images/placeholders/log1.png');
    this.load.image('chat', '/phaser-resources/images/placeholders/log2.png');
    this.load.image('inventory', '/phaser-resources/images/placeholders/log3.png');
    this.load.image('quest', '/phaser-resources/images/placeholders/log4.png');
    this.load.image('other', '/phaser-resources/images/placeholders/log5.png');

    this.load.image('log', '/phaser-resources/images/placeholders/log.png');
    this.load.image('dustTexture', '/phaser-resources/images/dustTexture.png');
    this.load.image('dustTexture', '/phaser-resources/images/dustTexture.png');
    this.load.image('lightning', '/phaser-resources/images/lightning.png');
    this.load.image('upButtonDark', '/phaser-resources/images/ui/pad-u.png');
      this.load.image('downButtonDark', '/phaser-resources/images/ui/pad-d.png');
      this.load.image('leftButtonDark', '/phaser-resources/images/ui/pad-l.png');
      this.load.image('rightButtonDark', '/phaser-resources/images/ui/pad-r.png');
      this.load.image('middleButtonDark', '/phaser-resources/images/ui/middle-b.png');
      this.load.image('upButtonLit', '/phaser-resources/images/ui/pad-u-lit.png');
      this.load.image('downButtonLit', '/phaser-resources/images/ui/pad-d-lit.png');
      this.load.image('leftButtonLit', '/phaser-resources/images/ui/pad-l-lit.png');
      this.load.image('rightButtonLit', '/phaser-resources/images/ui/pad-r-lit.png');
      this.load.image('middleButtonLit', '/phaser-resources/images/ui/middle-a.png');
  
    this.load.image('ciorcal-light', 'phaser-resources/images/ciorcal-glass-light.png')
    this.load.image('default_button', 'phaser-resources/images/ui/default-button.png')
  
    this.load.json('menuContent', 'phaser-resources/json/actionMenuContent.json');
    this.load.json('optionContent', 'phaser-resources/json/optionMenu.json');
    this.load.atlas('championSpritesNoKit', 'phaser-resources/images/champions-no-kit.png', 'phaser-resources/json/champions0.json');
    this.load.atlas('championSpritesWithKit', 'phaser-resources/images/champions-with-kit.png', 'phaser-resources/json/champions0.json');
    this.load.atlas('championSprites', 'phaser-resources/images/champions0.png', 'phaser-resources/json/champions0.json');
    this.load.image('knotwork', 'phaser-resources/images/rotjs/pathfinding-knot.png');
  
    this.load.image('bg1','/phaser-resources/images/bg2.png')
    this.load.image('celt-ring','/phaser-resources/images/ui/eight-point-wheel.png')
  
      // Add stair textures
      this.load.spritesheet('stairs_down_texture', '/phaser-resources/images/rotjs/stairs-down.png', { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('stairs_up_texture', '/phaser-resources/images/rotjs/stairs-up.png', { frameWidth: 32, frameHeight: 32 });
  
    // Load tilesheet with 32x32 frames arranged in grid
    this.load.spritesheet('dungeon_tiles', '/phaser-resources/images/rotjs/dungeon_tiles_2.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0
    });
    
    this.load.spritesheet('player', '/phaser-resources/images/champions/32.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  createDustMotes() {
    this.dustMotes = [];

    // Optional: Add a timer to continuously spawn dust motes over time
    this.time.addEvent({
        delay: 300, // New dust mote every 300ms (~3 per second)
        callback: this.spawnDustMote,
        callbackScope: this,
        loop: true
    });
}

spawnDustMote() {
    // Randomize initial position on screen
    let startX = Math.random() * this.cameras.main.width; // Random horizontal position
    let startY = Math.random() * this.cameras.main.height;  // Random vertical position

    let dustMote = this.add.image(startX, startY, 'dustTexture');
    
    // Set initial properties for each new dust mote
    dustMote.alpha = 0; // Start invisible
    dustMote.fadeSpeed = 0.005 + Math.random() * 0.005; // Slow random fade-in speed
    dustMote.speedY = 0.005 + Math.random() * 0.02; // Slow vertical drift
    dustMote.lifetime = 0; // Track lifetime for fade out
    dustMote.setDepth(-1);
    // Add to dust motes array
    this.dustMotes.push(dustMote);

}

update(time, delta) {

// Add these diagnostic logs at the start of the method

if (this.dustMotes && this.dustMotes.length > 0) {
  // ... existing dustMotes code ...
}

if (this.playerHasMoved()) {
  this.controlSquare.setActionMenuActive(false);  // Reset the action menu active state
}

if (this.actionMenu) {
  this.actionMenu.update();
}

if (this.optionMenu) {
  try {
    this.optionMenu.update();
  } catch (error) {
  }
} else {
}



  if (this.dustMotes && this.dustMotes.length > 0) {
    this.dustMotes.forEach((dustMote, index) => {
      // Fade in as the mote ascends
      if (dustMote.alpha < 1) {
                dustMote.alpha += dustMote.fadeSpeed;  // Increase alpha to fade in
              }
              
              // Update Y position to move upwards
              dustMote.y -= dustMote.speedY * delta;  // Vertical drift upwards
              
              // Increase lifetime and fade out when it hits its max lifetime (around 4 seconds)
              dustMote.lifetime += delta;
              if (dustMote.lifetime > 4000) {  // After 4 seconds
                this.dustMotes.splice(index, 1); // Remove it from the array
                dustMote.destroy(); // Clean up the dust mote
            }
          });
        }
  if (this.playerHasMoved()) {
    this.hasMoved = true;
    // Update previous position after movement
    this.player.previousGridX = this.player.gridX;
    this.player.previousGridY = this.player.gridY;
  }
  if (this.actionMenu) {
    this.actionMenu.update();
  }

  if (this.player) {
    // Smooth light movement
    this.player.light.x = Phaser.Math.Linear(
      this.player.light.x, 
      this.player.sprite.x, 
      0.2
    );
    this.player.light.y = Phaser.Math.Linear(
      this.player.light.y, 
      this.player.sprite.y, 
      0.2
    );
    
    // Update FOV more efficiently
    if (Date.now() - this.lastFOVUpdate > 100) {
      this.updateFOV();
      this.lastFOVUpdate = Date.now();
    }
  }
  this.handleStairInteraction();



  if (this.optionMenu) {
    // alert('Calling optionMenu update');

    this.optionMenu.update();
  }

}



// Method to allow opening the ActionMenu if the player has moved
canOpenActionMenu() {
  return this.hasMoved;
}

  openActionMenu(menuKey) {
    this.controlSquare.setActionMenuActive(true);  // Set it to active when the action menu is open
 
    // When hiding the ActionMenu:
    this.actionMenuActive = false; 
    if (this.canOpenActionMenu()) {
      // Reset the hasMoved flag after opening the menu
      this.hasMoved = false;
    } else {
      return
    }

  
    if (!this.actionMenu.menuData) {
      return;
    }
  
    const data = this.actionMenu.menuData[menuKey];
  
    if (!data || !data.choices || data.choices.length === 0) {
      console.error(`openActionMenu called with invalid or empty objects array for key: ${menuKey}`);
      return;
    }
    setTimeout(()=>{

    },500)
  
    // Smoothly zoom out when ActionMenu is shown
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,  // Zoom out to normal (1x) for the action menu
      duration: 500, // Duration of the zoom effect
      ease: 'Power2', // Smooth easing
      onUpdate: () => {
        this.updateControlSquareScale(); // Adjust scale continuously during the zoom transition
      },
      onComplete: () => {
        // Initialize ActionMenu once the zoom transition is complete
        if (!this.actionMenu) {
          this.actionMenu = new ActionMenu(this).setDepth(500);
        }
        
        // Make sure all elements are visible again
        const elements = [
          this.actionMenu,
          this.actionMenu.overlay,
          this.actionMenu.titleText,
          this.actionMenu.wheel,
          this.actionMenu.buttonBase,
          this.actionMenu.spokesContainer
        ];
        this.actionMenu.titleHidden=false;
        this.actionMenu.choicesVisible=false;
        elements.forEach(el => {
          if (el) {
            el.setVisible(true);
            el.setAlpha(1); // Reset alpha since we faded it out
          }
        });
  
        // Open menu after zoom out is complete
        this.actionMenu.showMenu(menuKey);
      }
    });
  
    // Verify method exists
    if (typeof this.actionMenu.showMenu !== 'function') {
      console.error('ActionMenu instance is missing showMenu method!');
    }
  }

  setupLighting() {
    this.lights.enable().setAmbientColor(0x222222);

    // Create separate layer for ALL wall types
    this.wallLayer = this.add.layer();
    this.tiles.children.each(tile => {
        tile.setPipeline('Light2D');

        // Check if tile is any type of wall (including corridor edges)
        if (tile.frame.name >= 100 && tile.frame.name <= 103) {
            this.wallLayer.add(tile);
            tile.setAlpha(1); // Ensure full visibility for walls
        }
    });

    // Enable lighting on all tiles
    this.tiles.children.each(tile => {
        tile.setPipeline('Light2D');
    });

    // Apply lighting to all items
    this.itemsGroup.children.each(item => {
        item.setPipeline('Light2D');
    });

    // Create light source for player
    if (this.player) {
        this.player.light = this.lights.addLight(
            this.player.sprite.x,
            this.player.sprite.y,
            250,
            0xffffff,
            1.5
        );
    }
}


   closeActionMenu() {
  
    this.controlSquare.setActionMenuActive(false);  // Set it to inactive when the action menu is closed
  
    const elements = [
      this.actionMenu ? this.actionMenu : null,
      this.actionMenu && this.actionMenu.overlay ? this.actionMenu.overlay : null,
      this.actionMenu && this.actionMenu.titleText ? this.actionMenu.titleText : null,
      this.actionMenu && this.actionMenu.wheel ? this.actionMenu.wheel : null,
      this.actionMenu && this.actionMenu.buttonBase ? this.actionMenu.buttonBase : null,
      this.actionMenu && this.actionMenu.choiceText ? this.actionMenu.choiceText : null,
      this.actionMenu && this.actionMenu.spokesContainer ? this.actionMenu.spokesContainer : null
    ];
  
    // Fade out UI elements first
    this.tweens.add({
      targets: elements.filter(el => el !== null),  // Filter out null elements
      alpha: 0,
      duration: 500,
      ease: 'Linear',
    
      onComplete: () => {
        // Only set visible for Phaser game objects
        elements.forEach(el => {
          if (el && typeof el.setVisible === 'function') {
            el.setVisible(false);
          }
        });
  
        // Now apply the zoom with a relative value
        this.tweens.add({
          targets: this.cameras.main,
          zoom: 2,  // Multiply current zoom for relative zooming
          duration: 500,  
          ease: 'Power2',
          onUpdate: () => {
            this.updateControlSquareScale(); // Adjust scale continuously during the zoom transition
          },
          onComplete: () => {
          }
        });
      }
    });
  }
  goDownStairs() {
    this.clearPath();
  
    // Load characterSheet from localStorage
    let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
  
    // Check if the armor quest is complete
    if (!characterSheet.quests || !characterSheet.quests.armorQuestComplete) {
      this.scene.launch('NotificationScene');
      console.log("You can't go down yet! Find your armor first.");
      return; // Stop player from descending
    }
  
    // Prevent multiple transitions
    if (this.transitioning) {
      return;
    }
    this.transitioning = true;
    this.transitionDirection = 'down'; // Track direction
  
    // Store the current level before transition for reference
    const previousLevel = this.currentLevel;
  
    // Fade out screen
    this.cameras.main.fadeOut(500, 0, 0, 0);
  
    this.cameras.main.once('camerafadeoutcomplete', async () => {
      
      // Increase level (descending)
      this.currentLevel++;
  
      // Reload or generate new level
      await this.loadLevel(); 
  
      // Update FOV for new position
      if (this.updateFOV) {
        this.updateFOV();
      }
  
      // Fade back in
      this.cameras.main.fadeIn(500);
  
      // Unlock the game loop after transition
      this.transitioning = false;
    });
  }
  
  goUpStairs() {
    this.clearPath();
  
    // Load characterSheet from localStorage
    let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
  
    // Check if the armor quest is complete
    if (!characterSheet.quests || !characterSheet.quests.armorQuestComplete) {
      this.scene.launch('NotificationScene');
      console.log("You can't go up yet! Find your armor first.");
      return; // Stop player from ascending
    }
  
    // Prevent multiple transitions
    if (this.transitioning) {
      return;
    }
    this.transitioning = true;
    this.transitionDirection = 'up'; // Track direction
  
    // Store the current level
    const previousLevel = this.currentLevel;
  
    // Fade out screen
    this.cameras.main.fadeOut(500, 0, 0, 0);
  
    this.cameras.main.once('camerafadeoutcomplete', async () => {
  
      // Decrease level (going up means we are going to a higher level)
      this.currentLevel--;
  
      // Reload or generate new level
      await this.loadLevel();
  
      // Update FOV for new position
      if (this.updateFOV) {
        this.updateFOV();
      }
  
      // Fade back in
      this.cameras.main.fadeIn(500);
  
      // Unlock the game loop after transition
      this.transitioning = false;
    });
  }
  
addEntity(entity) {
  this.entities.push(entity);
  // If the entity is a sprite or visual object, you could add it to the scene
  if (entity.sprite) {
    this.add.existing(entity.sprite);  // Adds the entity to the scene
  }
}

loadLevel() {

  
  this.generateDungeon(); // Generate new dungeon
 
// Clear previous level entities INCLUDING OLD STAIRS
this.tiles.clear(true, true);
this.entities.forEach(e => {
    if (e && typeof e.destroy === 'function') {
        e.destroy();
    } else {
        console.warn("Tried to destroy an entity without a destroy method:", e);
    }
});
this.entities = [];
  
 // Destroy old stairs explicitly (only if they have sprites)
if (this.stairs.down && this.stairs.down.sprite) {
  this.stairs.down.sprite.destroy();
}
this.stairs.down = null;

if (this.stairs.up && this.stairs.up.sprite) {
  this.stairs.up.sprite.destroy();
}
this.stairs.up = null;


  // Regenerate dungeon with fresh stairs
  this.generateDungeon();
  this.setupStairCollisions();

  // Draw the new level's tiles
  this.drawMap(); 
  this.setupLighting();

  // Player positioning logic: choose correct stairs based on direction
  let stairGridX, stairGridY;
  if (this.transitionDirection === 'down' && this.stairs.up) {
    // If moving DOWN, spawn near UPSTAIRS
    stairGridX = Math.floor(this.stairs.up.sprite.x / this.tileSize);
    stairGridY = Math.floor(this.stairs.up.sprite.y / this.tileSize);
  } else if (this.transitionDirection === 'up' && this.stairs.down) {
    // If moving UP, spawn near DOWNSTAIRS
    stairGridX = Math.floor(this.stairs.down.sprite.x / this.tileSize);
    stairGridY = Math.floor(this.stairs.down.sprite.y / this.tileSize);
  }

     if (stairGridX !== undefined && stairGridY !== undefined) {
    // Set initial position directly on stairs
    this.player.sprite.setPosition(
      stairGridX * this.tileSize + this.tileSize / 2,
      stairGridY * this.tileSize + this.tileSize / 2
    );
    }

  // Reset camera
  this.cameras.main.startFollow(this.player.sprite);
  
  this.cameras.main.setZoom(1);
}


findValidAdjacentTile(x, y) {
  const directions = [
    {dx: 1, dy: 0}, {dx: -1, dy: 0}, 
    {dx: 0, dy: 1}, {dx: 0, dy: -1}
  ];

  for (const dir of directions) {
    const checkX = x + dir.dx;
    const checkY = y + dir.dy;
    if (this.isValidStairPosition(checkX, checkY)) {
      return {x: checkX, y: checkY};
    }
  }
  return null;
}
// Add this helper function to debug what's at a specific position
getTileInfo(x, y) {
  // This would need to be adapted to your specific tilemap/layer setup
  if (this.map && this.groundLayer) {
    const tile = this.groundLayer.getTileAt(x, y);
    return tile ? `Tile index: ${tile.index}` : "No tile at position";
  }
  return "Unable to get tile info";
}
 
  // Helper function to check if a tile is stairs
  isTileStairs(x, y) {
    // Check if the coordinates match any of the stairs
    const isUp = this.stairs.up && this.stairs.up.x === x && this.stairs.up.y === y;
    const isDown = this.stairs.down && this.stairs.down.x === x && this.stairs.down.y === y;
    
    if (isUp || isDown) {
      return true;
    }
    return false;
  }

    
setupFOV() {
  this.fov = new FOV.PreciseShadowcasting((x, y) => {
    return this.map[x] && this.map[x][y] === 0;

  });
}

isWalkable(x, y) {
  return this.map[x] && this.map[x][y] === 0;
}

pathfindTo(targetX, targetY) {
  if (!this.shouldDrawPath) {
    return;
}
  // If clicked on the same tile, start moving player
  if (this.lastClickedTile && this.lastClickedTile.x === targetX && this.lastClickedTile.y === targetY) {
    this.movePlayerAlongPath();
    return;
  }

  // Clear previous path
  this.currentPath = [];
  this.pathGraphics.clear();

  // Get player's grid position
  const playerTileX = Math.floor(this.player.sprite.x / this.tileSize);
  const playerTileY = Math.floor(this.player.sprite.y / this.tileSize);

  // Create A* instance
  const astar = new Path.AStar(
    targetX,
    targetY,
    (x, y) => this.isWalkable(x, y),
    { topology: 4 } // 4-direction movement
  );

  // Compute path
  astar.compute(playerTileX, playerTileY, (x, y) => {
    this.currentPath.push({ x, y });
  });

  // Remove starting position
  if (this.currentPath.length > 0) {
    this.currentPath.shift();
  }

  // Validate the path
  if (!this.isPathValid()) {
    return; // Exit if path is not valid
  }

  // Store the clicked target tile for future movement
  this.lastClickedTile = { x: targetX, y: targetY };

  // Draw the path
  this.drawPath();
}
movePlayerAlongPath() {
  this.clearPath(); // Clear the path once the player starts moving

  // Check if there's a valid path to follow
  if (this.currentPath.length === 0) return;

  // Clear any ongoing path drawing
  this.pathGraphics.clear();

  // Move the player step by step using tweens
  const moveNext = () => {
    if (this.currentPath.length === 0) return;

    const nextTile = this.currentPath.shift(); // Get the next tile in the path
    const targetX = nextTile.x * this.tileSize + this.tileSize / 2;
    const targetY = nextTile.y * this.tileSize + this.tileSize / 2;
    
    // Save previous position before moving
    this.player.previousGridX = this.player.gridX;
    this.player.previousGridY = this.player.gridY;
    
    // Calculate direction to the next tile
    const currentX = this.player.sprite.x;
    const currentY = this.player.sprite.y;
    
    // Determine the primary direction of movement
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    // Set facing direction based on the more significant axis of movement
    if (Math.abs(dx) > Math.abs(dy)) {
      this.player.facingDirection = { x: Math.sign(dx), y: 0 };
    } else {
      this.player.facingDirection = { x: 0, y: Math.sign(dy) };
    }

    // Start tween to move the player to the next tile
    this.tweens.add({
      targets: this.player.sprite,
      x: targetX,
      y: targetY,
      duration: 200, // Duration of each move (in milliseconds)
      ease: 'Linear', // Smooth linear transition
      onComplete: () => {
        // Update player's grid position
        this.player.gridX = nextTile.x;
        this.player.gridY = nextTile.y;
        
        // Call moveNext again if there are more steps in the path
        if (this.currentPath.length > 0) {
          moveNext();
        }
      }
    });
  };

  moveNext();
}
isPathValid() {
  // Loop through all tiles in the current path to validate each one
  for (let i = 0; i < this.currentPath.length; i++) {
    const tile = this.currentPath[i];
    if (!this.isWalkable(tile.x, tile.y)) {
      return false; // Return false if any tile is not walkable
    }
  }
  return true; // Return true if all tiles are walkable
}

drawPath() {
  // Clear previous path first
  this.pathGroup.clear(true, true);

  if (this.currentPath.length === 0) return;

  let previous = {
    x: this.player.sprite.x + this.tileSize / 2,
    y: this.player.sprite.y + this.tileSize / 2
  };

  // Loop through the current path and add images one by one with a fade-in effect
  this.currentPath.forEach((tile, index) => {
    const x = tile.x * this.tileSize + this.tileSize / 2;
    const y = tile.y * this.tileSize + this.tileSize / 2;

    // Draw line segment connecting path nodes
    // this.pathGraphics.lineBetween(previous.x, previous.y, x, y);

    // Add knotwork image at the path node
    const knotworkImage = this.add.image(x, y, 'knotwork')
      .setAlpha(0).setOrigin(0.5,1.5);  // Start with the image invisible

    // Add the knotwork image to pathGroup for management
    this.pathGroup.add(knotworkImage);

    // Fade in the image with a tween
    this.tweens.add({
      targets: knotworkImage,
      alpha: 1,    // Fade to fully visible
      duration: 200 + index * 100,  // Stagger the fade-in slightly
      ease: 'Linear',
      onComplete: () => {
        // Optionally, you can run logic after each image finishes fading in
      }
    });

    previous = { x, y };
  });
}

// Call this to clear the path images
clearPath() {
  // Stop drawing the path
  this.shouldDrawPath = false;

  // Clear path from the path group
  this.pathGroup.clear(true, true); // Clears the pathGroup after all images fade in

  // Optionally reset flag after a brief moment (e.g., 500ms)
  setTimeout(() => {
      this.shouldDrawPath = true;
  }, 500); // 500ms delay
}




updateFOV() {
  if (!this.tiles || !this.player) return;

  // Initialize explored array to match current map dimensions
  if (!this.explored || 
      this.explored.length !== this.map.length || 
      this.explored[0].length !== this.map[0].length
  ) {
    this.explored = Array.from({ length: this.map.length }, () => 
      Array(this.map[0].length).fill(false)
    );
  }

  const [px, py] = [
    Math.floor(this.player.sprite.x / this.tileSize),
    Math.floor(this.player.sprite.y / this.tileSize)
  ];

  // Reset visibility with bounds checking
  this.tiles.getChildren().forEach(tile => {
    const x = Math.floor(tile.x / this.tileSize);
    const y = Math.floor(tile.y / this.tileSize);
    
    if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
      tile.alpha = this.explored[x][y] ? 0.5 : 0.0;
    } else {
      tile.alpha = 0.0; // Hide out-of-bounds tiles
    }
  });

  // Compute new FOV with bounds checking
  this.fov.compute(px, py, 8, (x, y, r, visibility) => {
    if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
      this.explored[x][y] = true;
      const tile = this.tiles.getChildren().find(t => 
        Math.floor(t.x / this.tileSize) === x &&
        Math.floor(t.y / this.tileSize) === y
      );
      if (tile) {
        tile.alpha = Math.min(visibility + 0.3, 1);
      }
    }
  });
}
getTileFrame(tileValue, x, y) {
  const variants = {
    0: { // Floor tiles
      center: [21, 22, 23, 41, 42, 43, 61, 62, 63],
      north: [1, 2, 3],
      south: [81, 82, 83],
      west: [20, 30, 40],
      east: [24, 34, 44],
      corners: {
        nw: 0,
        ne: 4,
        sw: 80,
        se: 84
      }
    },
    1: { // Wall tiles
      center: [91], // Center wall tiles
      north: [101,102,103],  // North edge wall tiles
      south: [91], // South edge wall tiles
      west: [91], // West edge wall tiles
      east: [91], // East edge wall tiles
      corners: {
        nw: 101, // North-West corner wall tile
        ne: 101, // North-East corner wall tile
        sw: 91, // South-West corner wall tile
        se: 91  // South-East corner wall tile
      }
    },
    2: 6,
    3: 7
  };

  // Handle non-floor tiles first (Walls)
  if (tileValue === 1) {
    // Check surrounding wall structure
    const isNorthEdge = y > 0 && this.map[x][y - 1] !== 1;
    const isSouthEdge = y < this.map[0].length - 1 && this.map[x][y + 1] !== 1;
    const isWestEdge = x > 0 && this.map[x - 1][y] !== 1;
    const isEastEdge = x < this.map.length - 1 && this.map[x + 1][y] !== 1;

    // Check corners first
    if (isNorthEdge && isWestEdge) return variants[1].corners.nw;
    if (isNorthEdge && isEastEdge) return variants[1].corners.ne;
    if (isSouthEdge && isWestEdge) return variants[1].corners.sw;
    if (isSouthEdge && isEastEdge) return variants[1].corners.se;

    // Check edges
    if (isNorthEdge) return Phaser.Math.RND.pick(variants[1].north);
    if (isSouthEdge) return Phaser.Math.RND.pick(variants[1].south);
    if (isWestEdge) return Phaser.Math.RND.pick(variants[1].west);
    if (isEastEdge) return Phaser.Math.RND.pick(variants[1].east);

    // Default to center tile
    return Phaser.Math.RND.pick(variants[1].center);
  }

  // Existing floor tile logic
  const roomId = this.roomMap[x][y];
  if (roomId === -1) return Phaser.Math.RND.pick(variants[0].center); // Corridor

  const room = this.rooms[roomId];
  const bounds = {
    left: room.getLeft(),
    right: room.getRight(),
    top: room.getTop(),
    bottom: room.getBottom()
  };

  // Check if tile is on room edge
  const isNorthEdge = y === bounds.top;
  const isSouthEdge = y === bounds.bottom;
  const isWestEdge = x === bounds.left;
  const isEastEdge = x === bounds.right;

  // Check corners first
  if (isNorthEdge) {
    if (isWestEdge) return variants[0].corners.nw;
    if (isEastEdge) return variants[0].corners.ne;
    return Phaser.Math.RND.pick(variants[0].north);
  }

  if (isSouthEdge) {
    if (isWestEdge) return variants[0].corners.sw;
    if (isEastEdge) return variants[0].corners.se;
    return Phaser.Math.RND.pick(variants[0].south);
  }

  if (isWestEdge) return variants[0].west[0];
  if (isEastEdge) return variants[0].east[0];

  // Default to center tile
  return Phaser.Math.RND.pick(variants[0].center);
}

  setupTouchInput() {
    this.input.on('pointerdown', (pointer) => {
      // Convert to world coordinates first
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      
      // Then to tile coordinates
      const tileX = Math.floor(worldPoint.x / this.tileSize);
      const tileY = Math.floor(worldPoint.y / this.tileSize);
      
      this.pathfindTo(tileX, tileY);
    });
  }
createRoomMap(dungeon) {
  const roomMap = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(-1)
  );
  dungeon.getRooms().forEach((room, id) => {
    room.create((x, y) => roomMap[x][y] = id);
  });

  // Clear previous state FIRST
  this.stairPositions.clear();
  this.rooms = [];
  this.roomMap = [];

  if (this.stairs.up) {
    this.stairs.up.destroy();
    this.stairs.up = null;
  }
  if (this.stairs.down) {
    this.stairs.down.destroy();
    this.stairs.down = null;
  }

  const mapWidth = Math.floor(this.scale.width / this.tileSize);
  const mapHeight = Math.floor(this.scale.height / this.tileSize);

  // Create empty map filled with walls (1)
  this.map = Array.from({ length: mapWidth }, () => 
    Array.from({ length: mapHeight }, () => 1)
  );

  // Digger configuration
  this.dungeon = new Map.Digger(mapWidth, mapHeight, {
    roomWidth: [6, 10],       // More reasonable sizes
    corridorLength: [3, 5],
    dugPercentage: 0.4,       // Balanced value
    roomCount: [5, 8]         // Explicit room range
  });

  // Create unified callback
  this.dungeon.create((x, y, wall) => {
    this.map[x][y] = wall ? 1 : 0; // Direct ROT.js -> Phaser map sync
  });

  let validDungeon = false;
  let attempts = 0;

  do {
    // Recreate fresh Digger instance on each attempt
    this.dungeon = new Map.Digger(mapWidth, mapHeight, {
      roomWidth: [4, 8],         // Smaller minimum size
      corridorLength: [2, 5],    // Shorter corridors
      dugPercentage: 0.6,        // Increased from 0.3
      roomCount: [5, 9]          // Explicit minimum of 5 rooms
    });

    this.dungeon.create((x, y, wall) => {
      this.map[x][y] = wall ? 1 : 0;
    });

    this.rooms = this.dungeon.getRooms();
    attempts++;

  } while (this.rooms.length < 2 && attempts < 5);

  if (this.rooms.length < 2) {
    // Fallback: Create emergency rooms
    this.createEmergencyRooms();
  }

  // FINALIZE ROOM DATA BEFORE STAIR PLACEMENT
  this.rooms = this.dungeon.getRooms();
  this.roomMap = Array.from({ length: mapWidth }, () => 
    Array(mapHeight).fill(-1)
  );

  this.rooms.forEach((room, roomId) => {
    room.create((x, y) => {
      this.roomMap[x][y] = roomId;
    });
  });
  
// Ensure corridor entrances are marked as proper floor tiles
for (let x = 1; x < mapWidth - 1; x++) {
  for (let y = 1; y < mapHeight - 1; y++) {
    if (this.map[x][y] === 0) { // Corridor tile
      // Check if a neighbor is a room floor tile (not an edge)
      const roomNeighbors = [
        this.roomMap[x - 1][y], this.roomMap[x + 1][y],
        this.roomMap[x][y - 1], this.roomMap[x][y + 1]
      ].filter(id => id !== -1);

      if (roomNeighbors.length > 0) {
        // Set the corridor entry point as a room floor tile
        this.map[x][y] = 0;
        this.roomMap[x][y] = roomNeighbors[0]; // Assign to first valid room
      }
    }
  }
}


  // Only create stairs if they don't exist already
  if (!this.doStairsExist()) {
    if (this.rooms.length >= 2) {
      this.createStairsInRoom(this.rooms[0], 'down');
      this.createStairsInRoom(this.rooms[1], 'up');
    }
  } else {
  }

  // Store rooms and mark their areas
  this.rooms = this.dungeon.getRooms();
  this.rooms.forEach((room, roomId) => {
    room.create((x, y) => {
      this.roomMap[x][y] = roomId;
    });
  });

  // Post-generation check
  let wallCount = 0;
  let floorCount = 0;

  this.map.forEach(col => col.forEach(cell => {
    cell === 1 ? wallCount++ : floorCount++;
  }));

  console.assert(wallCount > 0 && floorCount > 0, "Invalid map generation");

  // After generating rooms
  this.rooms = this.dungeon.getRooms();

  // Validate rooms exist
  if (this.rooms.length < 2) {
    throw new Error("Not enough rooms generated for stair placement!");
  }
}

  createEmergencyRooms() {
      // Use proper ROT.js feature 
      const Room = Map.Room;
      
      // Clear existing rooms
      this.dungeon._rooms = [];
    
      // Create valid rooms with proper bounds
      const safeRooms = [
        new Room(5, 5, 8, 8),  // x, y, width, height
        new Room(35, 35, 8, 8)
      ];
    
      // Add to digger and update maps
      safeRooms.forEach(room => {
        this.dungeon._rooms.push(room);
        room.create((x, y) => {
          if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
            this.map[x][y] = 0;
            this.roomMap[x][y] = this.dungeon._rooms.indexOf(room);
          }
        });
      });
    
      // Update rooms reference
      this.rooms = this.dungeon.getRooms();
    }


  updateControlSquareScale() {
    const zoom = this.cameras.main.zoom;
  
    // Maintain a percentage-based position
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;
  
    const percentX = 0.45; // % from the left
    const percentY = 0.4; // % from the top
  
  
    this.controlSquare.setPosition(screenWidth * percentX, screenHeight * percentY);
    this.controlSquare.setScale(1 / zoom); // Counteract zoom effect
  }
  
  setupStairCollisions() {
    // For downstairs
   
    if (this.stairs.down) {
      this.physics.add.overlap(
        this.player.sprite,
        this.stairs.down.sprite,
        () => {
          this.openActionMenu('stairsDown');
        },
        null,
        this
      );
    }
  
  

  // For upstairs
  if (this.stairs.up) {
    this.physics.add.overlap(
      this.player.sprite,
      this.stairs.up.sprite,
      () => {
        this.openActionMenu('stairsUp');
      },
      null,
      this
    );
  }
}

createPlayer(characterSheet) {
  const startRoom = this.dungeon.getRooms()[0];

  // Get random walkable position within the starting room
  const getWalkablePosition = () => {
    const x = Phaser.Math.Between(startRoom.getLeft() + 1, startRoom.getRight() - 1);
    const y = Phaser.Math.Between(startRoom.getTop() + 1, startRoom.getBottom() - 1);
    return this.map[x][y] === 0 ? [x, y] : getWalkablePosition();
  };

  const [x, y] = getWalkablePosition();

  // Create player entity at the chosen position
  this.player = new PlayerEntity(this, x, y);

  // Create Phaser sprite linked to player entity
  this.player.sprite = this.add.sprite(x * this.tileSize, y * this.tileSize, 'championSpritesNoKit', 'player_idle_0').setOrigin(0.5, 0.9);

  // Store grid position and initialize flags
  this.player.gridX = x;
  this.player.gridY = y;
  this.player.previousGridX = x;
  this.player.previousGridY = y;


  // Add physics body for player
  this.physics.add.existing(this.player.sprite);
  this.player.sprite.body.setSize(16, 16)

  // Add player to the turn scheduler
  this.scheduler.add(this.player, true);

  // Set camera to follow the player
  this.cameras.main.startFollow(this.player.sprite);
  this.cameras.main.setFollowOffset(0, 10);

  // Set render order and scale for the player sprite
  this.player.sprite.setDepth(100).setScale(0.75);


  // Update player sprite based on character sheet if provided
  if (characterSheet.spriteKey) {
    this.player.sprite.setTexture('championSpritesNoKit', characterSheet.spriteKey);
  } else {
    console.warn("No spriteKey found to update player texture.");
  }
}

playerHasMoved() {
  return this.player.gridX !== this.player.previousGridX || this.player.gridY !== this.player.previousGridY;
}
  generateMapData() {
    // Your map generation logic (e.g., using ROT.js)
    const dungeon = new Map.Digger();
    const mapData = [];
    dungeon.create((x, y, type) => {
      mapData[y] = mapData[y] || [];
      mapData[y][x] = type === 0 ? 'floor' : 'wall';
    });
    return mapData;
  }
// Clean up generateDungeon to have a single, clear stair connection logic
generateDungeon(previousDownStairs) {
  // Initialize dungeon dimensions FIRST
  this.dungeonWidth = 40 + this.currentLevel;
  this.dungeonHeight = 20 + this.currentLevel;

  // Initialize map arrays
  this.map = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(1)
  );
  this.roomMap = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(-1)
  );

  // Generate dungeon structure
  this.dungeon = new Map.Digger(
    this.dungeonWidth,
    this.dungeonHeight,
    {
      roomWidth: [4 + this.currentLevel, 8 + this.currentLevel],
      corridorLength: [3, 5 + Math.floor(this.currentLevel / 2)],
      dugPercentage: 0.3 + (this.currentLevel * 0.05),
      roomCount: [3 + this.currentLevel, 6 + this.currentLevel]
    }
  );

  // Generate base map
  this.dungeon.create((x, y, wall) => {
    if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
      this.map[x][y] = wall ? 1 : 0;
    }
  });

  // Process rooms and corridors
  let roomId = 0;
  this.rooms = this.dungeon.getRooms().filter(room => room && typeof room.create === 'function');
  this.rooms.forEach(room => {
    room.create((x, y) => {
      if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
        this.roomMap[x][y] = roomId;
      }
    });
    roomId++;
  });

  // Process corridors
  this.dungeon.getCorridors().forEach(corridor => {
    if (corridor && typeof corridor.create === 'function') {
      corridor.create((x, y) => {
        if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
          this.roomMap[x][y] = -1;
        }
      });
    }
  });

  // Stair placement logic
  let upStairsPos = null;
  let downStairsPos = null;

  // Check if stairs already exist before placing them
  if (!this.doStairsExist()) {
    if (previousDownStairs) {
      // Place UP stairs at previous level's DOWN position
      const [prevX, prevY] = [previousDownStairs.x, previousDownStairs.y];
      if (this.isValidStairPosition(prevX, prevY)) {
        this.createStairsAtPosition(prevX, prevY, 'up');
        upStairsPos = { x: prevX, y: prevY };

        // Find new DOWN stairs position
        const downRoom = this.findRoomForNewStairs();
        if (downRoom) {
          const [dx, dy] = [downRoom.centerX, downRoom.centerY];
          this.createStairsInRoom(downRoom, 'down');
          downStairsPos = { x: dx, y: dy };
        }
      }
    } else {
      // Initial level - use first two rooms
      if (this.rooms.length >= 2) {
        const [room1, room2] = this.rooms;
        upStairsPos = { x: room1.centerX, y: room1.centerY };
        downStairsPos = { x: room2.centerX, y: room2.centerY };
         if (!this.doStairsExist()) {
        this.createStairsInRoom(room1, 'up');
        this.createStairsInRoom(room2, 'down');
        }
      }
    }
  } else {
  }


 
}

// Function to check if stairs already exist

doStairsExist() {
  // Check if 'this.stairs' exists, then check 'up' and 'down'
  if (this.stairs) {
    return this.stairs.up && this.stairs.down;
  } else {
    return false;
  }
}


// Make sure this method for checking stair positions is implemented properly
isValidStairPosition(x, y) {
  // Check if coordinates are within bounds
  if (x < 0 || y < 0 || x >= this.dungeonWidth || y >= this.dungeonHeight) {
    return false;
  }
  
  // Check if position is walkable (not a wall)
  return this.isWalkable(x, y);
}

handleStairInteraction() {
  if (!this.stairs || (!this.stairs.up && !this.stairs.down)) {
    console.warn("No stairs exist yet.");
    return;
  }

  const playerX = this.player.sprite.x;
  const playerY = this.player.sprite.y;

  // Check proximity to upstairs
  if (this.stairs.up && this.stairs.up.sprite) {
    const upStairsX = this.stairs.up.sprite.x;
    const upStairsY = this.stairs.up.sprite.y;
    const distance = Phaser.Math.Distance.Between(playerX, playerY, upStairsX, upStairsY);

    if (distance < this.tileSize) {
      // Allow going up
    }
  }

  // Check proximity to downstairs
  if (this.stairs.down && this.stairs.down.sprite) {
    const downStairsX = this.stairs.down.sprite.x;
    const downStairsY = this.stairs.down.sprite.y;
    const distance = Phaser.Math.Distance.Between(playerX, playerY, downStairsX, downStairsY);

    if (distance < this.tileSize) {
      // Allow going down
    }
  }
}


calculateStairsDistance() {
  if (this.stairs.up && this.stairs.up.sprite && this.stairs.down && this.stairs.down.sprite) {
    return Phaser.Math.Distance.BetweenPoints(
      this.stairs.up.sprite,
      this.stairs.down.sprite
    );
  }
  return null; // Or a default value
}


// Add these helper methods to your scene class
isStairPosition(x, y) {
  // Convert to grid coordinates
  const gridX = Math.floor(x);
  const gridY = Math.floor(y);
  
  // Check against both stair positions
  return (
    (this.stairs.up && gridX === Math.floor(this.stairs.up.sprite.x / this.tileSize) && gridY === Math.floor(this.stairs.up.sprite.y / this.tileSize)) ||
    (this.stairs.down && gridX === Math.floor(this.stairs.down.sprite.x / this.tileSize) && gridY === Math.floor(this.stairs.down.sprite.y / this.tileSize))
  );
}


createTile(x, y) {
  if (x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length) return;

  const tileValue = this.map[x][y];
  const frame = this.getTileFrame(tileValue, x, y);
  const isCorridor = this.roomMap[x][y] === -1;

  // Create main tile
  const tile = this.add.sprite(x * this.tileSize, y * this.tileSize, 'dungeon_tiles', frame)
    .setDepth(tileValue === 1 ? 1 : 0).setOrigin(0,0.5);

  // Add corridor bottom edge if applicable
  if (isCorridor && tileValue === 0) {
    const belowY = y + 1;
    if (belowY < this.map[0].length && this.map[x][belowY] === 1) {
      const edgeTile = this.add.sprite(x * this.tileSize, belowY * this.tileSize, 'dungeon_tiles', 101)
        .setOrigin(0,0.5)
        .setDepth(0.9)
        .setPipeline('Light2D'); // Add pipeline here
        
      this.tiles.add(edgeTile); // Add to tiles group
    }
  
  }

  this.tiles.add(tile);
}


  createStairsInRoom(room, type) {
    
    
     // Add boundary checks
  if (!room || 
    room.getLeft() < 0 || 
    room.getRight() >= this.map.length || 
    room.getTop() < 0 || 
    room.getBottom() >= this.map[0].length
) {
  console.error("Invalid room for stair placement");
  return;
}

    // Clear existing stairs of this type
    if (this.stairs[type]) {
      this.stairs[type].destroy();
      this.stairs[type] = null;
    }
  
    // Get valid position within room bounds
    let x, y, attempts = 0;
    do {
      x = Phaser.Math.Between(room.getLeft() + 1, room.getRight() - 1);
      y = Phaser.Math.Between(room.getTop() + 1, room.getBottom() - 1);
      attempts++;
    } while (this.stairPositions.has(`${x},${y}`) && attempts < 100);
  
    const texture = type === 'down' ? 'stairs_down_texture' : 'stairs_up_texture';
    const pixelX = x * this.tileSize;
    const pixelY = y * this.tileSize;
  

  // SINGLE CREATION CALL
  if (!this.doStairsExist()) {
  this.stairs[type] = new PhaserEntity(
    this,
    pixelX,
    pixelY,
    texture,
    { type: 'stairs', direction: type },
    false,
    type === 'down',
    type === 'up'
  );

  // Configure depth and lighting
  this.stairs[type].sprite
    .setDepth(10)
    .setPipeline('Light2D').setOrigin(0.5,0.5);

  this.stairPositions.add(`${x},${y}`);
  const stairData = {
    level: this.currentLevel,
    x: x,
    y: y,
    type: type,
    roomId: room.id
  };
  // Store both types of stairs
  this.stairConnections.set(`${this.currentLevel}-${type}`, stairData);
}
}

findRoomForNewStairs() {
  // Get rooms that don't contain the upstairs
  const upStairsRoomId = this.stairs.up ? this.stairs.up.roomId : undefined;

  const candidateRooms = this.dungeon.getRooms().filter(room => 
    room.id !== upStairsRoomId && this.isValidRoom(room)
  );

  if (candidateRooms.length === 0) {
    console.warn("No valid rooms found for down stairs! Using first room");
    return this.dungeon.getRooms()[0];
  }

  // Prefer larger rooms for down stairs
  const sortedRooms = candidateRooms.sort((a, b) => 
    (b.getRight() - b.getLeft()) * (b.getBottom() - b.getTop()) -
    (a.getRight() - a.getLeft()) * (a.getBottom() - a.getTop())
  );

  return sortedRooms[0];
}

// Add validation helper
isValidRoom(room) {
  return room && 
    room.getLeft() >= 0 &&
    room.getRight() < this.mapWidth &&
    room.getTop() >= 0 &&
    room.getBottom() < this.mapHeight;
}

createStairsAtPosition(x, y, type) {
  // Validate coordinates
  if (!this.isValidStairPosition(x, y)) {
    console.error(`Invalid stair position at (${x},${y})`);
    return;
  }

  // Clear existing stairs of this type
  if (this.stairs[type]) {
    this.stairs[type].destroy();
    this.stairs[type] = null;
  }

  // Create stairs at exact position
  const texture = type === 'down' ? 'stairs_down_texture' : 'stairs_up_texture';
  const pixelX = x * this.tileSize;
  const pixelY = y * this.tileSize;
 if (!this.doStairsExist()) {
  this.stairs[type] = new PhaserEntity(
    this,
    pixelX,
    pixelY,
    texture,
    { type: 'stairs', direction: type },
    false,
    type === 'down',
    type === 'up'
  );
  // Configure visual properties
  this.stairs[type].sprite
    .setDepth(10)
    .setPipeline('Light2D');

  // Track position
  this.stairPositions.add(`${x},${y}`);
}
}

drawMap() {
  // Clear previous tiles first
  this.tiles.clear(true, true);
  
  // Create new tile group
  this.tiles = this.add.group();

  // Draw floors first
  for(let x = 0; x < this.map.length; x++) {
    for(let y = 0; y < this.map[0].length; y++) {
      if(this.map[x][y] === 0) {
        this.createTile(x, y); 
      }
    }
  }

  // Then draw walls on top
  for(let x = 0; x < this.map.length; x++) {
    for(let y = 0; y < this.map[0].length; y++) {
      if(this.map[x][y] === 1) {
        this.createTile(x, y);
      }
    }
  }
}

    createWallsAroundRoom(room) {
      const { x, y, width, height } = room;
      
      // Horizontal walls
      for (let xi = x - 1; xi <= x + width; xi++) {
        this.createTile(xi, y - 1); // Top wall
        this.createTile(xi, y + height); // Bottom wall
      }
    
      // Vertical walls
      for (let yi = y; yi < y + height; yi++) {
        this.createTile(x - 1, yi); // Left wall
        this.createTile(x + width, yi); // Right wall
      }
    }

    createRoom(room) {
      // Get proper bounds from ROT.js room object
      const bounds = {
        left: room.getLeft(),
        right: room.getRight(),
        top: room.getTop(),
        bottom: room.getBottom()
      };

      
    
      // Visualize room center
      const centerX = (bounds.left + bounds.right) * 0.5 * this.tileSize;
      const centerY = (bounds.top + bounds.bottom) * 0.5 * this.tileSize;
      this.add.circle(centerX, centerY, 5, 0xff0000).setDepth(1000);
    }

    setupInput() {
      const moves = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
    
      window.addEventListener("keydown", async (event) => {
        const direction = moves[event.key];
        if (direction) {
    
          this.engine.lock();  // Locking the engine for movement
          try {
            // Ensure this.player is an instance of PlayerEntity
            if (this.player && typeof this.player.move === 'function') {
              this.clearPath();
              await this.player.move(...direction); // Move the player
            } else {
              console.error('Player move method is undefined');
            }
          } catch (error) {
            console.error("Player move failed", error);
          }
          this.engine.unlock();  // Unlocking after movement
        }
      });
    }
    

}