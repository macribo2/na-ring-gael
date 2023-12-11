let firstTime = true;
let avatarChosen = false;
let playerIconURL;
let heroPortrait;
	let teamLocation = '';
	let fortunaTeam = 'Na Poitigeirí';
	let fortunaTeamEng = 'Na Poitigeirí';
let teamImg;
let touched;
const beep = new Audio("./audio/20_bridge.wav" );
const beep2 = new Audio("./audio/09_select1.wav" );
const beep3 = new Audio("./audio/04_start5.wav" );
const theme = new Audio("./audio/theme.wav")
let cdMeTo;


let wrenTally;
let teamSelected= false;
var fortuna = document.getElementById("fortuna2");
	fortuna.playbackRate =1.3;
	// $(fortuna).css('display','none');
	setTimeout(function(){
		// $(fortuna).fadeIn(3000);

},1500);


let locationMatrix =[
	//Antrim
	[
		"Ceantar Reachlainn", "Dearbhóg", "Achadh Eochaille",
				"Carn Mhéabhla",
				"Carraig Fhearghais",
				"Béal Feiriste"
	],
	//Armagh
	[
		"Sráid na nAlbanach",
				"Creag Abhann",
				"Port An Dúnáin",
				"Baile Úr",
				"Baile an Mhuilinn",
				"Lios Liath"
	],
	//Carlow
	["Cill Deirge",
		"Baile Uí Mhurchú",
		"Baile Haicéid",
		"An Bhuiríos",
		"Miseal",
		"Cill Damháin"],

		//Cavan
	["Doire na Criadh",
		"An Cnoc Rua",
		"Béal Tairbirt",
		"An Dromainn",
		"Dún an Rí",
		"Lios Cré"],
		
		//Clare
	[ "Ceann Boirne",
		"Fíoch Rua",
		"An Tulach",
		"Cill Rois",
		"Leaba Ṡíoda",
		"Bun Raite"],
		
		//Cork
	["Cill na Mallach",
		"Sliabh an Nóglaigh",
		"Gleann an Phreacháin",
		"Beal na mBhláth",
		"Cionn tSáile",
		"An Sciobairín"],
	
		//Derry
	[
		"Doire",
		"Léim an Mhadaidh",
		"Droichead Fíolta",
		"Machaire Rátha",
		"An Seanmhullach",
		"Muine Mór"
	],
	
	//Co. Donegal
	["Cionn Dhún Damh",
		"Bun na hAbhann",
		"Sléibhte Dhoire Bheatha",
		"Leitir Ceanainn",
		"Bealach Féich",
		"Na Cruacha"],
		
		//co Down
	["An Lorgain",
		"Lios na gCearrbhach",
		"An Caisleán Riabhach",
		"An Mhainistir Liath",
		"Dún Pádraig",
		"Cill Chaoil"],
	//Dublin
	[	  "Fionnghlas",
		"Cluain Dolcáin",
		"Cluain Tarbh",
		"Binn Éadair",
		"Dún Laoighaire",
		"Deilginis"],
	//Fermanagh
	[
		"An Garastún",
		"Paiteagó",
		"Eadarnaidh",
		"Lios na Daróg",
		"Scriobach",
		"Inis Ceithleann"
	],
	//Galway
	[  "Poll an Phúca",
		"Cill Cais",
		"An Spidéal ",
		"An Teach Dóite",
		"An Cheathrú Rua",
		"Inis Meáin "],
	//Kerry
	[
		"Cathair Saidhbhín",
		"An Daingean",
		"Gleann na bPúcaí",
		"Sliabh Mis",
		"Na Cruacha Dubha",
		"An tSnaidhm"
	],
	//Kildare
	[
		"Cairbre",
		"Na Solláin",
		"Fiodh Alúine",
		"Maigh Nuad",
		"An Currach",
		"Léim an Bhradáin"
	],
	//Kilkenny
	[
		"Ghráinseach Chuffe",
		"Baile Mhic Andáin",
		"Bearna na Gaoithe",
		"Dún Garbháin",
		"Baile an Phoill",
		"Sliabh Rua"
	],
	//Laois
	[
		"Eiréil ",
		"Darú",
		"An Baile Fionn",
		"Baile Átha Í",
		"Cúil an tSúdaire",
		"Buiríos Mór Osraí"
	],
	//Leitrim
	[
		"Gleann Éada",
				  "Garbhach",
				  "Droim Seanbhó",
				  "Achadh na Síleann",
				  "Fíonach",
				  "Dromad"
	],
	//Limerick
	[
		"Pailis Chaonraí",
				  "Poll an Phúca",
				  "Caisleán Uí Chonaill",
				  "Áth na bFhuinseog",
				  "An Fheothanach",
				  "Brú Rí"
	],
	//Longford
	[
		"An Lios Breac",
				  "Meathais Troim",
				  "Gránard",
				  "Cluain Dá Ráth",
				  "Maigh Dumha",
				  "An Charraig Bhuí"
	],
	//Louth
	[
		"Dún Dealgan",
		"An Grianfort",
		"Ceann Chlochair",
		"Baile Átha Fhirdia",
		"Poll an Phúca",
		"Baile an Ghearlánaigh"
	],
	//Mayo
	[
		"Cill Ala",
					  "Caisleán an Bharraigh",
					  "Baile Ui Fhiacáin",
					  "An Caoláire Rua",
					  "Lios an tSamhaidh",
					  "An Éill"
	],
	//Meath
	[
		"An Uaimh",
		"Ráth Chairn",
		"Cill Bhríde",
		"Teamhair",
		"Buaile na Bréachmhaí ",
		"Tigh na Sióg"
	],
	//Monaghan
	[
		"Scairbh na gCaorach",
		"Cluain Eois",
		"Einistir Bhuithe",
		"Teach an Scotaigh",
		"Crícheán Rua",
		"Carraig Mhachaire Rois"
	],
	//Offaly
	[
		"Cluain Mhic Nóis",
		"Éadan Doire",
		"Biorra",
		"Cionn Eitigh",
		"Ráth Iomgháin",
		"Suí an Róin"
	
	],
	//Roscommon
	[
		"Cluain Fada",
		"Baile an Tobair",
		"Loch Bó Finne",
		"Scramóg",
		"Loch Bó Dearge",
		"Corr na Fola"
	],
	//Sligo
	[
	
		"Béal Átha na gCarraigíní",
		"An Mullach Mór",
		"An Chéis",
		"Gob Reachla",
		"Baile Uí Dhálaigh",
		"Tobar an Choire"
	],
	//Tipperary
	[
		"Ros Cré",
		"Durlas",
		"Faiche Ró",
		"Sliabh na mBan",
		"Cluain Meala",
		"Tigh na Naoi Míle"
	
	],

	// Tyrone
	[
		"Caisleán na Deirge",
		"Baile Mhic Gofraidh",
		"An Ómaigh",
		"An Caisleán Glas",
		"An Chorr Chríochach",
		"Dún Geanainn"
	
	],
	//Waterford
	[
		"Sléibhte an Chomaraigh",
		"An Baile Dubh",
		"Tullach an Iarainn",
		"Cluain Fhia",
		"Dún Garbhán",
		"Cill Mhíodáin"
	
	],
	// Westmeath
	
	[
		"Baile na gCailleach",
		"Ráth Fhearna",
		"An Teanga",
		"Na Colúir",
		"Cill Bheagáin",
		"An Muileann gCearr"
	]
	,
	//Wexford
	["Coill an Iarainn",
				  "Inis Córthaidh",
				  "Poll an Phúca",
				  "Maolán na nGabhar",
				  "An Abhainn Dubh",
				  "Dún Chormaic"],
	
	
	//Wicklow
	[
		"Poll an Phúca",
		"Na Clocha Liatha",
		"Siol Éalaigh",
		"Dún Ard",
		"An tInbhear Mór",
		"Abhóca"
	]
				  ];
	
	
	//gaiscí show all champions stuff:
