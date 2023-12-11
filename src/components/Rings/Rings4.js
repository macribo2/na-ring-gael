
// import * as React from "react";

import { render } from "react-dom";
import React, { useState, useEffect } from 'react'
import lens from '../../images/ciorcal-glass-light.png';
import lensCap from '../../images/About1/ring2.png';
import emerald from '../../images/misc_crystal_new.png'
import betweenFields from '../../images/realta.fdef7a42.gif'
import tutorial0r from '../../images/tutorials/tutorial0r.png';
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import heroShadow from '../../images/empty.png'
import empty from '../../images/empty.png';
import './rings1.css'
import avatar1 from '../../images/players/spéirbhean0.gif';
import avatar2 from '../../images/players/douglas.png';
import avatar3 from '../../images/players/fianna0.png';
import avatar4 from '../../images/players/gotach0.png';
import avatar5 from '../../images/players/agnes_new.png'
import avatar6 from '../../images/players/diamhraí0.gif';
import avatar7 from '../../images/players/seanchaí0.png';
import avatar8 from '../../images/players/pooka.png';
import avatar9 from '../../images/players/poet.png';
import champion0 from '../../images/champions/19.png'
import champion1 from '../../images/champions/1.png'
import champion2 from '../../images/champions/2.png'
import champion3 from '../../images/champions/3.png'
import champion4 from '../../images/champions/4.png'
import champion5 from '../../images/champions/5.png'
import champion6 from '../../images/champions/6.png'
import champion7 from '../../images/champions/7.png'
import champion8 from '../../images/champions/8.png'
import champion9 from '../../images/champions/9.png'
import champion10 from '../../images/champions/10.png'
import champion11 from '../../images/champions/11.png'
import champion12 from '../../images/champions/12.png'
import champion13 from '../../images/champions/13.png'
import champion14 from '../../images/champions/14.png'
import champion15 from '../../images/champions/15.png'
import champion16 from '../../images/champions/16.png'
import champion17 from '../../images/champions/17.png'
import champion18 from '../../images/champions/18.png'
import champion19 from '../../images/champions/19.png'
import champion20 from '../../images/champions/20.png'
import champion21 from '../../images/champions/21.png'
import champion22 from '../../images/champions/22.png'
import champion23 from '../../images/champions/23.png'
import champion24 from '../../images/champions/24.png'
import champion25 from '../../images/champions/25.png'
import champion26 from '../../images/champions/26.png'
import champion27 from '../../images/champions/27.png'
import champion28 from '../../images/champions/28.png'
import champion29 from '../../images/champions/29.png'
import champion30 from '../../images/champions/30.png'
import champion31 from '../../images/champions/31.png'
import champion32 from '../../images/champions/32.png'
import champion33 from '../../images/champions/33.png'
import champion34 from '../../images/champions/34.png'
import champion35 from '../../images/champions/35.png'
import champion36 from '../../images/champions/36.png'
import champion37 from '../../images/champions/37.png'
import champion38 from '../../images/champions/38.png'
import champion39 from '../../images/champions/39.png'
import champion40 from '../../images/champions/40.png'
import champion41 from '../../images/champions/41.png'
import champion42 from '../../images/champions/42.png'
import champion43 from '../../images/champions/43.png'
import champion44 from '../../images/champions/44.png'
import champion45 from '../../images/champions/45.png'
import champion46 from '../../images/champions/46.png'
import champion47 from '../../images/champions/47.png'
import champion48 from '../../images/champions/48.png'
import champion49 from '../../images/champions/49.png'
import champion50 from '../../images/champions/50.png'
import champion51 from '../../images/champions/51.png'
import champion52 from '../../images/champions/52.png'
import champion53 from '../../images/champions/53.png'
import champion54 from '../../images/champions/54.png'
import champion55 from '../../images/champions/55.png'
import champion56 from '../../images/champions/56.png'
import champion57 from '../../images/champions/57.png'
import champion58 from '../../images/champions/58.png'
import champion59 from '../../images/champions/59.png'
import champion60 from '../../images/champions/60.png'
import champion61 from '../../images/champions/61.png'
import champion62 from '../../images/champions/62.png'
import champion63 from '../../images/champions/63.png'
import champion64 from '../../images/champions/64.png'
import champion65 from '../../images/champions/65.png'
import champion66 from '../../images/champions/66.png'
import champion67 from '../../images/champions/67.png'
import champion68 from '../../images/champions/68.png'
import champion69 from '../../images/champions/69.png'
import champion70 from '../../images/champions/70.png'
import champion71 from '../../images/champions/71.png'
import champion72 from '../../images/champions/72.png'
import champion73 from '../../images/champions/73.png'
import champion74 from '../../images/champions/74.png'
import champion75 from '../../images/champions/75.png'
import champion76 from '../../images/champions/76.png'
import champion77 from '../../images/champions/77.png'
import champion78 from '../../images/champions/78.png'
import champion79 from '../../images/champions/79.png'
import champion80 from '../../images/champions/80.png'
import champion81 from '../../images/champions/81.png'
import champion82 from '../../images/champions/82.png'
import champion83 from '../../images/champions/83.png'
import champion84 from '../../images/champions/84.png'
import champion85 from '../../images/champions/85.png'
import champion86 from '../../images/champions/86.png'
import champion87 from '../../images/champions/87.png'
import champion88 from '../../images/champions/88.png'
import champion89 from '../../images/champions/89.png'
import champion90 from '../../images/champions/90.png'
import champion91 from '../../images/champions/91.png'
import champion92 from '../../images/champions/92.png'
import champion93 from '../../images/champions/93.png'
import champion94 from '../../images/champions/94.png'
import champion95 from '../../images/champions/95.png'
import champion96 from '../../images/champions/96.png'
import champion97 from '../../images/champions/97.png'
import champion98 from '../../images/champions/98.png'
import champion99 from '../../images/champions/99.png'
import opponent1 from '../../images/draoi0.gif'
import tree from '../../images/tree.png'
import {
  CircularInput,
  CircularTrack,
  CircularThumb,
} from "react-circular-input";
import pawn from '../../images/pawn.png'



