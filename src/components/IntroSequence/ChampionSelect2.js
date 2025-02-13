import Phaser from "phaser";
import { EventEmitter } from './EventEmitter';

class ChampionSelect2 extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    
    super(scene, x, y);




    const centerX = 100;
    const centerY = 100;
    const radius = 450;
    const selectedSpriteKey = scene.data.get('selectedChampionSpriteKey');
    // Ensure a valid sprite key is selected
    if (selectedSpriteKey) {
        // Set the sprite texture based on the selected champion
        this.championSprite = scene.add.sprite(x, y+50, 'championSprites', selectedSpriteKey); 
        this.add(this.championSprite).setDepth(40);  // Add it to the container
      } else {
        console.warn('No selected champion sprite key found!');
      }
    this.numSpokes = 64; // Total number of spokes
    this.currentAngle = 0;
    this.background2 = null; // Declare background2 here

    this.fenianBranches = [
      {
       notes:'',
       mottoGa:'Leigheas na dúlra',

mottoEn:'nature\'s cure',
        branchGa:'Na Luibheolaithe',
       branchEn:'The Herbalists',
      },
      {
               notes:'',
       mottoGa:'gan eagla',

mottoEn:'without fear',
        branchGa:'Na hÍoltóga',
       branchEn:'Of the Bats',
      },
      {
               notes:'',
       mottoGa:'ón fuil, miseanch',

mottoEn:'from the blood, courage',
        branchGa:'An Cródh-linntighe',
       branchEn:'The Blood Thirsty',
      },{

       notes:'',
       mottoGa:'...',

mottoEn:'...',
        branchGa:'Na Ceilte',
       branchEn:'The Hidden',
      },{
       
       notes:'',
       mottoGa:'Is mé tonn i dtír',

mottoEn:'I am ocean wave',
        branchGa:'Na Tonnta',
       branchEn:'the waves',
      },{

       notes:'',
       mottoGa:'Am an fráich torc',

mottoEn:'I am the fierceness of boars',
        branchGa:'Na Gnúsachán',
       branchEn:'The Grunters',
      },{
       
       notes:'',
       mottoGa:'Cosanta, gan géilleadh',

mottoEn:'Armoured, without yielding',
        branchGa:'Dea-ocraidthe',
       branchEn:'Well-Greaved',
      },{

       notes:'',
       mottoGa:'seasaimid',

mottoEn:'we stand',
        branchGa:'an tOibilisc',
       branchEn:'The Obelisk',
      },{
       
       notes:'',
       mottoGa:'Am ard filidheachta',

mottoEn:'I am a hill where poets walk \nI am the height of poetry',
        branchGa:'Na Filí',
       branchEn:'The Poets',
      },{
       
       notes:'',
       mottoGa:'Uair sna naoi uair',

mottoEn:'One time out of nine times',
        branchGa:'na gcat',
       branchEn:'of the cats',
      },{

       notes:'',
       mottoGa:'Bata agus bóthar',

mottoEn:'Stick and road',
        branchGa:'Sail Éille',
       branchEn:'Shillelagh',
      },{

       notes:'',
       mottoGa:'Neart',

mottoEn:'plenty; strength',
        branchGa:'An Coire',
       branchEn:'of the Cauldron',
      },{
       
       notes:'',
       mottoGa:'faoi na duillóga\n ónóir',

mottoEn:'under the leaves\n honour',
        branchGa:'Ceilt Duillóga',
       branchEn:'Hidden by the Leaves',
      },{

       notes:'',
       mottoGa:'Toirníonn crúba \ntiteann ríocht',

mottoEn:'Hooves thunder, kingdoms fall',
        branchGa:'Na Marcra',
       branchEn:'Horseman',
      },{
       
       notes:'',
       mottoGa:'Faoi geasa',

mottoEn:'Honour bound',
        branchGa:'An Fáinne',
       branchEn:'of the Ring',
      },{
       
       notes:'',
       mottoGa:'oscail fírinne',

mottoEn:'open truth',
        branchGa:'An Miodóg',
       branchEn:'The Dagger',
      },{
       
       notes:'',
       mottoGa:'Saibhreas ríthe \nSaibhreas clann',

mottoEn:'wealth of kings, wealth of the Clan',
        branchGa:'An Bó',
       branchEn:'The Cow',
      },{
       
       notes:'',
       mottoGa:'Feasa gach slí',

mottoEn:'Knowledge of every way',
        branchGa:'Na Fánaigh',
       branchEn:'of the Wandering Warriors',
      },{

       notes:'',
       mottoGa:'Dán Fáil',

mottoEn:'Destiny Song',
        branchGa:'Na hUptha',
       branchEn:'The Enchanted Ones',
      },{

       notes:'',
       mottoGa:'gcrónán na gealaí',

mottoEn:'the murmer of the moon',
        branchGa:'Craobh na hOidhche',
       branchEn:'The Night Branch',
      },{
       
       notes:'',
       mottoGa:'Taobh thall gach solas',

mottoEn:'Beyond all light',
        branchGa:'Na Doilbhaithe',
       branchEn:'Of the Dark One',
      },{
       
       notes:'',
       mottoGa:'Foghlaim, \nFoghlainn tú, \nFoghlainn sé nó sí...',

mottoEn:'I plunder, you plunder, \nhe or she plunders...',
        branchGa:'Foghlaithe',
       branchEn:'Marauders',
      },{

       notes:'',
       mottoGa:'Ós cionn gach uile',

mottoEn:'Above all, beyond all',
        branchGa:'Na hIolair',
       branchEn:'The Eagles',
      },{

       notes:'',
       mottoGa:'Go daingean',

mottoEn:'Stand firm',
        branchGa:'An Daingin',
       branchEn:'The Stronghold',
      },{
       



       notes:'',
       mottoGa:'bioth-ghránna',

mottoEn:'always ugly',
branchGa:'Na do-ghnúisighe',
branchEn:'The ill-featured, ugly, repulsive, sour-faced',
},{
  notes:'',
  mottoGa:'Seift agus seans',
  
  mottoEn:'Trick and chance',
  branchGa:'Na Cleasaí',
  branchEn:'of the Tricksters',
      },{
       



       notes:'',
       mottoGa:'is fearr a thuigeann an gé',

mottoEn:'The goose knows best',
        branchGa:'na Beadaidhthe',
       branchEn:'the flatterers \nlovers of dainties',
      },{
       



       notes:'',
       mottoGa:'Gan tíorán gan tráill',

mottoEn:'No master no slave',
        branchGa:'Na Rogairí',
       branchEn:'The Rogues',
      },{
       



       notes:'',
       mottoGa:'Aithníonn ciaróg ciaróg eile',

mottoEn:'It takes one to know one',
        branchGa:'Craobh an Daol Dubh',
       branchEn:'branch of the Black Beetle',
      },{
       



       notes:'',
       mottoGa:'Ríthe na comhraic',

mottoEn:'Rulers of the battlefield',
        branchGa:'Na Ríthe',
       branchEn:'The Kings',
      },{
       



       notes:'',
       mottoGa:'Éarmach muir',

mottoEn:'Coursed is the wild sea',
        branchGa:'Fiannaí Mara',
       branchEn:'Sea Warriors',
      },{
       



       notes:'',
       mottoGa:'Am úagh gach dhóich dhíamaíní',

mottoEn:'I am the grave of every vain hope',
        branchGa:'Na Daoraí',
       branchEn:'The Fury',
      },{
       



       notes:'',
       mottoGa:'Ó fréamhacha ársa',

mottoEn:'From ancient roots',
        branchGa:'An craobh Óg',
       branchEn:'The young branch',
      },{
       



       notes:'',
       mottoGa:'An leoithne lách',

mottoEn:'The gentle breeze',
        branchGa:'Na Póga',
       branchEn:'of kisses',
      },{
       



       notes:'',
       mottoGa:'eagna na gaoithe',

mottoEn:'wind thought',
        branchGa:'Na Draoithe',
       branchEn:'of the Druids',
      },{
       



       notes:'',
       mottoGa:'Faoí tír, faoí slíabh, faoi sráid',

mottoEn:'Under land, under mountain, under street',
        branchGa:'Na francaigh',
       branchEn:'the rats',
      },{
       



       notes:'',
       mottoGa:'Lean an badb',

mottoEn:'Follow the crow',
        branchGa:'Adharthí Morrígan',
       branchEn:'Worshipers of the Phantom Queen',
      },{
       



       notes:'',
       mottoGa:'Neart agus ónóir',

mottoEn:'Strength and honour',
        branchGa:'Na Geasaithe',
       branchEn:'The Spellbound',
      },{
       



       notes:'',
       mottoGa:'Crúca a bhris',

mottoEn:'Claws that rend',
        branchGa:'Na Bir-Iongaighe',
       branchEn:'the Sharp Taloned',
      },{
       



       notes:'',
       mottoGa:'Am an scíath thar gach uile chinn',

mottoEn:'I am the shield over every head',
        branchGa:'An Sciath',
       branchEn:'the Shield',
      },{
       



       notes:'',
       mottoGa:'Buaillí léannta',

mottoEn:'Wise blows',
        branchGa:'An Siansacht',
       branchEn:'Wisdom',
      },{
       



       notes:'',
       mottoGa:'ciapann sé',

mottoEn:'He consumes',
        branchGa:'An Clachán Crom',
       branchEn:'Worshipers of the Crooked One',
      },{
       



       notes:'',
       mottoGa:'Ceanglíonn fáil',

mottoEn:'Fate binds',
        branchGa:'Na Fhillte',
       branchEn:'The Returned',
      },{
       



       notes:'',
       mottoGa:'Ádh in ár chaipín',

mottoEn:'By the luck in our caps',
        branchGa:'Na Seamhasaigh',
       branchEn:'The Fortunate',
      },{
       



       notes:'',
       mottoGa:'i ngleacht go cruinn',

mottoEn:'Swing true',
        branchGa:'ó Treabh an Tua Orga',
       branchEn:'Golden Axe Tribe',
      },{
       



       notes:'',
       mottoGa:'ní neart go cur le chéile',

mottoEn:'there is no strength without unity',
        branchGa:'Na Corráin',
       branchEn:'of the Sickle',
      },{
       



       notes:'',
       mottoGa:'ar faire fós',

mottoEn:'still on watch',
        branchGa:'Na For-fhaire',
       branchEn:'the Vigilant',
      },{
       



       notes:'',
       mottoGa:'Faoi lasair Chymru',

mottoEn:'by Cymru\’s flame',
        branchGa:'Dragún',
       branchEn:'the Dragon',
      },{
       
       notes:'starts with extra inventory/pouch',
       mottoGa:'Misneach, foighne',
mottoEn:'Courage, Patience',
        branchGa:'na hIoraí',
       branchEn:'The squirrels',
      },{
       



       notes:'',
       mottoGa:'Buail leis na haingil',

mottoEn:'Strike with the angels',
        branchGa:'Lannairidhe',
       branchEn:'Lancer-Fencers',
      },{
       



       notes:'',
       mottoGa:'Tóg gach rud. \nFág tada.',

mottoEn:'Take all \nleave nothing',
        branchGa:'na tArgthóirí',
       branchEn:'The Plunderers',
      },{
       



       notes:'',
       mottoGa:'Fánach an áit...',

mottoEn:'Rare is the place...',
        branchGa:'Fánaigh',
       branchEn:'Wanderers',
      },{
       



       notes:'',
       mottoGa:'Ar nós na gaoithe',

mottoEn:'as the wind',
        branchGa:'Na Fáinleoga',
       branchEn:'The Swallows',
      },{
       



       notes:'',
       mottoGa:'Is mé brí an dána',

mottoEn:'I am a word of science;  \npoetry;  \nprophesy;  daring',
        branchGa:'Na hEalaí',
       branchEn:'of the Swans;  of the Arts',
      },{
       



       notes:'',
       mottoGa:'géillfidh tú, géillfidh tú, géillfidh tú',

mottoEn:'You will yield, you will yield, you will yield',
        branchGa:'tae láidir',
       branchEn:'strong tea',
      },{
       



       notes:'',
       mottoGa:'Síor dílis',

mottoEn:'Eternal loyalty',
        branchGa:'Na Dílseachta',
       branchEn:'The Steadfast',
      },{
       



       notes:'',
       mottoGa:'ón tóilleán éirímís',

mottoEn:'From the Isle, we rise.',
        branchGa:'Na Manainnise',
       branchEn:'Of Mann',
      },{
       



       notes:'',
       mottoGa:'Tá sé baolach dul leat féin',

mottoEn:'It is dangerous to go alone',
        branchGa:'snaidhm trí rinn',
       branchEn:'Triquetra',
      },{
       



       notes:'',
       mottoGa:'An daod mar coróin',

mottoEn:'Envy as a crown',
        branchGa:'Conách',
       branchEn:'Prosperous',
      },{
       



       notes:'',
       mottoGa:'níl cead leabhairt faoi',

mottoEn:'it is forbidden to speak there-under',
        branchGa:'Na Plúise',
       branchEn:'of the caverns',
      },{
       



       notes:'',
       mottoGa:'Mise Ríáin gach choirceoige',

mottoEn:'I am the queen of every hive',
        branchGa:'Na Ríáin',
       branchEn:'The Queens',
      },{
       



       notes:'',
       mottoGa:'Aontacht conairt',

mottoEn:'Unity of the pack',
        branchGa:'na Mictíre',
       branchEn:'the Wolves',
      },{
       



       notes:'',
       mottoGa:'Ar aghaidh le chéile',

mottoEn:'Onward together',
        branchGa:'Na Curacha',
       branchEn:'of the Skiffs',
      },{
       



       notes:'',
       mottoGa:'thar muir thar tír thar lan',

mottoEn:'over sea \nover land \nover lan',
     branchGa:  'cód foinsí',
       branchEn:'the sources',
   } 
       
       
       
       
]
    
