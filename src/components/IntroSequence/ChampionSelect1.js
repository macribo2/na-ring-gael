import Phaser from "phaser";
import { EventEmitter } from './EventEmitter';


class ChampionSelect1 extends Phaser.GameObjects.Container {
  constructor(scene, x, y, onComplete) {
      
    super(scene, x, y);
    this.displayedChampion = {spriteKey:'',gender:"", nameGa: '', nameEn: '' };
    this.championImage = scene.add.image(centerX, centerY, 'championSprites').setVisible(false)
    
this.onComplete=onComplete;
this.background2 = null; // Declare background2 here
    const centerX = 100;
    const centerY = 100;
    const radius = 450;
    this.numSpokes = 300; // Total number of spokes
    this.currentAngle = 0;
    this.champions = [
 {spriteKey:'1.png' ,gender:"", nameGa: 'Tassach',  nameEn: 'idle; inactive'}
,{spriteKey:'2.png' ,gender:"", nameGa: 'Ádhamhnán', nameEn: 'the timorous one'}
,{spriteKey:'3.png',gender:"", nameGa: 'Fionn', nameEn: 'fair, white'}
,{spriteKey:'4.png',gender:"", nameGa: 'Gormán', nameEn: 'dark; swarthy'}
,{spriteKey:'5.png',gender:"", nameGa: 'Conlaodh', nameEn: 'prudent fire'}
,{spriteKey:'6.png',gender:"", nameGa: 'Ciarán', nameEn: 'black'}
,{spriteKey:'7.png',gender:"", nameGa: 'Naomhán', nameEn: 'of Naomh (saint)'}
,{spriteKey:'8.png',gender:"", nameGa: 'Beag', nameEn: 'small'}
,{spriteKey:'9.png',gender:"", nameGa: 'Rós', nameEn: 'rose or horse'}
,{spriteKey:'10.png' ,gender:"", nameGa: 'Scothnait', nameEn: 'blossom, bloom'}
,{spriteKey:'11.png' ,gender:"", nameGa: 'Étaín', nameEn: 'jealousy'}
,{spriteKey:'12.png',gender:"", nameGa: 'Sadhbh', nameEn: 'sweet, goodly'}
,{spriteKey:'13.png',gender:"", nameGa: 'Cairbre', nameEn: 'charioteer or bearer'}
,{spriteKey:'14.png' ,gender:"", nameGa: 'Áine', nameEn: 'delight, pleasure'}
,{spriteKey:'15.png' ,gender:"", nameGa: 'Ceara', nameEn: 'fiery red'}
,{spriteKey:'16.png',gender:"", nameGa: 'Lomán', nameEn: 'bare'}
,{spriteKey:'17.png',gender:"", nameGa: 'Aodnait', nameEn: 'God of Fire'}
,{spriteKey:'18.png' ,gender:"", nameGa: 'Rúadhnait', nameEn: 'red-haired'}
,{spriteKey:'19.png' ,gender:"", nameGa: 'Gráinne', nameEn: 'of the Sun'}
,{spriteKey:'20.png',gender:"", nameGa: 'Áinle', nameEn: 'hero, champion, warrior'}
,{spriteKey:'21.png',gender:"", nameGa: 'Téide', nameEn: 'wantonness'}
,{spriteKey:'22.png' ,gender:"", nameGa: 'Flann', nameEn: 'fiery red'}
,{spriteKey:'23.png' ,gender:"", nameGa: 'Ana', nameEn: 'wealth or abundance'}
,{spriteKey:'24.png',gender:"f", nameGa: 'Dearbhail', nameEn: 'Daughter of Fál (Ireland)'}
,{spriteKey:'25.png',gender:"", nameGa: 'Éimhín', nameEn: 'prompt, ready'}
,{spriteKey:'26.png',gender:"", nameGa: 'Fechín', nameEn: 'raven or battle'}
,{spriteKey:'27.png',gender:"", nameGa: 'Muadhnait', nameEn: 'noble, good'}
,{spriteKey:'28.png',gender:"", nameGa: 'Breasal', nameEn: 'brave or strong in conflict'}
,{spriteKey:'29.png',gender:"", nameGa: 'Oisín', nameEn: 'little deer'}
,{spriteKey:'30.png',gender:"", nameGa: 'Bláthnaid', nameEn: 'little flower'}
,{spriteKey:'31.png',gender:"", nameGa: 'Ross', nameEn: 'headland'}
,{spriteKey:'32.png',gender:"", nameGa: 'Orthanach', nameEn: 'potent in prayers or charms'}
,{spriteKey:'33.png',gender:"", nameGa: 'Ainbheartach', nameEn: 'doer of evil deeds'}
,{spriteKey:'34.png',gender:"f", nameGa: 'Neamhain', nameEn: 'battle-fury, warlike frenzy, Celtic war goddess'}
,{spriteKey:'35.png',gender:"f", nameGa: 'Éibhleann', nameEn: 'beauty, radiance'}
,{spriteKey:'36.png',gender:"", nameGa: 'Tuathal', nameEn: 'Tully, ruler of the people'}
,{spriteKey:'37.png',gender:"m", nameGa: 'Ógán', nameEn: 'Lad'}
,{spriteKey:'38.png',gender:"", nameGa: 'Odhrán', nameEn: 'sallow'}
,{spriteKey:'39.png',gender:"m", nameGa: 'Onchú', nameEn: 'fierce hound'}
,{spriteKey:'40.png',gender:"f", nameGa: 'Sláine', nameEn: 'health, from a Celtic goddess name'}
,{spriteKey:'41.png',gender:"f", nameGa: 'Saorla', nameEn: 'noble queen'}
,{spriteKey:'42.png',gender:"m", nameGa: 'Deasmumhnach', nameEn: 'man from Desmond (Co. Cork)'}
,{spriteKey:'43.png',gender:"m", nameGa: 'Tighearnán', nameEn: 'Lord'}
,{spriteKey:'44.png',gender:"", nameGa: 'Bearach', nameEn: 'pointed'}
,{spriteKey:'45.png',gender:"", nameGa: 'Lochlann', nameEn: 'Viking'}
,{spriteKey:'46.png',gender:"", nameGa: 'Seanchán', nameEn: 'old, ancient'}
,{spriteKey:'47.png',gender:"", nameGa: 'Marcán', nameEn: 'steed'}
,{spriteKey:'48.png',gender:"m", nameGa: 'Cuán', nameEn: 'diminutive of Cu, meaning hound'}
,{spriteKey:'49.png',gender:"", nameGa: 'Móirne', nameEn: 'great'}
,{spriteKey:'50.png',gender:"", nameGa: 'Uallachán', nameEn: 'little proud, arrogant one'}
,{spriteKey:'51.png',gender:"m", nameGa: 'Sléibhín', nameEn: 'mountain man'}
,{spriteKey:'52.png',gender:"", nameGa: 'Conán', nameEn: 'wolf'}
,{spriteKey:'53.png',gender:"", nameGa: 'Breacán', nameEn: 'freckled, speckled'}
,{spriteKey:'54.png',gender:"m", nameGa: 'Gilleagán', nameEn: 'little lad'}
,{spriteKey:'55.png',gender:"m", nameGa: 'Dubhghlas', nameEn: 'blue black'}
,{spriteKey:'56.png',gender:"", nameGa: 'Faolán', nameEn: 'wolf'}
,{spriteKey:'57.png',gender:"", nameGa: 'Muirgheal', nameEn: ' sea-bright, sea-white'}
,{spriteKey:'58.png',gender:"", nameGa: 'Conall', nameEn: 'strong as a wolf'}
,{spriteKey:'59.png',gender:"f", nameGa: 'Niamh', nameEn: 'brightness, radiance'}
,{spriteKey:'60.png',gender:"", nameGa: 'Séighín', nameEn: 'hawk'}
,{spriteKey:'61.png',gender:"", nameGa: 'Meallán', nameEn: 'lightening'}
,{spriteKey:'62.png',gender:"f", nameGa: 'Meadhbh', nameEn: 'she who intoxicates'}
,{spriteKey:'63.png',gender:"", nameGa: 'Donnchadh', nameEn: 'Dionysus brown lord'}
,{spriteKey:'64.png',gender:"", nameGa: 'Lorcán', nameEn: 'cruel or fierce'}
,{spriteKey:'65.png',gender:"", nameGa: 'Uasal', nameEn: 'Noble'}
,{spriteKey:'66.png',gender:"f", nameGa: 'Moncha', nameEn: 'after Macha, goddess of Sovereignty'}
,{spriteKey:'67.png',gender:"", nameGa: 'Fial', nameEn: 'modest, honorable, generous'}
,{spriteKey:'68.png',gender:"", nameGa: 'Sé', nameEn: 'hawk-like, noble'}
,{spriteKey:'69.png',gender:"m", nameGa: 'Cathán', nameEn: 'battler'}
,{spriteKey:'70.png',gender:"", nameGa: 'Fionnbharr', nameEn: 'fair haired'}
,{spriteKey:'71.png',gender:"", nameGa: 'Suibhne', nameEn: 'well-going'}
,{spriteKey:'72.png',gender:"", nameGa: 'Brion', nameEn: 'noble or high'}
,{spriteKey:'73.png',gender:"f", nameGa: 'Nuala', nameEn: 'Fionnuala (white shoulders)'}
,{spriteKey:'74.png',gender:"", nameGa: 'Oillín', nameEn: 'little sprite, elf'}
,{spriteKey:'75.png',gender:"", nameGa: 'Oilithir', nameEn: 'pilgrim'}
,{spriteKey:'76.png',gender:"", nameGa: 'Cassán', nameEn: 'little curly-haired one'}
,{spriteKey:'77.png',gender:"", nameGa: 'Tómmán', nameEn: 'of Tuama'}
,{spriteKey:'78.png',gender:"", nameGa: 'Bairrfhionn', nameEn: 'fair-haired'}
,{spriteKey:'79.png',gender:"", nameGa: 'Ealadha', nameEn: 'art, craft'}
,{spriteKey:'80.png',gender:"f", nameGa: 'Bébhinn', nameEn: 'fair lady'}
,{spriteKey:'81.png',gender:"", nameGa: 'Sárán', nameEn: 'chief, noble, best'}
,{spriteKey:'82.png',gender:"", nameGa: 'Saoirse', nameEn: 'freedom'}
,{spriteKey:'83.png',gender:"f", nameGa: 'Ciara', nameEn: 'Dark, dark-haired, little dark one; Black. \nA name beloved for millenia'}
,{spriteKey:'84.png',gender:"f", nameGa: 'Laoise ', nameEn: 'radience, light'}
,{spriteKey:'85.png',gender:"f", nameGa: 'Clíona', nameEn: 'goddess of love and beauty, patron of County Cork. Also, queen of the banshees'}
,{spriteKey:'86.png',gender:"f", nameGa: 'Úna', nameEn: "from uan 'lamb'. Of truth, beauty, and unity"}
,{spriteKey:'87.png',gender:"f", nameGa: 'Eithne', nameEn: 'There were at least nine Saint Eithnes'}
,{spriteKey:'88.png',gender:"m", nameGa: 'Pádraig', nameEn: 'from the Latin Patricius, meaning of the patrician class'}
,{spriteKey:'89.png',gender:"m", nameGa: 'Líam', nameEn: 'strong-willed warrior '}
,{spriteKey:'90.png',gender:"", nameGa: 'Éanna', nameEn: 'birdlike'}
,{spriteKey:'91.png',gender:"", nameGa: 'Rónnad', nameEn: 'seal'}
,{spriteKey:'92.png',gender:"", nameGa: 'Neasa', nameEn: 'not gentle'}
,{spriteKey:'93.png',gender:"m", nameGa: 'Cillian', nameEn: 'church'}
,{spriteKey:'94.png',gender:"", nameGa: 'Olcán', nameEn: 'wolf'}
,{spriteKey:'95.png',gender:"", nameGa: 'Lonán', nameEn: 'blackbird'}
,{spriteKey:'96.png',gender:"", nameGa: 'Treasa', nameEn: 'strength'}
,{spriteKey:'97.png',gender:"", nameGa: 'Sárnait', nameEn: 'chief, noble, best'}
,{spriteKey:'98.png',gender:"", nameGa: 'Osnait', nameEn: 'deer'}
,{spriteKey:'99.png',gender:"", nameGa: 'Giolla-Padraig', nameEn: 'servant of Patrick'}
,{spriteKey:'10.png',gender:"f", nameGa: 'Áine', nameEn: 'Radiance, Áine, goddess of Summer'}
,{spriteKey:'11.png',gender:"f", nameGa: 'Fionnghuala', nameEn: 'fair shouldered'}
,{spriteKey:'12.png',gender:"", nameGa: 'Suaibhseach', nameEn: 'gracious, kindly'}
,{spriteKey:'13.png',gender:"m", nameGa: 'Éamonn', nameEn: 'wealthy guardian'}
,{spriteKey:'14.png',gender:"", nameGa: 'Maol Mhuire', nameEn: 'servant or devotee of St. Mary'}
,{spriteKey:'15.png',gender:"", nameGa: 'Brocc', nameEn: 'sharp-faced'}
,{spriteKey:'16.png',gender:"m", nameGa: 'Domhnall', nameEn: 'world mighty'}
,{spriteKey:'17.png',gender:"", nameGa: 'Teimhnín', nameEn: 'dark-haired one'}
,{spriteKey:'18.png',gender:"", nameGa: 'Daigh', nameEn: 'flame'}
,{spriteKey:'19.png',gender:"", nameGa: 'Anamcha', nameEn: 'ambrose spirited'}
,{spriteKey:'20.png',gender:"m", nameGa: 'Mac Nisse', nameEn: 'son of Ness (goddess name)'}
,{spriteKey:'21.png',gender:"m", nameGa: 'Aimhirghin', nameEn: 'born of song'}
,{spriteKey:'22.png',gender:"f", nameGa: 'Finnseach', nameEn: 'blonde lady'}
,{spriteKey:'23.png',gender:"", nameGa: 'Íde', nameEn: 'thirsts for knowledge and goodness'}
,{spriteKey:'24.png',gender:"", nameGa: 'Tíreachán', nameEn: 'having land, wide-ruling'}
,{spriteKey:'25.png',gender:"f", nameGa: 'Grian', nameEn: 'sun-goddess'}
,{spriteKey:'26.png',gender:"", nameGa: 'Robhartach', nameEn: 'rushing, impetuous'}
,{spriteKey:'27.png',gender:"m", nameGa: 'Muireadhach', nameEn: 'lord, master'}
,{spriteKey:'28.png',gender:"m", nameGa: 'Eoghan', nameEn: 'born of the yew'}
,{spriteKey:'29.png',gender:"", nameGa: 'Comhghall', nameEn: 'fellow hostage'}
,{spriteKey:'30.png',gender:"f", nameGa: 'Sorcha', nameEn: 'bright, radiant'}
,{spriteKey:'31.png',gender:"", nameGa: 'Niallán', nameEn: 'cloud or passionate, vehement'}
,{spriteKey:'32.png',gender:"", nameGa: 'Mael Íosa', nameEn: 'servant of Jesus'}
,{spriteKey:'33.png',gender:"", nameGa: 'Treasach', nameEn: 'warlike; fierce'}
,{spriteKey:'34.png',gender:"", nameGa: 'Scannlán', nameEn: 'little trapper'}
,{spriteKey:'35.png',gender:"f", nameGa: 'Aoife', nameEn: 'beautiful, radiant'}
,{spriteKey:'36.png',gender:"m", nameGa: 'Osgar', nameEn: 'deer lover'}
,{spriteKey:'37.png',gender:"", nameGa: 'Ceallach', nameEn: 'bright headed'}
,{spriteKey:'38.png',gender:"f", nameGa: 'Dunfhlaith', nameEn: 'brown princess'}
,{spriteKey:'39.png',gender:"", nameGa: 'Uallach', nameEn: 'proud; arrogant'}
,{spriteKey:'40.png',gender:"", nameGa: 'Uainionn', nameEn: 'foam-white complexioned'}
,{spriteKey:'41.png',gender:"", nameGa: 'Searc', nameEn: 'Love, affection'}
,{spriteKey:'42.png',gender:"", nameGa: 'Cúmhaí', nameEn: 'hound of the plain'}
,{spriteKey:'43.png',gender:"f", nameGa: 'Scáthach', nameEn: 'ghostly frightening'}
,{spriteKey:'44.png',gender:"", nameGa: 'Báine', nameEn: 'paleness; whiteness'}
,{spriteKey:'45.png',gender:"f", nameGa: 'Ríona', nameEn: 'queenly'}
,{spriteKey:'46.png',gender:"", nameGa: 'Osán', nameEn: 'little deer'}
,{spriteKey:'47.png',gender:"", nameGa: 'Lachtna', nameEn: 'milk-white, milk-like'}
,{spriteKey:'48.png',gender:"", nameGa: 'Gormghiolla', nameEn: 'grey servant'}
,{spriteKey:'49.png',gender:"", nameGa: 'Mochta', nameEn: 'great'}
,{spriteKey:'50.png',gender:"", nameGa: 'Molaisse', nameEn: 'My light'}
,{spriteKey:'51.png',gender:"", nameGa: 'Lachtnán', nameEn: 'milk-white, milk-like'}
,{spriteKey:'52.png',gender:"", nameGa: 'Ailbhe', nameEn: 'rock,  white, Gaulish World King.'}
,{spriteKey:'53.png',gender:"", nameGa: 'Moinnine', nameEn: 'ninne was the first word this saint spoke'}
,{spriteKey:'54.png',gender:"", nameGa: 'Tóla', nameEn: 'abundance, flood'}
,{spriteKey:'55.png',gender:"", nameGa: 'Diarmaid', nameEn: 'without injunction or envy'}
,{spriteKey:'56.png',gender:"", nameGa: 'Liamhain', nameEn: 'comely, beautiful'}
,{spriteKey:'57.png',gender:"", nameGa: 'Muircheartach', nameEn: 'sea battler'}
,{spriteKey:'58.png',gender:"", nameGa: 'Lasair', nameEn: 'fire'}
,{spriteKey:'59.png',gender:"", nameGa: 'Teafa', nameEn: 'a place name in Co. Longford'}
,{spriteKey:'60.png',gender:"f", nameGa: 'Banbha', nameEn: 'an early goddess, also Ireland'}
,{spriteKey:'61.png',gender:"m", nameGa: 'Ánrothán', nameEn: 'sun-traveller, nobleman second to the king'}
,{spriteKey:'62.png',gender:"", nameGa: 'Meallá', nameEn: 'lightening'}
,{spriteKey:'63.png',gender:"", nameGa: 'Fionúir', nameEn: 'ghost, spirit'}
,{spriteKey:'64.png',gender:"", nameGa: 'Cassair', nameEn: 'curly-haired'}
,{spriteKey:'65.png',gender:"m", nameGa: 'Fearghus', nameEn: 'strength of a man'}
,{spriteKey:'66.png',gender:"m", nameGa: 'Cormac', nameEn: 'the charioteer'}
,{spriteKey:'67.png',gender:"", nameGa: 'Cathaír', nameEn: 'battle lord'}
,{spriteKey:'68.png',gender:"", nameGa: 'Giolla Chríst', nameEn: 'servant of Christ'}
,{spriteKey:'69.png',gender:"", nameGa: 'Seachlann', nameEn: 'from Latin secondus'}
,{spriteKey:'70.png',gender:"", nameGa: 'Laoidheach', nameEn: 'songful, poetic'}
,{spriteKey:'71.png',gender:"m", nameGa: 'Caoimhín', nameEn: 'beautiful birth'}
,{spriteKey:'72.png',gender:"", nameGa: 'Murchú', nameEn: 'hound of the sea'}
,{spriteKey:'73.png',gender:"", nameGa: 'Scannal', nameEn: 'quarrel, argue'}
,{spriteKey:'74.png',gender:"", nameGa: 'Oilleóg', nameEn: 'sprite, elf'}
,{spriteKey:'75.png',gender:"f", nameGa: 'Dairinn', nameEn: 'daughter of Fionn'}
,{spriteKey:'76.png',gender:"", nameGa: 'Glaisne', nameEn: 'grey, grey-blue'}
,{spriteKey:'77.png',gender:"m", nameGa: 'Feardorcha', nameEn: 'dark man'}
,{spriteKey:'78.png',gender:"m", nameGa: 'Beagán', nameEn: 'little lad'}
,{spriteKey:'79.png',gender:"", nameGa: 'Ríordán', nameEn: 'royal poet'}
,{spriteKey:'80.png',gender:"", nameGa: 'Maeleachlainn', nameEn: 'servant, devotee of St. Seachnall'}
,{spriteKey:'81.png',gender:"", nameGa: 'Dallán', nameEn: 'blind'}
,{spriteKey:'82.png',gender:"", nameGa: 'Dubhgall', nameEn: 'dark foreigner'}
,{spriteKey:'83.png',gender:"", nameGa: 'Tuileach', nameEn: 'prominent forehead'}
,{spriteKey:'84.png',gender:"", nameGa: 'Garbhán', nameEn: 'rough'}
,{spriteKey:'85.png',gender:"", nameGa: 'Dubhaltach', nameEn: 'dark-limbed, black-jointed'}
,{spriteKey:'86.png',gender:"", nameGa: 'Dáire', nameEn: 'erinn daughter of Fionn'}
,{spriteKey:'87.png',gender:"", nameGa: 'Saraid', nameEn: 'excellent, best'}
,{spriteKey:'88.png',gender:"", nameGa: 'Aodhán', nameEn: 'the God of fire whose names means fire.'}
,{spriteKey:'89.png',gender:"", nameGa: 'Síomha', nameEn: 'good peace'}
,{spriteKey:'90.png',gender:"", nameGa: 'Teamhair', nameEn: 'elevated place'}
,{spriteKey:'91.png',gender:"", nameGa: 'Cian', nameEn: 'ancient'}
,{spriteKey:'92.png',gender:"m", nameGa: 'Fiachra', nameEn: 'battle-king'}
,{spriteKey:'93.png',gender:"", nameGa: 'Séadhna', nameEn: 'traveller, wayfarer'}
,{spriteKey:'94.png',gender:"", nameGa: 'Damhnait', nameEn: 'fawn'}
,{spriteKey:'95.png',gender:"m", nameGa: 'Aodh', nameEn: 'fire'}
,{spriteKey:'96.png',gender:"", nameGa: 'Naomh', nameEn: 'saint'}
,{spriteKey:'97.png',gender:"", nameGa: 'Iarlugh', nameEn: 'Iar + Lug Celtic gods'}
,{spriteKey:'98.png',gender:"", nameGa: 'Scoithín', nameEn: 'blossom, bloom'}
,{spriteKey:'99.png',gender:"", nameGa: 'Scoithniamh', nameEn: 'radiant blossom'}
,{spriteKey:'10.png',gender:"", nameGa: 'Ruarc', nameEn: 'hero, champion'}
,{spriteKey:'11.png',gender:"f", nameGa: 'Bríghid', nameEn: 'high goddess'}
,{spriteKey:'12.png',gender:"", nameGa: 'Scolaí', nameEn: 'town crier, scholar'}
,{spriteKey:'13.png',gender:"f", nameGa: 'Tuathla', nameEn: 'princess of the people'}
,{spriteKey:'14.png',gender:"", nameGa: 'Baoth', nameEn: 'vain, reckless, foolish'}
,{spriteKey:'15.png',gender:"", nameGa: 'Scoth', nameEn: 'blossom, bloom'}
,{spriteKey:'16.png',gender:"", nameGa: 'Neasán', nameEn: 'Stoat'}
,{spriteKey:'17.png',gender:"f", nameGa: 'Luiseach', nameEn: 'radiant girl'}
,{spriteKey:'18.png',gender:"", nameGa: 'Finnén', nameEn: 'fair'}
,{spriteKey:'19.png',gender:"m", nameGa: 'Ultán', nameEn: 'Ulsterman'}
,{spriteKey:'20.png',gender:"f", nameGa: 'Nárbhflaith', nameEn: 'noble princess'}
,{spriteKey:'21.png',gender:"", nameGa: 'Éanna', nameEn: 'birdlike'}
,{spriteKey:'22.png',gender:"", nameGa: 'Rónnad', nameEn: 'seal'}
,{spriteKey:'23.png',gender:"", nameGa: 'Neasa', nameEn: 'not gentle'}
,{spriteKey:'24.png',gender:"m", nameGa: 'Cillian', nameEn: 'church'}
,{spriteKey:'25.png',gender:"", nameGa: 'Olcán', nameEn: 'wolf'}
,{spriteKey:'26.png',gender:"", nameGa: 'Lonán', nameEn: 'blackbird'}
,{spriteKey:'27.png',gender:"", nameGa: 'Treasa', nameEn: 'strength'}
,{spriteKey:'28.png',gender:"", nameGa: 'Sárnait', nameEn: 'chief, noble, best'}
,{spriteKey:'29.png',gender:"", nameGa: 'Osnait', nameEn: 'deer'}
,{spriteKey:'30.png',gender:"", nameGa: 'Echna', nameEn: 'steed'}
,{spriteKey:'31.png',gender:"", nameGa: 'Seanán', nameEn: 'old, ancient'}
,{spriteKey:'32.png',gender:"", nameGa: 'Easnadh', nameEn: 'musical sound'}
,{spriteKey:'33.png',gender:"", nameGa: 'Oillill', nameEn: 'sprite, elf'}
,{spriteKey:'34.png',gender:"", nameGa: 'Uaithne', nameEn: 'greenish, from a tribal name'}
,{spriteKey:'35.png',gender:"", nameGa: 'Bardán', nameEn: 'poet, bard'}
,{spriteKey:'36.png',gender:"", nameGa: 'Síoda', nameEn: 'silk'}
,{spriteKey:'37.png',gender:"", nameGa: 'Iarfhlaith', nameEn: 'western kingdom'}
,{spriteKey:'38.png',gender:"", nameGa: 'Eirnín', nameEn: 'iron'}
,{spriteKey:'39.png',gender:"", nameGa: 'Daimhín', nameEn: 'deer or ox'}
,{spriteKey:'40.png',gender:"", nameGa: 'Fianait', nameEn: 'wild creature, deer'}
,{spriteKey:'41.png',gender:"", nameGa: 'Tanaí', nameEn: 'slender, subtle'}
,{spriteKey:'42.png',gender:"", nameGa: 'Leannán', nameEn: 'sweetheart'}
,{spriteKey:'43.png',gender:"", nameGa: 'Urard', nameEn: 'very tall'}
,{spriteKey:'44.png',gender:"", nameGa: 'Lughaidh', nameEn: 'light, brightness'}
,{spriteKey:'45.png',gender:"", nameGa: 'Iobhar', nameEn: 'yew tree'}
,{spriteKey:'46.png',gender:"", nameGa: 'Róisín', nameEn: 'Norse word for horse. Also means little rose.'}
,{spriteKey:'47.png',gender:"", nameGa: 'Conn', nameEn: 'wisdom, chief'}
,{spriteKey:'48.png',gender:"", nameGa: 'Cearbhall', nameEn: 'brave in sword-fighting, valorous'}
,{spriteKey:'49.png',gender:"", nameGa: 'Colmán', nameEn: "from Latin 'dove'"}
,{spriteKey:'50.png',gender:"", nameGa: 'Íonait', nameEn: 'faithful, pure, sincere'}
,{spriteKey:'51.png',gender:"", nameGa: 'Muireann', nameEn: 'sea fair'}
,{spriteKey:'52.png',gender:"f", nameGa: 'Eithne', nameEn: 'kernal or gorse'}
,{spriteKey:'53.png',gender:"m", nameGa: 'Deaglán', nameEn: 'full of goodness'}
,{spriteKey:'54.png',gender:"f", nameGa: 'Caoimhe', nameEn: 'beauty or grace'}
,{spriteKey:'55.png',gender:"", nameGa: 'Róinseach', nameEn: 'seal'}
,{spriteKey:'56.png',gender:"m", nameGa: 'Ruaidhrí', nameEn: 'red king'}
,{spriteKey:'57.png',gender:"", nameGa: 'Geiléis', nameEn: 'bright swan'}
,{spriteKey:'58.png',gender:"", nameGa: 'Miach', nameEn: 'honorable, proud'}
,{spriteKey:'59.png',gender:"", nameGa: 'Labhrás', nameEn: 'laurel bush'}
,{spriteKey:'60.png',gender:"", nameGa: 'Abbán', nameEn: 'little abbot'}
,{spriteKey:'61.png',gender:"", nameGa: 'Uaine', nameEn: 'greenish, from a tribal name'}
,{spriteKey:'62.png',gender:"", nameGa: 'Ólchobhar', nameEn: 'lover of drink'}
,{spriteKey:'63.png',gender:"", nameGa: 'Nuadha', nameEn: 'possibly, cloud-maker: Celtic god name'}
,{spriteKey:'64.png',gender:"m", nameGa: 'Fearghal', nameEn: 'manly or valorous'}
,{spriteKey:'65.png',gender:"", nameGa: 'Rathnait', nameEn: 'grace, prosperity'}
,{spriteKey:'66.png',gender:"f", nameGa: 'Laoise', nameEn: 'girl'}
,{spriteKey:'67.png',gender:"", nameGa: 'Ailill', nameEn: 'elf'}
,{spriteKey:'68.png',gender:"", nameGa: 'Maolán', nameEn: 'warrior'}
,{spriteKey:'69.png',gender:"", nameGa: 'Líobhan', nameEn: 'beauty of women'}
,{spriteKey:'70.png',gender:"", nameGa: 'Laisrén', nameEn: 'flame'}
,{spriteKey:'71.png',gender:"", nameGa: 'Fachtna', nameEn: 'malicious, hostile'}
,{spriteKey:'72.png',gender:"", nameGa: 'Maon', nameEn: 'silent'}
,{spriteKey:'73.png',gender:"", nameGa: 'Somhairle', nameEn: 'from Norse, summer wanderer'}
,{spriteKey:'74.png',gender:"", nameGa: 'Neacht', nameEn: 'pure'}
,{spriteKey:'75.png',gender:"", nameGa: 'Buadhach', nameEn: 'Victorious'}
,{spriteKey:'76.png',gender:"m", nameGa: 'Tadhg', nameEn: 'Thaddeus, Theodosius, Theophilus, poet'}
,{spriteKey:'77.png',gender:"", nameGa: 'Muirín', nameEn: 'born of the sea'}
,{spriteKey:'78.png',gender:"m", nameGa: 'Niall', nameEn: 'cloud or passionate, vehement'}
,{spriteKey:'79.png',gender:"", nameGa: 'Mór', nameEn: 'great'}
,{spriteKey:'80.png',gender:"", nameGa: 'Aoibhegréine', nameEn: 'radiance of the sun'}
,{spriteKey:'81.png',gender:"m", nameGa: 'Conchobhar', nameEn: 'lover of hounds'}
,{spriteKey:'82.png',gender:"", nameGa: 'Mac Táil', nameEn: 'son of adze'}
,{spriteKey:'83.png',gender:"", nameGa: 'Rúadhán', nameEn: 'red haired'}
,{spriteKey:'84.png',gender:"", nameGa: 'Mainchín', nameEn: 'monk'}
,{spriteKey:'85.png',gender:"f", nameGa: 'Órlaith', nameEn: 'golden princess'}
,{spriteKey:'86.png',gender:"f", nameGa: 'Éabha', nameEn: 'Life'}
,{spriteKey:'87.png',gender:"f", nameGa: 'Deirdre', nameEn: 'chatterer or daughter. Daughter of the royal\nstory…id mac Daill, \nat the court of the king of Ulster'}
,{spriteKey:'88.png',gender:"", nameGa: 'Fionnait', nameEn: 'fair-haired, white'}
,{spriteKey:'89.png',gender:"", nameGa: 'Labhraidh', nameEn: 'speaker'}
,{spriteKey:'90.png',gender:"f", nameGa: 'Brónach', nameEn: 'sorrowful'}
,{spriteKey:'91.png',gender:"", nameGa: 'Suanach', nameEn: 'drowsy'}
,{spriteKey:'92.png',gender:"", nameGa: 'Taichleach', nameEn: 'placating, peacemaking'}
,{spriteKey:'93.png',gender:"m", nameGa: 'Rónán', nameEn: 'little seal'}
,{spriteKey:'94.png',gender:"", nameGa: 'Murchadh', nameEn: 'sea battler'}
,{spriteKey:'95.png',gender:"", nameGa: 'Laoire', nameEn: 'calf-herd'}
,{spriteKey:'96.png',gender:"m", nameGa: 'Ríoghán', nameEn: 'little king'}
,{spriteKey:'97.png',gender:"f", nameGa: 'Tuilelaith', nameEn: 'lady of abundance of sovereignty'}
,{spriteKey:'98.png',gender:"m", nameGa: 'Gobnait', nameEn: 'smith'}
,{spriteKey:'99.png',gender:"m", nameGa: 'Fionntán', nameEn: 'white ancient/fire'}
,{spriteKey:'0.png',gender:"m", nameGa: 'Aonghus', nameEn: 'sole strength or true choice'}
,{spriteKey:'1.png',gender:"", nameGa: 'Áinfean', nameEn: 'storm, fury, violence'}
,{spriteKey:'2.png',gender:"", nameGa: 'Coinneach', nameEn: 'sorrowful'}
,{spriteKey:'3.png',gender:"", nameGa: 'Torcán', nameEn: 'wild boar'}
,{spriteKey:'4.png',gender:"", nameGa: 'Earnán', nameEn: 'iron'}
,{spriteKey:'5.png',gender:"m", nameGa: 'Cathal', nameEn: 'strong in battle'}
,{spriteKey:'6.png',gender:"m", nameGa: 'Gobán', nameEn: 'smith'}
,{spriteKey:'7.png',gender:"f", nameGa: 'Deirbhile', nameEn: 'daughter of a poet'}
,{spriteKey:'8.png',gender:"f", nameGa: 'Caoilfhionn', nameEn: 'fair and slender'}
,{spriteKey:'9.png',gender:"", nameGa: 'Gormlaith', nameEn: 'blue/illustrious princess'}
,{spriteKey:'0.png',gender:"", nameGa: 'Fearchar', nameEn: 'friendly'}
,{spriteKey:'1.png',gender:"", nameGa: 'Lasairfhiona', nameEn: 'flame wine'}
,{spriteKey:'2.png',gender:"", nameGa: 'Daighre', nameEn: 'flame, fire'}
,{spriteKey:'3.png',gender:"", nameGa: 'Ámhra', nameEn: 'very wonderful'}
,{spriteKey:'4.png',gender:"", nameGa: 'Séanait', nameEn: 'hawk'}
,{spriteKey:'5.png',gender:"", nameGa: 'Samhradhán', nameEn: 'summery person'}
,{spriteKey:'6.png',gender:"m", nameGa: 'Tighearnach', nameEn: 'Lord'}
,{spriteKey:'7.png',gender:"", nameGa: 'Uallgarg', nameEn: 'fierce pride'}
,{spriteKey:'8.png',gender:"f", nameGa: 'Aoibheann', nameEn: 'beautiful radiance'}
,{spriteKey:'9.png',gender:"f", nameGa: 'Muirne', nameEn: 'high spirited, festive'}
,{spriteKey:'0.png',gender:"f", nameGa: 'Líadan', nameEn: 'grey lady'}
,{spriteKey:'.png',gender:"", nameGa: 'Órnait', nameEn: 'sallow'}
  
]

  

this.background2 = scene.add.sprite(0, 0, 'bg1').setVisible(false).setDepth(15);
this.background2.setOrigin(0, 0);
this.background2.setDisplaySize(scene.scale.width, scene.scale.height);
this.background2.setAlpha(0); // Set initial alpha to 0


this.background = scene.add.sprite(0, 0, 'bg1'); 
this.background.setOrigin(0, 0); 
this.background.setDisplaySize(scene.scale.width, scene.scale.height);
  // Add the dynamic rainbow circle
  this.createRainbowCircle(scene, centerX, centerY, 50);

this.championSprite = scene.add.sprite(400, 300, 'championSprites').setVisible(false);

// Create the sprite for the wheel
this.wheel = scene.add.sprite(centerX,centerY, 'celt-ring').setOrigin(0.5, 0.5).setAlpha(0.5);
    this.wheel.setDisplaySize(radius * 2, radius * 2);
    this.wheel.setInteractive();
    
    // Add the container to the scene
    scene.add.existing(this);
    
    // Draw spokes
    this.spokes = scene.add.graphics().setAlpha(0);
    this.spokes.setPosition(centerX, centerY); // Align spokes to center
    this.drawSpokes(radius, this.numSpokes);
    
    // Add the square sensor
    this.sensor = scene.add.rectangle(400, 250, 2, 2, 0x003300);
    
    // Add text for the name
    this.nameTextGa = scene.add.text(400, centerY + 110, 'test', {
      font: '64px IrishPenny',
      fill: '#ffffff',
    }).setOrigin(0.5).setAlpha(0).setDepth(30);;
    
    
  // Set up the event listener
  EventEmitter.on('stepChanged', (newStep) => {
    console.log(`ChampionSelect1 noticed step change: ${newStep}`);
    if (newStep === 3) {


      if (this.nameTextGa) {
        // Fade out the current text
        this.scene.tweens.add({
            targets: this.nameTextGa,
            alpha: 0, // Fade out to alpha 0
            duration: 1000, // Duration of 1 second
            ease: 'Power1', // Smooth easing
            onComplete: () => {
                
                // Change text properties (position, font size, etc.)
                this.nameTextGa.setPosition(50,50); // New position
            this.nameTextGa.setOrigin(0)
                // Fade in the updated text
                this.scene.tweens.add({
                    targets: this.nameTextGa,
                    alpha: 1, // Fade in to alpha 1
                    duration: 1000, // Duration of 1 second
                    ease: 'Power1', // Smooth easing
                    onStart: () => {
                        console.log("nameTextGa is fading back in.");
                    },
                    onComplete: () => {
                        console.log("nameTextGa fully visible.");
                    }
                });
            }
        });
    } else {
        console.warn("nameTextGa is not defined yet.");
    }


      this.scene.tweens.add({
        targets: this.championImage,
        y: this.championImage.y + 250, // Move down 250px
        duration: 2000, // Duration of 2 seconds for walking effect
        ease: 'Sine.easeInOut', // Smooth easing function
        onStart: () => {
            console.log("ChampionSprite started walking down.");
        },
        onComplete: () => {
            console.log("ChampionSprite finished walking down.");
        }
    });

         }

         if (newStep === 4) {
          if (this.nameTextGa) {
              // Fade out the current text
              this.scene.tweens.add({
                  targets: this.nameTextGa,
                  alpha: 0, // Fade out to alpha 0
                  duration: 1000, // Duration of 1 second
                  ease: 'Power1', // Smooth easing
                  onComplete: () => {
                      console.log("nameTextGa faded out.");
                      
                      // Change text properties (position, font size, etc.)
                      this.nameTextGa.setFontSize(32); // Smaller font size
                      this.nameTextGa.setPosition(150, 250); // New position
                      this.nameTextGa.setAlpha(0.5); // New position
                      
                      // Fade in the updated text
                      this.scene.tweens.add({
                          targets: this.nameTextGa,
                          alpha: 1, // Fade in to alpha 1
                          duration: 1000, // Duration of 1 second
                          ease: 'Power1', // Smooth easing
                          onStart: () => {
                              console.log("nameTextGa is fading back in.");
                          },
                          onComplete: () => {
                              console.log("nameTextGa fully visible.");
                          }
                      });
                  }
              });
          } else {
              console.warn("nameTextGa is not defined yet.");
          }
      }


  })
    // Add text for the name
     this.nameTextEn =scene.add.text(50, 450, '', {
      font: '25px ubuntu',
      fill: 'limegreen',
      wordWrap: { width: 600 },
    }).setAlpha(0).setDepth(30);
    
    // Add a sprite to display the champion image
    this.championImage = scene.add.sprite(centerX, centerY, 'defaultSprite').setVisible(false).setAlpha(0);
    this.championImage.setScale(2).setDepth(30); // Adjust size as needed


    // Variables for tracking rotation and velocity
    this.rotationVelocity = 0;
    this.isDragging = false;
    this.dampingFactor = 0.9995;
    this.minVelocity = 0.0001;
    this.friction = 0.995;
    this.dragSensitivity = 0.0005;
    
    // Pointer events
    this.wheel.on('pointerdown', (pointer) => this.startDrag(pointer));
    this.wheel.on('pointermove', (pointer) => this.dragWheel(pointer));
    this.wheel.on('pointerup', () => this.stopDrag());
    
    // Update the wheel rotation in the game loop
    scene.events.on('update', this.updateWheel, this);

  }