export function Rings4(props) {
	const [showDiv, setShowDiv] = useState(false);

	let hname;

  // Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {

	 })


	function hideText() { 
		// alert();
	}
	let ogHero = localStorage.getItem('portrait') 

	let namesInIrish = []; 
	
	let namesInEnglish = [];
	
	const [value, setValue] = React.useState(.25);
  const prevValue = React.useRef(0);
  const diff = React.useRef(0);
  const dir = React.useRef(0);
  const round = React.useRef(0);

  const max = 0.99;
  const min = 0;

  const valueWithinLimits = rv => {
    const v = Math.floor(rv * 100) / 100;
    console.log("v", v);

    const diff = v - value;
    let vRound = round.current;
    if (diff > 0.8) vRound--;
    if (diff < -0.8) vRound++;

    const currentValue = value + round.current;
    const requestedValue = v + vRound;
    const minValue = 0.77;
    const maxValue = 0.99;
    console.log("current | requested", currentValue + "|" + requestedValue);
    console.log(" round.current", round.current);

    // //if (requestedValue > 1) return value;
    if (requestedValue > max) return maxValue;
    else if (requestedValue < min) return minValue;
    else return v;
};
let champPortrait = document.getElementsByClassName('champion-portrait')

	//when player turns dial to select champion:  show avatar in fairy ring; fade in eng and irish names, fade out question text.
	

  function shuffle(obj1, obj2) {
	var index = obj1.length;
	var rnd, tmp1, tmp2;
  
	while (index) {
	  rnd = Math.floor(Math.random() * index);
	  index -= 1;
	  tmp1 = obj1[index];
	  tmp2 = obj2[index];
	  obj1[index] = obj1[rnd];
	  obj2[index] = obj2[rnd];
	  obj1[rnd] = tmp1;
	  obj2[rnd] = tmp2;
	}
  }
  
  //   shuffle(namesInEnglish,namesInIrish);
  // for (let i = 0; i < namesInIrish.length; i++) {
	// 	console.log(namesInIrish[i]+ '    ' +namesInEnglish[i]);
		
	// }
	// console.log("<<<<<>>>>>");
		function buttonMashClick() { 
			
		}

  const updateValue = v => {
    diff.current = v - prevValue.current;
    if (diff.current > 0.8) round.current--;
    if (diff.current < -0.8) round.current++;
    prevValue.current = v;
	  setValue(v);
	  localStorage.setItem('hname', hname)
  };
	let champIcon = champion0;
	let champID = Math.floor(value * 100);
	let questionTextElements = document.getElementsByClassName('question-text');
	let ing = document.getElementsByClassName('in-g'); 
