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
    this.menuOpen = false; // Flag to track menu state
    this.transitionInProgress = false; // Flag to track transitions
    
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
    
    // Initially hide the container
    this.setVisible(false);
  }
  
  updateControlSquareScale() {
    const zoomLevel = this.scene.cameras.main.zoom;
    this.scene.controlSquare.setScale(1 / zoomLevel); 
  }
  
  showMenu() {
    // Don't show if already visible or in transition
    if (this.menuOpen || this.transitionInProgress) return;
    
    this.transitionInProgress = true;
    this.menuOpen = true;
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
        this.transitionInProgress = false;
      }
    });

    // Make container visible
    this.setVisible(true);
  }

  hideMenu() {
    // Don't attempt to hide if already hidden or in transition
    if (!this.menuOpen || this.transitionInProgress) return;
    
    this.transitionInProgress = true;
    
    // First handle active menu
    const currentMenu = this.menus[this.currentMenuIndex];
    if (currentMenu && currentMenu.instance) {
      // Special handling for chat menu - hide HTML container first
      if (currentMenu.key === 'chat' && typeof currentMenu.instance.hide === 'function') {
        currentMenu.instance.hide();
        
      }
    }
    
    // Restore previous zoom level
    if (this.previousZoom) {
      this.scene.cameras.main.setZoom(this.previousZoom);
      this.updateControlSquareScale();
    }
    
    // Fade out background and complete closure
    if (this.tempBg) {
      this.scene.tweens.add({
        targets: this.tempBg,
        alpha: 0,
        duration: 300,
        ease: 'Linear',
        onComplete: () => {
          if (this.tempBg) {
            this.tempBg.destroy();
            this.tempBg = null;
          }
          
          // Set flag to indicate menu is now closed
          this.menuOpen = false;
          this.transitionInProgress = false;
          
          // Reset current menu index to 0 so next open starts with inventory
          this.currentMenuIndex = 0;
        }
      });
    } else {
      // If no background for some reason, still mark as closed
      this.menuOpen = false;
      this.transitionInProgress = false;
      this.currentMenuIndex = 0;
    }

    // Fade out all menu instances
    this.menus.forEach(menu => {
      if (menu.instance) {
        this.scene.tweens.add({
          targets: menu.instance,
          alpha: 0,
          duration: 50,
          ease: 'Linear',
          onComplete: () => {
            menu.instance.setVisible(false);
          }
        });
      }
    });
    
    // Hide the container itself
    this.setVisible(false);
  }

  nextSubmenu() {
    this.cycleMenu(1);
  }

  previousSubmenu() {
    this.cycleMenu(-1);
  }

  cycleMenu(direction) {
    // Don't cycle if menu is not open or in transition
    if (!this.menuOpen || this.transitionInProgress) return;
    
    this.transitionInProgress = true;
    
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
          this.transitionInProgress = false;
        }
      });
    } else {
      // If no menu is currently visible, directly load the next one
      this.currentMenuIndex = newIndex;
      this.loadMenu(this.currentMenuIndex);
      this.transitionInProgress = false;
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