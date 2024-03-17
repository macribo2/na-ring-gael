import React, { useState } from 'react';
import leftImage from '../../images/maskLeft.png'; // Replace with the actual path to your left image
import rightImage from '../../images/maskRight.png'; // Replace with the actual path to your right image

import './rings1.css';
import bigGlass from '../../images/big-glass.png'
import lens from '../../images/ciorcal-glass.png';
import lensBG from '../../images/tNa0.png';
import emerald from '../../images/misc_crystal_new.png'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import ironkey from '../../images/stone-soup/lord-iron-key2.png';
import ReactAudioPlayer from 'react-audio-player';
import spark0 from '../../audio/coin3.ogg';
import blackripple from '../../images/blackripple.gif';
import tutorial0 from '../../images/tutorials/tutorial0.png';

import banba from './../../images/About1/banba_poster-0.png'
import about0 from './../../images/About1/adaptive-icon.png'
import brightland from './../../images/About1/ceist3.png'
import gold from './../../images/gold.png'
import about1 from './../../images/About1/fi.png'
import about2 from './../../images/you-see.gif'
import wisp from './../../images/color-square.gif'
import about3 from './../../images/blinding-light.jpg'
import about4 from './../../images/About1/ceist2.png'  //frog.gif'
import lasta from './../../images/About1/lasta.png'  //frog.gif'
import about5 from './../../images/About1/Daniel-Maclise.png'
import about9 from './../../images/About1/computing.png'
import circuits from './../../images/About1/computing.png'
import binary from './../../images/About1/computing.png'
import about6 from './../../images/field.png'
import fieldCircle from './../../images/ciorcal-field.png'
import passage from './../../images/overworld/passage.png'
import circleBG from './../../images/ciorcal-glass-bg.png'
import linucsLand from './../../images/About1/backgrounds/bg-linux-land.gif'
import SampleHero from '../../images/About1/images/sample-hero.png'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'
import { ThemeProvider } from 'react-bootstrap';
let showTheGlass = true; 
export default function Rings3(props) {

	const [value, setValue3] = React.useState(0);
	
	// const [value, setValue] = React.useState(initialValue);
	const stepValue3 = v => Math.round(v * 10) / 10;
	
	localStorage.setItem('ring0', value * 10);


	
// 	“And what is the wages you’ll be looking for?”

// “The place of a house and garden.”

// “You’ll get that if my journey succeeds with me.”
	
	
	/*
	
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

	
	let Ring3AnsEng = [
		`
		`, 
		`The ring turns`, 
		`The ring shines`,
``,
`play`,
		 		
		 `to return to Éire`,
		 `to return to Éire`,	
		 `to return to Éire`,
		 `to return to Éire`,
		 `to return to Éire`,
		
		``, ``, ``,
	]


	let Ring3Ans = [

		``,
		`casann an fáinne`,
		`lasann an fáinne`,			
		`	`,
		`imir`,
		`le filleadh go hÉireann`,
		`le filleadh go hÉireann`,	
		`le filleadh go hÉireann`,	
		`le filleadh go hÉireann`,	
		`le filleadh go hÉireann`,	
		 
		``,
		``,
		``,

	
			// `T .`


	
	]





	function reportStepValue3 () {
		alert(showTheGlass);
		console.log(showTheGlass);
		console.log("showTheGlass");

	}

	function openHeroSelect() { 
		alert();

	}
	let isOn = props.isOn;

	function endAnimation() {
		setTimeout(function () {
			
		 },200)
	document.getElementById('pearl').style.animation="none"
	}


	return (
		<>


			 <div className="input-elements-container0">

			
		<div className="input-elements-container3">
				
				{/* <img className={value * 10 === 2 ? 'about-pics' : 'hidden'} src={about5} id="about3c" alt="illustration placeholder" /> */}
			</div>

				<div className="input-elements-container">
{/* 
					<div className="about-gold-container"> 
					<img className={value*10 === 0 ? 'about-pics':'hidden'} src={gold} alt="desktop folder and cursor" />
					<img className={value*10 === 1 ? 'about-pics-spin':'hidden'} src={gold} alt="desktop folder and cursor" />
					<img className={value*10 === 2 ? 'about-pics':'hidden'} src={gold} alt="desktop folder and cursor" />
					<img className={value*10 === 3 ? 'about-pics':'hidden'} src={gold} alt="desktop folder and cursor" />
				</div> */}
					
					<div className="about-pics-container">

					<div className="linux-land-container">
							<img className={value * 10 === 5 ? 'fade-in-slow' : 'hidden'} src={linucsLand} id="linux-land" alt="illustration placeholder" />

					<img className={value * 10 === 6 ? 'fade-out-slow ' : 'hidden'} src={linucsLand}  id="linux-land" alt="a distant castle in green fields" />
					<img className={value * 10 === 6 ? 'sample-hero  march-north'  : 'hidden'} src={SampleHero}  alt="little hero guy" />
						</div>

				<img className={value*10 === 6 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 7 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 8 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 9 ? '':'hidden'} src={banba} alt="a digital peninsula" />
						
					{/* <img className={value*10 === 1 ? 'about-pics':'hidden'} src={about1} alt="desktop folder and cursor" /> */}
						
						{/* <img className={value * 10 === 2 ? 'about-pics' : 'hidden'} src={fieldCircle} id="about3b" alt="illustration placeholder" />
						
					 */}
					 {/* <img className={value*10 === 2 ? 'about-pics':'hidden'} src={about1} alt="desktop folder and cursor" /> */}
						
						
					{/* <img className={value*10 === 2 ? 'about-pics':'hidden'} src={about5} id="about3b"alt="illustration placeholder" /> */}
			
						{/* <img className={value * 10 === 3 ? 'about-pics' : 'hidden'} src={about9} id="about4" alt="illustration placeholder" /> */}
						
					{/* <img className={value*10 === 7 ? 'about-pics':'hidden'} src={about4}  id="about4" alt="illustration placeholder" /> */}
					{/* <img className={value*10 === 4 ? 'about-pics':'hidden'} src={about6} alt="illustration placeholder" /> */}
					{/* <img className={value*10 === 7 ? 'about-pics':'hidden'} src={about0} alt="illustration placeholder" /> */}
				
					<div className='fader'>
			<img rel="preload" src={tutorial0} className={value*10 === 0 ? 'avatar':'hidden' } id="tutorial0" alt="a spinning arrow circle inviing user input" />
			</div>
					</div>
				<div className="about-overlay-container">
			

						{/* <img className={value * 10 === 7 ? 'passage' : 'hidden'} src={passage} alt="Serpant dungeon passage enterance" /> */}


						<img className={value * 10 === 8 ? 'about-pics' : 'hidden'} src={ironkey} id="iron-key-linux" alt="A figure entirely clad in armour." />
						
				</div>
		
		</div>
	

					
				<div className={value * 10 === 4 ? "linux-lens-container" : "hidden"}>

			

				<img rel="preload" className="right-image"  src={rightImage} alt="blocker to mask screenspace on wider screens" />
				<img rel="preload" className={value * 10 === 4 ? "map-lens" : "hidden"} src={lensBG} alt="" />
				<img rel="preload" className= "left-image" src={leftImage} alt="blocker to mask screenspace on wider screens" />
				</div>
				
				
				<div className={value * 10 === 3 ? "linux-lens-container-fade-in" : "hidden"}>
					<img rel="preload" className={value * 10 === 3? "map-lens" : "hidden"} src={lensBG} alt="" />
					
				</div>
				
				
				<div className={value * 10 === 5 ? "linux-lens-container" : "hidden"}>
				<img rel="preload" className={value * 10 === 5 ? "map-lens" : "hidden"} src={lensBG} alt="" />
				</div>

				<div className={value * 10 === 6 ? "linux-lens-container-fade" : "hidden"}>
				<img rel="preload" className={value * 10 === 6 ? "map-lens" : "hidden"} src={lensBG} alt="" />
				</div>
					
				
			<ReactAudioPlayer src={value*10 === 1 ? spark0: null} autoPlay />
			{/* <ReactAudioPlayer src={value*10 === 2 ? spark1: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 3 ? spark2: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 4 ? spark3: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 5 ? spark2: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 6 ? spark1: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 7 ? spark4: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 8 ? spark0: null} autoPlay />
			<ReactAudioPlayer src={value*10 === 9 ? spark0: null} autoPlay /> */}




