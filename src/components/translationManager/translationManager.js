import Phaser from "phaser";
class TranslationManager extends Phaser.Events.EventEmitter {
    constructor() {
      super();
      this.isEnglishVisible = false; // Default: show Irish text
    }
  
    toggleTranslation() {
      this.isEnglishVisible = !this.isEnglishVisible;
      this.emit('toggleTranslation', this.isEnglishVisible); // Notify all scenes
     console.log('eng toggle- is vis?'+this.isEnglishVisible)
    }
  }
  
  export default new TranslationManager();
  