var namesInIrish = [
`Abbán         `,
`Ádhamhnán     `,
`Ailbhe        `,
`Ailill        `,
`Aimhirghin    `,
`Ainbheartach  `,
`Áinle         `,
`Áine          `,
`Áinfean       `,
`Ámhra         `,
`Ana           `,
`Anamcha       `,
`Ánrothán      `,
`Aodh          `,
`Aodhán        `,
`Aodnait       `,
`Aoibheann     `,
`Aoibhegréine  `,
`Aoife         `,
`Aonghus       `,
`Báine         `,
`Bairrfhionn   `,
`Banbha        `,
`Bardán        `,
`Baoth         `,
`Beag          `,
`Beagán        `,
`Bébhinn       `,
`Bearach       `,
`Bláthnaid     `,
`Breacán       `,
`Breasal       `,
`Bríghid       `,
`Brion         `,
`Brocc         `,
`Brónach       `,
`Buadhach      `,
`Cairbre	      `,
`Caoilfhionn   `,
`Caoimhe       `,
`Caoimhín      `,
`Cassair       `,
`Cassán        `,
`Cathaír       `,
`Cathal        `,
`Cathán        `,
`Ceallach      `,
`Ceara         `,
`Cearbhall     `,
`Cian          `,
`Ciarán        `,
`Cillian       `,
`Colmán        `,
`Comhghall     `,
`Conall        `,
`Conán         `,
`Conchobhar    `,
`Conlaodh      `,
`Conn          `,
`Cormac        `,
`Coinneach     `,
`Cuán          `,
`Cúmhaí        `,
`Curnán        `,
`Daigh         `,
`Daighre       `,
`Daimhín       `,
`Dáire         `,
`Dallán        `,
`Damhnait      `,
`Deaglán       `,
`Dearbhail     `,
`Deirbhile     `,
`Deirdre       `,
`Deasmumhnaċ  `,
`Diarmaid      `,
`Dairinn       `,
`Domhnall      `,
`Donnchadh     `,
`Dunfhlaith    `,
`Dubhaltach    `,
`Dubhgall      `,
`Dubhghlas     `,
`Eadan         `,
`Éabha`,
`Ealadha       `,
`Easnadh       `,
`Eibhear       `,
`Éile          `,
`Éirne         `,
`Éamonn        `,
`Éanna         `,
`Earnán        `,
`Éibhleann     `,
`Echna         `,
`Éimhín        `,
`Eirnín        `,
`Eithne        `,
`Émer          `,
`Eoghan        `,
`Étaín         `,
`Fachtna       `,
`Fainche       `,
`Faolán        `,
`Fearchar      `,
`Feardorcha    `,
`Fearghal      `,
`Fearghus      `,
`Fechín        `,
`Feidhelm      `,
`Feidhlim      `,
`Feme          `,
`Féthnaid      `,
`Fiachra       `,
`Fial  		   (m)`,
`Fianait       `,
`Finnén        `,
`Finnseach     `,
`Fionn         `,
`Fionnait      `,
`Fionúir       `,
`Fionnbharr    `,
`Fionnghuala   `,
`Fionntán      `,
`Flann         `,
`Garbhán       `,
`Geiléis       `,
`Gilleagán     `,
`Giolla Chríst `,
`Glaisne       `,
`Gobán         `,
`Gobnait       `,
`Gormán        `,
`Gormghiolla   `,
`Gormlaith     `,
`Gráinne       `,
`Grian         `,
`Iarfhlaith    `,
`Iarlugh       `,
`Íde           `,
`Iobhar        `,
`Iomchadh      `,
`Íonait        `,
`Irial         `,
`Labhraidh     `,
`Labhrás       `,
`Lachtna       `,
`Lachtnán      `,
`Laisrén       `,
`Laoidheach    `,
`Laoire        `,
`Laoise        `,
`Lasair        `,
`Lasairfhiona  `,
`Leannán       `,
`Líadan        `,
`Liamhain      `,
`Life          `,
`Líobhan       `,
`Lochlann      `,
`Lomán         `,
`Lonán         `,
`Lorcán        `,
`Lughaidh      `,
`Luiseach      `,
`Mac Nisse     `,
`Mac Táil      `,
`Maeleachlainn `,
`Mainchín      `,
`Maine         `,
`Mael Íosa     `,
`Maolán        `,
`Maol Mhuire   `,
`Maon          `,
`Marcán        `,
`Marga         `,
`Meadhbh       `,
`Meallán       `,
`Meallá        `,
`Mel           `,
`Miach         `,
`Mochta        `,
`Moinnine      `,
`Móirne        `,
`Molaisse      `,
`Moncha        `,
`Mór           `,
`Morann        `,
`Muadhnait     `,
`Muircheartach `,
`Muireann      `,
`Muireadhach   `,
`Muirín        `,
`Muirgheal     `,
`Muirne        `,
`Murchadh      `,
`Murchú        `,
`Naithí        `,
`Naoise        `,
`Naomh         `,
`Naomhán       `,
`Nárbhflaith   `,
`Neacht        `,
`Neamhain      `,
`Neasa         `,
`Neasán        `,
`Niall         `,
`Niallán       `,
`Niamh         `,
`Nuadha        `,
`Nuala         `,
`Odhrán        `,
`Ógán		   (m)	O`,
`Oilithir      `,
`Oilleóg 	   (m`,
`Oillill 	   (m`,
`Oillín        `,
`Oisín         `,
`Olcán         `,
`Ólchobhar     `,
`Onchú         `,
`Órlaith       `,
`Órnait        `,
`Orthanach     `,
`Osán          `,
`Osgar         `,
`Osnait        `,
`Rathnait      `,
`Ríofach       `,
`Ríoghán       `,
`Ríona         `,
`Ríordán       `,
`Robhartach    `,
`Róinseach     `,
`Róisín        `,
`Rónán         `,
`Rónnad        `,
`Rós           `,
`Ross          `,
`Rúadhán       `,
`Rúadhnait     `,
`Ruaidhrí      `,
`Ruarc         `,
`Sadhbh        `,
`Samhradhán    `,
`Saorla        `,
`Saraid        `,
`Sárán         `,
`Sárnait       `,
`Scannal       `,
`Scannlán      `,
`Scáthach      `,
`Scoithín      `,
`Scoithniamh   `,
`Scolaí        `,
`Scoth         `,
`Scothnait     `,
`Sé            `,
`Seachlann     `,
`Séadhna       `,
`Séanait       `,
`Seanán        `,
`Seanchán      `,
`Searc         `,
`Séighín       `,
`Síoda         `,
`Siollán       `,
`Síomha        `,
`Sláine        `,
`Sléibhín      `,
`Somhairle     `,
`Sorcha        `,
`Suaibhseach   `,
`Suanach       `,
`Suibhne       `,
`Tadhg         `,
`Taichleach    `,
`Taillte       `,
`Tanaí         `,
`Tassach       `,
`Teafa         `,
`Teamhair      `,
`Téide         `,
`Teimhnín      `,
`Tighearnach   `,
`Tighearnán    `,
`Tiobraide     `,
`Tíreachán     `,
`Toirdhealbhach`,
`Tóla          `,
`Tomaltach     `,
`Tómmán	      `, 
`Torcán        `,
`Torna         `,
`Treasa        `,
`Treasach      `,
`Tuama         `,
`Tuamnait      `,
`Tuathal       `,
`Tuathla       `,
`Tuileach      `,
`Tuilelaith    `,
`Uaine         `,
`Uainionn      `,
`Uaine         `,
`Uasal         `,
`Uaithne       `,
`Uallach       `,
`Uallachán     `,
`Uallgarg      `,
`Ultán         `,
`Úna           `,
`Urard         `
];