{ localStorage.setItem('freagra1', value * 10)
}

		<div className="lens-container">
		{/* <button className={value*10 === 99 ? 'easca-code_0':'hidden'}>pwd</button>
		<button className={value*10 ===99 ? 'easca-code_1':'hidden'}>ls</button>
		<button className={value*10 ===99 ? 'easca-code_2':'hidden'}>cd</button> */}

		</div>			 
	
{isOn ? <p className="rings0Eng">{Ring3AnsEng[value * 10]}</p> : null}
<img src={lens} id="lens" alt="a glass lens" />

		</div>

		
			<div className="input-elements-container2">
						
					
					<img className={value * 10 === 2 ? 'bright' : 'hidden'} src={lasta}
					alt="a circle of bright light." />
					<img className={value * 10 === 3 ? 'banba2' : 'hidden'} src={brightland} alt="a bright land." />
					<img className={value * 10 === 4 ? 'banba2 fade-out-slow' : 'hidden'} src={brightland} alt="a bright land." />
			</div>
			<div className="input-elements-container4">
			
					<img className={value * 10 === 3 ? 'bright-out' : 'hidden'} src={lasta} alt="a circle of bright light."/>
			</div>
			
				
				<div className="input-elements-container4">

				{/* <img className={value*10 === 4 ? 'ripple':'hidden'} src={blackripple} alt="a digital peninsula" /> */}