if (champID !== 25) {
  // Check if there are any elements with the class 'question-text'
  if (questionTextElements.length > 0) {
    
	  // Iterate over the collection and add the 'fade-out' class to each element
    for (let i = 0; i < questionTextElements.length; i++) {
      questionTextElements[i].classList.add('fade-out-champ');
    }
  }
  if (ing.length > 0) {
    
	// Iterate over the collection and add the 'fade-out' class to each element
  for (let i = 0; i < ing.length; i++) {
	questionTextElements[i].style.display= 'block';
  }
}
	
	let output2 = document.getElementsByClassName('');
}

	if (champID === 100){
		champIcon = champion0;
	}
	if (champID === 1){
		champIcon = champion1;
	}
	if (champID === 2){
		champIcon = champion2;
	}
	if (champID === 3){
		champIcon = champion3;
	}
	if (champID === 4){
		champIcon = champion4;
	}
	if (champID === 5){
		champIcon = champion5;
	}
	if (champID === 6){
		champIcon = champion6;
	}
	if (champID === 7){
		champIcon = champion7;
	}
	if (champID === 8){
		champIcon = champion8;
	}
	if (champID === 9){
		champIcon = champion9;
	}
	if (champID === 10){
		champIcon = champion10;
	}
	if (champID === 11){
		champIcon = champion11;
	}
	if (champID === 12){
		champIcon = champion12;
	}
	if (champID === 13){
		champIcon = champion13;
	}
	if (champID === 14){
		champIcon = champion14;
	}
	if (champID === 15){
		champIcon = champion15;
	}
	if (champID === 16){
		champIcon = champion16;
	}
	if (champID === 17){
		champIcon = champion17;
	}
	if (champID === 18){
		champIcon = champion18;
	}
	if (champID === 19){
		champIcon = champion19;
	}
	if (champID === 20){
		champIcon = champion20;
	}
	if (champID === 21){
		champIcon = champion21;
	}
	if (champID === 22){
		champIcon = champion22;
	}
	if (champID === 23){
		champIcon = champion23;
	}
	if (champID === 24){
		champIcon = champion24;
	}
	if (champID === 25){
		champIcon = champion25;
	}
	if (champID === 26){
		champIcon = champion26;
	}
	if (champID === 27){
		champIcon = champion27;
	}
	if (champID === 28){
		champIcon = champion28;
	}
	if (champID === 29){
		champIcon = champion29;
	}
	if (champID === 30){
		champIcon = champion30;
	}
	if (champID === 31){
		champIcon = champion31;
	}
	if (champID === 32){
		champIcon = champion32;
	}
	if (champID === 33){
		champIcon = champion33;
	}
	if (champID === 34){
		champIcon = champion34;
	}
	if (champID === 35){
		champIcon = champion35;
	}
	if (champID === 36){
		champIcon = champion36;
	}
	if (champID === 37){
		champIcon = champion37;
	}
	if (champID === 38){
		champIcon = champion38;
	}
	if (champID === 39){
		champIcon = champion39;
	}
	if (champID === 40){
		champIcon = champion40;
	}
	if (champID === 41){
		champIcon = champion41;
	}
	if (champID === 42){
		champIcon = champion42;
	}
	if (champID === 43){
		champIcon = champion43;
	}
	if (champID === 44){
		champIcon = champion44;
	}
	if (champID === 45){
		champIcon = champion45;
	}
	if (champID === 46){
		champIcon = champion46;
	}
	if (champID === 47){
		champIcon = champion47;
	}
	if (champID === 48){
		champIcon = champion48;
	}
	if (champID === 49){
		champIcon = champion49;
	}
	if (champID === 50){
		champIcon = champion50;
	}
	if (champID === 51){
		champIcon = champion51;
	}
	if (champID === 52){
		champIcon = champion52;
	}
	if (champID === 53){
		champIcon = champion53;
	}
	if (champID === 54){
		champIcon = champion54;
	}
	if (champID === 55){
		champIcon = champion55;
	}
	if (champID === 56){
		champIcon = champion56;
	}
	if (champID === 57){
		champIcon = champion57;
	}
	if (champID === 58){
		champIcon = champion58;
	}
	if (champID === 59){
		champIcon = champion59;
	}
	if (champID === 60){
		champIcon = champion60;
	}
	if (champID === 61){
		champIcon = champion61;
	}
	if (champID === 62){
		champIcon = champion62;
	}
	if (champID === 63){
		champIcon = champion63;
	}
	if (champID === 64){
		champIcon = champion64;
	}
	if (champID === 65){
		champIcon = champion65;
	}
	if (champID === 66){
		champIcon = champion66;
	}
	if (champID === 67){
		champIcon = champion67;
	}
	if (champID === 68){
		champIcon = champion68;
	}
	
	if (champID === 69){
		champIcon = champion69;
	}
	if (champID === 70){
		champIcon = champion70;
	}
	if (champID === 71){
		champIcon = champion71;
	}
	if (champID === 72){
		champIcon = champion72;
	}
	if (champID === 73){
		champIcon = champion73;
	}
	if (champID === 74){
		champIcon = champion74;
	}
	if (champID === 75){
		champIcon = champion75;
	}
	if (champID === 76){
		champIcon = champion76;
	}
	if (champID === 77){
		champIcon = champion77;
	}
	if (champID === 78){
		champIcon = champion78;
	}
	if (champID === 79){
		champIcon = champion79;
	}
	if (champID === 80){
		champIcon = champion80;
	}
	if (champID === 81){
		champIcon = champion81;
	}
	if (champID === 82){
		champIcon = champion82;
	}
	if (champID === 83){
		champIcon = champion83;
	}
	if (champID === 84){
		champIcon = champion84;
	}
	if (champID === 85){
		champIcon = champion85;
	}
	if (champID === 86){
		champIcon = champion86;
	}
	if (champID === 87){
		champIcon = champion87;
	}
	if (champID === 88){
		champIcon = champion88;
	}
	if (champID === 89){
		champIcon = champion89;
	}
	if (champID === 90){
		champIcon = champion90;
	}
	if (champID === 91){
		champIcon = champion91;
	}
	if (champID === 92){
		champIcon = champion92;
	}
	if (champID === 93){
		champIcon = champion93;
	}
	if (champID === 94){
		champIcon = champion94;
	}
	if (champID === 95){
		champIcon = champion95;
	}
	if (champID === 96){
		champIcon = champion96;
	}
	if (champID === 97){
		champIcon = champion97;
	}
	if (champID === 98){
		champIcon = champion98;
	}
	if (champID === 99){
		champIcon = champion99;
	}

	localStorage.setItem('quest-portrait', champID);
  const tryValue = v => {
	  updateValue(valueWithinLimits(v));
	  thumbStart();
  };
	let hnameE;
	// let fadeOutNoOne = this.props.fadeOutNoOne;
	let proceedThroughQuiz = props.proceedThroughQuiz;
	let namesi;
	
	//wash crashing on null so 
	
	{ const [champName, setChampName] = useState('Anseo'); }
	
	

	//thumbStart is a hack to prevent side effect of making question text fade out when player is at location 'geaga'.
	function thumbStart() {
		setShowDiv(true);
		document.querySelector(".champion-portrait").classList.add('fade-in-champ');
		document.querySelector(".names-i").classList.add('fade-in-champ');
		document.querySelector(".question-text").classList.add('fade-out-champ');
		document.querySelector(".tutorial0-container").classList.add('fade-out-champ');
		// document.querySelector(".button-mash-ring-4").classList.add('circle');	
		document.querySelector(".names-i").style.display='block';

		document.querySelector(".names-i").classList.add('fade-in-champ');
		// alert();
	} 
	

	var elementExists = document.getElementById("toggle-glass-btn");
