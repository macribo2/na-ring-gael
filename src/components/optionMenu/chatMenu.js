import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import Easca from "../easca/easca2";

class ChatMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    // Background image
    if (scene.textures.exists("chat")) {
      this.background = scene.add
        .image(scene.cameras.main.centerX, scene.cameras.main.centerY, "chat")
        .setDepth(6000)
        .setScrollFactor(0).setAlpha(0);
    }

    // Initially hidden
    this.setVisible(false);

    // Create an HTML container for Easca but don't render yet
    this.createHtmlContainer(scene);

    // Make sure the container is initially hidden
    if (this.htmlContainer) {
      this.htmlContainer.style.display = "none";
    }

    scene.add.existing(this);
  }

  createHtmlContainer(scene) {
    // Ensure there's only one Easca container
    this.htmlContainer = document.getElementById("easca-container");
    if (!this.htmlContainer) {
      this.htmlContainer = document.createElement("div");
      this.htmlContainer.id = "easca-container";
      this.htmlContainer.style.position = "fixed";
      this.htmlContainer.style.top = "50%";
      this.htmlContainer.style.left = "50%";
      this.htmlContainer.style.transform = "translate(-50%, -50%)";
      this.htmlContainer.style.zIndex = "9999"; // Above Phaser canvas
      this.htmlContainer.style.display = "none"; // Initially hidden
      this.htmlContainer.style.height = "100%"; 
      this.htmlContainer.style.width = "100%"; 

      document.body.appendChild(this.htmlContainer);
    }
  }

  showChat() {
    this.setVisible(true); // Make the container visible
    if (this.background) {
      this.background.setVisible(true).setAlpha(1);
    }
    
    // Show and render Easca with fade-in effect
    if (this.htmlContainer) {
      // Make container visible but transparent
      this.htmlContainer.style.display = "block";
      this.htmlContainer.style.opacity = "0";
      
      // Render Easca
      try {
        ReactDOM.render(<Easca />, this.htmlContainer);
        console.log("Easca shown");
        
        // Fade in effect
        let opacity = 0;
        const fadeInterval = setInterval(() => {
          opacity += 0.05;
          this.htmlContainer.style.opacity = opacity.toString();
          
          if (opacity >= 1) {
            clearInterval(fadeInterval);
          }
        }, 20);
      } catch (e) {
        console.error("Error showing Easca:", e);
      }
    }
  }

  hideChat() {
    if (this.background) {
      this.background.setAlpha(0);
    }
    this.setVisible(false);

    // Fade out and hide the HTML container
    if (this.htmlContainer) {
      let opacity = parseFloat(this.htmlContainer.style.opacity) || 1;
      const fadeInterval = setInterval(() => {
        opacity -= 0.05;
        this.htmlContainer.style.opacity = opacity.toString();
        
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          this.htmlContainer.style.display = "none";
          ReactDOM.unmountComponentAtNode(this.htmlContainer);
        }
      }, 20);
    }
  }
}

export default ChatMenu;