this.background = scene.add.sprite(0, 0, 'bg1').setDepth(10); 
this.background.setOrigin(0, 0); 
this.background.setDisplaySize(scene.scale.width, scene.scale.height);

    // Create an array to store images for each branch (these should be loaded in your preload method)
    this.branchImages = [

    ];



// Create the sprite for the wheel
this.wheel = scene.add.sprite(centerX, centerY, 'celt-ring').setOrigin(0.5, 0.5).setAlpha(0.5).setDepth(20);
this.wheel.setDisplaySize(radius * 2, radius * 2);
this.wheel.setInteractive();

    // Add the container to the scene
    scene.add.existing(this);

    // Draw spokes
    this.spokes = scene.add.graphics();
    this.spokes.setPosition(centerX, centerY); // Align spokes to center
    this.drawSpokes(radius, this.numSpokes);

    // Add the square sensor
    this.sensor = scene.add.rectangle(400, 250, 2, 2, 0x003300);
    // Add text for the branch name
    this.nameTextGa = scene.add.text(scene.scale.width * 0.6, scene.scale.height * 0.1, '', {
      font: '32px dum1',
      fill: 'LavenderBlush',
}).setOrigin(0.5).setDepth(30).setAlpha(0).setVisible(false);


// Add text for the branch name
this.nameTextEn =scene.add.text(scene.scale.width * 0.6, scene.scale.height * 0.25, '', {
        font: '26px dum1',
        fill: 'plum',
      wordWrap: { width: 600 },
    }).setOrigin(0.5).setDepth(50).setAlpha(0).setVisible(false)