if(elementExists){	document.querySelector("#toggle-glass-btn").classList.add('fade-out-champ');}

const [rng, setRng] = useState(Math.floor(Math.random()*3))
	
	if (rng === 0) {
	
	namesInIrish = [

		'Tassach',
		'Ádhamhnán',
		'Fionn',
		'Gormán',
		'Conlaodh',
		'Ciarán',
		'Naomhán',
		'Beag',
		'Rós',
		'Scothnait',
		'Étaín',
		'Sadhbh',
		'Cairbre',
		'Áine',
		'Ceara',
		'Lomán',
		'Aodnait',
		'Rúadhnait',
		'Gráinne',
		'Áinle',
		'Téide',
		'Flann',
		'Ana',
		'Dearbhail',
		'Éimhín',
		'Fechín',
		'Muadhnait',
		'Breasal',
		'Oisín',
		'Bláthnaid',
		'Ross',
		'Orthanach',
		'Ainbheartach',
		'Neamhain',
		'Éibhleann',
		'Tuathal',
		'Ógán',
		'Odhrán',
		'Onchú',
		'Sláine',
		'Saorla',
		'Deasmumhnaċ',
		'Tighearnán',
		'Bearach',
		'Lochlann',
		'Seanchán',
		'Marcán',
		'Cuán',
		'Móirne',
		'Uallachán',
		'Sléibhín',
		'Conán',
		'Breacán',
		'Gilleagán',
		'Dubhghlas',
		'Faolán',
		'Muirgheal',
		'Conall',
		'Niamh',
		'Séighín',
		'Meallán',
		'Meadhbh',
		'Donnchadh',
		'Lorcán',
		'Uasal',
		'Moncha',
		'Fial',
		'Sé',
		'Cathán',
		'Fionnbharr',
		'Suibhne',
		'Brion',
		'Nuala',
		'Oillín',
		'Oilithir',
		'Cassán',
		'Tómmán',
		'Bairrfhionn',
		'Ealadha',
		'Bébhinn',
		'Sárán',
		`Saoirse`,
		`Ciara`,
		`Laoise `,
		`Clíona`,
		`Úna`,
		`Eithne`,
		`Pádraig`,
		`Líam`,
		'Éanna',
		'Rónnad',
		'Neasa',
		'Cillian',
		'Olcán',
		'Lonán',
		'Treasa',
		'Sárnait',
		'Osnait',
		'Giolla-Padraig',
		'Echna'
	
	
	
	]

	
	namesInEnglish = [
		'idle; inactive',
		'the timorous one',
		'fair, white',
		'dark; swarthy',
		'prudent fire',
		'black',
		'of Naomh (saint)',
		'small',
		'rose or horse',
		'blossom, bloom',
		'jealousy',
		'sweet, goodly',
		'charioteer or bearer',
		'delight, pleasure',
		'fiery red',
		'bare',
		'God of Fire',
		'red-haired',
		'of the Sun',
		'hero, champion, warrior',
		'wantonness',
		'fiery red',
		'wealth or abundance',
		'Daughter of Fál (Ireland)',
		'prompt, ready',
		'raven or battle',
		'noble, good',
		'brave or strong in conflict',
		'little deer',
		'little flower',
		'headland',
		'potent in prayers or charms',
		'doer of evil deeds',
		'battle-fury, warlike frenzy, Celtic war goddess',
		'beauty, radiance',
		'Tully, ruler of the people',
		'Lad',
		'sallow',
		'fierce hound',
		'health, from a Celtic goddess name',
		'noble queen',
		'man from Desmond (Co. Cork)',
		'Lord',
		'pointed',
		'Viking',
		'old, ancient',
		'steed',
		'diminutive of Cu, meaning hound',
		'great',
		'little proud, arrogant one',
		'mountain man',
		'wolf',
		'freckled, speckled',
		'little lad',
		'blue black',
		'wolf',
		' sea-bright, sea-white',
		'strong as a wolf',
		'brightness, radiance',
		'hawk',
		'lightening',
		'she who intoxicates',
		'Dionysus brown lord',
		'cruel or fierce',
		'Noble',
		'after Macha, goddess of Sovereignty',
		'modest, honorable, generous',
		'hawk-like, noble',
		'battler',
		'fair haired',
		'well-going',
		'noble or high',
		'Fionnuala (white shoulders)',
		'little sprite, elf',
		'pilgrim',
		'little curly-haired one',
		'of Tuama',
		'fair-haired',
		'art, craft',
		'fair lady',
		'chief, noble, best',
		'freedom',
		'dark',
		'radience, light',
		'goddess of love and beauty, patron of County Cork. Also, queen of the banshees',
		'from uan \'lamb\'. Of truth, beauty, and unity',
		'There were at least nine Saint Eithnes',
'from the Latin Patricius, meaning of the patrician class',
'strong-willed warrior ',
'birdlike',
'seal',
'not gentle',
'church',
'wolf',
'blackbird',
'strength',
'chief, noble, best',
'deer',
'Pat Samurai',
'steed'
	]
}