    updateChampionSprite(spriteKey) {
    if (this.scene.textures.exists('championSprites') && spriteKey) {
      this.championImage.setTexture('championSprites', spriteKey).setVisible(true);
    } else {
      this.championImage.setVisible(false);
    }
  }

  // Method to toggle the visibility of the English name
  toggleEnglishNameVisibility(visible) {
    this.nameTextEn.setVisible(visible);
   
  }
  

 // Method to create a dynamic rainbow circle
 createRainbowCircle(scene, x, y, radius) {
  this.rainbowCircle = scene.add.graphics().setAlpha(0);
  scene.events.on('update', () => {
    this.updateColorShiftCircle(x, y, radius);
  });
}

// Method to update the color shift circle with one subtle color
// Method to update the color shift circle with a muted color range
updateColorShiftCircle(x, y, radius) {

  if (!this.scene) {
    return; // Exit if the scene is undefined
  }
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
      
      this.nameTextGa.setAlpha(1)
      this.nameTextEn.setAlpha(1)
      this.rainbowCircle.setAlpha(1)
      this.championImage.setAlpha(1)

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
  stopDrag() {
    this.isDragging = false;
  }
  
  updateWheel() {
    if (!this.isDragging) {
      
      if (Math.abs(this.rotationVelocity) > this.minVelocity) {
            // Continue natural rotation with damping
            this.currentAngle += this.rotationVelocity;
            this.wheel.rotation = this.currentAngle;
            this.spokes.rotation = this.currentAngle;
            
            this.rotationVelocity *= this.dampingFactor;
            this.rotationVelocity *= this.friction;
          } else {
            // Snapping to nearest spoke
            const angleStep = (2 * Math.PI) / this.numSpokes;
            const snappedAngle = Math.round(this.currentAngle / angleStep) * angleStep;
            
            // Smoothly transition to the snapped angle
            if (Math.abs(snappedAngle - this.currentAngle) > 0.001) {
              this.currentAngle = Phaser.Math.Interpolation.Linear([this.currentAngle, snappedAngle], 0.1);
              this.wheel.rotation = this.currentAngle;
              this.spokes.rotation = this.currentAngle;
            } else {
                this.currentAngle = snappedAngle; // Final snap to exact position
                this.rotationVelocity = 0; // Stop rotation completely
            }
        }
    }
    
    // Highlight spokes touching the sensor
    this.highlightSpokes();
  }
  
  selectChampion(characterName) {
    if (!this.scene) {
      console.error('Scene is not defined');
      return;
    }
  
   this.selectedCharacter = characterName;
    console.log(`Selected: ${characterName}`);
  
    this.scene.characterSheet = {
      name: characterName,
    };
  
    if (this.onComplete) {
      this.onComplete();
    }
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
    this.off('pointerdown'); // Remove pointer listener
this.scene.events.off('update', this.updateColorShiftCircle, this); // Unsubscribe from update

this.scene.time.delayedCall(0, () => {
  this.destroy();
});
  }
  

  highlightSpokes() {
    if (!this.scene) {
      console.error("Scene is undefined. Ensure the method is called after initialization.");
      return;
    }
  
    // Ensure spokes is initialized
    if (!this.spokes) {
      this.spokes = this.scene.add.graphics();
    }
  
    const centerX = 100;
    const centerY = 100;
    const radius = 450;
    const angleStep = (2 * Math.PI) / this.numSpokes;
    var sensorX = this.sensor && this.sensor.x !== undefined ? this.sensor.x : 0;
    var sensorY = this.sensor && this.sensor.y !== undefined ? this.sensor.y : 0;
  
    let sensorAngle = Math.atan2(sensorY - centerY, sensorX - centerX);
    sensorAngle = Phaser.Math.Angle.Wrap(sensorAngle - this.currentAngle);
  
    const highlightingRange = Math.PI / (this.numSpokes * 2);
    let sensorTouched = false;
    let highlightedSpokeIndex = -1;
  
    this.spokes.clear();
  
    for (let i = 0; i < this.numSpokes; i++) {
      const rotatedAngle = i * angleStep;
      let angleDifference = Phaser.Math.Angle.Wrap(sensorAngle - rotatedAngle);
  
      const endX = Math.cos(rotatedAngle) * radius;
      const endY = Math.sin(rotatedAngle) * radius;
  
      if (Math.abs(angleDifference) < highlightingRange) {
        sensorTouched = true;
        this.spokes.lineStyle(3, 0x003300, 1);
        highlightedSpokeIndex = i;
      } else {
        this.spokes.lineStyle(1, 0xffffff, 0.3);
      }
  
      this.spokes.beginPath();
      this.spokes.moveTo(0, 0);
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
    }
  
    if (sensorTouched && this.sensor) {
      this.sensor.setFillStyle(0x000000);
      this.scene.time.delayedCall(50, () => {
        if (this.sensor) this.sensor.setFillStyle(0x003300);
      });
    }
  
    if (sensorTouched && highlightedSpokeIndex !== -1) {
      const displayedChampion = this.champions[highlightedSpokeIndex % this.champions.length];
  
      this.nameTextGa.setText(displayedChampion.nameGa);
      this.nameTextEn.setText(displayedChampion.nameEn);
  
      this.displayedChampion = {
        nameGa: displayedChampion.nameGa,
        nameEn: displayedChampion.nameEn,
        gender: displayedChampion.gender,
      };
  
      const textureExists = this.scene.textures.exists('championSprites');
      if (textureExists) {
        const spriteKey = `${displayedChampion.spriteKey}`;
        if (spriteKey) {
          this.championImage
            .setTexture('championSprites', spriteKey)
            .setVisible(true)
            .setInteractive()
            .on('pointerdown', () => {
              this.selectChampion(this.displayedChampion.nameGa);
           
            });
        } else {
          this.championImage.setVisible(false);
        }
      } else {
        console.warn("Texture 'championSprites' does not exist.");
        this.championImage.setVisible(false);
      }
    }
  

  }
  

}

export default ChampionSelect1;
