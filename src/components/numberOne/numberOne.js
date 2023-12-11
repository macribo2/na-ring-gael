import React, { useState, useEffect} from 'react';
import $ from 'jquery';
import empty from '../../images/champions/empty.png'
import aa1 from '../../images/champions/1.png'
import aa2 from '../../images/champions/2.png'
import aa3 from '../../images/champions/3.png'
import aa4 from '../../images/champions/4.png'
import aa5 from '../../images/champions/5.png'
import aa6 from '../../images/champions/6.png'
import aa7 from '../../images/champions/7.png'
import aa8 from '../../images/champions/8.png'
import aa9 from '../../images/champions/9.png'
import aa10 from '../../images/champions/10.png'
import aa11 from '../../images/champions/11.png'
import aa12 from '../../images/champions/12.png'
import aa13 from '../../images/champions/13.png'
import aa14 from '../../images/champions/14.png'
import aa15 from '../../images/champions/15.png'
import aa16 from '../../images/champions/16.png'
import aa17 from '../../images/champions/17.png'
import aa18 from '../../images/champions/18.png'
import aa19 from '../../images/champions/19.png'
import aa20 from '../../images/champions/20.png'
import aa21 from '../../images/champions/21.png'
import aa22 from '../../images/champions/22.png'
import aa23 from '../../images/champions/23.png'
import aa24 from '../../images/champions/24.png'
import aa25 from '../../images/champions/25.png'
import aa26 from '../../images/champions/26.png'
import aa27 from '../../images/champions/27.png'
import aa28 from '../../images/champions/28.png'
import aa29 from '../../images/champions/29.png'
import aa30 from '../../images/champions/30.png'
import aa31 from '../../images/champions/31.png'
import aa32 from '../../images/champions/32.png'
import aa33 from '../../images/champions/33.png'
import aa34 from '../../images/champions/34.png'
import aa35 from '../../images/champions/35.png'
import aa36 from '../../images/champions/36.png'
import aa37 from '../../images/champions/37.png'
import aa38 from '../../images/champions/38.png'
import aa39 from '../../images/champions/39.png'
import aa40 from '../../images/champions/40.png'
import aa41 from '../../images/champions/41.png'
import aa42 from '../../images/champions/42.png'
import aa43 from '../../images/champions/43.png'
import aa44 from '../../images/champions/44.png'
import aa45 from '../../images/champions/45.png'
import aa46 from '../../images/champions/46.png'
import aa47 from '../../images/champions/47.png'
import aa48 from '../../images/champions/48.png'
import aa49 from '../../images/champions/49.png'
import aa50 from '../../images/champions/50.png'
import aa51 from '../../images/champions/51.png'
import aa52 from '../../images/champions/52.png'
import aa53 from '../../images/champions/53.png'
import aa54 from '../../images/champions/54.png'
import aa55 from '../../images/champions/55.png'
import aa56 from '../../images/champions/56.png'
import aa57 from '../../images/champions/57.png'
import aa58 from '../../images/champions/58.png'
import aa59 from '../../images/champions/59.png'
import { Rings4 } from '../Rings/Rings4'
import './no-one.css';
import skybg from '../../images/blinding-light-county.jpg'
import fields2 from '../../images/empty.png'
import { Rings5 } from '../Rings/Rings5';



export default class NumberOne extends React.Component  {
	
	constructor() {
        super();
        this.state = {
        }
    }
	