</div>		

<div className='dial-container'>

<CircularInput className="dial" value={value}  onChange={v => setValue3(stepValue3(v))}>{}
					<CircularTrack stroke="rgb(130,110,0)"
					strokeWidth={'3px'}
					/>
			{/* <img  src={avatar} className={value === 0 ? 'hidden':'avatar' } alt="Caniuse battus tv charactéir" />		 */}
				
					<CircularProgress
					border="rgba(255,250,5,0)"
						stroke="rgba(195,150,5,0.8)"
						
						strokeWidth={'3px'}/>
					<CircularThumb      fill="rgba(135,5,2)"
        stroke="rgba(180,180,180,1)"
        strokeWidth={'3px'}/>
				
			</CircularInput>
			</div>	
	

			
<div className="button-mash-container">
				<button className={value * 10 === 9 ? 'button-mash-ring-0 circle' : 'hidden'}onClick={() => props.handleInputSelect('gamepad')} >
				
						{/* <img className={value * 10 === 9 ? 'wisp' : 'hidden'}src={wisp} alt="A dancing light that can lead people astray" />
	 */}
				</button>

				<button className={value * 10 === 8 ? 'button-mash-ring-0 circle' : 'hidden'}onClick={() => props.handleInputSelect('gamepad')} >
				
				{/* <img className={value * 10 === 8 ? 'wisp' : 'hidden'}src={wisp} alt="A dancing light that can lead people astray" /> */}

				</button>
				<button className={value * 10 === 7 ? 'button-mash-ring-0 circle' : 'hidden'}onClick={() => props.handleInputSelect('gamepad')} >
				
						{/* <img className={value * 10 === 7 ? 'wisp' : 'hidden'}srcn={wisp} alt="A dancing light that can lead people astray" /> */}
	
				</button>
			
				<button className={value * 10 === 5? 'button-mash-ring-0 circle' : 'hidden'}onClick={() => props.handleInputSelect('gamepad')} >
				
						{/* <img className={value * 10 === 6 ? 'wisp' : 'hidden'}src={wisp} alt="A dancing light that can lead people astray" /> */}
	
				</button>
				<button className={value * 10 === 6 ? 'button-mash-ring-0 circle' : 'hidden'} onClick={() => props.handleInputSelect('gamepad')} >
				
						{/* <img className={value * 10 === 6 ? 'wisp' : 'hidden'}src={wisp} alt="A dancing light that can lead people astray" /> */}
	
				</button>





			</div>
<p className='rings1' >{Ring3Ans[value * 10]}</p>
			
			<button id="pearl"  onClick={props.toggleIsOn
			} onTouchEnd={ endAnimation}	><img src={isOn ? pearl : emerald} id="blank" alt="a crystal or precious stone toggle on off button" /></button>
			
			</>)
};