namesInEnglish = [


`little abbot
`,`the timorous one
`,`rock,  white, Gaulish World King.
`,`elf
`,`born of song
`,`doer of evil deeds
`,`hero, champion, warrior
`,`delight, pleasure
`,`storm, fury, violence
`,`very wonderful
`,`wealth or abundance
`,`ambrose spirited
`,`sun-traveller, nobleman second to the king
`,`fire
`,`the God of fire whose names means fire.
`,`God of Fire
`,`beautiful radiance
`,`radiance of the sun
`,`beautiful, radiant
`,`sole strength or true choice
`,`paleness; whiteness
`,`fair-haired
`,`an early goddess, also Ireland
`,`poet, bard
`,`vain, reckless, foolish
`,`small
`,`little lad
`,`fair lady
`,`pointed
`,`little flower
`,`freckled, speckled
`,`brave or strong in conflict
`,`high goddess
`,`noble or high
`,`sharp-faced
`,`sorrowful
`,`Victorious
`,`charioteer or bearer
`,`fair and slender
`,`beauty or grace
`,`beautiful birth
`,`curly-haired
`,`little curly-haired one
`,`battle lord
`,`strong in battle
`,`battler
`,`bright headed
`,`fiery red
`,`brave in sword-fighting, valorous
`,`ancient
`,`black
`,`church
`,`from Latin 'dove'
`,`fellow hostage
`,`strong as a wolf
`,`wolf
`,`lover of hounds
`,`prudent fire
`,`wisdom, chief
`,`the charioteer
`,`sorrowful
`,`diminutive of Cu, meaning hound
`,`hound of the plain
`,`Curnan
`,`flame
`,`flame, fire
`,`deer or ox
`,`erinn daughter of Fionn
`,`blind
`,`fawn
`,`full of goodness
`,`Daughter of Fál (Ireland)
`,`daughter of a poet
`,`chatterer or der- meaning daughter
`,`man from Desmond (Co. Cork)
`,`without injunction or envy
`,`daughter of Fionn
`,`world mighty
`,`Dionysus	brown lord
`,`brown princess
`,`dark-limbed, black-jointed
`,`dark foreigner
`,`blue black
`,`Etan
`,`Life
`,`art || craft
`,`musical sound
`,`Heber, Harry, Ivor	
`,`yeh?
`,`nyeh	Erne?
`,`wealthy guardian
`,`birdlike
`,`Ernest iron
`,`beauty; radiance
`,`steed
`,`Evin; Aeveen; Éimíne	prompt; ready
`,`iron
`,`kernal or gorse
`,`Éimear; Éimer	??
`,`born of the yew
`,`jealousy
`,`malicious, hostile
`,`Fanny
`,`wolf
`,`friendly
`,`Frederick, Ferdinand	dark man
`,`manly or valorous
`,`strength of a man
`,`raven or battle
`,`Fidelma; Fedelm	
`,`Felix, Phillip	
`,`young woman; girl
`,`Féthnat
`,`battle-king
`,`modest; honorable; generous
`,`wild creature; deer
`,`Finnian	fair
`,`blonde lady
`,`fair; white
`,`fair-haired; white
`,`Fionnabair	ghost, spirit
`,`fair haired
`,`fair shouldered
`,`white ancient/fire
`,`fiery red
`,`rough
`,`bright swan
`,`little lad
`,`servant of Christ
`,`grey, grey-blue
`,`Gobbán	smith
`,`smith
`,`Gorman	dark; swarthy
`,`grey servant
`,`blue/illustrious princess
`,`inspiring terror; grain
`,`sun-goddess
`,`western kingdom
`,`Iar + Lug (Celtic god names)
`,`act of eating
`,`yew tree
`,`Imchad	
`,`faithful; pure; sincere
`,`Irél	
`,`speaker
`,`laurel bush
`,`milk-white, milk-like
`,`milk-white, milk-like
`,`flame
`,`songful; poetic
`,`calf-herd
`,`girl
`,`fire
`,`flame wine
`,`sweetheart
`,`grey lady
`,`comely, beautiful
`,`?
`,`beauty of women
`,`a Viking
`,`bare
`,`blackbird
`,`Lorccán	cruel or fierce
`,`Aloysius, Lewy	light; brightness
`,`Luisech, Lucy	radiant girl
`,`son of Ness (goddess name)
`,`son of adze
`,`servant || devotee of St. Seachnall
`,`monk
`,`Many
`,`servant of Jesus
`,`Mullen	warrior
`,`servant or devotee of St. Mary
`,`silent
`,`steed
`,`?
`,`she who intoxicates
`,`lightening
`,`Mella	lightening
`,`?
`,`honorable; proud
`,`great
`,`ninne- ninne was the first word this saint spoke
`,`Maud	great
`,`Molaise	pet from of Laisrén
`,`after Macha, goddess of Sovereignty
`,`Agatha	great
`,`Morand	
`,`noble, good
`,` sea battler
`,` sea fair
`,` lord; master
`,` born of the sea
`,` sea-bright/ sea-white
`,` high spirited; festive
`,`	sea battler
`,`hound of the sea
`,`Nathy	?
`,`Noah	bond?
`,`saint
`,`of Naomh (saint)
`,`noble princess
`,`pure
`,`battle-fury; warlike frenzy: name of a Celtic war goddess
`,`not gentle
`,`Stoat
`,`cloud or passionate; vehement
`,`cloud or passionate; vehement
`,`brightness; radiance
`,`possibly, cloud-maker: Celtic god name
`,`short of Fionnuala (white shoulders)
`,`sallow
`,`lad
`,`pilgrim
`,`sprite, elf
`,`sprite, elf
`,`little sprite, elf
`,`Oissíne	little deer
`,`wolf
`,`lover of drink
`,`fierce hound
`,`golden princess
`,`sallow
`,`potent in prayers or charms
`,`little deer
`,`deer lover
`,`	deer
`,`grace; prosperity
`,`?
`,`little king
`,`queenly
`,`	royal poet
`,`	rushing; impetuous
`,`seal
`,` Norse word for horse. Also means little rose.
`,` little seal
`,`seal
`,`rose | horse
`,`	headland
`,`red haired
`,`red-haired
`,`red king
`,`hero; champion
`,`sweet, goodly
`,`summery person
`,`noble queen
`,`excellent, best
`,`chief, noble, best
`,`chief, noble, best
`,`quarrel, argue
`,`diminutive of Scannal
`,`ghostly frightening
`,`blossom, bloom
`,`radiant blossom
`,`town crier, scholar
`,`blossom, bloom
`,`blossom, bloom
`,`Shay, Shea	hawk-like, noble
`,`Seachnall	from Latin secondus
`,` Sidney	traveller; wayfarer
`,`	Ségnat	hawk
`,`	Senan	old, ancient
`,`	Shanahan	old, ancient
`,`Love; affection
`,`SHANE	Séigíne	hawk
`,`Sheedy	possibly derived from the word for silk
`,`Sillán	?
`,`eeva, Síomhaith	good peace
`,`SLAWN ya	Slaney, Slanina	health, from a Celtic goddess name
`,`Slébíne, Slevin	mountain man
`,`Sorley, Samuel, Charles	from Norse, summer wanderer
`,`Sally	bright, radiant
`,`gracious; kindly	
`,`drowsy
`,`well-going
`,`Tadc, Tadg, Tad, Thaddeus, Theodosius, Theophilus, Tim	poet
`,`placating, peacemaking
`,`Tailltiu	?
`,`slender, subtle
`,`idle; inactive
`,`a place name in Co. Longford
`,`elevated place
`,`wantonness
`,`dark-haired one
`,`Lord
`,`Lord
`,`Tipraite	 
`,`	Tírechán having land; wide-ruling
`,`  a lakh	Turlough, Tairdelbach, Charles	abettor
`,`abundance, flood
`,`Thomas, Timothy	?
`,`of Tuama
`,` K awn	Torccán	wild boar
`,`  na	-	puffed-up?
`,`  sa	Tressa, Trása, Teresa	strength
`,` S ach	Tressach, Tracy	warlike; fierce
`,` ?
`,` fem. of Tómmán
`,` Tully	ruler of the people
`,` Tuala,	princess of the people
`,` prominent forehead
`,` Twilleliah,	lady of abundance of sovereignty
`,` `,`foam-white complexioned
`,` greenish, from a tribal name
`,` `,`greenish, from a tribal name
`,` proud; arrogant
`,` Hoolihan	little proud; arrogant one
`,` fierce pride
`,`	Ultan	Ulsterman
`,` Oona, Oonagh, Agnes, Winifred, Winnie, Juno	
`,` very tall`

];

var stage = document.querySelector("#stage");

//The fgame map 

