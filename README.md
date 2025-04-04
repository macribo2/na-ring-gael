# Na Ring Gael  

**Na Ring Gael** is an open-source mobile game designed to help players develop Irish language confidence through immersive gameplay. 
Uses React.js, Phaser3 and Rot.js.
Developing mobile first - landscape mode, Android, Chrome.


## Features  
- **Irish & English language support** – toggle English language translations with the middle button of directional pad.
- **Dynamic dungeon exploration** – Procedurally generated levels with interactive elements. 
- **County Structure** – Game locations are arranged as URLs province/county/location. 
- **Inventory System** – Items can be picked up, used(equipped/un-equipped) and dropped. 
- **Character Creation** – 300 player sprites and names in Irish and English, 64 branches of Fianna with Irish and English names and mottos.  
**Around 200 locations** Mostly they just use the default template, but they are all connected and arranged by province/county/location. When mounted on a puca, they are accessed as though cd ../ 
See src/components/locations to develop a location; and register new locations in src/index.js sample developed location @ /Leninster/Wicklow/Arklow. 

## Installation  
Clone the repository:  
```bash
git clone https://github.com/macribo2/na-ring-gael.git
cd na-ring-gael

nvm use 16

npm i

npm start --clear-cache   

I use firefox to view, on localhost:3000
