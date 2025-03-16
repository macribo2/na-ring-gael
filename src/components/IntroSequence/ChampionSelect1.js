import Phaser from "phaser";
import { EventEmitter } from './EventEmitter';


class ChampionSelect1 extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y, onComplete) {
    
    super(scene, x, y);
    this.championDiscovered = false; // Initially, the champion is not discovered
    const centerX = 100;
    const centerY = 100;
    this.championImage = scene.add.image(centerX, centerY, 'championSprites').setVisible(false)
    
this.onComplete=onComplete;
this.background2 = null; // Declare background2 here
    const radius = 450;
    this.numSpokes = 300; // Total number of spokes
    this.currentAngle = 0;
    this.flairPlayed = false;
    
    this.champions = [
 {spriteKey:'001.png' ,gender:"", nameGa: 'Tassach',  nameEn: 'idle; inactive'}
,{spriteKey:'002.png' ,gender:"", nameGa: 'Ádhamhnán', nameEn: 'the timorous one'}
,{spriteKey:'003.png',gender:"", nameGa: 'Fionn', nameEn: 'fair, white'}
,{spriteKey:'004.png',gender:"", nameGa: 'Gormán', nameEn: 'dark; swarthy'}
,{spriteKey:'005.png',gender:"", nameGa: 'Conlaodh', nameEn: 'prudent fire'}
,{spriteKey:'006.png',gender:"", nameGa: 'Ciarán', nameEn: 'black'}
,{spriteKey:'007.png',gender:"", nameGa: 'Naomhán', nameEn: 'of Naomh (saint)'}
,{spriteKey:'008.png',gender:"", nameGa: 'Beag', nameEn: 'small'}
,{spriteKey:'009.png',gender:"", nameGa: 'Rós', nameEn: 'rose or horse'}
,{spriteKey:'010.png' ,gender:"", nameGa: 'Scothnait', nameEn: 'blossom, bloom'}
,{spriteKey:'011.png' ,gender:"", nameGa: 'Étaín', nameEn: 'jealousy'}
,{spriteKey:'012.png',gender:"", nameGa: 'Sadhbh', nameEn: 'sweet, goodly'}
,{spriteKey:'013.png',gender:"", nameGa: 'Cairbre', nameEn: 'charioteer or bearer'}
,{spriteKey:'014.png' ,gender:"", nameGa: 'Áine', nameEn: 'delight, pleasure'}
,{spriteKey:'015.png' ,gender:"", nameGa: 'Ceara', nameEn: 'fiery red'}
,{spriteKey:'016.png',gender:"", nameGa: 'Lomán', nameEn: 'bare'}
,{spriteKey:'017.png',gender:"", nameGa: 'Aodnait', nameEn: 'God of Fire'}
,{spriteKey:'018.png' ,gender:"", nameGa: 'Rúadhnait', nameEn: 'red-haired'}
,{spriteKey:'019.png' ,gender:"", nameGa: 'Gráinne', nameEn: 'of the Sun'}
,{spriteKey:'020.png',gender:"", nameGa: 'Áinle', nameEn: 'hero, champion, warrior'}
,{spriteKey:'021.png',gender:"", nameGa: 'Téide', nameEn: 'wantonness'}
,{spriteKey:'022.png' ,gender:"", nameGa: 'Flann', nameEn: 'fiery red'}
,{spriteKey:'023.png' ,gender:"", nameGa: 'Ana', nameEn: 'wealth or abundance'}
,{spriteKey:'024.png',gender:"f", nameGa: 'Dearbhail', nameEn: 'Daughter of Fál (Ireland)'}
,{spriteKey:'025.png',gender:"", nameGa: 'Éimhín', nameEn: 'prompt, ready'}
,{spriteKey:'026.png',gender:"", nameGa: 'Fechín', nameEn: 'raven or battle'}
,{spriteKey:'027.png',gender:"", nameGa: 'Muadhnait', nameEn: 'noble, good'}
,{spriteKey:'028.png',gender:"", nameGa: 'Breasal', nameEn: 'brave or strong in conflict'}
,{spriteKey:'029.png',gender:"", nameGa: 'Oisín', nameEn: 'little deer'}
,{spriteKey:'030.png',gender:"", nameGa: 'Bláthnaid', nameEn: 'little flower'}
,{spriteKey:'031.png',gender:"", nameGa: 'Ross', nameEn: 'headland'}
,{spriteKey:'032.png',gender:"", nameGa: 'Orthanach', nameEn: 'potent in prayers or charms'}
,{spriteKey:'033.png',gender:"", nameGa: 'Ainbheartach', nameEn: 'doer of evil deeds'}
,{spriteKey:'034.png',gender:"f", nameGa: 'Neamhain', nameEn: 'battle-fury, warlike frenzy, \nCeltic war goddess'}
,{spriteKey:'035.png',gender:"f", nameGa: 'Éibhleann', nameEn: 'beauty, radiance'}
,{spriteKey:'036.png',gender:"", nameGa: 'Tuathal', nameEn: 'Tully, ruler of the people'}
,{spriteKey:'037.png',gender:"m", nameGa: 'Ógán', nameEn: 'Lad'}
,{spriteKey:'038.png',gender:"", nameGa: 'Odhrán', nameEn: 'sallow'}
,{spriteKey:'039.png',gender:"m", nameGa: 'Onchú', nameEn: 'fierce hound'}
,{spriteKey:'040.png',gender:"f", nameGa: 'Sláine', nameEn: 'health, \nfrom a Celtic goddess name'}
,{spriteKey:'041.png',gender:"f", nameGa: 'Saorla', nameEn: 'noble queen'}
,{spriteKey:'042.png',gender:"m", nameGa: 'Deasmumhnach', nameEn: 'man from Desmond (Co. Cork)'}
,{spriteKey:'043.png',gender:"m", nameGa: 'Tighearnán', nameEn: 'Lord'}
,{spriteKey:'044.png',gender:"", nameGa: 'Bearach', nameEn: 'pointed'}
,{spriteKey:'045.png',gender:"", nameGa: 'Lochlann', nameEn: 'Viking'}
,{spriteKey:'046.png',gender:"", nameGa: 'Seanchán', nameEn: 'old, ancient'}
,{spriteKey:'047.png',gender:"", nameGa: 'Marcán', nameEn: 'steed'}
,{spriteKey:'048.png',gender:"m", nameGa: 'Cuán', nameEn: 'diminutive of Cu, meaning hound'}
,{spriteKey:'049.png',gender:"", nameGa: 'Móirne', nameEn: 'great'}
,{spriteKey:'050.png',gender:"", nameGa: 'Uallachán', nameEn: 'little proud, arrogant one'}
,{spriteKey:'051.png',gender:"m", nameGa: 'Sléibhín', nameEn: 'mountain man'}
,{spriteKey:'052.png',gender:"", nameGa: 'Conán', nameEn: 'wolf'}
,{spriteKey:'053.png',gender:"", nameGa: 'Breacán', nameEn: 'freckled, speckled'}
,{spriteKey:'054.png',gender:"m", nameGa: 'Gilleagán', nameEn: 'little lad'}
,{spriteKey:'055.png',gender:"m", nameGa: 'Dubhghlas', nameEn: 'blue black'}
,{spriteKey:'056.png',gender:"", nameGa: 'Faolán', nameEn: 'wolf'}
,{spriteKey:'057.png',gender:"", nameGa: 'Muirgheal', nameEn: ' sea-bright, sea-white'}
,{spriteKey:'058.png',gender:"", nameGa: 'Conall', nameEn: 'strong as a wolf'}
,{spriteKey:'059.png',gender:"f", nameGa: 'Niamh', nameEn: 'brightness, radiance'}
,{spriteKey:'060.png',gender:"", nameGa: 'Séighín', nameEn: 'hawk'}
,{spriteKey:'061.png',gender:"", nameGa: 'Meallán', nameEn: 'lightening'}
,{spriteKey:'062.png',gender:"f", nameGa: 'Meadhbh', nameEn: 'she who intoxicates'}
,{spriteKey:'063.png',gender:"", nameGa: 'Donnchadh', nameEn: 'Dionysus brown lord'}
,{spriteKey:'064.png',gender:"", nameGa: 'Lorcán', nameEn: 'cruel or fierce'}
,{spriteKey:'065.png',gender:"", nameGa: 'Uasal', nameEn: 'Noble'}
,{spriteKey:'066.png',gender:"f", nameGa: 'Moncha', nameEn: 'after Macha, \ngoddess of Sovereignty'}
,{spriteKey:'067.png',gender:"", nameGa: 'Fial', nameEn: 'modest, honorable, generous'}
,{spriteKey:'068.png',gender:"", nameGa: 'Sé', nameEn: 'hawk-like, noble'}
,{spriteKey:'069.png',gender:"m", nameGa: 'Cathán', nameEn: 'battler'}
,{spriteKey:'070.png',gender:"", nameGa: 'Fionnbharr', nameEn: 'fair haired'}
,{spriteKey:'071.png',gender:"", nameGa: 'Suibhne', nameEn: 'well-going'}
,{spriteKey:'072.png',gender:"", nameGa: 'Brion', nameEn: 'noble or high'}
,{spriteKey:'073.png',gender:"f", nameGa: 'Nuala', nameEn: 'Fionnuala (white shoulders)'}
,{spriteKey:'074.png',gender:"", nameGa: 'Oillín', nameEn: 'little sprite, elf'}
,{spriteKey:'075.png',gender:"", nameGa: 'Oilithir', nameEn: 'pilgrim'}
,{spriteKey:'076.png',gender:"", nameGa: 'Cassán', nameEn: 'little curly-haired one'}
,{spriteKey:'077.png',gender:"", nameGa: 'Tómmán', nameEn: 'of Tuama'}
,{spriteKey:'078.png',gender:"", nameGa: 'Bairrfhionn', nameEn: 'fair-haired'}
,{spriteKey:'079.png',gender:"", nameGa: 'Ealadha', nameEn: 'art, craft'}
,{spriteKey:'080.png',gender:"f", nameGa: 'Bébhinn', nameEn: 'fair lady'}
,{spriteKey:'081.png',gender:"", nameGa: 'Sárán', nameEn: 'chief, noble, best'}
,{spriteKey:'082.png',gender:"", nameGa: 'Saoirse', nameEn: 'freedom'}
,{spriteKey:'083.png',gender:"f", nameGa: 'Ciara', nameEn: 'Dark, dark-haired, \nlittle dark one; Black.'}
,{spriteKey:'084.png',gender:"f", nameGa: 'Laoise ', nameEn: 'radience, light'}
,{spriteKey:'085.png',gender:"f", nameGa: 'Clíona', nameEn: 'goddess of love and beauty, \npatron of County Cork. Also, queen of the banshees'}
,{spriteKey:'086.png',gender:"f", nameGa: 'Úna', nameEn: "from uan 'lamb'. \nOf truth, beauty, and unity"}
,{spriteKey:'087.png',gender:"f", nameGa: 'Eithne', nameEn: 'There were at least nine Saint Eithnes'}
,{spriteKey:'088.png',gender:"m", nameGa: 'Pádraig', nameEn: 'from the Latin Patricius, \nmeaning of the patrician class'}
,{spriteKey:'089.png',gender:"m", nameGa: 'Líam', nameEn: 'strong-willed warrior '}
,{spriteKey:'090.png',gender:"", nameGa: 'Éanna', nameEn: 'birdlike'}
,{spriteKey:'091.png',gender:"", nameGa: 'Rónnad', nameEn: 'seal'}
,{spriteKey:'092.png',gender:"", nameGa: 'Neasa', nameEn: 'not gentle'}
,{spriteKey:'093.png',gender:"m", nameGa: 'Cillian', nameEn: 'church'}
,{spriteKey:'094.png',gender:"", nameGa: 'Olcán', nameEn: 'wolf'}
,{spriteKey:'095.png',gender:"", nameGa: 'Lonán', nameEn: 'blackbird'}
,{spriteKey:'096.png',gender:"", nameGa: 'Treasa', nameEn: 'strength'}
,{spriteKey:'097.png',gender:"", nameGa: 'Sárnait', nameEn: 'chief, noble, best'}
,{spriteKey:'098.png',gender:"", nameGa: 'Osnait', nameEn: 'deer'}
,{spriteKey:'099.png',gender:"", nameGa: 'Giolla-Padraig', nameEn: 'servant of Patrick'}
,{spriteKey:'110.png',gender:"f", nameGa: 'Áine', nameEn: 'Radiance, Áine, \ngoddess of Summer'}
,{spriteKey:'111.png',gender:"f", nameGa: 'Fionnghuala', nameEn: 'fair shouldered'}
,{spriteKey:'112.png',gender:"", nameGa: 'Suaibhseach', nameEn: 'gracious, kindly'}
,{spriteKey:'113.png',gender:"m", nameGa: 'Éamonn', nameEn: 'wealthy guardian'}
,{spriteKey:'114.png',gender:"", nameGa: 'Maol Mhuire', nameEn: 'servant or devotee of St. Mary'}
,{spriteKey:'115.png',gender:"", nameGa: 'Brocc', nameEn: 'sharp-faced'}
,{spriteKey:'116.png',gender:"m", nameGa: 'Domhnall', nameEn: 'world mighty'}
,{spriteKey:'117.png',gender:"", nameGa: 'Teimhnín', nameEn: 'dark-haired one'}
,{spriteKey:'118.png',gender:"", nameGa: 'Daigh', nameEn: 'flame'}
,{spriteKey:'119.png',gender:"", nameGa: 'Anamcha', nameEn: 'ambrose spirited'}
,{spriteKey:'120.png',gender:"m", nameGa: 'Mac Nisse', nameEn: 'son of Ness (goddess name)'}
,{spriteKey:'121.png',gender:"m", nameGa: 'Aimhirghin', nameEn: 'born of song'}
,{spriteKey:'122.png',gender:"f", nameGa: 'Finnseach', nameEn: 'blonde lady'}
,{spriteKey:'123.png',gender:"", nameGa: 'Íde', nameEn: 'thirsts for knowledge and goodness'}
,{spriteKey:'124.png',gender:"", nameGa: 'Tíreachán', nameEn: 'having land, wide-ruling'}
,{spriteKey:'125.png',gender:"f", nameGa: 'Grian', nameEn: 'sun-goddess'}
,{spriteKey:'126.png',gender:"", nameGa: 'Robhartach', nameEn: 'rushing, impetuous'}
,{spriteKey:'127.png',gender:"m", nameGa: 'Muireadhach', nameEn: 'lord, master'}
,{spriteKey:'128.png',gender:"m", nameGa: 'Eoghan', nameEn: 'born of the yew'}
,{spriteKey:'129.png',gender:"", nameGa: 'Comhghall', nameEn: 'fellow hostage'}
,{spriteKey:'130.png',gender:"f", nameGa: 'Sorcha', nameEn: 'bright, radiant'}
,{spriteKey:'131.png',gender:"", nameGa: 'Niallán', nameEn: 'cloud or passionate, vehement'}
,{spriteKey:'132.png',gender:"", nameGa: 'Mael Íosa', nameEn: 'servant of Jesus'}
,{spriteKey:'133.png',gender:"", nameGa: 'Treasach', nameEn: 'warlike; fierce'}
,{spriteKey:'134.png',gender:"", nameGa: 'Scannlán', nameEn: 'little trapper'}
,{spriteKey:'135.png',gender:"f", nameGa: 'Aoife', nameEn: 'beautiful, radiant'}
,{spriteKey:'136.png',gender:"m", nameGa: 'Osgar', nameEn: 'deer lover'}
,{spriteKey:'137.png',gender:"", nameGa: 'Ceallach', nameEn: 'bright headed'}
,{spriteKey:'138.png',gender:"f", nameGa: 'Dunfhlaith', nameEn: 'brown princess'}
,{spriteKey:'139.png',gender:"", nameGa: 'Uallach', nameEn: 'proud; arrogant'}
,{spriteKey:'140.png',gender:"", nameGa: 'Uainionn', nameEn: 'foam-white complexioned'}
,{spriteKey:'141.png',gender:"", nameGa: 'Searc', nameEn: 'Love, affection'}
,{spriteKey:'142.png',gender:"", nameGa: 'Cúmhaí', nameEn: 'hound of the plain'}
,{spriteKey:'143.png',gender:"f", nameGa: 'Scáthach', nameEn: 'ghostly frightening'}
,{spriteKey:'144.png',gender:"", nameGa: 'Báine', nameEn: 'paleness; whiteness'}
,{spriteKey:'145.png',gender:"f", nameGa: 'Ríona', nameEn: 'queenly'}
,{spriteKey:'146.png',gender:"", nameGa: 'Osán', nameEn: 'little deer'}
,{spriteKey:'147.png',gender:"", nameGa: 'Lachtna', nameEn: 'milk-white, milk-like'}
,{spriteKey:'148.png',gender:"", nameGa: 'Gormghiolla', nameEn: 'grey servant'}
,{spriteKey:'149.png',gender:"", nameGa: 'Mochta', nameEn: 'great'}
,{spriteKey:'150.png',gender:"", nameGa: 'Molaisse', nameEn: 'My light'}
,{spriteKey:'151.png',gender:"", nameGa: 'Lachtnán', nameEn: 'milk-white, milk-like'}
,{spriteKey:'152.png',gender:"", nameGa: 'Ailbhe', nameEn: 'rock,  white, Gaulish World King.'}
,{spriteKey:'153.png',gender:"", nameGa: 'Moinnine', nameEn: 'ninne was the first word this saint spoke'}
,{spriteKey:'154.png',gender:"", nameGa: 'Tóla', nameEn: 'abundance, flood'}
,{spriteKey:'155.png',gender:"", nameGa: 'Diarmaid', nameEn: 'without injunction or envy'}
,{spriteKey:'156.png',gender:"", nameGa: 'Liamhain', nameEn: 'comely, beautiful'}
,{spriteKey:'157.png',gender:"", nameGa: 'Muircheartach', nameEn: 'sea battler'}
,{spriteKey:'158.png',gender:"", nameGa: 'Lasair', nameEn: 'fire'}
,{spriteKey:'159.png',gender:"", nameGa: 'Teafa', nameEn: 'a place name in Co. Longford'}
,{spriteKey:'160.png',gender:"f", nameGa: 'Banbha', nameEn: 'an early goddess, also Ireland'}
,{spriteKey:'161.png',gender:"m", nameGa: 'Ánrothán', nameEn: 'sun-traveller, \nnobleman second to the king'}
,{spriteKey:'162.png',gender:"", nameGa: 'Meallá', nameEn: 'lightening'}
,{spriteKey:'163.png',gender:"", nameGa: 'Fionúir', nameEn: 'ghost, spirit'}
,{spriteKey:'164.png',gender:"", nameGa: 'Cassair', nameEn: 'curly-haired'}
,{spriteKey:'165.png',gender:"m", nameGa: 'Fearghus', nameEn: 'strength of a man'}
,{spriteKey:'166.png',gender:"m", nameGa: 'Cormac', nameEn: 'the charioteer'}
,{spriteKey:'167.png',gender:"", nameGa: 'Cathaír', nameEn: 'battle lord'}
,{spriteKey:'168.png',gender:"", nameGa: 'Giolla Chríst', nameEn: 'servant of Christ'}
,{spriteKey:'169.png',gender:"", nameGa: 'Seachlann', nameEn: 'from Latin secondus'}
,{spriteKey:'170.png',gender:"", nameGa: 'Laoidheach', nameEn: 'songful, poetic'}
,{spriteKey:'171.png',gender:"m", nameGa: 'Caoimhín', nameEn: 'beautiful birth'}
,{spriteKey:'172.png',gender:"", nameGa: 'Murchú', nameEn: 'hound of the sea'}
,{spriteKey:'173.png',gender:"", nameGa: 'Scannal', nameEn: 'quarrel, argue'}
,{spriteKey:'174.png',gender:"", nameGa: 'Oilleóg', nameEn: 'sprite, elf'}
,{spriteKey:'175.png',gender:"f", nameGa: 'Dairinn', nameEn: 'daughter of Fionn'}
,{spriteKey:'176.png',gender:"", nameGa: 'Glaisne', nameEn: 'grey, grey-blue'}
,{spriteKey:'177.png',gender:"m", nameGa: 'Feardorcha', nameEn: 'dark man'}
,{spriteKey:'178.png',gender:"m", nameGa: 'Beagán', nameEn: 'little lad'}
,{spriteKey:'179.png',gender:"", nameGa: 'Ríordán', nameEn: 'royal poet'}
,{spriteKey:'180.png',gender:"", nameGa: 'Maeleachlainn', nameEn: 'servant, devotee of St. Seachnall'}
,{spriteKey:'181.png',gender:"", nameGa: 'Dallán', nameEn: 'blind'}
,{spriteKey:'182.png',gender:"", nameGa: 'Dubhgall', nameEn: 'dark foreigner'}
,{spriteKey:'183.png',gender:"", nameGa: 'Tuileach', nameEn: 'prominent forehead'}
,{spriteKey:'184.png',gender:"", nameGa: 'Garbhán', nameEn: 'rough'}
,{spriteKey:'185.png',gender:"", nameGa: 'Dubhaltach', nameEn: 'dark-limbed, black-jointed'}
,{spriteKey:'186.png',gender:"", nameGa: 'Dáire', nameEn: 'erinn daughter of Fionn'}
,{spriteKey:'187.png',gender:"", nameGa: 'Saraid', nameEn: 'excellent, best'}
,{spriteKey:'188.png',gender:"", nameGa: 'Aodhán', nameEn: 'the God of fire \nwhose names means fire.'}
,{spriteKey:'189.png',gender:"", nameGa: 'Síomha', nameEn: 'good peace'}
,{spriteKey:'190.png',gender:"", nameGa: 'Teamhair', nameEn: 'elevated place'}
,{spriteKey:'191.png',gender:"", nameGa: 'Cian', nameEn: 'ancient'}
,{spriteKey:'192.png',gender:"m", nameGa: 'Fiachra', nameEn: 'battle-king'}
,{spriteKey:'193.png',gender:"", nameGa: 'Séadhna', nameEn: 'traveller, wayfarer'}
,{spriteKey:'194.png',gender:"", nameGa: 'Damhnait', nameEn: 'fawn'}
,{spriteKey:'195.png',gender:"m", nameGa: 'Aodh', nameEn: 'fire'}
,{spriteKey:'196.png',gender:"", nameGa: 'Naomh', nameEn: 'saint'}
,{spriteKey:'197.png',gender:"", nameGa: 'Iarlugh', nameEn: 'Iar + Lug Celtic gods'}
,{spriteKey:'198.png',gender:"", nameGa: 'Scoithín', nameEn: 'blossom, bloom'}
,{spriteKey:'199.png',gender:"", nameGa: 'Scoithniamh', nameEn: 'radiant blossom'}
,{spriteKey:'210.png',gender:"", nameGa: 'Ruarc', nameEn: 'hero, champion'}
,{spriteKey:'211.png',gender:"f", nameGa: 'Bríghid', nameEn: 'high goddess'}
,{spriteKey:'212.png',gender:"", nameGa: 'Scolaí', nameEn: 'town crier, scholar'}
,{spriteKey:'213.png',gender:"f", nameGa: 'Tuathla', nameEn: 'princess of the people'}
,{spriteKey:'214.png',gender:"", nameGa: 'Baoth', nameEn: 'vain, reckless, foolish'}
,{spriteKey:'215.png',gender:"", nameGa: 'Scoth', nameEn: 'blossom, bloom'}
,{spriteKey:'216.png',gender:"", nameGa: 'Neasán', nameEn: 'Stoat'}
,{spriteKey:'217.png',gender:"f", nameGa: 'Luiseach', nameEn: 'radiant girl'}
,{spriteKey:'218.png',gender:"", nameGa: 'Finnén', nameEn: 'fair'}
,{spriteKey:'219.png',gender:"m", nameGa: 'Ultán', nameEn: 'Ulsterman'}
,{spriteKey:'220.png',gender:"f", nameGa: 'Nárbhflaith', nameEn: 'noble princess'}
,{spriteKey:'221.png',gender:"", nameGa: 'Éanna', nameEn: 'birdlike'}
,{spriteKey:'222.png',gender:"", nameGa: 'Rónnad', nameEn: 'seal'}
,{spriteKey:'223.png',gender:"", nameGa: 'Neasa', nameEn: 'not gentle'}
,{spriteKey:'224.png',gender:"m", nameGa: 'Cillian', nameEn: 'church'}
,{spriteKey:'225.png',gender:"", nameGa: 'Olcán', nameEn: 'wolf'}
,{spriteKey:'226.png',gender:"", nameGa: 'Lonán', nameEn: 'blackbird'}
,{spriteKey:'227.png',gender:"", nameGa: 'Treasa', nameEn: 'strength'}
,{spriteKey:'228.png',gender:"", nameGa: 'Sárnait', nameEn: 'chief, noble, best'}
,{spriteKey:'229.png',gender:"", nameGa: 'Osnait', nameEn: 'deer'}
,{spriteKey:'230.png',gender:"", nameGa: 'Echna', nameEn: 'steed'}
,{spriteKey:'231.png',gender:"", nameGa: 'Seanán', nameEn: 'old, ancient'}
,{spriteKey:'232.png',gender:"", nameGa: 'Easnadh', nameEn: 'musical sound'}
,{spriteKey:'233.png',gender:"", nameGa: 'Oillill', nameEn: 'sprite, elf'}
,{spriteKey:'234.png',gender:"", nameGa: 'Uaithne', nameEn: 'greenish, from a tribal name'}
,{spriteKey:'235.png',gender:"", nameGa: 'Bardán', nameEn: 'poet, bard'}
,{spriteKey:'236.png',gender:"", nameGa: 'Síoda', nameEn: 'silk'}
,{spriteKey:'237.png',gender:"", nameGa: 'Iarfhlaith', nameEn: 'western kingdom'}
,{spriteKey:'238.png',gender:"", nameGa: 'Eirnín', nameEn: 'iron'}
,{spriteKey:'239.png',gender:"", nameGa: 'Daimhín', nameEn: 'deer or ox'}
,{spriteKey:'240.png',gender:"", nameGa: 'Fianait', nameEn: 'wild creature, deer'}
,{spriteKey:'241.png',gender:"", nameGa: 'Tanaí', nameEn: 'slender, subtle'}
,{spriteKey:'242.png',gender:"", nameGa: 'Leannán', nameEn: 'sweetheart'}
,{spriteKey:'243.png',gender:"", nameGa: 'Urard', nameEn: 'very tall'}
,{spriteKey:'244.png',gender:"", nameGa: 'Lughaidh', nameEn: 'light, brightness'}
,{spriteKey:'245.png',gender:"", nameGa: 'Iobhar', nameEn: 'yew tree'}
,{spriteKey:'246.png',gender:"", nameGa: 'Róisín', nameEn: 'Norse word for horse. \nAlso means little rose.'}
,{spriteKey:'247.png',gender:"", nameGa: 'Conn', nameEn: 'wisdom, chief'}
,{spriteKey:'248.png',gender:"", nameGa: 'Cearbhall', nameEn: 'brave in sword-fighting, \nvalorous'}
,{spriteKey:'249.png',gender:"", nameGa: 'Colmán', nameEn: "from Latin 'dove'"}
,{spriteKey:'250.png',gender:"", nameGa: 'Íonait', nameEn: 'faithful, pure, sincere'}
,{spriteKey:'251.png',gender:"", nameGa: 'Muireann', nameEn: 'sea fair'}
,{spriteKey:'252.png',gender:"f", nameGa: 'Eithne', nameEn: 'kernal or gorse'}
,{spriteKey:'253.png',gender:"m", nameGa: 'Deaglán', nameEn: 'full of goodness'}
,{spriteKey:'254.png',gender:"f", nameGa: 'Caoimhe', nameEn: 'beauty or grace'}
,{spriteKey:'255.png',gender:"", nameGa: 'Róinseach', nameEn: 'seal'}
,{spriteKey:'256.png',gender:"m", nameGa: 'Ruaidhrí', nameEn: 'red king'}
,{spriteKey:'257.png',gender:"", nameGa: 'Geiléis', nameEn: 'bright swan'}
,{spriteKey:'258.png',gender:"", nameGa: 'Miach', nameEn: 'honorable, proud'}
,{spriteKey:'259.png',gender:"", nameGa: 'Labhrás', nameEn: 'laurel bush'}
,{spriteKey:'260.png',gender:"", nameGa: 'Abbán', nameEn: 'little abbot'}
,{spriteKey:'261.png',gender:"", nameGa: 'Uaine', nameEn: 'greenish, from a tribal name'}
,{spriteKey:'262.png',gender:"", nameGa: 'Ólchobhar', nameEn: 'lover of drink'}
,{spriteKey:'263.png',gender:"", nameGa: 'Nuadha', nameEn: 'possibly, cloud-maker \nCeltic god name'}
,{spriteKey:'264.png',gender:"m", nameGa: 'Fearghal', nameEn: 'manly or valorous'}
,{spriteKey:'265.png',gender:"", nameGa: 'Rathnait', nameEn: 'grace, prosperity'}
,{spriteKey:'266.png',gender:"f", nameGa: 'Laoise', nameEn: 'girl'}
,{spriteKey:'267.png',gender:"", nameGa: 'Ailill', nameEn: 'elf'}
,{spriteKey:'268.png',gender:"", nameGa: 'Maolán', nameEn: 'warrior'}
,{spriteKey:'269.png',gender:"", nameGa: 'Líobhan', nameEn: 'beauty of women'}
,{spriteKey:'270.png',gender:"", nameGa: 'Laisrén', nameEn: 'flame'}
,{spriteKey:'271.png',gender:"", nameGa: 'Fachtna', nameEn: 'malicious, hostile'}
,{spriteKey:'272.png',gender:"", nameGa: 'Maon', nameEn: 'silent'}
,{spriteKey:'273.png',gender:"", nameGa: 'Somhairle', nameEn: 'from Norse, summer wanderer'}
,{spriteKey:'274.png',gender:"", nameGa: 'Neacht', nameEn: 'pure'}
,{spriteKey:'275.png',gender:"", nameGa: 'Buadhach', nameEn: 'Victorious'}
,{spriteKey:'276.png',gender:"m", nameGa: 'Tadhg', nameEn: 'Thaddeus, Theodosius, \nTheophilus, poet'}
,{spriteKey:'277.png',gender:"", nameGa: 'Muirín', nameEn: 'born of the sea'}
,{spriteKey:'278.png',gender:"m", nameGa: 'Niall', nameEn: 'cloud or passionate, vehement'}
,{spriteKey:'279.png',gender:"", nameGa: 'Mór', nameEn: 'great'}
,{spriteKey:'280.png',gender:"", nameGa: 'Aoibhegréine', nameEn: 'radiance of the sun'}
,{spriteKey:'281.png',gender:"m", nameGa: 'Conchobhar', nameEn: 'lover of hounds'}
,{spriteKey:'282.png',gender:"", nameGa: 'Mac Táil', nameEn: 'son of adze'}
,{spriteKey:'283.png',gender:"", nameGa: 'Rúadhán', nameEn: 'red haired'}
,{spriteKey:'284.png',gender:"", nameGa: 'Mainchín', nameEn: 'monk'}
,{spriteKey:'285.png',gender:"f", nameGa: 'Órlaith', nameEn: 'golden princess'}
,{spriteKey:'286.png',gender:"f", nameGa: 'Éabha', nameEn: 'Life'}
,{spriteKey:'287.png',gender:"f", nameGa: 'Deirdre', nameEn: 'chatterer or daughter. Deirdre of the sorrows \envy of Queens'}
,{spriteKey:'288.png',gender:"", nameGa: 'Fionnait', nameEn: 'fair-haired, white'}
,{spriteKey:'289.png',gender:"", nameGa: 'Labhraidh', nameEn: 'speaker'}
,{spriteKey:'290.png',gender:"f", nameGa: 'Brónach', nameEn: 'sorrowful'}
,{spriteKey:'291.png',gender:"", nameGa: 'Suanach', nameEn: 'drowsy'}
,{spriteKey:'292.png',gender:"", nameGa: 'Taichleach', nameEn: 'placating, peacemaking'}
,{spriteKey:'293.png',gender:"m", nameGa: 'Rónán', nameEn: 'little seal'}
,{spriteKey:'294.png',gender:"", nameGa: 'Murchadh', nameEn: 'sea battler'}
,{spriteKey:'295.png',gender:"", nameGa: 'Laoire', nameEn: 'calf-herd'}
,{spriteKey:'296.png',gender:"m", nameGa: 'Ríoghán', nameEn: 'little king'}
,{spriteKey:'297.png',gender:"f", nameGa: 'Tuilelaith', nameEn: 'lady of abundance of sovereignty'}
,{spriteKey:'298.png',gender:"m", nameGa: 'Gobnait', nameEn: 'smith'}
,{spriteKey:'299.png',gender:"m", nameGa: 'Fionntán', nameEn: 'white ancient/fire'}
,{spriteKey:'100.png',gender:"m", nameGa: 'Aonghus', nameEn: 'sole strength or true choice'}
,{spriteKey:'101.png',gender:"", nameGa: 'Áinfean', nameEn: 'storm, fury, violence'}
,{spriteKey:'102.png',gender:"", nameGa: 'Coinneach', nameEn: 'sorrowful'}
,{spriteKey:'103.png',gender:"", nameGa: 'Torcán', nameEn: 'wild boar'}
,{spriteKey:'104.png',gender:"", nameGa: 'Earnán', nameEn: 'iron'}
,{spriteKey:'105.png',gender:"m", nameGa: 'Cathal', nameEn: 'strong in battle'}
,{spriteKey:'106.png',gender:"m", nameGa: 'Gobán', nameEn: 'smith'}
,{spriteKey:'107.png',gender:"f", nameGa: 'Deirbhile', nameEn: 'daughter of a poet'}
,{spriteKey:'108.png',gender:"f", nameGa: 'Caoilfhionn', nameEn: 'fair and slender'}
,{spriteKey:'109.png',gender:"", nameGa: 'Gormlaith', nameEn: 'blue/illustrious princess'}
,{spriteKey:'200.png',gender:"", nameGa: 'Fearchar', nameEn: 'friendly'}
,{spriteKey:'201.png',gender:"", nameGa: 'Lasairfhiona', nameEn: 'flame wine'}
,{spriteKey:'202.png',gender:"", nameGa: 'Daighre', nameEn: 'flame, fire'}
,{spriteKey:'203.png',gender:"", nameGa: 'Ámhra', nameEn: 'very wonderful'}
,{spriteKey:'204.png',gender:"", nameGa: 'Séanait', nameEn: 'hawk'}
,{spriteKey:'205.png',gender:"", nameGa: 'Samhradhán', nameEn: 'summery person'}
,{spriteKey:'206.png',gender:"m", nameGa: 'Tighearnach', nameEn: 'Lord'}
,{spriteKey:'207.png',gender:"", nameGa: 'Uallgarg', nameEn: 'fierce pride'}
,{spriteKey:'208.png',gender:"f", nameGa: 'Aoibheann', nameEn: 'beautiful radiance'}
,{spriteKey:'209.png',gender:"f", nameGa: 'Muirne', nameEn: 'high spirited, festive'}
,{spriteKey:'300.png',gender:"f", nameGa: 'Líadan', nameEn: 'grey lady'}
,{spriteKey:'301.png',gender:"", nameGa: 'Órnait', nameEn: 'sallow'}
  
]

  
this.displayedChampion = JSON.parse(JSON.stringify(this.champions[0])); // Default to the first champion

this.background2 = scene.add.sprite(0, 0, 'bg1').setVisible(false).setDepth(15).setInteractive();
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
    this.nameTextGa = scene.add.text(scene.scale.width * 0.5, scene.scale.height * 0.5, 'test', {
      font: '64px aonchlo',
      fill: 'LavenderBlush',
    }).setOrigin(0.5).setAlpha(0).setDepth(900);;
       // Add text for the name
     this.nameTextEn =scene.add.text(scene.scale.width * 0.2, scene.scale.height * 0.8, '', {
      font: '32px Anaphora',
      fill: 'plum',
        stroke: '#000000', // Black stroke color
        strokeThickness: 8, 
      wordWrap: { width: 600 },
    }).setAlpha(0).setDepth(35).setVisible(true);
    
