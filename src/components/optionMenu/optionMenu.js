import Phaser from "phaser";
import InventoryMenu from "./inventoryMenu"; 
import QuestMenu from "./questMenu"; 
import CharacterMenu from "./characterMenu"; 
import ChatMenu from "./chatMenu"; 
import OtherMenu from "./otherMenu";
import SettingsMenu from "./settingsMenu";

class OptionMenu extends Phaser.GameObjects.Container {
  constructor(scene, closeOptionMenu) {
    super(scene);
    this.scene = scene;
    this.closeOptionMenu = closeOptionMenu;
    this.tempBg = null; // Background image reference
    
    // Set depth for the option menu container
    this.setDepth(500);

    // Menu list and index tracking
    this.menus = [
      { key: 'inventory', instance: null, classRef: InventoryMenu },
      { key: 'chat', instance: null, classRef: ChatMenu },
      { key: 'settings', instance: null, classRef: SettingsMenu },
      { key: 'quest', instance: null, classRef: QuestMenu },
      { key: 'character', instance: null, classRef: CharacterMenu },
      { key: 'other', instance: null, classRef: OtherMenu },
    ];
    this.currentMenuIndex = 0;
    
    // Add container to scene
    scene.add.existing(this);
  }
  updateControlSquareScale() {
    const zoomLevel = this.scene.cameras.main.zoom;
    this.scene.controlSquare.setScale(1 / zoomLevel); 
  }
  showMenu() {

    this.previousZoom = this.scene.cameras.main.zoom;

    // Set zoom to 1.5 for menus to look correct
    this.scene.cameras.main.setZoom(1.5);
    this.updateControlSquareScale();

    // Create temporary background directly in the scene with a lower depth
    this.tempBg = this.scene.add.image(
      0, 0, 'other' // Ensure 'other' is preloaded
    ).setOrigin(0, 0)
      .setDepth(100) // Lower depth than all menus
      .setAlpha(0)
      .setScrollFactor(0)
      .setDisplaySize(this.scene.cameras.main.width, this.scene.cameras.main.height);

    // Fade in the background first
    this.scene.tweens.add({
      targets: this.tempBg,
      alpha: 1,
      duration: 300,
      ease: 'Linear',
      onComplete: () => {
        // Once the background fades in, show the first menu (Inventory by default)
        this.loadMenu(0);
      }
    });

    // Make container visible
    this.setVisible(true);
  }

  hideMenu() {
    if (this.previousZoom) {
      this.scene.cameras.main.setZoom(this.previousZoom); // Restore zoom
    }
    this.updateControlSquareScale();
    if (this.tempBg) {
      this.scene.tweens.add({
        targets: this.tempBg,
        alpha: 0,
        duration: 300,
        ease: 'Linear',
        onComplete: () => {
          // Destroy the background when done
          this.tempBg.destroy();
          this.tempBg = null;
        }
      });
    }

    // Fade out and hide all menus
    this.menus.forEach(menu => {
      if (menu.instance) {
        this.scene.tweens.add({
          targets: menu.instance,
          alpha: 0,
          duration: 300,
          ease: 'Linear',
          onComplete: () => {
            menu.instance.setVisible(false);
          }
        });
      }
    });
  }

  nextSubmenu() {
    this.cycleMenu(1);
  }

  previousSubmenu() {
    this.cycleMenu(-1);
  }

  cycleMenu(direction) {
    // Get the current menu
    const currentMenu = this.menus[this.currentMenuIndex];
    
    // Calculate the new index
    const newIndex = (this.currentMenuIndex + direction + this.menus.length) % this.menus.length;
    const newMenu = this.menus[newIndex];
    
    // Fade out current menu
    if (currentMenu.instance) {
      this.scene.tweens.add({
        targets: currentMenu.instance,
        alpha: 0,
        duration: 300,
        ease: 'Linear',
        onComplete: () => {
          // If it's the chat menu, use its special hide method
          if (currentMenu.key === 'chat' && typeof currentMenu.instance.hide === 'function') {
            currentMenu.instance.hide();
          } else {
            currentMenu.instance.setVisible(false);
          }
          
          // Update the current menu index
          this.currentMenuIndex = newIndex;
          
          // Load the new menu
          this.loadMenu(this.currentMenuIndex);
        }
      });
    } else {
      // If no menu is currently visible, directly load the next one
      this.currentMenuIndex = newIndex;
      this.loadMenu(this.currentMenuIndex);
    }
  }

  loadMenu(index) {
    const menu = this.menus[index];
  
    // Hide all menus first (including hiding the HTML container if it's the chat menu)
    this.menus.forEach(m => {
      if (m.instance) {
        // If it's the chat menu, use its special hide method
        if (m.key === 'chat' && typeof m.instance.hide === 'function') {
          m.instance.hide();
        } else {
          m.instance.setVisible(false);
        }
      }
    });
  
    if (!menu.instance) {
      // Create menu instance and add it to the container
      menu.instance = new menu.classRef(this.scene);
      this.add(menu.instance);  // Add it to the container to manage visibility and depth
    }
  
    // Show the selected menu
    // If it's the chat menu, use its special show method
    if (menu.key === 'chat' && typeof menu.instance.show === 'function') {
      menu.instance.show();
    } else {
      // Fade-in menu
      menu.instance.setAlpha(0); // Start invisible
      menu.instance.setVisible(true);
  
      this.scene.tweens.add({
        targets: menu.instance,
        alpha: 1,
        duration: 300,
        ease: 'Linear'
      });
    }
  }
}

export default OptionMenu;