// Add subtitle text for mottoGa
this.subtitleTextGa = scene.add.text(scene.scale.width * 0.6,scene.scale.height * 0.5, '', {
        font: '32px dum1',
        fill: 'LavenderBlush',
}).setOrigin(0.5).setDepth(30).setAlpha(0).setVisible(false);

// Add subtitle text for mottoEn
this.subtitleTextEn = scene.add.text(scene.scale.width * 0.6,scene.scale.height * 0.65,'', {
        font: '26px dum1',
        fill: 'plum',
}).setOrigin(0.5).setDepth(30).setAlpha(0).setVisible(false)

    
    // Variables for tracking rotation and velocity
    this.rotationVelocity = 0;
    this.isDragging = false;
    this.dampingFactor = 0.95;
    this.minVelocity = 0.0001;
    this.friction = 0.995;
    this.dragSensitivity = 0.0005;
    
    // Pointer events
    this.wheel.on('pointerdown', (pointer) => {this.startDrag(pointer)
        this.nameTextEn.setVisible(true);
    this.subtitleTextEn.setVisible(true);
    });
    this.wheel.on('pointermove', (pointer) => this.dragWheel(pointer));
    this.wheel.on('pointerup', () => this.stopDrag());
    
    // Update the wheel rotation in the game loop
    scene.events.on('update', this.updateWheel, this);
    
    
    // Add the dynamic rainbow circle
    this.createRainbowCircle(scene, centerX, centerY, 50);
    
    
    this.background2 = scene.add.sprite(0, 0, 'bg1').setVisible(false);
    this.background2.setOrigin(0, 0);
    this.background2.setDisplaySize(scene.scale.width, scene.scale.height);
    this.background2.setAlpha(0).setDepth(30); // Set initial alpha to 0
    
    
  }
  // Update the text based on the selected branch
  updateTextForBranch(selectedBranchIndex) {
          const branch = this.fenianBranches[selectedBranchIndex];
          this.nameTextGa.setText(branch.branchGa);
    this.nameTextEn.setText(branch.branchEn);
  }
  // Method to create a dynamic rainbow circle
  createRainbowCircle(scene, x, y, radius) {
    this.rainbowCircle = scene.add.graphics().setAlpha(0).setDepth(20);;
    scene.events.on('update', () => {
      this.updateColorShiftCircle(x, y, radius);
    });
  }

  