if (rng === 1) {

	namesInEnglish = [
		'fair shouldered',
		'gracious, kindly	',
		'wealthy guardian',
		'servant or devotee of St. Mary',
		'sharp-faced',
		'world mighty',
		'dark-haired one',
		'flame',
		'ambrose spirited',
		'son of Ness (goddess name)',
		'born of song',
		'blonde lady',
		'thirsts for knowledge and goodness',
		'having land, wide-ruling',
		'sun-goddess',
		'rushing, impetuous',
		'lord, master',
		'born of the yew',
		'fellow hostage',
		'bright, radiant',
		'cloud or passionate, vehement',
		'servant of Jesus',
		'warlike; fierce',
		'little trapper',
		'beautiful, radiant',
		'deer lover',
		'bright headed',
		'brown princess',
		'proud; arrogant',
		'Juno	',
		'foam-white complexioned',
		'Love, affection',
		'hound of the plain',
		'ghostly frightening',
		'paleness; whiteness',
		'queenly',
		'little deer',
		'milk-white, milk-like',
		'grey servant',
		'great',
		'My light',
		'milk-white, milk-like',
		'rock,  white, Gaulish World King.',
		'ninne was the first word this saint spoke',
		'abundance, flood',
		'without injunction or envy',
		'comely, beautiful',
		'sea battler',
		'fire',
		'a place name in Co. Longford',
		'an early goddess, also Ireland',
		'sun-traveller, nobleman second to the king',
		'lightening',
		'ghost, spirit',
		'curly-haired',
		'strength of a man',
		'the charioteer',
		'battle lord',
		'servant of Christ',
		'from Latin secondus',
		'songful, poetic',
		'beautiful birth',
		'hound of the sea',
		'quarrel, argue',
		'sprite, elf',
		'daughter of Fionn',
		'grey, grey-blue',
		'dark man',
		'little lad',
		'royal poet',
		'servant, devotee of St. Seachnall',
		'blind',
		'dark foreigner',
		'prominent forehead',
		'rough',
		'dark-limbed, black-jointed',
		'erinn daughter of Fionn',
		'excellent, best',
		'the God of fire whose names means fire.',
		'good peace',
		'elevated place',
		'ancient',
		'battle-king',
		'traveller, wayfarer',
		'fawn',
		'fire',
		'saint',
		'Iar + Lug Celtic gods)',
		'blossom, bloom',
		'radiant blossom',
		'hero, champion',
		'high goddess',
		'town crier, scholar',
		'princess of the people',
		'vain, reckless, foolish',
		'blossom, bloom',
		'Stoat',
		'radiant girl',
		'fair',
		'Ulsterman',
		'noble princess',

	
	]

	namesInIrish = [
		'Fionnghuala',
		'Suaibhseach',
		'Éamonn',
		'Maol Mhuire',
		'Brocc',
		'Domhnall',
		'Teimhnín',
		'Daigh',
		'Anamcha',
		'Mac Nisse',
		'Aimhirghin',
		'Finnseach',
		'Íde',
		'Tíreachán',
		'Grian',
		'Robhartach',
		'Muireadhach',
		'Eoghan',
		'Comhghall',
		'Sorcha',
		'Niallán',
		'Mael Íosa',
		'Treasach',
		'Scannlán',
		'Aoife',
		'Osgar',
		'Ceallach',
		'Dunfhlaith',
		'Uallach',
		'Úna',
		'Uainionn',
		'Searc',
		'Cúmhaí',
		'Scáthach',
		'Báine',
		'Ríona',
		'Osán',
		'Lachtna',
		'Gormghiolla',
		'Mochta',
		'Molaisse',
		'Lachtnán',
		'Ailbhe',
		'Moinnine',
		'Tóla',
		'Diarmaid',
		'Liamhain',
		'Muircheartach',
		'Lasair',
		'Teafa',
		'Banbha',
		'Ánrothán',
		'Meallá',
		'Fionúir',
		'Cassair',
		'Fearghus',
		'Cormac',
		'Cathaír',
		'Giolla Chríst',
		'Seachlann',
		'Laoidheach',
		'Caoimhín',
		'Murchú',
		'Scannal',
		'Oilleóg',
		'Dairinn',
		'Glaisne',
		'Feardorcha',
		'Beagán',
		'Ríordán',
		'Maeleachlainn',
		'Dallán',
		'Dubhgall',
		'Tuileach',
		'Garbhán',
		'Dubhaltach',
		'Dáire',
		'Saraid',
		'Aodhán',
		'Síomha',
		'Teamhair',
		'Cian',
		'Fiachra',
		'Séadhna',
		'Damhnait',
		'Aodh',
		'Naomh',
		'Iarlugh',
		'Scoithín',
		'Scoithniamh',
		'Ruarc',
		'Bríghid',
		'Scolaí',
		'Tuathla',
		'Baoth',
		'Scoth',
		'Neasán',
		'Luiseach',
		'Finnén',
		'Ultán',
		'Nárbhflaith',
	
	
	]
}
if (rng === 2) {

	namesInIrish = [
		'Éanna',
		'Rónnad',
		'Neasa',
		'Cillian',
		'Olcán',
		'Lonán',
		'Treasa',
		'Sárnait',
		'Osnait',
		'Echna',
		'Seanán',
		'Easnadh',
		'Oillill',
		'Uaithne',
		'Bardán',
		'Síoda',
		'Iarfhlaith',
		'Eirnín',
		'Daimhín',
		'Fianait',
		'Tanaí',
		'Leannán',
		'Urard',
		'Lughaidh',
		'Iobhar',
		'Róisín',
		'Conn',
		'Cearbhall',
		'Colmán',
		'Íonait',
		'Muireann',
		'Eithne',
		'Deaglán',
		'Caoimhe',
		'Róinseach',
		'Ruaidhrí',
		'Geiléis',
		'Miach',
		'Labhrás',
		'Abbán',
		'Uaine',
		'Ólchobhar',
		'Nuadha',
		'Fearghal',
		'Rathnait',
		'Laoise',
		'Ailill',
		'Maolán',
		'Líobhan',
		'Laisrén',
		'Fachtna',
		'Maon',
		'Somhairle',
		'Neacht',
		'Buadhach',
		'Tadhg',
		'Muirín',
		'Niall',
		'Mór',
		'Aoibhegréine',
		'Conchobhar',
		'Mac Táil',
		'Rúadhán',
		'Mainchín',
		'Órlaith',
		'Éabha',
		'Deirdre',
		'Fionnait',
		'Labhraidh',
		'Brónach',
		'Suanach',
		'Taichleach',
		'Rónán',
		'Murchadh',
		'Laoire',
		'Ríoghán',
		'Tuilelaith',
		'Gobnait',
		'Fionntán',
		'Aonghus',
		'Áinfean',
		'Coinneach',
		'Torcán',
		'Earnán',
		'Cathal',
		'Gobán',
		'Deirbhile',
		'Caoilfhionn',
		'Gormlaith',
		'Fearchar',
		'Lasairfhiona',
		'Daighre',
		'Ámhra',
		'Séanait',
		'Samhradhán',
		'Tighearnach',
		'Uallgarg',
		'Aoibheann',
		'Muirne',
		'Líadan',
		'Órnait'
		 
	
	]
	namesInEnglish = [

		'birdlike',
		'seal',
		'not gentle',
		'church',
		'wolf',
		'blackbird',
		'strength',
		'chief, noble, best',
		'deer',
		'steed',
		'old, ancient',
		'musical sound',
		'sprite, elf',
		'greenish, from a tribal name',
		'poet, bard',
		'silk',
		'western kingdom',
		'iron',
		'deer or ox',
		'wild creature, deer',
		'slender, subtle',
		'sweetheart',
		'very tall',
		'light, brightness',
		'yew tree',
		'Norse word for horse. Also means little rose.',
		'wisdom, chief',
		'brave in sword-fighting, valorous',
		'from Latin \'dove\'',
		'faithful, pure, sincere',
		'sea fair',
		'kernal or gorse',
		'full of goodness',
		'beauty or grace',
		'seal',
		'red king',
		'bright swan',
		'honorable, proud',
		'laurel bush',
		'little abbot',
		'greenish, from a tribal name',
		'lover of drink',
		'possibly, cloud-maker: Celtic god name',
		'manly or valorous',
		'grace, prosperity',
		'girl',
		'elf',
		'warrior',
		'beauty of women',
		'flame',
		'malicious, hostile',
		'silent',
		'from Norse, summer wanderer',
		'pure',
		'Victorious',
		'Thaddeus, Theodosius, Theophilus, poet',
		'born of the sea',
		'cloud or passionate, vehement',
		'great',
		'radiance of the sun',
		'lover of hounds',
		'son of adze',
		'red haired',
		'monk',
		'golden princess',
		'Life',
		'chatterer or daughter. In legend Deirdre was the daughter of the royal storyteller Fedlimid mac Daill, at the court of the king of Ulster',
		'fair-haired, white',
		'speaker',
		'sorrowful',
		'drowsy',
		'placating, peacemaking',
		'little seal',
		'sea battler',
		'calf-herd',
		'little king',
		'lady of abundance of sovereignty',
		'smith',
		'white ancient/fire',
		'sole strength or true choice',
		'storm, fury, violence',
		'sorrowful',
		'wild boar',
		'iron',
		'strong in battle',
		'smith',
		'daughter of a poet',
		'fair and slender',
		'blue/illustrious princess',
		'friendly',
		'flame wine',
		'flame, fire',
		'very wonderful',
		'hawk',
		'summery person',
		'Lord',
		'fierce pride',
		'beautiful radiance',
		'high spirited, festive',
		'grey lady',
		'sallow',]
}
	

