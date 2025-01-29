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
import tutorial0 from '../../images/tutorials/tutorial0.png';

import banba from './../../images/About1/banba_poster-0.png'
import brightland from './../../images/About1/ceist3.png'
import lasta from './../../images/About1/lasta.png'  //frog.gif'

import SampleHero from '../../images/About1/images/sample-hero.png'

import branch000 from '../../images/o-fortuna/0.png'
import branch001 from '../../images/o-fortuna/1.png'
import branch002 from '../../images/o-fortuna/2.png'
import branch003 from '../../images/o-fortuna/3.png'
import branch004 from '../../images/o-fortuna/4.png'
import branch005 from '../../images/o-fortuna/5.png'
import branch006 from '../../images/o-fortuna/6.png'
import branch007 from '../../images/o-fortuna/7.png'
import branch008 from '../../images/o-fortuna/8.png'
import branch009 from '../../images/o-fortuna/9.png'
import branch010 from '../../images/o-fortuna/10.png'
import branch011 from '../../images/o-fortuna/11.png'
import branch012 from '../../images/o-fortuna/12.png'
import branch013 from '../../images/o-fortuna/13.png'
import branch014 from '../../images/o-fortuna/14.png'
import branch015 from '../../images/o-fortuna/15.png'
import branch016 from '../../images/o-fortuna/16.png'
import branch017 from '../../images/o-fortuna/17.png'
import branch018 from '../../images/o-fortuna/18.png'
import branch019 from '../../images/o-fortuna/19.png'
import branch020 from '../../images/o-fortuna/20.png'
import branch021 from '../../images/o-fortuna/21.png'
import branch022 from '../../images/o-fortuna/22.png'
import branch023 from '../../images/o-fortuna/23.png'
import branch024 from '../../images/o-fortuna/24.png'
import branch025 from '../../images/o-fortuna/25.png'
import branch026 from '../../images/o-fortuna/26.png'
import branch027 from '../../images/o-fortuna/27.png'
import branch028 from '../../images/o-fortuna/28.png'
import branch029 from '../../images/o-fortuna/29.png'
import branch030 from '../../images/o-fortuna/30.png'
import branch031 from '../../images/o-fortuna/31.png'
import branch032 from '../../images/o-fortuna/32.png'
import branch033 from '../../images/o-fortuna/33.png'
import branch034 from '../../images/o-fortuna/34.png'
import branch035 from '../../images/o-fortuna/35.png'
import branch036 from '../../images/o-fortuna/36.png'
import branch037 from '../../images/o-fortuna/37.png'
import branch038 from '../../images/o-fortuna/38.png'
import branch039 from '../../images/o-fortuna/39.png'
import branch040 from '../../images/o-fortuna/40.png'
import branch041 from '../../images/o-fortuna/41.png'
import branch042 from '../../images/o-fortuna/42.png'
import branch043 from '../../images/o-fortuna/43.png'
import branch044 from '../../images/o-fortuna/44.png'
import branch045 from '../../images/o-fortuna/45.png'
import branch046 from '../../images/o-fortuna/46.png'
import branch047 from '../../images/o-fortuna/47.png'
import branch048 from '../../images/o-fortuna/48.png'
import branch049 from '../../images/o-fortuna/49.png'
import branch050 from '../../images/o-fortuna/50.png'
import branch051 from '../../images/o-fortuna/51.png'
import branch052 from '../../images/o-fortuna/52.png'
import branch053 from '../../images/o-fortuna/53.png'
import branch054 from '../../images/o-fortuna/54.png'
import branch055 from '../../images/o-fortuna/55.png'
import branch056 from '../../images/o-fortuna/56.png'
import branch057 from '../../images/o-fortuna/57.png'
import branch058 from '../../images/o-fortuna/58.png'
import branch059 from '../../images/o-fortuna/59.png'
import branch060 from '../../images/o-fortuna/60.png'
import branch061 from '../../images/o-fortuna/61.png'
import branch062 from '../../images/o-fortuna/61.png'
import branch063 from '../../images/o-fortuna/63.png'
import branch064 from '../../images/o-fortuna/61.png'



