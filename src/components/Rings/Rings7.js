// import * as React from "react";
import darkFields from '../../images/about2/stone-0.png'
import { render } from "react-dom";
import React, { useState, useEffect } from 'react'
import lens from '../../images/ciorcal-glass-light.png';
import empty from '../../images/empty.png';
import tutorial0 from '../../images/tutorials/tutorial0.png';
import fernaChallengeBG from '../../images/about3/shelter.png'
import lensCap from '../../images/About1/feicimthu.png'
import outerLocation from '../../images/ciorcal-glass6.png';
import emerald from '../../images/misc_crystal_new.png'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import ringfortBG from '../../images/about3/shelter.png'
import folamh from '../../images/empty.png'
import fromZero from '../../images/about2/stone-0.png'
import from7One from '../../images/players/draoi0.gif'
import from7Two from '../../images/players/draoi0.gif'
import from7Three from '../../images/players/draoi0.gif'
import from7Four from '../../images/players/draoi0.gif'
import from7Five from '../../images/players/draoi0.gif'
import from7Six from '../../images/players/draoi0.gif'
import from7Seven from '../../images/players/draoi0.gif'

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


import './tully-nally-style.css';
import './ferna-style.css';
import {
  CircularInput,
  CircularTrack,
  CircularThumb,
} from "react-circular-input";



export function Rings7(props) {
	let fernaP = document.getElementById('ferna-p')

	// document.getElementByClassName('names-i').style.opacity ="1";
	// document.getElementsByClassName('names-e').style.opacity="1";
  // Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {

	 })


	function hideText() { 
		alert();
	}
