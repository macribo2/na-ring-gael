import { RedCent } from './entities';

export default function populateDungeon(dungeon) {
    if (!dungeon || !dungeon.rooms) {
        console.error("populateDungeon: Dungeon or rooms list is missing!");
        return;
    }

    const rooms = dungeon.rooms;

    if (rooms.length === 0) {
        console.error("populateDungeon: No rooms found in the dungeon!");
        return;
    }

    console.log(`populateDungeon: Found ${rooms.length} rooms.`);

    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    let TILE_SIZE = 32;
    
    // Calculate center coordinates from room boundaries
    const centerX = Math.floor((randomRoom._x1 + randomRoom._x2) / 2);
    const centerY = Math.floor((randomRoom._y1 + randomRoom._y2) / 2);

    const pixelX = centerX * TILE_SIZE + TILE_SIZE / 2;
    const pixelY = centerY * TILE_SIZE + TILE_SIZE / 2;

    const redCent = new RedCent(dungeon, pixelX, pixelY);

    // Add the Red Cent to the dungeon or entity group
    if (typeof dungeon.addEntity === 'function') {
        dungeon.addEntity(redCent);
    } else {
        dungeon.add.existing(redCent);
    }
    console.log(`populateDungeon: Placed Red Cent at (${centerX}, ${centerY})`);

    // Ensure RedCent has a physics body enabled
    dungeon.physics.world.enable(redCent.sprite);
    redCent.sprite.body.setCollideWorldBounds(true); // Optional: prevent RedCent from going out of bounds
    redCent.sprite.body.setImmovable(true); // Red Cent stays in place

    // Handle collision detection with the player
    const player = dungeon.player;  // Assuming you have a player object in the dungeon

    if (player) {
        dungeon.physics.add.overlap(
            player.sprite,        
            redCent.sprite,       
            () => {               
                if (!redCent.pickedUp) {  // ✅ Prevent multiple pickups
                    redCent.pickedUp = true;
                    console.log("Before pickup:", player.inventory.items);
                    redCent.pickup(player);
                    console.log("After pickup:", player.inventory.items);
                    
                    // Optional: Remove Red Cent after pickup
                    redCent.sprite.destroy();
                }
            },
            null,
            dungeon
        );
    }
    
}