var map =[
	[`59`,`3`,`52`,`49`,`28`,`7`,`23`,`47`,`22`,`.`,`36`,`.`,`37`,`.`,`16`,`19`,`.`,`56`,`55`,`.`,`53`,`6`,`27`,`.`,`.`,`33`,`10`,],
	
	[`57`,`54`,`50`,`9`,`12`,`.`,`15`,`.`,`.`,`4`,`.`,`.`,`2`,``,`1`,`.`,`29`,`.`,`.`,`30`,`13`,`.`,`21`,`43`,`18`,`.`,`20`,`.`]
		
	]
	
	let idCounter = 0
	//Map code 
	var grass = `.`;
	var a1= `1`;
	var a2= `2`;
	var a3= `3`;
	var a4= `4`;
	var a5= `5`;
	var a6= `6`;
	var a7= `7`;
	var a8= `8`;
	var a9= `9`;
	var a10= `10`;
	var a11= `11`;
	var a12= `12`;
	var a13= `13`;
	var a14= `14`;
	var a15= `15`;
	var a16= `16`;
	var a17= `17`;
	var a18= `18`;
	var a19= `19`;
	var a20= `20`;
	var a21= `21`;
	var a22= `22`;
	var a23= `23`;
	var a24= `24`;
	var a25= `25`;
	var a26= `26`;
	var a27= `27`;
	var a28= `28`;
	var a29= `29`;
	var a30= `30`;
	var a31= `31`;
	var a32= `32`;
	var a33= `33`;
	var a34= `34`;
	var a35= `35`;
	var a36= `36`;
	var a37= `37`;
	var a38= `38`;
	var a39= `39`;
	var a40= `40`;
	var a41= `41`;
	var a42= `42`;
	var a43= `43`;
	var a44= `44`;
	var a45= `45`;
	var a46= `46`;
	var a47= `47`;
	var a48= `48`;
	var a49= `49`;
	var a50= `50`;
	var a51= `51`;
	var a52= `52`;
	var a53= `53`;
	var a54= `54`;
	var a55= `55`;
	var a56= `56`;
	var a57= `57`;
	var a58= `58`;
	var a59= `59`;

	
	//The size of each cell 
	var SIZE = 64;
	//The number of rows and columns 
	var ROWS = map.length;
	var COLUMNS = map[0].length;

//fade in linux keyboard

setTimeout(function(){
	
	
	$(function () {
		$("#linucs-gifs").animate({
			top: "-=48px"

		}, { duration: 200, queue: false });
	
		$("#prompt").animate({
			top: "-=48px"
		}, { duration: 200, queue: false });
	});

	$('#linucs-gifs').fadeOut(10000);
	

	$('#linucs-keyboard').fadeIn(12000)
},8000)

setTimeout(function(){
		
	$('#prompt').fadeIn();

	
},4500)

let currentLocation = locationMatrix[31][2];
render();
console.log(currentLocation+"********")
	function render() {

		let stageLeft=320;
		let stageTop=200;
		var intervalId = window.setInterval(function(){
			/// call your function here
				$("#stage").animate({left:"+=20px"},0)
// 
let stagePos = $('#stage').position()
console.log('position'+stagePos.left)
if(stagePos.left>=740){

	$('#stage').css('left','-1890px')
}

// } 
		
		},1600 	)


		//Render the game by looping through the map arrays
		for (var row = 0; row < ROWS; row++) {
			for (var column = 0; column < COLUMNS; column++) {

				//Create a img tag called cell
				var cell = document.createElement("img");
idCounter ++;
				//Set it's CSS class to "cell"
				cell.setAttribute("class", "cell");
				cell.setAttribute("id", idCounter);

				//Add the img tag to the <div id="stage"> tag
				stage.appendChild(cell);

				//Find the correct image for this map cell
				switch (map[row][column]) {
					case grass: cell.src = "./images/champions/empty.png";
						break;
            case a1: cell.src = "./images/champions/1.png";
						break;
            case a2: cell.src = "./images/champions/2.png";
						break;
            case a3: cell.src = "./images/champions/3.png";
						break;
            case a4: cell.src = "./images/champions/4.png";
						break;
            case a5: cell.src = "./images/champions/5.png";
						break;
            case a6: cell.src = "./images/champions/6.png";
						break;
            case a7: cell.src = "./images/champions/7.png";
						break;
            case a8: cell.src = "./images/champions/8.png";
						break;
            case a9: cell.src = "./images/champions/9.png";
						break;
            case a10: cell.src = "./images/champions/10.png";
						break;
            case a11: cell.src = "./images/champions/11.png";
						break;
            case a12: cell.src = "./images/champions/12.png";
						break;
            case a13: cell.src = "./images/champions/13.png";
						break;
            case a14: cell.src = "./images/champions/14.png";
						break;
            case a15: cell.src = "./images/champions/15.png";
						break;
            case a16: cell.src = "./images/champions/16.png";
						break;
            case a17: cell.src = "./images/champions/17.png";
						break;
            case a18: cell.src = "./images/champions/18.png";
						break;
            case a19: cell.src = "./images/champions/19.png";
						break;
            case a20: cell.src = "./images/champions/20.png";
						break;
            case a21: cell.src = "./images/champions/21.png";
						break;
            case a22: cell.src = "./images/champions/22.png";
						break;
            case a23: cell.src = "./images/champions/23.png";
						break;
            case a24: cell.src = "./images/champions/24.png";
						break;
            case a25: cell.src = "./images/champions/25.png";
						break;
            case a26: cell.src = "./images/champions/26.png";
						break;
            case a27: cell.src = "./images/champions/27.png";
						break;
            case a28: cell.src = "./images/champions/28.png";
						break;
            case a29: cell.src = "./images/champions/29.png";
						break;
            case a30: cell.src = "./images/champions/30.png";
						break;
            case a31: cell.src = "./images/champions/31.png";
						break;
            case a32: cell.src = "./images/champions/32.png";
						break;
            case a33: cell.src = "./images/champions/33.png";
						break;
            case a34: cell.src = "./images/champions/34.png";
						break;
            case a35: cell.src = "./images/champions/35.png";
						break;
            case a36: cell.src = "./images/champions/36.png";
						break;
            case a37: cell.src = "./images/champions/37.png";
						break;
            case a38: cell.src = "./images/champions/38.png";
						break;v
            case a39: cell.src = "./images/champions/39.png";
						break;
            case a40: cell.src = "./images/champions/40.png";
						break;
            case a41: cell.src = "./images/champions/41.png";
						break;
            case a42: cell.src = "./images/champions/2.png";
						break;
            case a43: cell.src = "./images/champions/43.png";

						break;
            case a44: cell.src = "./images/champions/44.png";

						break;
            case a45: cell.src = "./images/champions/45.png";
						break;
            case a46: cell.src = "./images/champions/46.png";
						break;
            case a47: cell.src = "./images/champions/47.png";
						break;
            case a48: cell.src = "./images/champions/48.png";
						break;
            case a49: cell.src = "./images/champions/49.png";
						break;
            case a50: cell.src = "./images/champions/50.png";
						break;
            case a51: cell.src = "./images/champions/51.png";
						break;
            case a52: cell.src = "./images/champions/52.png";
						break;
            case a53: cell.src = "./images/champions/53.png";
						break;
            case a54: cell.src = "./images/champions/54.png";
						break;
            case a55: cell.src = "./images/champions/55.png";
						break;
            case a56: cell.src = "./images/champions/56.png";
						break;
            case a57: cell.src = "./images/champions/57.png";
						break;
            case a58: cell.src = "./images/champions/58.png";
						break;
            case a59: cell.src = "./images/champions/59.png";
        					
				}

				cell.style.top = row * SIZE + "px"; cell.style.left = column * SIZE + "px";


			}
//ls stuff
const beep3 = new Audio("./audio/09_select1.wav" );
const beep4 = new Audio("./audio/04_start5.wav" );

const beep1 = new Audio("./audio/1b.wav" )
// const beep2 = new Audio("./audio/2b.wav" )

ls = ()=>{

	$('#bright-light').css('display','block');
	$('#bright-light').fadeOut(8000);
	$('#gamepad').fadeIn();

	$('#linucs-keyboard').animate({
		opacity: 0,
		}, 1000, function() {
			// complete
	});

	beep2.play();	

$("#prompt").fadeOut();
setTimeout(function(){

		$('#dialogue0').html(`
		<ul class="console-text"><li></li>
<li>	</li></ul>`)

		$('.console-text').fadeIn();
		$('#dialogue0').fadeIn();
		$('#wren-holder').fadeTo(1000, 0.3);
		$("#you-see").animate({
			top: "-=48px"

		});
	
		
},6000)

setTimeout(function(){


	$(function () {
		$(".console-text").animate({
			top: "-=38px"
	
		}, { duration: 200, queue: false });
	
		$("#console").animate({
			top: "-=48px"
		}, { duration: 200, queue: false });
	});

	
},6500)

wrenTally++;
setTimeout(function(){
	$('#console').html(`<img class="output-gif" src="./images/places-wicklow.gif"/>`);
},9000)	

setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon1').fadeIn()
},8000)
setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon2').fadeIn()
},10000)
setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon3').fadeIn()
},12400)
setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon4').fadeIn()
},13500)
setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon5').fadeIn()
},15000)
setTimeout(function(){
	// $('#console').fadeTo(4000, 0.3);
$('#minimap-icon6').fadeIn()
},16000)