    componentDidMount() {
		this.jQueryCode();
	}
	fadeOutNoOne() { 
		$('.chess-container').fadeIn();
		$('.pawn-filter').fadeOut();
		$('.lens-cap').fadeOut();
		$('.between-fields').fadeOut();
		$('#hero').fadeIn();
		$('.button-mash-ring-4').fadeOut();
		$('.input-elements-container-8').fadeOut(2000)//css('display','none');
		$('.answer-section').fadeIn();
		$('#hints-ring-4').html('');
		$('#north').addClass('circle')
		$('#hints-geaga').fadeIn();
		// let mise = document.getElementsByClassName('names-i').html();
		// alert(mise)
		// $('#eqt-overworld').html('');
		// $('eng-question-text').html('Return here in 30 days, with a ring from each province. ')
		setTimeout(function () { 
			$('.question-text').removeClass('fade-out-champ');
			$('.question-text').fadeIn('slow');
			$('.hero-shadow').fadeIn('5000','linear');
			$('.grid-item').css('opacity','1');
			$('#toggle-glass-btn2').css('border', '6px solid rgb(32, 21, 28)');
			$('#toggle-glass-btn2').css('background-color','rgb(32, 21, 28)');
				$('.grid-item').fadeIn('5000','linear');

		},1000)

		
		setTimeout(function () { 
			$('.directional-pad').fadeIn();


		},2000)

		
	}
	jQueryCode = () => {
	
		let champions;
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
		
	let	namesInEnglish = [
		
		
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
		
		var eascaStage = document.querySelector("#eascaStage");
		
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
		
			function render() {

				
		let stageLeft=320;
		let stageTop=200;
		var intervalId = window.setInterval(function(){
			/// call your function here
				$("#eascaStage").animate({left:"+=20px"},0)
// 
let stagePos = $('#eascaStage').position()
// console.log('position'+stagePos.left)
// if(stagePos.left>=150){

	// $('#eascaStage').css('left', '-890px')
	// alert();
// }

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
						eascaStage.appendChild(cell);
		
						//Find the correct image for this map cell
						switch (map[row][column]) {
							case grass: cell.src = empty
								;
								break;
							case a1: cell.src = aa1;
								break;
							case a2: cell.src = aa2;
								break;
					case a3: cell.src = aa3;
								break;
					case a4: cell.src = aa4
								break;
					case a5: cell.src = aa5
								break;
					case a6: cell.src = aa6
								break;
					case a7: cell.src = aa7
								break;
					case a8: cell.src =aa8
								break;
					case a9: cell.src = aa9
								break;
					case a10: cell.src = aa10
								break;
					case a11: cell.src = aa11
								break;
					case a12: cell.src = aa12
								break;
					case a13: cell.src = aa13
								break;
					case a14: cell.src = aa14
								break;
					case a15: cell.src = aa15
								break;
					case a16: cell.src = aa16
								break;
					case a17: cell.src = aa17
								break;
					case a18: cell.src = aa18
								break;
					case a19: cell.src = aa19
								break;
					case a20: cell.src = aa20
								break;
					case a21: cell.src = aa21
								break;
					case a22: cell.src = aa22
								break;
					case a23: cell.src = aa23
								break;
					case a24: cell.src = aa24
								break;
					case a25: cell.src = aa25
								break;
					case a26: cell.src = aa26
								break;
					case a27: cell.src = aa27
								break;
					case a28: cell.src = aa28
								break;
					case a29: cell.src = aa29
								break;
					case a30: cell.src = aa30
								break;
					case a31: cell.src = aa31
								break;
					case a32: cell.src = aa32
								break;
					case a33: cell.src = aa33
								break;
					case a34: cell.src = aa34
								break;
					case a35: cell.src = aa35
								break;
					case a36: cell.src = aa36
								break;
					case a37: cell.src = aa37
								break;
					case a38: cell.src = aa38
								break;
					case a39: cell.src = aa39
								break;
					case a40: cell.src = aa40
								break;
					case a41: cell.src = aa41
								break;
					case a42: cell.src = aa42
								break;
					case a43: cell.src = aa43;
		
								break;
					case a44: cell.src = aa44;
		
								break;
					case a45: cell.src = aa45;
								break;
					case a46: cell.src = aa46;
								break;
					case a47: cell.src = aa47;
								break;
					case a48: cell.src = aa48;
								break;
					case a49: cell.src = aa49;
								break;
					case a50: cell.src = aa50;
								break;
					case a51: cell.src = aa51;
								break;
					case a52: cell.src = aa52;
								break;
					case a53: cell.src = aa53;
								break;
					case a54: cell.src = aa54;
								break;
					case a55: cell.src = aa55;
								break;
							case a56: cell.src =  aa56 ;
								break;
					case a57: cell.src = aa57;
								break;
					case a58: cell.src = aa58;
								break;
							case a59: cell.src =aa59; break;
							default: break;	
						}
		
						cell.style.top = row * SIZE + "px"; cell.style.left = column * SIZE + "px";
		
		
					}
		//ls stuff
		// const beep3 = new Audio("./audio/09_select1.wav" );
		// const beep4 = new Audio("./audio/04_start5.wav" );
		
		// const beep1 = new Audio("./audio/1b.wav" )
		// const beep2 = new Audio("./audio/2b.wav" )
		
let		ls = ()=>{
		
			$('#bright-light').css('display','block');
			$('#bright-light').fadeOut(8000);
			$('#gamepad').fadeIn();
		
			$('#linucs-keyboard').animate({
				opacity: 0,
				}, 1000, function() {
					// complete
			});
		
			// beep2.play();	
		
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
		
		// wrenTally++;
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
		
		// console.log('hi ó Wren')
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
			// beep2.play();
		
		let	cdMeTo=`Poll an Phúca`;
		updateEng(currentSelect)
		highlightIrish(currentSelect)
		
		})
		
		$('.grid-item8').on('touchend', function () {
			$('.grid-item8').fadeTo(100,0.3).fadeTo(500,1);
			currentSelect++
			if (currentSelect>=6 ){currentSelect = 0}
			if (currentSelect<0 ){currentSelect = 5}
			// beep2.play();
		
			// cdMeTo=`Poll an Phúca`;
		updateEng(currentSelect)
		highlightIrish(currentSelect)
		
		})
			// console.log(currentSelect + "current select")	
		
		$('#cd').on('touchend click', function () {
		
			// beep2.play();
		$('#linucs-keyboard').fadeOut();
		$('#keyboard-container').fadeIn();
		setTimeout(function(){
		// $('#output').html('cd '+cdMeTo)
		
		
		
		},1000)
		$('#bright-light-county').css('display','block');
		$('#bright-light-county').fadeOut(8000);
		
		
		});
		$('#a').on('touchend click',function(){
			// console.log('a');
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
		
							let currentChamp = charId;
							// updateChamp()
						let	haveWeStartedYet = true;
		
		
		
							$('#ceist').css('opacity', 1);
						let	registrationMenuOpen = true;
							$('#nav-right').fadeOut();
							// $('#ainm').html(randomNames[Math.floor(Math.random() * randomNames.length)])
						}, 250)
					let	champ = champions[charId];
						$('#i-am-not-btn').fadeIn();
						$('#i-am-btn').animate({ left: "4%" })
						$('.blurb').fadeIn();
		
		
						// $('#hero').fadeOut();
						// $('#source').attr('src', './fís/nuFortuna3.mp4');
						// $('#ainm').val('rando');
						$('#ainm').on('touchend', function () {
							$('#ainm').html('')
						let	showKeyboard = true;
		
							$('.holdem').fadeIn();
						});
		
						// $('#hero-target').css('background-image', champ.targetCircle);
						// $('#i-am-btn').css("background-image", 'url(./img/playerFrame6.png)');
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
							// beep2.play();
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
							// console.log(this.src)
		
		
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
						// console.log(this.id)
						// console.log(namesInIrish[this.id])
						// console.log(namesInEnglish[this.id])
					let	heroPortrait = this.src;
				let		playerIconURL = `url('`+ heroPortrait +`')`
				// $('#player-icon').css('backgroundImage',playerIconURL);
		
				// $('#player-icon').css('backgroundImage',"url('./images/champions/'+this.id	+'.png')");
				// console.log("hero"+heroPortrait)
				
						
						$('#nameInEng').html("");
							$('#nameInIre').html("")
						let	tempIrishName=namesInIrish[this.id]
						let	tempEnglishName=namesInEnglish[this.id]
							$('#nameInEng').html(namesInEnglish[this.id]);
							$('#nameInIre').html(namesInIrish[this.id])
							$('#nameInEng').fadeIn();
		
				$('#fortuna-glass').fadeIn(1000);
		
			}})
				}
				
			}
			
		
			
render()



;	
	}
	
	
	 render() {
		{/*   ☘	 */}
		 let proceedThroughQuiz = this.props.proceedThroughQuiz;
		let isOn = this.props.isOn
		 return (

			 <>
				 <div className='one-ring'>
				 {/* <img className="sky-bg" src={skybg } alt="the sky" /> */}
    
				 <div className="eascaStage-container">
				
				 <div className="eascaStage-bg loopscroll"></div>
						 <div id="eascaStage" >
							 
						 {/* <img id="paralax-fields" src={ fields2 } /> */}
			</div>


			</div>	
				 </div>
	
				 <Rings4    heroName={this.props.heroName} heroNameEng={ this.props.heroNameEng} toggleIsOn={this.props.toggleIsOn} isOn={this.props.isOn} proceedThroughQuiz={this.props.proceedThroughQuiz } fadeOutNoOne={ this.fadeOutNoOne } />
				 
			 </>


)
}

}