import React, { useState } from 'react';
import './rings1.css';
import lens from '../../images/ciorcal-glass.png';
import emerald from '../../images/misc_crystal_new.png'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import ReactAudioPlayer from 'react-audio-player';
import spark0 from '../../audio/ding0.wav';
import spark1 from '../../audio/ding1.wav';
import spark2 from '../../audio/ding2.wav';
import spark3 from '../../audio/ding0.wav';
import spark4 from '../../audio/ding2.wav';

import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'
import { ThemeProvider } from 'react-bootstrap';
let showTheGlass = true; 
export default function Rings1(props) {

	const [value, setValue3] = React.useState(0);
	
	// const [value, setValue] = React.useState(initialValue);
	const stepValue3 = v => Math.round(v * 10) / 10;
	
	localStorage.setItem('ring0', value * 10);
	//	'I feel the smell of a melodious lying Irishman under my sod of country.'
	//
	
	// Ní Eireannaċ binn breugaċ mise,
// 	// /No melodious lying Irishman am I,
	
// 	“And what is the wages you’ll be looking for?”

// “The place of a house and garden.”

// “You’ll get that if my journey succeeds with me.”
	
	
	/*
	
	“I’ll bring you away from her side without her knowing it, when you are both asleep together, and I’ll bring you back to her the same way,” said the little man.
	
	*/
	function showHints() { 
		console.log("showTheGlass")

		if(showTheGlass === false){
		showTheGlass = true;
			console.log(showTheGlass)
		}
		else if (showTheGlass === true) { 
			showTheGlass = false;
			console.log(showTheGlass)
		}
	}

	
	let gottenRings0 = 0;
	let Ring2AnsEng = ['',
		'Hup!',
		'God be with you',
		'Who are you yourself?',
		'Where am I?',
		'What is this?',
		'En garde!',
		'How is it going?',
		'Which way are you?',
		'Goodbye',
	]


	
	let Ring2Ans = ['',
	
	// 'Ó Thuaidh',	
// 	'"Cé tú féin?"',
// 		'"Cá bhfuil mé?"',
		
'Hup',
'Dia dhuit',
		'Cé tú féin?',
	'Cá bhfuil mé?',
		'Cad é seo?',
		'Ar aire!',
		'Go dté mar atá?',
		'Cén chaoí a bhuil tú?',
		'Slán.',

	
	]
	function reportStepValue3 () {
		alert(showTheGlass);
		console.log(showTheGlass);
		console.log("showTheGlass");

	}
	return (
		<>
			
			<div className="input-elements-container2">
		<img src={lens} id="lens" alt="a glass lens" />
			
		<div className="input-elements-container">
			
				<CircularInput className="dial" value={value}  onChange={v => setValue3(stepValue3(v))}>{}
					<CircularTrack />
			{/* <img  src={avatar} className={value === 0 ? 'hidden':'avatar' } alt="Caniuse battus tv charactéir" />		 */}
				
			<CircularProgress />
					<CircularThumb />
				
			</CircularInput>
			</div>
		<p className='rings1' >{Ring2Ans[value * 10]}</p>


			<h1>{ props.isOn}</h1>
			{props.isOn ? <p className="rings0Eng">{Ring2AnsEng[value * 10]}</p> : null}
			{ localStorage.setItem('freagra1', value * 10)
}
			<button id="ring-glass-btn" onClick={props.toggleIsOn
			}	><img src={props.isOn ? pearl : emerald} id="blank" alt="a crystal or precious stone toggle on off button" /></button>
			

				<div className="input-elements-container3">
					
			<button className="button-mash-ring-0" onClick={props.buttonMashClick}></button>
</div>
			<ReactAudioPlayer src={value*10 === 1 ? spark0: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 2 ? spark1: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 3 ? spark2: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 4 ? spark3: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 5 ? spark2: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 6 ? spark1: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 7 ? spark4: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 8 ? spark0: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 9 ? spark0: null} autoPlay />
			
			</div>			
		</>)
};