$('#console').html(`<div>   
   
<img id="you-see" src="./images/you-see.gif"/>
<br/>



</div>

`)

console.log('hi ó Wren')
// $('#wrenfield').fadeIn();
// $('#wren-bg0').fadeIn();
$('#wren-hood').fadeIn();
$('#wren-holder').fadeIn();
// $('#wren-holder').css('animation','wren-zoom 10s  forwards ease-out;')

}
let currentSelect = 0;

function highlightIrish(updateNo){

		if (updateNo ===0){

			$('.quote-marks').html(`\"`);
			$('.quote-marks-close').html(`\"`);
		
			$('.quote-marks').css("top","43px");
			$('.quote-marks').css("left","3px");
			$('.quote-marks-close').css("top","43px");
			$('.quote-marks-close').css("left","102px");

		}
			if (updateNo ===1){
				$('.quote-marks').html(`\"`);
				$('.quote-marks-close').html(`\"`);
		
				$('.quote-marks').css("top","70px");
				$('.quote-marks').css("left","3px");
				$('.quote-marks-close').css("top","70px");
				$('.quote-marks-close').css("left","240px");
			}
				if (updateNo ===2){

					$('.quote-marks').html(`\"`);
					$('.quote-marks-close').html(`\"`);
		
					$('.quote-marks').css("top","93px");
					$('.quote-marks').css("left","3px");
					$('.quote-marks-close').css("top","93px");
					$('.quote-marks-close').css("left","120px");
				}
				if (updateNo ===3){

					$('.quote-marks').html(`\"`);
					$('.quote-marks-close').html(`\"`);
		
					$('.quote-marks').css("top","118px");
					$('.quote-marks').css("left","3px");
					$('.quote-marks-close').css("top","118px");
					$('.quote-marks-close').css("left","254px");
				}
							if (updateNo ===4){
		
								$('.quote-marks').html(`\"`);
								$('.quote-marks-close').html(`\"`);
		
								$('.quote-marks').css("top","144px");
								$('.quote-marks').css("left","3px");
								$('.quote-marks-close').css("top","144px");
			$('.quote-marks-close').css("left","208px");
							}					


							if (updateNo ===5){
		
								$('.quote-marks').html(`\"`);
								$('.quote-marks-close').html(`\"`);
		
								$('.quote-marks').css("top","168px");
								$('.quote-marks').css("left","3px");
								$('.quote-marks-close').css("top","168px");
								$('.quote-marks-close').css("left","194px");
							}					
}

function updateEng(updateNo){

if (updateNo ===0){
$('.minimap-icon').removeClass('minimap-icon-highlight')
$('#minimap-icon1').addClass('minimap-icon-highlight')

	$('.wren-text').html(``);

	$('.wren-text').html(`
	<p id="p1">
		from Oboka,  a river in Ptolemy's Geography.
	</p>
	
	`)
}
if (updateNo ===1){
	$('.minimap-icon').removeClass('minimap-icon-highlight')
	$('#minimap-icon2').addClass('minimap-icon-highlight')
	
	$('.wren-text').html(``);
	$('.wren-text').append(`<p id="p2">
	the great estuary
   </p>`)
	
}
	if (updateNo ===2){
		$('.minimap-icon').removeClass('minimap-icon-highlight')
$('#minimap-icon3').addClass('minimap-icon-highlight')

	$('.wren-text').html(``);
	
	$('.wren-text').append(`<p id="p3">
	high fortress
</p>`)			

	}
		if (updateNo ===3){
			$('.minimap-icon').removeClass('minimap-icon-highlight')
$('#minimap-icon4').addClass('minimap-icon-highlight')

			$('.wren-text').html(``);

	
			$('.wren-text').append(`<p id="p4">
			the grey stones
		   </p>`)			
		}
			if (updateNo ===4){
				$('.minimap-icon').removeClass('minimap-icon-highlight')
				$('#minimap-icon5').addClass('minimap-icon-highlight')
				
	$('.wren-text').html(``);


	$('.wren-text').append(`<p id="p5">	
	from "pooka" a fairy; sprite; hobgoblin;</p>`);
	setTimeout(() => {
		$('.wren-text').append(`<p id="p6">and "poll" a pit, a hole; mire, mud, dirt</p>`)}, 1200);
			}
					if (updateNo ===5){
						$('.minimap-icon').removeClass('minimap-icon-highlight')
$('#minimap-icon6').addClass('minimap-icon-highlight')

						$('.wren-text').html(``);

		$('.wren-text').append(`<p id="p7">
		a wooden walking stick and club or cudgel 
	
		typically stout blackthorn. </p>
	`);	


					}


		
		


}
//set up directional pad functionality
$('.grid-item2').on('touchend', function () {
	$('.grid-item2').fadeTo(100,0.3).fadeTo(500,1);
	currentSelect--
	if (currentSelect>=6 ){currentSelect = 0}
	if (currentSelect<0 ){currentSelect = 5}
	beep2.play();

	cdMeTo=`Poll an Phúca`;
updateEng(currentSelect)
highlightIrish(currentSelect)

})

$('.grid-item8').on('touchend', function () {
	$('.grid-item8').fadeTo(100,0.3).fadeTo(500,1);
	currentSelect++
	if (currentSelect>=6 ){currentSelect = 0}
	if (currentSelect<0 ){currentSelect = 5}
	beep2.play();

	cdMeTo=`Poll an Phúca`;
updateEng(currentSelect)
highlightIrish(currentSelect)

})
	console.log(currentSelect + "current select")	

$('#cd').on('touchend click', function () {

	beep2.play();
$('#linucs-keyboard').fadeOut();
$('#keyboard-container').fadeIn();
setTimeout(function(){
$('#output').html('cd '+cdMeTo)



},1000)
$('#bright-light-county').css('display','block');
$('#bright-light-county').fadeOut(8000);


});
$('#a').on('touchend click',function(){
	console.log('a');
	$('.prompt-box').fadeIn();



})


$('#las').on('touchend click', function () {

	$('#linucs-keyboard').fadeOut();
	// $('#baile').fadeIn();
ls('baile');
	// $('#prompt').fadeOut();

	setTimeout(function(){
		$('#output').empty();
},2000)

// $('#linucs-gifs').css('top','4px');
	setTimeout(function(){
		$('#you-see').fadeTo(0.3);

},5000)

setTimeout(function(){
	$('#gamepad').animate({"left":"580px"});

},14000)



})


