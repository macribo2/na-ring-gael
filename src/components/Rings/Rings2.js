import React, { useState } from 'react';
import './rings1.css';
import bigGlass from '../../images/big-glass.png'
import lens from '../../images/ciorcal-glass.png';
import lensBG from '../../images/ciorcal-glass2.png';
import emerald from '../../images/misc_crystal_new.png'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import ironkey from '../../images/stone-soup/lord-iron-key2.png';
import ReactAudioPlayer from 'react-audio-player';
import spark0 from '../../audio/ding0.wav';
import spark1 from '../../audio/ding1.wav';
import spark2 from '../../audio/ding2.wav';
import spark3 from '../../audio/ding0.wav';
import spark4 from '../../audio/ding2.wav';
import banba from './../../images/About1/ceist2.png'
import about0 from './../../images/About1/adaptive-icon.png'
import about1 from './../../images/About1/fi.png'
import about2 from './../../images/you-see.gif'
import wisp from './../../images/color-square.gif'
import about3 from './../../images/blinding-light.jpg'
import about4 from './../../images/About1/ceist2.png'  //frog.gif'
import about5 from './../../images/About1/Daniel-Maclise.png'
import about9 from './../../images/About1/computing.png'
import circuits from './../../images/About1/computing.png'
import binary from './../../images/About1/computing.png'
import about6 from './../../images/field.png'
import fieldCircle from './../../images/ciorcal-field.png'
import passage from './../../images/overworld/passage.png'
import circleBG from './../../images/ciorcal-glass-bg.png'
import linucsLand from './../../images/About1/backgrounds/background_image.png'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb
} from 'react-circular-input'
import { ThemeProvider } from 'react-bootstrap';
let showTheGlass = true; 
export default function Rings2(props) {

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

	
	let gottenRings0 = 0;

	let Ring3AnsEng = [
		` And where are you yourself? (pwd)`,`in a little field called home.`,`What's in the field? (ls)`,
`The UNIX code Kernel was written in 1969, in the USA.),`
, `
Unix is protected by copyright, similarly Windows or Apple`, `In 1991 Linus Torvaled, a person, released a kernel of UNIX-like code into the public domain.`, `
As distinct from The Open Group's UNIX, Microsoft's Windows and Macintosh's Apple Software; Linux operating systems are a free public resource.`, `The sourcecode is maintained by a community.`, `s
`, `
...`, `...An Irish version of this here soon. If you want to jump ahead with the English language instructions here: https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview`, `Backup! If there is anything at all on the computer to be kept, save it now.`, `All data and software will be irretrievably lost when you replace Windows or Apple with Linux.`, `Everything should be backed up x3 on storage devices/cloud before proceeding.`,'',
		'Hup!',
		'God be with you',
		'Who are you yourself?',
		'Where am I?',
		'What is this?',
		'En garde!',
		'How is it going?',
		'Which way are you?',
		'Goodbye'
	]

	let RingAnsEng4 = [
		
		

	]
	let Ring2AnsEng = [
		`What is this about?`, 
		`Use Irish, to play a game.`, 
		`That is, Iron-key.`,
		 `More to follow.`,		
		`Choose a player and create a legend. `,
		`Easy Peasy.`,
		
		`That you may succeed...`,
		`There is a heavy door in PollyPucka`,
		 ``, ``, ``,
	]


	let Ring4Ans = [
	
		]
	let Ring2Ans = [
		`Cad faoi atá sé seo?`,
		`Usáid an Gaeilge, chun cluiche a imirt.`,
		`Sin é, iron-key.`,
		`Beidh tuilleadh ar ball.`,	
		'Roghnaigh imreoir agus cruthaigh finnsceal.',	
		`Éasca péasca.`, 
 
		`Go néirigh leat... `,
		`Tá doras trom i Poll an Púca...`,

		``,
		``,
		``,

	
			// `T .`


		`\Seo JSON:`,

`scéalaí an gréasán`,
`{	
	"JSON": "Nodaireacht Oibiachtaí JavaScript"
}`,

`
{"userName":"Pádraiġ"}
`,
`Seo sampla eile:`,
`   {
	"youSay":"foighne",
	"ISay":"fáinne"
}`,



		`Scríobhadh eithne UNIX i saotharlann Bell 1969, sna SAM.`,
		`
		I 1991, scaoíl Linus Torvalds cód eithne  ar an dearadh UNIX.`,
		`Murab ionann UNIX, Windows nó Apple, is foinse oscailte poiblí is ea Linux.`,
'Hup',
		`goirtín an baile.`,
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
	return (
		<>
			
			<div className="input-elements-container2">
		<img src={circleBG} id="circleBG" alt="a glass lens" />

			
		<div className="input-elements-container3">
				
				<img className={value * 10 === 2 ? 'about-pics' : 'hidden'} src={about5} id="about3c" alt="illustration placeholder" />
			</div>

				<div className="input-elements-container">
					
				<div className="about-pics-container">
					<img className={value*10 === 0 ? 'about-pics':'hidden'} src={about1} alt="desktop folder and cursor" />
					<img className={value*10 === 1 ? 'about-pics':'hidden'} src={about1} alt="desktop folder and cursor" />
						
						<img className={value * 10 === 2 ? 'about-pics' : 'hidden'} src={fieldCircle} id="about3b" alt="illustration placeholder" />
						
					
						
						
					{/* <img className={value*10 === 2 ? 'about-pics':'hidden'} src={about5} id="about3b"alt="illustration placeholder" /> */}
			
						<img className={value * 10 === 3 ? 'about-pics' : 'hidden'} src={about9} id="about4" alt="illustration placeholder" />
						
					<img className={value*10 === 7 ? 'about-pics':'hidden'} src={about4}  id="about4" alt="illustration placeholder" />
					<img className={value*10 === 4 ? 'about-pics':'hidden'} src={about6} alt="illustration placeholder" />
					<img className={value*10 === 7 ? 'about-pics':'hidden'} src={about0} alt="illustration placeholder" />
				</div>
				<div className="about-overlay-container">
			

						<img className={value * 10 === 7 ? 'passage' : 'hidden'} src={passage} alt="Serpant dungeon passage enterance" />


						<img className={value * 10 === 8 ? 'about-pics' : 'hidden'} src={ironkey} id="iron-key-linux" alt="A figure entirely clad in armour." />
						
				</div>
		
		</div>
	
				<div className="linux-land-container">

					<img className={value*10 === 5 ? 'about-pics':'hidden'} src={linucsLand}  id="linux-land-down" alt="illustration placeholder" />
					<img className={value*10 === 4 ? 'about-pics':'hidden'} src={linucsLand}  id="linux-land" alt="illustration placeholder" />
				</div>
				<div className={value * 10 === 4 ? "linux-lens-container" : "hidden"}>
					<img rel="preload" className={value * 10 === 4 ? "map-lens" : "hidden"} src={lensBG} alt="" />
					
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
			</div>			

			<p className='rings1' >{Ring2Ans[value * 10]}</p>


			<h1>{isOn}</h1>
			{isOn ? <img className="bg-glass"src={ bigGlass} alt="tinted overlay to dim background"/>:null}
{isOn ? <p className="rings0Eng">{Ring2AnsEng[value * 10]}</p> : null}
{ localStorage.setItem('freagra1', value * 10)
}
<button id="ring-glass-btn" onClick={props.toggleIsOn
}	><img src={isOn ? pearl : emerald} id="blank" alt="a crystal or precious stone toggle on off button" /></button>
		<div className="lens-container">
		{/* <button className={value*10 === 99 ? 'easca-code_0':'hidden'}>pwd</button>
		<button className={value*10 ===99 ? 'easca-code_1':'hidden'}>ls</button>
		<button className={value*10 ===99 ? 'easca-code_2':'hidden'}>cd</button> */}


<img src={lens} id="lens" alt="a glass lens" />

		</div>

<div className='dial-container'>

<CircularInput className="dial" value={value}  onChange={v => setValue3(stepValue3(v))}>{}
					<CircularTrack />
			{/* <img  src={avatar} className={value === 0 ? 'hidden':'avatar' } alt="Caniuse battus tv charactéir" />		 */}
				
			<CircularProgress />
					<CircularThumb />
				
			</CircularInput>
</div>
			<div className="button-mash-container">
				<button className={value * 10 === 9 ? 'button-mash-ring-0' : 'hidden'}onClick={() => props.handleInputSelect('gamepad')} >
				
						<img className={value * 10 === 9 ? 'wisp' : 'hidden'}src={wisp} alt="A dancing light that can lead people astray" />
	
				</button>

	</div>
			<div className="input-elements-container2">
						
					<img className={value*10 === 6 ? 'banba':'hidden'} src={banba} alt="a digital peninsula" />
					<img className={value*10 === 1 ? 'banba':'hidden'} src={fieldCircle} alt="fields with stone walls." />

			</div>

		
	
			</>)
};