 // Set up the event listener
EventEmitter.on('stepChanged', (newStep) => {
  console.log(`ChampionSelect1 noticed step change: ${newStep}`);
  if (newStep === 3) {
    // Stop the spin and settle on the currently visible champion
    this.rotationVelocity = 0; // Set velocity to 0 to stop spinning
    this.isDragging = false;  // Ensure dragging isn't happening
    this.dampingFactor = 1;   // Remove damping to instantly stop any residual motion

    // Calculate the visible champion index based on the wheel's rotation
    const numChampions = this.champions.length;
    const rotationNormalized = this.wheel.rotation % (Math.PI * 2); // Normalize rotation to one full circle
    const championAngle = (Math.PI * 2) / numChampions; // Angle per champion
    const championIndex = Math.floor((rotationNormalized + championAngle / 2) / championAngle) % numChampions;

    // Handle negative indices (due to modulo behavior in JavaScript)
    this.currentChampionIndex = championIndex < 0 ? championIndex + numChampions : championIndex;
    this.spokeCounter =0
    // Assign the displayed champion
    this.displayedChampion = this.champions[this.currentChampionIndex];

    // Log the selected champion for debugging
    console.log("Selected Champion Data (Raw):", this.displayedChampion);

    // Deep copy the selected champion to ensure no data is lost
    const selectedChampionCopy = JSON.parse(JSON.stringify(this.displayedChampion));
    console.log("Selected Champion Data (Deep Copy):", selectedChampionCopy);

    // Stop any remaining motion and visually "snap" to the selected champion
    this.wheel.rotation = this.currentChampionIndex * championAngle;

    setTimeout(() => {
      console.log("Spinning stopped. Selecting champion...");

      if (this.displayedChampion) {
        console.log("Selected Champion Data (Final):", this.displayedChampion);
      } else {
        console.error("No champion data found for the selected index.");
      }

      // Existing logic for fading out and repositioning `nameTextGa`
      if (this.nameTextGa) {
        this.scene.tweens.add({
          targets: this.nameTextGa,
          alpha: 0, // Fade out to alpha 0
          duration: 1000, // Duration of 1 second
          ease: "Power1", // Smooth easing
          font:'32px dum1',
          onComplete: () => {
            // Change text properties (position, font size, etc.)
            this.nameTextGa.setPosition(scene.scale.width * 0.02, scene.scale.height * 0.6).setFontSize(26); // New position
            this.nameTextGa.setOrigin(0);

            // Fade in the updated text
            this.scene.tweens.add({
              targets: this.nameTextGa,
              alpha: 1, // Fade in to alpha 1
              duration: 1000, // Duration of 1 second
              ease: "Power1", // Smooth easing
              onStart: () => {
                console.log("nameTextGa is fading back in.");
              },
              onComplete: () => {
                console.log("nameTextGa fully visible.");
              },
            });
          },
        });
      } else {
        console.warn("nameTextGa is not defined yet.");
      }
    }, 100);

    // Move the champion sprite down (walking effect)
    if (this.championImage) {
      this.scene.tweens.add({
        targets: this.championImage,
        y:scene.scale.height * 0.8, // Move down 250px
        duration: 2000, // Duration of 2 seconds for walking effect
        ease: "Sine.easeInOut", // Smooth easing function
        onStart: () => {
          this.championImage.flipX =!this.championImage.flipX
          console.log("ChampionSprite started walking down.");
        },
        onComplete: () => {
          this.championImage.flipX = !this.championImage.flipX; // Flip horizontally

          console.log("ChampionSprite finished walking down.");
        },
      });
    } else {
      console.warn("championImage is not defined yet.");
    }
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
                      this.nameTextGa.setFontSize(26); // Smaller font size
                      this.nameTextGa.setPosition(scene.scale.width * 0.02, scene.scale.height * 0.6); // New position
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
  onChampionDiscovered() {
    // Make the image visible
    this.championDiscovered = true;
    this.championImage.setAlpha(1);
    if (this.scene.flair && !this.flairPlayed) {
      this.scene.flair.play();
      this.flairPlayed = true
  }
    // Emit a custom event to notify other scenes
    EventEmitter.emit('championDiscovered');
    
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
       this.onChampionDiscovered();
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
    
    // Initialize tracking variables if they don't exist
    if (this.lastHighlightedIndex === undefined) {
      this.lastHighlightedIndex = -1;
    }
    
    if (this.currentCharacterIndex === undefined) {
      this.currentCharacterIndex = 0;
    }
    
    // Only update when a spoke is touched
    if (sensorTouched && highlightedSpokeIndex !== -1) {
      // If this is our first highlight, just set the index
      if (this.lastHighlightedIndex === -1) {
        this.lastHighlightedIndex = highlightedSpokeIndex;
        this.updateCharacterDisplay(this.currentCharacterIndex);
        return;
      }
      
      // Calculate spoke movement direction and distance
      let indexDiff = highlightedSpokeIndex - this.lastHighlightedIndex;
      
      // Handle wraparound cases
      if (indexDiff > this.numSpokes / 2) {
        indexDiff = indexDiff - this.numSpokes; // Wrapped clockwise
      } else if (indexDiff < -this.numSpokes / 2) {
        indexDiff = indexDiff + this.numSpokes; // Wrapped counter-clockwise
      }
      
      // Accumulate movement
      if (!this.spokeMovementAccumulator) {
        this.spokeMovementAccumulator = 0;
      }
      
      this.spokeMovementAccumulator += indexDiff;
      
      // If accumulated enough movement (positive or negative), change character
      if (this.spokeMovementAccumulator >= 16) {
        // Move forward in the character list
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.champions.length;
        this.spokeMovementAccumulator = 0;
        this.updateCharacterDisplay(this.currentCharacterIndex);
      } else if (this.spokeMovementAccumulator <= -16) {
        // Move backward in the character list
        this.currentCharacterIndex = (this.currentCharacterIndex - 1 + this.champions.length) % this.champions.length;
        this.spokeMovementAccumulator = 0;
        this.updateCharacterDisplay(this.currentCharacterIndex);
      }
      
      // Update last highlighted index
      this.lastHighlightedIndex = highlightedSpokeIndex;
    }
  }
  
  // Extract character display logic into a separate method
  updateCharacterDisplay(characterIndex) {
    const displayedChampion = this.champions[characterIndex];
    
    this.nameTextGa.setText(displayedChampion.nameGa);
    this.nameTextEn.setText(displayedChampion.nameEn);
    
    this.displayedChampion = {
      nameGa: displayedChampion.nameGa,
      nameEn: displayedChampion.nameEn,
      gender: displayedChampion.gender,
      spriteKey: displayedChampion.spriteKey,
    };
    
    let characterSheet = {};
    characterSheet.nameGa = displayedChampion.nameGa;
    characterSheet.nameEn = displayedChampion.nameEn;
    characterSheet.gender = displayedChampion.gender;
    characterSheet.spriteKey = displayedChampion.spriteKey;
    characterSheet.strength = 10;
    characterSheet.health = 10;
    
    // Save characterSheet to local storage
    localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
    
    // Log the updated characterSheet for debugging
    console.log("Updated characterSheet and saved to local storage:", characterSheet);
    
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

export default ChampionSelect1;