$('#pwd').on('touchend click', function(){

	$('#linucs-keyboard').fadeOut();
	
	$('#console').html(`
	<br/>
	<h4 class="console-text">
	
	
	</h4>`)
	$('.wren-text').html(``);


	$('#console').fadeIn();
	

	// getRandLocation();
})

			function goToChar(charId) {

				$('#all-champions').fadeOut();

				// $('#pathVideo').fadeOut();
				setTimeout(() => {

					currentChamp = charId;
					updateChamp()
					haveWeStartedYet = true;



					$('#ceist').css('opacity', 1);
					registrationMenuOpen = true;
					$('#nav-right').fadeOut();
					$('#ainm').html(randomNames[Math.floor(Math.random() * randomNames.length)])
				}, 250)
				champ = champions[charId];
				$('#i-am-not-btn').fadeIn();
				$('#i-am-btn').animate({ left: "4%" })
				$('.blurb').fadeIn();


				// $('#hero').fadeOut();
				// $('#source').attr('src', './fís/nuFortuna3.mp4');
				// $('#ainm').val('rando');
				$('#ainm').on('touchend', function () {
					$('#ainm').html('')
					showKeyboard = true;

					$('.holdem').fadeIn();
				});

				// $('#hero-target').css('background-image', champ.targetCircle);
				$('#i-am-btn').css("background-image", 'url(./img/playerFrame6.png)');
				// $('#i-am-btn').fadeTo(1, "slow");
				// $('#i-am-not-btn').fadeIn()

				$('.nav-right').fadeOut()
				$('#sub-title').html(champ.classEng);
				setTimeout(function () {

					$("#hero").fadeIn();
				}, 300)

				// $('#i-am-not-btn')
				// .css('background-image', '../playerFrame6')

			}
			$('.cell').on('touchend click', function () {
				if(this.src.includes('empty')){
					
				}
				else{
					//set player-icon to this cell's image.
					beep2.play();
		// 			if(theme.paused){
		// theme.play();
	
	// }

		$("#fortuna-lit").fadeIn(300)	
		$('#fortuna-bg').fadeIn();
	

			setTimeout(
				function(){
			$('#fortuna-lit').fadeOut(1000)
				}, 50);
					$('.cell').fadeIn()
					console.log(this.src)


					$(this).css("border","1px solid white");
					$(this).css("backgroundColor","rgba(00,50,150,0.5)");
				$('.cell').removeClass('chosen')
				$(this).addClass('chosen')
				// $(this).css("borderRadius","50%");
				setTimeout(function(){
					$('.cell').css("backgroundColor","rgba(00,50,150,0)");

					$('.cell').css("border","none");
				},1000)

				// $(this).fadeOut();
				// $('#all-champions').fadeOut();
				let touched = this.src;
				console.log(this.id)
				console.log(namesInIrish[this.id])
				console.log(namesInEnglish[this.id])
				heroPortrait = this.src;
				playerIconURL = `url('`+ heroPortrait +`')`
		// $('#player-icon').css('backgroundImage',playerIconURL);

		// $('#player-icon').css('backgroundImage',"url('./images/champions/'+this.id	+'.png')");
		console.log("hero"+heroPortrait)
		
				
				$('#nameInEng').html("");
					$('#nameInIre').html("")
					tempIrishName=namesInIrish[this.id]
					tempEnglishName=namesInEnglish[this.id]
					$('#nameInEng').html(namesInEnglish[this.id]);
					$('#nameInIre').html(namesInIrish[this.id])
					$('#nameInEng').fadeIn();

		$('#fortuna-glass').fadeIn(1000);

	}})
		}
	
	
	
	
	}



	setTimeout(function () {
		haveWeStartedYet = false;
		$('#all-champions').fadeIn().css('display', 'grid');
		$('#i-am-btn').fadeIn();

	}, 500)


setTimeout(function(){
	$('#main-text').fadeIn(2000, 'swing');

},200);

