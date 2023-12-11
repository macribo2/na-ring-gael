import './settings-menu.css';
import './lights.css';
import Easca from '../easca/easca2';
import bg0 from '../../images/fog3.png';
import React, { useEffect,useState  } from 'react';
import ironkey from '../../images/iron-key.png';
import greyBG from '../../images/cut-scenes/rectanglesbg0.jpg';
import ironkeyClicks from '../../audio/iron-key.wav';
import lordIronkey from '../../images/stone-soup/lord-iron-key.png'
import ReactAudioPlayer from 'react-audio-player';
import settingsBtnKeyboard from '../../images/settings/keyboard.png';
import distantHills from '../../images/newbg4town.png';
import blurryBG from '../../images/newbg2.png';
import History from '../history/history'
import  Rings6 from '../Rings/Rings6';
let lyricID = 0;
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
		<ReactAudioPlayer src={ironkeyClicks } autoPlay></ReactAudioPlayer>
		
			<img src={blurryBG} className = "blurry-bg" alt="hazy green grey" />
			<img className="distant-hills" src={distantHills} alt="distant hills" />
		<img rel="preload" id="iron-key-text" src={ ironkey} alt="ironkey calligraphy" />

	</div>
		 
	
		
		<div id="light-holder">
			<div className="light light8"></div>
			<div className="light light1"></div>
			<div className="light light9"></div>
			<div className="light light10"></div> 
			
		</div>
<div className='menu-container'>
			<button className="menu"
				onClick={() => setShowHist(true)}
			>about</button>
			<button className="menu"
			onClick={() => props.handleInputSelect('begin')}
			>begin</button>
			{showHistory === true ? <History isOn={isOn} toggleIsOn={toggleIsOn} handleInputSelect={ props.handleInputSelect} />:null}
		</div>
	

		</>	
		

}