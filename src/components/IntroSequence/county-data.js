// county-data.js (new separate file)
export class CountyData {
  constructor(config) {
    this.name = config.co;
    this.mapData = JSON.parse(config.mapData);
    this.locations = config.locations;
    this.locationsEng = config.locationsEng;
    this.displayName = config.county;
    this.irishName = config.county;  // Irish name from "county" key
    this.englishName = config.co;    // English abbreviation from "co" key
      
  }

  getLocation(index) {
    return {
      gaelic: this.locations[index] || 'Unknown Location',
      english: this.locationsEng[index] || 'Unknown Location'
    };
  }
}