setTimeout(function(){
	$('#next-text').fadeIn(3000, 'swing');

},2000);
$(document).ready(function () {
		let pausedFortuna = false;

if(pausedFortuna){
	
			$('#oFortuna2').get(0).pause();
}
togglePausedFortuna= () =>{
	if(pausedFortuna){
		pausedFortuna= !pausedFortuna;
		$('#fortuna2').get(0).play();

setTimeout(function(){
	console.log('hi from toggle pause')
},1000);

	}

}

let fortunaTime= [

0, 0.999179 //bat

, 1.947995

, 2.879788

, 3.833269

, 4.703301

, 5.700534

, 6.635405

, 7.607866

, 8.202764

, 9.502059

, 10.344323

, 11.205234

, 11.8

, 12.6

, 13.55

, 15.09466

, 16.018195

, 16.890296

, 17.50953

, 18.371846


, 19.3

, 20.132032

, 22.00

, 22.9

, 23.606052

, 24.606503

, 25.485475

, 26.37863

, 27.416979

, 28.322332

, 29.343308

, 30.273748

, 31.170325

, 32.113677

, 33.074869

, 34.029713

, 35.00184

, 35.985617

, 36.861393

, 37.821016

, 38.776928

, 39.680194

, 40.627361

, 41.562459

, 42.594088

, 43.466576

, 44.434434

, 45.371554

, 46.331188

, 47.309242

, 48.170715

, 49.122312

, 50.093291

, 51.067239

, 51.998431

, 52.946006

, 53.928298

, 54.839978

, 55.814187

, 56.746084

, 57.660556

, 58.640924

, 59.615353

, 60.537449




]
let tempIrishName = '';
let randLoc;

let locations = [

      `Béal Feiriste`,
      `Carraig Ḟearġais`,
      `Reaċlainn`,
      `Aċaḋ Eoċaille`,
      `Carn Ṁéaḃla`,
      `Dearḃóg`,
      `Port An Dúnáin`,
      `Sráid na nAlbanach`,
      `Baile an Ṁuilinn`,
      `Baile Úr`,
      `Lios Liath`,
      `Craigavon`,
      `Baile Haicéid`,
      `AnBhuiríos`,
      `Miseal`,
      `Cill Deirge`,
      `Baile Uí Ṁurċú`,
      `Cill Daṁáin`,
      `Dún an Rí`,
      `Lios Cré`,
      `Béal Tairbirt`,
      `Doire na Criaḋ`,
      `An Dromainn`,
      `An Cnoc Rua`,
      `Fíoch Rua`,
      `Ceann Boirne`,
      `Leaba Ṡíoda`,
      `An Tulach`,
      `Cill Rois`,
      `Bun Raite`,
      `Sliabh an Nóglaigh`,
      `Cill na Mallaċ`,
      `Cionn tSáile`,
      `An Sciobairín`,
      `Gleann an Ṗreaċáin`,
      `Beal na mḂláth`,
      `Léim an Ṁadaiḋ`,
      `Maċaire Ráṫa`,
      `An Seanṁullach`,
      `Droichead Fíolta`,
      `Muine Mór`,
      `Doire`,
      `Sléiḃte Ḋoire Bheatha`,
      `Na Cruacha`,
      `Bealach Féich`,
      `Leitir Ceanainn`,
      `Cionn Dhún Damh`,
      `Bun na hAḃann`,
      `An Caisleán Riaḃach`,
      `An Ṁainistir Liath`,
      `Dún Pádraig`,
      `Cill Chaoil`,
      `Lios na gCearrḃach`,
      `An Lorgain`,
      `Deilginis`,
      `Binn Ehadair`,
      `Cluain Dolcáin`,
      `Cluain Tarbh`,
      `Dún Laoiġaire`,
      `Fionnġlas`,
      `Inis Ceiṫleann`,
      `Scriobach`,
      `An Garastún `,
      `Lios na Daróg`,
      `Eadarnaiḋ`,
      `Paiteagó`,
      `Cill Cais`,
      `An Spidéal `,
      `An Cheaṫrú Rua`,
      `An Teach Dóite`,
      `Poll an Phúca`,
      `Inis Meáin`,
      `Na Cruacha Duḃa`,
      `An tSnaidhm`,
      `An Daingean`,
      `Gleann na bPúcaí`,
      `Cathair Saiḋḃín`,
      `Sliabh Mis`,
      `An Currach`,
      `Léim anBhradáin`,
      `Maigh Nuad`,
      `Fioḋ Alúine`,
      `Cairbre`,
      `Na Solláin`,
      `Ġráinseach Chuffe`,
      `Baile Ṁic Andáin`,
      `Dún Garḃáin`,
      `Bearna na Gaoiṫe`,
      `Sliaḃ Rua`,
      `Baile an Ṗoill`,
      `Cúil an tSúdaire`,
      `Baile Átha Í`,
      `Eiréil `,
      `Buiríos Mór Osraí`,
      `Darú`,
      `Gleann Éada`,
      `AChaḋ na Síleann`,
      `Fíonach`,
      `Dromad`,
      `Droim Seanḃó`,
      `Garḃach`,
      `Pailis Chaonraí`,
      `Áth na bḞuinseog`,
      `Caisleán Uí Chonaill`,
      `An Ḟeoṫanach`,
      `Poll an Phúca`,
      `Maiġ Duṁa`,
      `An Lios Breac`,
      `Cluain Dá Ráth`,
      `An ĊarraigBhuí`,
      `Gránard`,
      `Meathais Troim`,
      `Dún Dealgan`,
      `Ceann Ċloċair`,
      `Poll an Phúca`,
      `An Grianfort`,
      `Baile Átha Ḟirdia`,
      `Baile an Ġearlánaigh`,
      `An Éill`,
      `An Caoláire Rua`,
      `Caisleán anBharraiġ`,
      `Baile Ui Ḟiacáin`,
      `Lios an tSaṁaiḋ`,
      `Cill Ala`,
      `Teamhair`,
      `An Uaimh`,
      `Tigh na Sióg`,
      `CillBhríde`,
      `Ráth Ċairn`,
      `Buaile na Bréachṁaí `,
      `Carraig Ṁaċaire Rois`,
      `Teach an Scotaigh`,
      `Cluain Eois`,
      `Scairbh na gCaorach`,
      `EinistirBhuithe`,
      `Crícheán Rua`,
      `Cluain Ṁic Nóis`,
      `Biorra`,
      `Suí an Róin`,
      `Cionn Eitigh`,
      `Éadan Doire`,
      `Ráth Iomġáin`,
      `Corr na Fola`,
      `Scramóg`,
      `Cluain Fada`,
      `Baile an Tobair`,
      `Loch Bó Dearge`,
      `Loch Bó Finne`,
      `Gob Reaċla`,
      `An Mullach Mór`,
      `Baile Uí Ḋálaigh`,
      `Béal Átha na gCarraigíní`,
      `An Ċéis`,
      `Tobar an Ċoire`,
      `Ros Cré`,
      `Durlas`,
      `Tigh na Naoi Míle`,
      `Faiċe Ró`,
      `Sliabh na mBan`,
      `Cluain Meala`,
      `An Ómaigh`,
      `An Ċorr Ċríochach`,
      `Dún Geanainn`,
      `Caisleán na Deirge`,
      `Baile Mhic Gofraidh`,
      `An Caisleán Glas`,
      `Dún Garḃán`,
      `An Baile Dubh`,
      `Cill Ṁíodáin`,
      `Tullach an Iarainn`,
      `Cluain Ḟia`,
      `Sléiḃte an Ċomaraigh`,
      `Ráth Ḟearna`,
      `Baile na gCailleach`,
      `Na Colúir`,
      `An Teanga`,
      `CillBheagáin`,
      `An Muileann gCearr`,
      `An Abhainn Dubh`,
      `Coill an Iarainn`,
      `Dún Ċormaic`,
      `Poll an Phúca`,
      `Maolán na nGaḃar`,
      `Inis Córṫaidh`,
      `Dún Ard`,
      `Siol Éalaiġ`,
      `Aḃóca`
  ]

 getRandLocation = ()=>{
	randLoc = Math.floor(Math.random()*locations.length);
	console.log(randLoc+ " "+locations[randLoc]);
	console.log(locations.length);

}
let fortunaTeamsEng = [

	`Of the Bats`,
	`The Blood Thirsty`,
	`The Hidden`,
	`The Wave`,
	`The Grunter`,
	`The Accoutred`,
	`The Obelisk`,
	`The Illuminated`,
	`The Heritage`,
	`Shillelagh`,
	`The Cauldron`,
	`Horseman`,
	`of the Leaves`,
	`The Ring`,
	`The Dagger`,
	`The Cow`,
	`of the Wandering Warriors`,
	`The Enchanted Ones`,
	`The Night Branch`,
	`Of the Dark One`,	
	`Marauders`,
	`The Eagles`,
	`The Stronghold`,
	`of the Tricksters`,
	`of the Goblins`,
	`The flatterer`,
	`The Rogue`,
	`branch of the Black Beetle`,
	`The Kings`,
	`of the Sea Warriors`,
	`The Fury`,
	`Péire Cladhaire`,
	`of the Fae`,
	`of the Druids`,
	`The Rats`,
	`Morrigin Worshipers`,
	`The Spellbound`,
	`the Sharp Taloned`,
	`the Shield`,
	`Wisdom`,
	`Worshipers of the Crooked One`,
	`The Returned`,
	`The Fortunate`,
    `Golden Axe Tribe`,
    `the Sickle`,
    `the Vigilant`, 
	`the Dragon`,
	`Courage, Patience`,
	`The Plunderer	`,
	`Lancer-Fencers`,
	`Wandering Fenians`,
	`The Swallows`,
	`of the Stings`,
	`of the Sciences`,
	`the Wolf`,
	`The Calm`,
	`Of Mann`,
	`The Steadfast`,
	`Lily`,
	``,
`The Skiffs`	,
`Coders`
]

let fortunaTeams = [

`Na hÍoltóga`,
`An Cródh-linntighe`,
`An Foluightha`,
`An Tonn`,
`An Gnúsachán`, 
`An Luibhridhe`,
`an Oibilisc`,
`An Ionshoilsithe`,
`An Dúchas`,
`Sail Éille`,
`An Coire`,
`Na Marcra`,
`na Dilleoga`,
`An Fáinne`,
`An Miodóg`,
`An Bó`,
`Na Fánaigh`,
`Na hUptha`,
`Craobh na hOidhche`,
`Na Doilbhaithe`,
`Foghlaithe`,
`Na hIolair`,
`An Daingin`,
`Na Cleasaí`,
`Na Siabhaire`,
`Na Beadaidhthe`,
`Na Rogairí`,
`Craobh an Daol Dubh`,
`Na Ríthe`,
`Fiannaí Mara`,
`Ar an Daoraí`,
`Clunc y Dunc`,
`Fianna Sídh`,
`Draoithe`,
`Na Raftáin`,
`Adhraightheora Morrígan`,
`Na Geasaithe`,
`Na Bir-Iongaighe`,
`An Sciath`,
`Siansacht`,
`Clachán Crom`,
`Na Fhillte`,
`Na Seamhasaigh`,
`Treabh an Tua Oɼga`,
`Na Corráin`,
`Na For-fhaire`,
`Dragún`,
`na Foirtileach `,
`an tArgthóir`,
`Lannairidhe`, 
`Na Fiannaí Fánach`,
`Na Fáinleoga`,
`Na Spriochair`,
`Na hEalaí`, 
`Na Mictíre`	,
`Na Ciúine`, 
`Buíon Na Manainnise`, 
`Na Dílseachta`,`Lile`,``,`Bárc`,`Códóir`
]

let fortunaPos = 0
function mode(whichMode){

	if(whichMode===3)
	$(fortuna).fadeOut();
	$('#fortuna-glass').fadeOut();
	// showMap();

	// $('#main-text').text('')
	$('#next-text').text('')
	// $('#ciorcal-glass').fadeOut()
	
	$('#mode3').fadeIn()
	let newTempName = $('#main-text').html();
	let newTempName2 = $('#nameInIre').html();	
	$('#mode3-name').html(newTempName2 +" "+newTempName )
	$("").fadeIn()
	$('#stat-text').fadeIn()
	
	$('#fortuna-glass').fadeOut();
	$(stage).fadeOut()
		$('#main-text').fadeOut();
		$('#nameInIre').fadeOut();
		$('#stat-text').html(" " + teamLocation)
		$('#avatar').fadeOut();
		$(fortuna).fadeOut();
		$('#fortuna-bg').fadeOut();
		$('#fortuna-glass').fadeOut();
		$('#fortuna-lit').fadeOut();
		$('#team-icon').fadeOut();
		$('#sea').fadeOut();
	setTimeout(function(){
		$('#splash-b').fadeIn();

	},1000)
	setTimeout(function(){
		$('#storyteller-0').fadeIn();
	},3000)

	}

function textfade(div){
// $(div).css('color','goldenrod')

	// $(div).fadeTo("slow",0.2)

	// $(div).css('color','purple')

}


function showMap(){

}


let tunes = [




]
let teams=[
	
]
let playerRollsA;
	// $('#oFortuna1').playbackRate=0;

		
		let tempEnglishName;
		$('#nameInIre').on('click',function(){
			beep2.play();
			$('#avatar').css('backgroundImage',playerIconURL);
			console.log("£")
			$('#avatar').fadeIn();
			
			$('.chosen').attr("src","./images/champions/empty.png");
			$('#fortuna-glass').fadeIn();

					tempIrishName=namesInEnglish[this.id]
$('#nameInEng').fadeOut()
// alert(tempIrishName)
$('#next-text').css("top","116px");
$('#next-text').css("left","31%");
$('#main-text').css("left","229px");
$('#main-text').css("top","71px");
$('#main-text').css("font-size","1em")
$('#next-text').css("color","orange")
$('#nameInIre').css("textAlign","left")

$('#nameInIre').css("top","34px")
$('#nameInIre').css("left","31%")
$('#nameInIre').css("color","black")

$('#go-left').on('click',function(){
	$('#mode3').fadeOut();
	$('#mode2').fadeIn();
});

$('#wren-bg0').on('touchend click',function(){
});
$('#a').on('touchend click',function(){
	
	$('#a-choices').fadeIn();
	
	$('.prompt-box').fadeIn();
	})


$('#player-icon').on('click',function(){
	$('#next-text').fadeOut()
// alert(tempIrishName)
$('#main-text').css("top","0px");
$('#main-text').css("left","56%");
$('#main-text').css("font-size","1em")
$('#main-text').css("color","black")

})
$(fortuna).fadeIn();
		})
function OFortuna(){
avatarChosen=true;
		// alert('yo')	
		beep3.play()
	// $('#ciorcal-glass').fadeIn();
	// $('#ciorcal-glass-bg').fadeIn();
	// $('#player-icon').fadeIn()

	$('#fortuna-lit').fadeIn();
	$('#fortuna-bg').fadeIn();

	$('#next-text').fadeTo("fast",1);
	$('#fortuna-glass').fadeTo("fast",0.5);
	setTimeout(function(){
	$('#fortuna-glass').fadeTo("fast",1);

	},200)

		// $(fortuna).css("display","none");
		// $('#team-icon').css('backgroundImage',"url(./images/trinacria.png)");
		$('#team-icon').css('top','-87px');
		$('#team-icon').css('left','-35px');
	
		$('#team-icon').fadeIn();
		// textfade('#main-text');
setTimeout(function(){
	textfade('#next-text');

	
},2000)
		playerRollsA = fortuna.currentTime+0.33;
		console.log('player rolls a '+playerRollsA)
for(let i=0; i<fortunaTime.length; i++){

	if(playerRollsA<=fortunaTime[i]){
		// console.log('go to next fortunaTime...')

	}

	if(playerRollsA>=fortunaTime[i]){
		console.log('maybe this fortunaTime...');
		if(playerRollsA>=fortunaTime[i+1]){
		fortunaTeam = fortunaTeams[i];
		fortunaTeamEng = fortunaTeamsEng[i];
		teamLocation = locations[i];
		console.log(teamLocation);
		console.log(fortunaTeams[i]);		teamImg = i+1;
		$('#team-icon').css('backgroundImage',"url('./images/o-fortuna/"+teamImg+".png')");
		
		
	}
	}
}

		// $('#oFortuna2').get(0).pause();
		console.log(fortuna.currentTime)
		$('#main-text').html(fortunaTeam);
		$('#next-text').html('Ainm Buíonn');
		$('#next-text').html(fortunaTeamEng);

		
		// console.log('hey f2'+ oFortuna1Position);
		// $('#oFortuna2').get(0).currentTime=0;

		setTimeout(function(){
		
			// $('#keyboard-container').css("display","inline-block")
		
		},1000)
		




}

$("#avatar").on('click',function(){
	if(avatarChosen){
		$('#video1').get(0).play()
		let vid1 = document.getElementById('video1')
		vid1.playbackRate = 0.3;
	
		mode(3);
			
		}else{
			OFortuna();
		}
});

$(fortuna).on('click',OFortuna);
$('#right-eye').on('click',function(){

	
});
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		console.log("mobile");
		
		$('#fortuna2').addClass('mobile') 
		
		
	}
		
		else
		{
			console.log("not mobile");
			$('#fortuna-lit').addClass('full-screen-fortuna-lit');
		
			$('#stage').addClass('full-screen-stage');
		$('#fortuna-glass').addClass('full-screen-fortuna-glass');
		$('#fortuna-bg').addClass('full-screen-fortuna-bg');
			$('#fortuna2').addClass('full-screen-fortune');
			$('#fortuna-glass').addClass('full-screen-fortune-glass')
			$('#main-text').addClass('full-screen-main-text')
			$('#next-text').addClass('full-screen-next-text')
			$('#team-icon').addClass('full-screen-team-icon')
			$('#icon-glass').addClass('full-screen-glass')
			$('#fortuna2').addClass('o-fortuna-full-screen')
		;
		$('#ciorcal-glass-bg').addClass('ciorcal-glass-bg-full-screen');
		$('#ciorcal-glass').addClass('ciorcal-glass-full-screen');
		$('#team-icon').addClass('team-icon-full-screen');
		$('#player-icon').addClass('player-icon-full-screen');
		
	
		
		}

	});
	
	
	

	$('#oFortuna2').on('click',function(){
		console.log('hey f2'+ fortunaPos);
		

		

	});

	$('#oFortuna3').on('click',function(){
		console.log('hey f3'+ oFortuna1Position);
		
		// this.trigger('pause');
		// $('#oFortuna1').playbackRate=0;
		$('#oFortuna3').get(0).pause();
		
	  });

	  $('.minimap-icon').on('touchstart',function(){
		
		if ($('#output').is(':empty')){
			// alert('all clear')
		}});
	  $('#minimap-icon1').on('touchstart',function(){
		refreshChapter(wrenTally)
		cdMeTo=`Abhóca`
		
		});
		
		$('#minimap-icon2').on('touchstart',function(){
			refreshChapter(wrenTally)
			cdMeTo=`An tInbher Mór`
	
			});	
			  $('#minimap-icon3').on('touchstart',function(){
				refreshChapter(wrenTally)
				cdMeTo=`Dún Ard`
		
				});	
				  $('#minimap-icon4').on('touchstart',function(){
					refreshChapter(wrenTally)
					cdMeTo=`Na Clocha Liath`
			
					});	
					  $('#minimap-icon5').on('touchstart',function(){
						refreshChapter(wrenTally)
						cdMeTo=`Poll an Phúca`
				
						});	
						  $('#minimap-icon6').on('touchstart',function(){
							  cdMeTo=`Siol Ealaigh`
							refreshChapter(wrenTally)
					
							});
							
							$('.enter').on('touchstart',function(){
								$('#splash-a').fadeOut();
								$('#overlay-3').fadeOut();
								$('#minimap-holder').fadeOut();
								$('#minimap').fadeOut();
								$('#keyboard-container').fadeOut();
								$('#output').fadeOut();
								// $('#fortuna-bg').fadeOut();
								theme.play();


							});
	$('#color-square').on('touchstart',function(){
		// if(firstTime){
			// }
			$('.quote-marks').html(``);
			$('.quote-marks-close').html(``);
			$('#gamepad').fadeOut();
	beep2	.play();	
		
			refreshChapter(2)
			 	
	
		if(wrenTally===9){
			// refreshChapter(wrenTally)
$('#wren-bg0').css('background-image','url("./images/wren2b.png")')
		// $('#overlay-wren-hint').fadeIn();
$('#wren-holder').fadeTo(500, 1)
$('.wren-text').fadeIn()		
		
		}
		else{
		$('.wren-text').fadeIn()		
$('#wren-bg0').css('background-image','url("./images/wren2b.png")')
$('#wren-holder').fadeTo(500, 1)
}
	});