import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'
import { ThemeProvider } from 'react-bootstrap';
let showTheGlass = true; 
export function fenianBranches(props) {

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

		if(showTheGlass === false){
		showTheGlass = true;
		}
		else if (showTheGlass === true) { 
			showTheGlass = false;
		}
	}

	
	let Ring3AnsEng = [

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
		`The Plunderers	`,
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
		`New Branch`,
	`The Skiffs`	,
	`Coders`

	]


	let Ring3Ans = [

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
		`Na Dílseachta`,`Lile`,``,`Bárc`,`Códóir`,
		`Bhunaigh craobh nua`
		
		
		
		
		


	
	]





	function reportStepValue3 () {
		alert(showTheGlass);

	}

	function openHeroSelect() { 
		alert();

	}
	let isOn = props.isOn;

	function endAnimation() {
		setTimeout(function () {
			
		 },200)
	document.getElementById('settings-pearl').style.animation="none"
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
							

					
					<img className={value * 10 === 6 ? 'sample-hero  march-north'  : 'hidden'} src={SampleHero}  alt="little hero guy" />
						</div>

				<img className={value*10 === 6 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 7 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 8 ? '':'hidden'} src={banba} alt="a digital peninsula" />
				<img className={value*10 === 9 ? '':'hidden'} src={banba} alt="a digital peninsula" />


 <img className={value*10=== 0?'':'hidden'}src = {branch000} alt="fenian branch icon"/>
 <img className={value*10=== 1?'':'hidden'}src = {branch001} alt="fenian branch icon"/>
 <img className={value*10=== 2?'':'hidden'}src = {branch002} alt="fenian branch icon"/>
 <img className={value*10=== 3?'':'hidden'}src = {branch003} alt="fenian branch icon"/>
 <img className={value*10=== 4?'':'hidden'}src = {branch004} alt="fenian branch icon"/>
 <img className={value*10=== 5?'':'hidden'}src = {branch005} alt="fenian branch icon"/>
 <img className={value*10=== 6?'':'hidden'}src = {branch006} alt="fenian branch icon"/>
 <img className={value*10=== 7?'':'hidden'}src = {branch007} alt="fenian branch icon"/>
 <img className={value*10=== 8?'':'hidden'}src = {branch008} alt="fenian branch icon"/>
 <img className={value*10=== 9?'':'hidden'}src = {branch009} alt="fenian branch icon"/>
 <img className={value*10=== 10?'':'hidden'}src = {branch010} alt="fenian branch icon"/>
 <img className={value*10=== 11?'':'hidden'}src = {branch011} alt="fenian branch icon"/>
 <img className={value*10=== 12?'':'hidden'}src = {branch012} alt="fenian branch icon"/>
 <img className={value*10=== 13?'':'hidden'}src = {branch013} alt="fenian branch icon"/>
 <img className={value*10=== 14?'':'hidden'}src = {branch014} alt="fenian branch icon"/>
 <img className={value*10=== 15?'':'hidden'}src = {branch015} alt="fenian branch icon"/>
 <img className={value*10=== 16?'':'hidden'}src = {branch016} alt="fenian branch icon"/>
 <img className={value*10=== 17?'':'hidden'}src = {branch017} alt="fenian branch icon"/>
 <img className={value*10=== 18?'':'hidden'}src = {branch018} alt="fenian branch icon"/>
 <img className={value*10=== 19?'':'hidden'}src = {branch019} alt="fenian branch icon"/>
 <img className={value*10=== 20?'':'hidden'}src = {branch020} alt="fenian branch icon"/>
 <img className={value*10=== 21?'':'hidden'}src = {branch021} alt="fenian branch icon"/>
 <img className={value*10=== 22?'':'hidden'}src = {branch022} alt="fenian branch icon"/>
 <img className={value*10=== 23?'':'hidden'}src = {branch023} alt="fenian branch icon"/>
 <img className={value*10=== 24?'':'hidden'}src = {branch024} alt="fenian branch icon"/>
 <img className={value*10=== 25?'':'hidden'}src = {branch025} alt="fenian branch icon"/>
 <img className={value*10=== 26?'':'hidden'}src = {branch026} alt="fenian branch icon"/>
 <img className={value*10=== 27?'':'hidden'}src = {branch027} alt="fenian branch icon"/>
 <img className={value*10=== 28?'':'hidden'}src = {branch028} alt="fenian branch icon"/>
 <img className={value*10=== 29?'':'hidden'}src = {branch029} alt="fenian branch icon"/>
 <img className={value*10=== 30?'':'hidden'}src = {branch030} alt="fenian branch icon"/>
 <img className={value*10=== 31?'':'hidden'}src = {branch031} alt="fenian branch icon"/>
 <img className={value*10=== 32?'':'hidden'}src = {branch032} alt="fenian branch icon"/>
 <img className={value*10=== 33?'':'hidden'}src = {branch033} alt="fenian branch icon"/>
 <img className={value*10=== 34?'':'hidden'}src = {branch034} alt="fenian branch icon"/>
 <img className={value*10=== 35?'':'hidden'}src = {branch035} alt="fenian branch icon"/>
 <img className={value*10=== 36?'':'hidden'}src = {branch036} alt="fenian branch icon"/>
 <img className={value*10=== 37?'':'hidden'}src = {branch037} alt="fenian branch icon"/>
 <img className={value*10=== 38?'':'hidden'}src = {branch038} alt="fenian branch icon"/>
 <img className={value*10=== 39?'':'hidden'}src = {branch039} alt="fenian branch icon"/>
 <img className={value*10=== 40?'':'hidden'}src = {branch040} alt="fenian branch icon"/>
 <img className={value*10=== 41?'':'hidden'}src = {branch041} alt="fenian branch icon"/>
 <img className={value*10=== 42?'':'hidden'}src = {branch042} alt="fenian branch icon"/>
 <img className={value*10=== 43?'':'hidden'}src = {branch043} alt="fenian branch icon"/>
 <img className={value*10=== 44?'':'hidden'}src = {branch044} alt="fenian branch icon"/>
 <img className={value*10=== 45?'':'hidden'}src = {branch045} alt="fenian branch icon"/>
 <img className={value*10=== 46?'':'hidden'}src = {branch046} alt="fenian branch icon"/>
 <img className={value*10=== 47?'':'hidden'}src = {branch047} alt="fenian branch icon"/>
 <img className={value*10=== 48?'':'hidden'}src = {branch048} alt="fenian branch icon"/>
 <img className={value*10=== 49?'':'hidden'}src = {branch049} alt="fenian branch icon"/>
 <img className={value*10=== 50?'':'hidden'}src = {branch050} alt="fenian branch icon"/>
 <img className={value*10=== 51?'':'hidden'}src = {branch051} alt="fenian branch icon"/>
 <img className={value*10=== 52?'':'hidden'}src = {branch052} alt="fenian branch icon"/>
 <img className={value*10=== 53?'':'hidden'}src = {branch053} alt="fenian branch icon"/>
 <img className={value*10=== 54?'':'hidden'}src = {branch054} alt="fenian branch icon"/>
 <img className={value*10=== 55?'':'hidden'}src = {branch055} alt="fenian branch icon"/>
 <img className={value*10=== 56?'':'hidden'}src = {branch056} alt="fenian branch icon"/>
 <img className={value*10=== 57?'':'hidden'}src = {branch057} alt="fenian branch icon"/>
 <img className={value*10=== 58?'':'hidden'}src = {branch058} alt="fenian branch icon"/>
 <img className={value*10=== 59?'':'hidden'}src = {branch059} alt="fenian branch icon"/>
 <img className={value*10=== 60?'':'hidden'}src = {branch060} alt="fenian branch icon"/>
 <img className={value*10=== 61?'':'hidden'}src = {branch061} alt="fenian branch icon"/>
 <img className={value*10=== 62?'':'hidden'}src = {branch062} alt="fenian branch icon"/>
 <img className={value*10=== 63?'':'hidden'}src = {branch063} alt="fenian branch icon"/>
 <img className={value*10=== 64?'':'hidden'}src = {branch064} alt="fenian branch icon"/>
			




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
			<img rel="preload" src={tutorial0} className={value*10 === 0 ? 'avatar':'hidden' } id="tutorial0b" alt="a spinning arrow circle inviing user input" />
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
			
			<button id="settings-pearl"  onClick={props.toggleIsOn
			} onTouchEnd={ endAnimation}	><img src={isOn ? pearl : emerald} id="blank" alt="a crystal or precious stone toggle on off button" /></button>
			
			</>)
};