// Method to update the color shift circle with one subtle color
// Method to update the color shift circle with a muted color range
updateColorShiftCircle(x, y, radius) {
  const thickness = 100; // Thickness of the color ring
  const borderThickness = 150; // Border thickness for the  outline
  const colorShiftSpeed = 0.15; // Slower color change for subtle shift
  const time = this.scene.time.now / 1000; // Time-based shift for smooth animation

  this.rainbowCircle.clear();

  // Calculate a hue based on time, this will slowly shift the color
  const hue = (time * colorShiftSpeed) % 1; // Cycling through hues in the 0-1 range

  // Adjust the color saturation (S) and value (V) to get more muted, darker colors
  const saturation = 0.15; // Lower saturation for a more muted color
  const value = 0.75; // Slightly lower value for a darker, muted shade

  // Generate a color based on HSV with the muted range
  const color = Phaser.Display.Color.HSVToRGB(hue, saturation, value).color;

  // Draw the main color-shifting circle
  this.rainbowCircle.lineStyle(thickness, color, 1);
  this.rainbowCircle.beginPath();
  this.rainbowCircle.arc(x, y, radius, 0, Phaser.Math.DegToRad(360), false);
  this.rainbowCircle.closePath(); // Ensures the circle is closed without gaps
  this.rainbowCircle.strokePath();

  // Draw the border around the color-shifting circle
  this.rainbowCircle.lineStyle(borderThickness, 0x503d63, 0.5); // border color
  this.rainbowCircle.beginPath();
  this.rainbowCircle.arc(x, y, 175, 0, Phaser.Math.DegToRad(360), false);
  this.rainbowCircle.closePath(); // Ensures the border is a full circle
  this.rainbowCircle.strokePath();
}



   // Method to toggle the visibility of the English name
   toggleEnglishNameVisibility(visible) {
    this.nameTextEn.setVisible(visible);
    this.subtitleTextEn.setVisible(visible)
  }


  fadeInBackground2=()=> {
        if (this.background2) {
            this.background2.setVisible(true);
            this.scene.tweens.add({
                targets: this.background2,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    console.log("Background2 has successfully faded in!");
                },
            });
        } else {
            console.error("background2 is not defined or not initialized.");
        }
    }
  
  drawSpokes(radius, numSpokes) {
    const angleStep = (2 * Math.PI) / numSpokes;
    this.spokes.clear();

    // Draw each spoke
    for (let i = 0; i < numSpokes; i++) {
      const angle = i * angleStep;
      const endX = Math.cos(angle) * radius;
      const endY = Math.sin(angle) * radius;

      this.spokes.lineStyle(1, 0xffffff, 0.3);
      this.spokes.beginPath();
      this.spokes.moveTo(0, 0); // Draw relative to the graphics object's center
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
    }
  }

  startDrag(pointer) {
    this.isDragging = true;
    this.startY = pointer.y;
    this.previousAngle = this.currentAngle;
    this.rotationVelocity = 0;
  }

  dragWheel(pointer) {
    if (this.isDragging) {
      
  this.nameTextGa.setAlpha(1).setVisible(true)
  this.subtitleTextGa.setAlpha(1).setVisible(true)
  this.rainbowCircle.setAlpha(1)

      
      const dy = pointer.y - this.startY;
      const deltaAngle = dy * this.dragSensitivity;
      this.currentAngle += deltaAngle;
      this.startY = pointer.y;

      // Rotate both wheel and spokes
      this.wheel.rotation = this.currentAngle;
      this.spokes.rotation = this.currentAngle;

      this.rotationVelocity = deltaAngle;
    }
  }

  stopDrag() {
    this.isDragging = false;
  }
  updateWheel() {

  // Check if the wheel is still moving
  if (Math.abs(this.rotationVelocity) > this.minVelocity) {
        // Hide the text while the wheel is moving
        this.subtitleTextGa.setAlpha(0).setVisible(false);
        this.subtitleTextEn.setAlpha(0).setVisible(false);
    } else {
        // The wheel has stopped, fade in the text
        this.subtitleTextGa.setVisible(true); // Set visible before tween
        if (this.translationsEnabled) {  // Only show English if translations are on
            this.subtitleTextEn.setVisible(true);
        }

        this.scene.tweens.add({
            targets: this.subtitleTextGa,
            alpha: 1, // Fully visible
            duration: 1000, // 1 second fade-in
            ease: 'Sine.easeInOut'
        });

        if (this.translationsEnabled) {
            this.scene.tweens.add({
                targets: this.subtitleTextEn,
                alpha: 1,
                duration: 1000,
                ease: 'Sine.easeInOut'
            });
        }
    }

    if (!this.isDragging) {
        if (Math.abs(this.rotationVelocity) > this.minVelocity) {
            // Continue natural rotation with damping
            this.currentAngle += this.rotationVelocity;
            this.wheel.rotation = this.currentAngle;
            this.spokes.rotation = this.currentAngle;

            // Apply damping and friction for deceleration
            this.rotationVelocity *= this.dampingFactor;
            this.rotationVelocity *= this.friction;

          

        } else {
            // If the wheel has slowed down enough, stop it at its current position
            this.rotationVelocity = 0; // Stop rotation completely

            // Update the branch text and image based on the final angle
            const angleStep = (2 * Math.PI) / this.numSpokes;
            const finalAngleIndex = Math.floor((this.currentAngle / (2 * Math.PI)) * this.numSpokes) % this.numSpokes;
            
            // Ensure index is within bounds
            const validIndex = (finalAngleIndex + this.numSpokes) % this.numSpokes;

            const currentBranch = this.fenianBranches[validIndex];
            if (currentBranch) {
                // Update the Irish and English texts
                this.nameTextGa.setText(currentBranch.branchGa || '');
                this.nameTextGa.setAlpha(1);

                this.nameTextEn.setText(currentBranch.branchEn || '');
                this.nameTextEn.setAlpha(1);

                // Update subtitle for mottoGa
                this.subtitleTextGa.setText(currentBranch.mottoGa || '');
                this.subtitleTextGa.setAlpha(1); // Show it once the wheel stops

                // Update subtitle for mottoGa
                this.subtitleTextEn.setText(currentBranch.mottoEn || '');
                this.subtitleTextEn.setAlpha(1); // Show it once the wheel stops


                // Update the image corresponding to the current branch
                if (this.branchImages[validIndex]) {
                    this.branchImages[validIndex].setAlpha(0.8); // Show the image with some transparency
                }
            }
        }
    }

    // Highlight spokes touching the sensor
    this.highlightSpokes();
}