function refreshChapter(chapterNo){
if(chapterNo===2){

	wrenTally++;
	console.log("chapter number"+cdMeTo)
	$('#overlay-3').html(`<img id="to-go" src="./images/cd-linucs.gif"/>`);
	$('.output-gif').fadeTo(7000, 0);
	setTimeout(function(){

	$('#linucs-keyboard').animate({
		opacity: 1,
		}, 1000, function() {
			// complete
	});

			$('#linucs-keyboard').fadeIn();
	},9000)

	}


	if(chapterNo===3){

		wrenTally=2; //go back one so other locations can be selected more easily.
		console.log("chapter number"+chapterNo)
		$('#overlay-3').html(`<p id="overlay-3">cd `+ cdMeTo + `</p>`);
		$('.output-gif').fadeTo(7000, 0.1);
		setTimeout(function(){
				$('#keyboard-container').fadeIn();
		},7000)
	
		}

	if (chapterNo=== 1){
			$('.console-text').fadeOut();
		if (firstTime){
			

		firstTime=false;
	//linucs keyboard re-appears, prompting for pwd
	setTimeout(function(){

		$(function () {
			$("#linucs-gifs").animate({
				top: "-=48px"
	
			}, { duration: 200, queue: false });
		
			$("#prompt").animate({
				top: "-=48px"
			}, { duration: 200, queue: false });
		});
	
		$('#linucs-gifs').fadeOut(10000);
		
		

				

	} , 300)
	}
		$("#console").animate({
			top: "8px"
		
		});
		
	
		// $('#linucs-gifs').attr('src','./images/where-am-i.gif');

	}
}

	$('#color-square').on('touchend',function(){
		
$('#wren-bg0').css('background-image','url("./images/wren2.png")')

	$('.wren-text').fadeOut()
	$('.wren-text').html(``);
	
$('#wren-holder').fadeTo(3000,0.3)



			});
		