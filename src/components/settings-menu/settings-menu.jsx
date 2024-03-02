import './settings-menu.css';
import './lights.css';
import Easca from '../easca/easca2';
import bg0 from '../../images/fog3.png';
import eye1 from '../../images/gifs/suile0.gif';
import eye2 from '../../images/gifs/suile3.gif';
import React, { useEffect,useState  } from 'react';
import ironkey from '../../images/iron-key.png';
import keyface from '../../images/gifs/keyface.gif';
import greyBG from '../../images/cut-scenes/rectanglesbg0.jpg';
import lordIronkey from '../../images/gifs/keyface.gif'
import ReactAudioPlayer from 'react-audio-player';
import settingsBtnKeyboard from '../../images/settings/keyboard.png';
import distantHills from '../../images/newbg4town.png';
import blurryBG from '../../images/newbg2.png';
import History from '../history/history'
import  Rings6 from '../Rings/Rings6';
import deepBlue from '../../audio/Three Red Hearts - Deep Blue.ogg'
let lyricID = 0;


    

const enterFullscreen = () => {
	const element = document.documentElement;
  
	if (element.requestFullscreen) {
	  element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
	  element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
	  if (element.webkitRequestFullscreen) {
	    element.webkitRequestFullscreen(); // Try to request fullscreen directly
	  } else if (element.webkitEnterFullscreen) {
	    element.webkitEnterFullscreen(); // For older versions of iOS
	  }
	} else if (element.msRequestFullscreen) {
	  element.msRequestFullscreen();
	}
};

  


export default function SettingsMenu(props) {
	let lightStartX = [3, 10, 44, 99, 12, 18, 77, 89, 46, 54]
	function setLightStartX() {
		for (let i = 0; i < lightStartX.length; i++) { 
// $("").animate()
		}
	 }
	useEffect(() => {
		for (let i = 0; i < 9; i++) {
			setTimeout(() => {
		
				lyricID++;
		   
				console.log(tollDubh[lyricID])
			}, 1000)

	
		}
	});

	
	const FullScreenComponent = () => {
		const enterFullscreen = () => {
		  const element = document.documentElement;
	  
		  if (element.requestFullscreen) {
			element.requestFullscreen();
		  } else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		  } else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		  } else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		  }
		};
	  
	}
	

	const handleAboutClick = () => {
		const audioPlayer = document.getElementById('deepBlue');
    
    // Check if the audio player exists
    if (audioPlayer) {
        // Play the audio
        audioPlayer.play();
    }
		// Handle 'about' button click
		setShowHist(true);
		enterFullscreen(); // Ensure fullscreen is triggered by user interaction
	  };
	
	  const handleBeginClick = () => {
		// Handle 'begin' button click
		props.handleInputSelect('begin');
		enterFullscreen(); // Ensure fullscreen is triggered by user interaction
	  };
	
	const [showHistory, setShowHist] = useState(0);
	let toggleIsOn = props.toggleIsOn
	let isOn = props.isOn
	 let tollDubh = [
	
		 'Taobh cùl an doras',
		 'ní bheidh griann',
		 'ní beidh bórd, ní beidh fíonn ',
		 'Taobh cùl an doras ',
		 'ní bheidh griann',
		 'ní beidh bórd, ní beidh fíonn ',
		 'Thainig sé',
		 'treasna tonn',
		 'Ó Thainig sé ',
		 'Le eachaibh luath is iochar throm',
		 'Thainig sé',
		 'Thàinig seé, à Sasainn ann',
		 `Le eachaibh luath is iochar throm`,
		 `Ar eiginn ar n-eirigh as ar suain`,
		 `Ar eiginn ar n-eirigh as ar suain`,
		 `An Gaidheal 'sa leabaidh`,
		 `An Gaidheal 'na shuain`,
		 `Is ar eiginn ar n-eirigh`,
		 'as ar suain',
		 ' ',
		 ' '];
		 let elementClass;
	
let randLights = Math.floor(Math.random * 8)

		 let runrig = document.getElementById('runrig')
	
	var lid = localStorage.getItem('lyricID');
	document.addEventListener('click',(e) =>
	{
	  // Get element class(es)
		elementClass = e.target.className;
		
	  // If element has class(es)
	  if (elementClass !== '') {
		console.log(elementClass);
	  }
	  if (elementClass === '') {
		console.log(elementClass);
	  }
	
		//making each square of a 10x10 grid of squares a button that moves the player there, on touch.
	
		
		
	  // If element has no classes
	  else {
		console.log('An element without a class was clicked');
	  }
	}
	);


	return <>
	<div className="holder">
		</div>
					<div className='setting-menu'	onClick={() => props.handleInputSelect('gamepad')}>
			<img rel="preload" src={bg0} className="settings-bg" alt="low intensity background  graphic, expect this to change sometimes." />
			
			<img rel="preload" src={greyBG} className="grey-bg" alt="gloomy pixel bg." />
<div className="ironkeyportraitholder">
				<img rel="preload" src={lordIronkey} className="iron-key-portrait" alt="lord iron key and his key." />


				
			</div>


		
			<img src={blurryBG} className = "blurry-bg" alt="hazy green grey" />
			<img className="distant-hills" src={distantHills} alt="distant hills" />



			<img rel="preload" id="iron-key-text" src={ironkey} alt="ironkey calligraphy" />
	
	</div>
		 
	
		
		<div id="light-holder">
			<div className="light light8"></div>
			<div className="light light1"></div>
			<div className="light light9"></div>
			<div className="light light4"></div>
			<div className="light light10"></div> 
			
		</div>
<div className='menu-container'>
			<button className="menu"
			onClick={handleAboutClick}
			>about</button >
			{showHistory === true ? <History isOn={isOn} toggleIsOn={toggleIsOn} onTouchStart={enterFullscreen} handleInputSelect={ props.handleInputSelect} />:null}
			<button className="menu"
			onClick={handleBeginClick}
			>begin</button>
<ReactAudioPlayer src={deepBlue} autoPlay={false} id='deepBlue' controls={false} />

	 {/* <Easca />  */}


		</div>
		</>	
		

}