highlightSpokes() {
  const centerX = 100;
  const centerY = 100;
  const radius = 450;
  const angleStep = (2 * Math.PI) / this.numSpokes;

  const sensorX = this.sensor.x;
  const sensorY = this.sensor.y;
  let sensorAngle = Math.atan2(sensorY - centerY, sensorX - centerX);
  sensorAngle = Phaser.Math.Angle.Wrap(sensorAngle - this.currentAngle);

  const highlightingRange = Math.PI / (this.numSpokes * 2);
  let sensorTouched = false;
  let highlightedSpokeIndex = -1; // Variable to track the highlighted spoke index

  this.spokes.clear();

  for (let i = 0; i < this.numSpokes; i++) {
      const rotatedAngle = i * angleStep;
      let angleDifference = Phaser.Math.Angle.Wrap(sensorAngle - rotatedAngle);

      const endX = Math.cos(rotatedAngle) * radius;
      const endY = Math.sin(rotatedAngle) * radius;

      if (Math.abs(angleDifference) < highlightingRange) {
          sensorTouched = true;
          this.spokes.lineStyle(3, 0x003300, 1); // Green line for highlighted spoke
          highlightedSpokeIndex = i; // Store the index of the highlighted spoke
      } else {
          this.spokes.lineStyle(1, 0xffffff, 0.3);
      }

      this.spokes.beginPath();
      this.spokes.moveTo(0, 0);
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
  }

  if (sensorTouched) {
      this.sensor.setFillStyle(0x000000); // Flash the sensor red
      this.scene.time.delayedCall(50, () => {
          this.sensor.setFillStyle(0x003300); // Reset sensor color to green
      });
  }

  if (highlightedSpokeIndex !== -1) {
    const branch = this.fenianBranches[highlightedSpokeIndex]; // Get the current branch
    console.log(
      'Highlighted spoke index:',
      highlightedSpokeIndex,
      branch.branchGa,
      branch.branchEn,
      this.branchImages[highlightedSpokeIndex]
    );
  
    // Set the text of this.nameTextGa to the Irish name
    this.nameTextGa.setText(branch.branchGa);
    this.nameTextEn.setText(branch.branchEn);
    this.subtitleTextGa.setText(branch.mottoGa);
    this.subtitleTextEn.setText(branch.mottoEn);

    // Hide all branch images by setting their alpha to 0
    this.branchImages.forEach((image) => {
      image.setAlpha(0);
    });

    // If branchImages haven't been initialized yet, add them
    if (this.branchImages.length === 0) {
      this.fenianBranches.forEach((_, index) => {
        const imageKey = `fortuna${index.toString().padStart(2, '0')}`;
        console.log(imageKey); // Ensure the image keys match
        const image = this.scene.add
          .image(centerX, centerY, imageKey)
          .setAlpha(0)
          .setDepth(30)
          .setScale(0.3);
        this.branchImages.push(image);
      });
    }

    // Show the image corresponding to the current branch by setting its alpha to 1
    if (this.branchImages[highlightedSpokeIndex]) {
      this.branchImages[highlightedSpokeIndex].setAlpha(0.8);
    }

    // If the wheel has slowed down or stopped, fade out the image
    if (Math.abs(this.rotationVelocity) <= 0.01) {
      if (this.branchImages[highlightedSpokeIndex]) {
        // Fade out the image smoothly
        this.scene.tweens.add({
          targets: this.branchImages[highlightedSpokeIndex],
          alpha: 0, // Fade the image to 0
          duration: 500, // Adjust duration to control the fade out speed
          ease: 'Linear'
        });
      }
    }
  }

  if (this.currentStep === 6) {
        // Get the character sheet from localStorage
        let characterSheet = JSON.parse(localStorage.getItem('characterSheet'));
      
        // Ensure the characterSheet exists and has the necessary properties
        if (characterSheet) {
          // Assuming you have variables for branchGa and branchEn
          this.branchGa = 'Some branch in Irish';  // Replace with actual value
          this.branchEn = 'Some branch in English'; // Replace with actual value
      
          // Update the characterSheet with the new branch values
          characterSheet.branchGa = this.branchGa;
          characterSheet.branchEn = this.branchEn;
      
          // Save the updated characterSheet back to localStorage
          localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
      
          // Update the texts based on the new branch values
          this.textsGa[6] = `${this.nameGa} fiann na \n ${this.branchGa}.\n 'b ea.`;
          this.textsEn[6] = `${this.nameGa}\n a fenian of \n  ${this.branchEn}.\n It was so.`;
      
          // Set the text objects accordingly
          this.textObjectGa.setText(this.textsGa[this.currentStep]);
          this.textObjectEn.setText(this.textsEn[this.currentStep]);
        } else {
          console.error('Character sheet is missing or corrupted');
        }
      }
      

}


}

export default ChampionSelect2;
