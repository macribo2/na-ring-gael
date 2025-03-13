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

    // this.add([this.background]);

    // Initially hidden
    this.setVisible(false);

    // Create an HTML container for Easca
    this.createHtmlContainer(scene);

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
      this.htmlContainer.style.display = "none";
      this.htmlContainer.style.height = "100%"; 
      this.htmlContainer.style.width = "100%"; 

      document.body.appendChild(this.htmlContainer);
    }
    try {
      ReactDOM.render(<Easca />, this.htmlContainer);
      console.log("Easca rendered");
    } catch (e) {
      console.error("Error rendering Easca:", e);
    }
  
  }

  showChat() {
    if (this.background) {
      this.background.setVisible(true).setAlpha(1);
    }
    this.setVisible(false);

  
  }

  hideChat() {
    this.setVisible(false);
    if (this.background) {
      this.background.setAlpha(0);
    }

    // Hide the HTML container
    if (this.htmlContainer) {
      this.htmlContainer.style.display = "none";
      ReactDOM.unmountComponentAtNode(this.htmlContainer);
    }
  }
}

export default ChatMenu;
