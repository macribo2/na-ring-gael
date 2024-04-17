   this.load.image('yinCard', './phaser-resources/images/cards/puca0.png'); // Load overlay image
        this.load.image('yanCard', './phaser-resources/images/cards/puca1.png'); // Load overlay image






        setTimeout(() => {

         // Add sprites for the playing cards
     
         this.yinCard = this.add.sprite(this.sys.game.config.width / 4 - 60, this.sys.game.config.height / 2,'yinCard').setDepth(4);
         this.yanCard = this.add.sprite(this.sys.game.config.width / 4 + 420, this.sys.game.config.height / 2, 'yanCard').setDepth(4);
     // Inside the create() method or wherever you initialize your cards
     this.yinCard.setInteractive();
     this.yinCard.on('pointerdown', () => {
         // Handle click on yinCard
         console.log('Yin card clicked!');
         handleCardClick(this.yinCard, this.yanCard);
         localStorage.setItem('chosenPuca', '1');
         setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/chesslike'; }, 2000);
         
     });
     const handleCardClick = (chosenCard, otherCard) => {
     
         this.tweens.add({
             targets: chosenCard,
             angle: 360,  // Rotate the card 360 degrees
             scale:1,
             x:this.sys.game.config.width / 2, 
             duration: 500,  // Duration of the animation
             onComplete: () => {
                 this.textGa.setText("ag lódál...");
                 this.textEn.setText("Pooka Selected!");
                 this.yinCard.setScale(1);
                 this.yanCard.setScale(1);
                 // Set the chosen card to invisible after the animation completes
                 // chosenCard.setVisible(false);
             }
         });
     
             // Fade out the other card
             this.tweens.add({
                 targets: otherCard,
                 alpha: 0,  // Fade out the card
                 duration: 500,  // Duration of the animation
                 onComplete: () => {
                     // Set the other card to invisible after the animation completes
                     otherCard.setVisible(false);
     
                 }
             });
                }   
     this.yanCard.setInteractive();
     this.yanCard.on('pointerdown', () => {
         // Handle click on yinCard
         console.log('Yin card clicked!');
         handleCardClick(this.yanCard, this.yinCard);
         localStorage.setItem('chosenPuca', '0');
         setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/chesslike'; }, 2000);
         
     });
     
         // Adjust the scale of the card sprites to make them smaller
         const cardScale = 0.4; // Adjust this value as needed
         this.yanCard.setScale(cardScale);
         this.yinCard.setScale(cardScale);
     // Define the dance animation for the yin card
     const danceTween1 = this.tweens.add({
         targets: this.yinCard,
         x: '+=450', // Move the card to the right
         y: '+=30', // Move the card downwards
         angle: '+=20', // Rotate the card clockwise
         duration: 2500, // Duration of each dance step
         yoyo: true, // Repeat the tween in reverse
         repeat: -1, // Repeat indefinitely
     });
     
     // Define the dance animation for the yan card
     const danceTween2 = this.tweens.add({
         targets: this.yanCard,
         x: '-=450', // Move the card to the left
         y: '-=30', // Move the card upwards
         angle: '-=20', // Rotate the card counter-clockwise
         duration: 2500, // Duration of each dance step
         yoyo: true, // Repeat the tween in reverse
         repeat: -1, // Repeat indefinitely
     });
     
     
     }, 500);
        


        // Play the entrance animation for the 'yinCard' with a delay
        this.time.delayedCall(600, () => {
         // Spin and fade-in animation for the 'yanCard'
         this.tweens.add({
             targets: this.yanCard,
             angle: 359,
             alpha: 1,
             duration: 1000,
             ease: 'Power2',
         });
         
         // Spin and fade-in animation for the 'yinCard'
         this.tweens.add({
             targets: this.yinCard,
             angle: 350,
             alpha: 1,
             duration: 1000,
             ease: 'Power2',
         });
     });
 






     