return (
	
	<>
			<div className="input-elements-container-7b">
<img src={betweenFields} className="between-fields" alt="a wheeling space between worlds" />
				
		</div>
<div className="input-elements-container-7">
		<img className="pawn-filter" src={pawn} alt="pawn-frame" />
				<img src={lensCap} className="lens-cap" alt="a fantasy landscape a ring of stones, a haunted tree" />
				<div className='tutorial-container'>
		
		<div className="tutorial0-container"></div>
		
			
			</div>
			</div>
	

		<p id="hints-ring-4" className={props.isOn ? "hints" : "hidden"}></p>
		
		{ props.isOn?<><img src={ogHero === "1" ?  avatar1  : empty} className="og-hero"  alt="hero portrait"/>
			
			<img src={ogHero === "2" ? avatar2 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "3" ? avatar3 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "4" ? avatar4 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "5" ? avatar5 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "6" ? avatar6 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "7" ? avatar7 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "8" ? avatar8 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "9" ? avatar9 :empty} className="og-hero"  alt="hero portrait"/>
			</>
			:null }


		
		{props.isOn ? <>
			
			<img src={tree} alt="a tree" className='tree' />
			<img src={opponent1} className="og-opponent" alt="opponent portrait" />
			
			<img src={ogHero === "2" ? avatar2 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "3" ? avatar3 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "4" ? avatar4 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "5" ? avatar5 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "6" ? avatar6 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "7" ? avatar7 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "8" ? avatar8 :empty} className="og-hero"  alt="hero portrait"/>
			<img src={ogHero === "9" ? avatar9 :empty} className="og-hero"  alt="hero portrait"/>
			<p x={100} y={100} className="names-i in-g" textAnchor="middle" dy="0.3em" fontWeight="bold">
					{hname = namesInIrish[Math.floor(value * 100) + round.current * 100]}
				</p>

                <h2 id="output2"> Maebh invites you to choose a pawn.</h2>
			
			</>
			:null }

				
			
		  		
			<div className="input-elements-container-8"  >
				
					<CircularInput  value={value} className="dial4" onChange={tryValue}  >
					<CircularTrack
					stroke="rgba(171,144,0,0)"
							strokeWidth={'3px'}
					/>

						<CircularThumb fill="rgba(135,5,2)"
							stroke="rgba(180,180,180,1)"
							strokeWidth={'3px'} />
				</CircularInput>
				


				</div>
		<div className="input-elements-container-5">
					
			<button className="button-mash-ring-4" onTouchStart={() => {
				setShowDiv(false);}}
						onClick={props.fadeOutNoOne} onTouchEnd={props.proceedThroughQuiz}>
						
						<img src={champIcon} className="champion-portrait " alt="champion portrait" />
								
				
					</button>
			
		  </div>
		
		  <p x={100} y={100} className="names-i" textAnchor="middle" dy="0.3em" fontWeight="bold">
						{hname = namesInIrish[Math.floor(value * 100) + round.current * 100]}
					</p>	
		{showDiv && props.isOn ? <>  <p className="names-e">
		{ namesInEnglish[ Math.floor(value * 100) + round.current * 100]}	
		</p></> : null}
			</>
			);
		}
	    

		// document.querySelector(".names-e").classList.add(''); 