let ogHero = localStorage.getItem('portrait') 
	var ring7IrishText = [
		`
		`,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
		``,
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,
		``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
		``,
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,
		``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
		``,
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,		
		``,
		``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
``,		
		``,

		
		`Lorg fáinne?
		`,
		`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,`Lorg fáinne?
		`,
 
		];
	let fernaPortrait = setPlayerIcon();
	let ring7EnglishText = [
		
		
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		``,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
		`0`,
	`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`1
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`2
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`3
	`,`4
	`,`4
	`,`4
	`,`4
	`,`4
	`,`4
	`,`4
	`,`4		
	`,`4
	`,`4
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`5 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6 
	`,`6` 
	
		, `7`,
		`7`	,
		`7`	,
		`7`		,
		`7`		,
		`7`		,
		`7`		,
		`7`		,
		`7`		,
		`7`
		,


`seek ring?`
		,

		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring?`
		,
		`seek ring`
		,


];
	function fernaChallenge() { 
		document.getElementById('dir-pad').style.opacity='1'

		document.getElementById('ring-dial-5').style.display='none'
		document.getElementById('ferna-p').style.display='none'
		document.getElementById('binary-portrait').style.display='none'
		document.getElementById('ferna-challenge-bg').style.display='block'
		document.getElementById('ferna-challenge-bg').classList.add('fade-in-champ')	
		document.getElementById('n-id').innerHTML='Curdaigh gort a cúig';
		document.getElementById('e-id').innerHTML='Search field five';

		document.getElementById('bg-container-rings-7').style.opacity='0.5'
		// document.getElementById('bg-container-rings-7').setAttribute.src = {darkFields}
		document.getElementById('mash-5').style.display='none'	}
	const [value, setValue] = React.useState(0.1);
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
	if (value > 0 ||value < 0 ) { 
	
	}

	function buttonMashClick() { 
		



		
	}

	function setPlayerIcon() {
		fernaPortrait = localStorage.getItem('quest-portrait');
		
		// { localStorage.setItem('portrait',"")}
		
		switch (fernaPortrait) {
			case "0": return champion19;
			case "1": return champion1;
			case "2": return champion2;
			case "3": return champion3;
			case "4": return champion4;
			case "5": return champion5;
			case "6": return champion6;
			case "7": return champion7;
			case "8": return champion8;
			case "9": return champion9;
	
			case "10": return champion10;
			case "11": return champion11;
			case "12": return champion12;
			case "13": return champion13;
			case "14": return champion14;
			case "15": return champion15;
			case "16": return champion16;
			case "17": return champion17;
			case "18": return champion18;
			case "19": return champion19;
	
			case "20": return champion20;
			case "21": return champion21;
			case "22": return champion22;
			case "23": return champion23;
			case "24": return champion24;
			case "25": return champion25;
			case "26": return champion26;
			case "27": return champion27;
			case "28": return champion28;
			case "29": return champion29;
	
	
			case "30": return champion30;
			case "31": return champion31;
			case "32": return champion32;
			case "33": return champion33;
			case "34": return champion34;
			case "35": return champion35;
			case "36": return champion36;
			case "37": return champion37;
			case "38": return champion38;
			case "39": return champion39;
	
			case "40": return champion40;
			case "41": return champion41;
			case "42": return champion42;
			case "43": return champion43;
			case "44": return champion44;
			case "45": return champion45;
			case "46": return champion46;
			case "47": return champion47;
			case "48": return champion48;
			case "49": return champion49;
	
			case "50": return champion50;
			case "51": return champion51;
			case "52": return champion52;
			case "53": return champion53;
			case "54": return champion54;
			case "55": return champion55;
			case "56": return champion56;
			case "57": return champion57;
			case "58": return champion58;
			case "59": return champion59;
	
			case "60": return champion60;
			case "61": return champion61;
			case "62": return champion62;
			case "63": return champion63;
			case "64": return champion64;
			case "65": return champion65;
			case "66": return champion66;
			case "67": return champion67;
			case "68": return champion68;
			case "69": return champion69;
	
			case "70": return champion70;
			case "71": return champion71;
			case "72": return champion72;
			case "73": return champion73;
			case "74": return champion74;
			case "75": return champion75;
			case "76": return champion76;
			case "77": return champion77;
			case "78": return champion78;
			case "79": return champion79;
			case "80": return champion80;
			case "81": return champion81;
			case "82": return champion82;
			case "83": return champion83;
			case "84": return champion84;
			case "85": return champion85;
			case "86": return champion86;
			case "87": return champion87;
			case "88": return champion88;
			case "89": return champion89;
			case "90": return champion90;
			case "91": return champion91;
			case "92": return champion92;
			case "93": return champion93;
			case "94": return champion94;
			case "95": return champion95;
			case "96": return champion96;
			case "97": return champion97;
			case "98": return champion98;
			case "99": return champion99;
	
			default:  return champion99;
		}
	}

	
  const updateValue = v => {
    diff.current = v - prevValue.current;
    if (diff.current > 0.8) round.current--;
    if (diff.current < -0.8) round.current++;
    prevValue.current = v;
    setValue(v);
  };
	let binaryIcon = folamh;
	let binaryID = Math.floor(value * 100);
	if (binaryID === 0) {
		
	 }
	// localStorage.setItem('quest-portrait', champID);
	if (binaryID >= 0 && binaryID <= 10) {
	
	}
	if (binaryID >= 11 && binaryID <= 20){
		fernaP.style.top = '10%'
		fernaP.style.left = '60%'
		
		
		document.getElementById('tut-5').classList.add('fade-out-champ')
	}
	if (binaryID >= 21 && binaryID <= 30){
		fernaP.style.transform = 'rotate(0deg)'
		binaryIcon = from7One;
		fernaP.style.top = '30%'
		fernaP.style.left = '56%'
		document.getElementById('tut-5').classList.add('fade-out-champ')
	}
	if (binaryID >= 31 && binaryID <= 40){
		fernaP.style.transform = 'rotate(90deg)'
		document.getElementById('tut-5').classList.add('fade-out-champ')

		binaryIcon = from7Two;

		fernaP.style.top = '50%'

		fernaP.style.left = '60%'
		// fernaP.style.transform = 'scaleX(1)';
		// fernaP.style.transform = 'scaleY(-1)';

	}
	if (binaryID >= 41 && binaryID <= 50){
		binaryIcon = from7Three;
		fernaP.style.top = '64%'

		fernaP.style.left = '55%'	
		fernaP.style.transform = 'rotate(118deg)';
		
	}
	if (binaryID >= 51 && binaryID <= 60){
		binaryIcon = from7Four;
fernaP.style.transform = 'rotate(180deg)'


		fernaP.style.top = '70%'
		fernaP.style.left = '43%'	
		fernaP.style.zIndex = '4000'
		

	}
	if (binaryID >= 61 && binaryID <= 70){
		binaryIcon = from7Five;


		fernaP.style.top = '45%'
		fernaP.style.left = '30%'
		fernaP.style.zIndex = '4'
		
		fernaP.style.transform = 'rotate(270deg)';
		
	}
	if (binaryID >= 71 && binaryID <= 80){
		binaryIcon = from7Six;


		fernaP.style.top = '30%'
		fernaP.style.left = '32%'	
		fernaP.style.transform = 'rotate(0deg)';
		
		// document.getElementById('bg-container-rings-7').classList.remove('circle')
	}
	if (binaryID >= 81 && binaryID <= 100){
		binaryIcon = from7Seven;

		fernaP.style.top = '21%'
		fernaP.style.left = '38%'	
		
		// document.getElementById('bg-container-rings-7').classList.add('circle')
		
		
	}
	if (binaryID === 100) {
		//show buttonmash with colors.gif.
	}
	

	const tryValue = v => {
	  updateValue(valueWithinLimits(v));
	  thumbStart()
  };
	let hname;
	let hnameE;
	// let fadeOutNoOne = this.props.fadeOutNoOne;

