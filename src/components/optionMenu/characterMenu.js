import Phaser from "phaser";

class CharacterMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    // Get the character sheet data from local storage
    const characterData = JSON.parse(localStorage.getItem('characterSheet')); // Corrected key

   // Check if the 'lightning' asset exists in the texture cache
   if (scene.textures.exists('character')) {
    this.background = scene.add.image(
      scene.cameras.main.centerX, 
      scene.cameras.main.centerY, 
      'character'
    ).setDepth(1000).setScrollFactor(0);
  } else {
  }

  // Adding the background and text to the container

  // Initially, we don't want it visible
  this.setVisible(false);


  // Adding the background and text to the container
  this.add([this.background]);

    // Check if data exists
    if (characterData) {
      console.log('Character Data:', characterData);

      // Format the character data into a string for display
      const characterSheetString = 
      `Ainm:  ${characterData.nameGa}\nCraobh:  ${characterData.branchGa}\nSláinte:  ${characterData.health}\nNeart:  ${characterData.strength}
         `; //${characterData.branchImage}
         const zoomLevel = this.scene.cameras.main.zoom;
         
         const characterSheetText = scene.add.text(
          scene.scale.width * 0.2, 
          scene.scale.height * 0.2, 
          characterSheetString, 
          {
            fontSize: '46px', // Adjust size to fit more text
            fill: '#2a3439',
            fontFamily: 'aonchlo',
            wordWrap: { width:800 }
          }
        ).setDepth(9500)
          .setScrollFactor(0)
          .setOrigin(0, 0)
          .setScale(1 / zoomLevel); ;  // Ensure scale is reset
        
        this.add(characterSheetText);

    } else {
      console.log('No character data found!');
    }



    // Initially, we don't want it visible
    this.setVisible(false);
    scene.add.existing(this);
  }

  // Method to show the character menu
  showCharacter() {
    this.setVisible(true);
    if (this.background) {
      this.background.setVisible(true).setAlpha(1);  // Ensure the background is also visible
    }
  }

  // Method to hide the character menu
  hideCharacter() {
    this.setVisible(false);
    if (this.background) {
      this.background.setAlpha(0);  // Hide the background as well
    }
  }
}

export default CharacterMenu;