//thumbStart is a hack to prevent side effect of making question text fade out when player is at location 'geaga'.
function thumbStart() { 
	document.querySelector(".champion-portrait").classList.add('fade-in-champ');
	document.querySelector(".numbers-e").classList.add('fade-in-champ'); document.querySelector(".numbers-i").classList.add('fade-in-champ');
	document.querySelector(".question-text").classList.add('fade-out-champ');

} 

	
	return (

		<>
			<div className="ferna-ring">
		<img id="ferna-lens" rel="preload" src={outerLocation} className="question-img" alt="dark green fields background" />	
			<div id="bg-container-rings-7" className="bg-container "><img src={ ringfortBG} alt="a ringfort." /></div>
			<div className="ring-7-binary-container">
			
			<img src={binaryIcon} id='binary-portrait' className="binary-portrait" alt="representation of binary numbers in stone" />
	  </div> 

<img src={fernaPortrait} id="ferna-p" className="champion-portrait ferna-portrait" alt="champion portrait" />
				{/* <div className="ring-5-lens-cap-container"> */}
{/* <img src={lensCap} className="lens-cap" alt="a fantasy landscape a ring of stones, a haunted tree" /> */}
			{/* </div> */}
	 
		
			 
			 <div id="ring-dial-7" className="ring-7-dial-container">
			 <CircularInput value={value} className="dial dial7" onChange={tryValue}>
				<CircularTrack
				stroke="rgba(185,230,5,1)"
						strokeWidth={'3px'}
				/>
				<CircularThumb  fill="rgba(7, 42, 108,1)"
					stroke="rgba(255, 195, 0 ,1)" 	
							strokeWidth={'3px'}/>
			</CircularInput>
			
			


			{/* <img src={ogHero === "9" ? avatar9 :empty} className="og-hero"  alt="hero portrait"/> */}
			
			</div>

			<div className="ring-text-container-7" >
			
			<p x={100} y={100} id="n-id" className="numbers-i" textAnchor="middle" dy="0.3em" fontWeight="bold">
        {  ring7IrishText[ Math.floor(value * 100) + round.current * 100]}
				</p>
				
				<p id="e-id" className="numbers-e" >
				{ 
					  ring7EnglishText[ Math.floor(value * 100) + round.current * 100]

				}	
				</p>
				<div className="binary-portrait-container">
					

				
							
					</div>
				</div>

				<div className="tut-ring-5-container">
				<img id="tut-5" src={tutorial0} className="tutorial0 tut-ring5 spin tullynally-zoom"alt="spinning arrow" /></div>
	</div>				
	<div className="ring-5-button-mash-container"> 
			 
			 <button  id="mash-5"className={ binaryID >=91? "button-mash-ring-5 circle":"hidden" } onClick={fernaChallenge} ></button>
			</div>
			<div id="ring-5-challenge-container"className="challenge-container">
				<img id="ferna-challenge-bg" src={fernaChallengeBG} alt="" />
			</div>
		</>
			);
}

/*
this place isn't the point.
Next step is to have a place where to the player can return and throw the rings they've gathered. 
there is a small chance that they can throw the ring and it lands in the field in which the Hero stands; and then the game is won. Player can create and push a new map element - their own ringfort. it starts to rain and bg becomes concentric raindrops pattern. New options available on main screen; develop ringfort. beginning with the text content of what is there in English and Irish when visitors turn the ring. Later, images. this will involve a mongodb backend; so having gotten this far; visitors are invited to register their champion with an email address; with optional newsletter and also to add player nickname; view player stats etc.

More likely though, the ring skims across the wheeling stars and lands in a random field in Ireland and the task will be to go find it. It lands as a red cent with a horse on it, and a rider on the horse. Can be traded for food, clothes and provisions.  game continues with wolves and bandits, I suppose? Serpents and devils?
many short humorous, heroic, engaging but avoidable npc encounters.
It's mostly a game, but playing in Irish, every action is an intellectual achievement. 
So let's reward participation. 
*/
