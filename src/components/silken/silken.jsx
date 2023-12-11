// I am going to Doon-na-shee (the fortress of the fairies) to-night, to play music for the good people, and if you come with me you’ll see fine fun.



import React, { useState, useEffect} from 'react';
import silken from '../../images/agnes_new.png';
import elf from '../../images/champions/0.png';
import ogre from '../../images/champions/10.png';

// import ogre from '../../images/stone-soup/ogre_mage_new.png';
// import faun from '../../images/stone-soup/faun.png';
import poet from '../../images/stone-soup/poet.png';
// import silken from '../../images/stone-soup/faun.png';
import hill from '../../images/rainy-hill1.png';
import Shadowhill from '../../images/shadow-hill.png';
import './silken.css';


export default function Silken(props) { 
	let answer1 = localStorage.getItem('freagra1')
	let costume = localStorage.getItem('costume');

	let freagra1 = ['','Maith go leoir.', 'Tuarastal atá tu ’g iarraidh? Áit tigínn agus gairdín. Gheobhaidh tú sin, má éirigheann mo turas liom.', 'Ar aghaidh linn le chéile!', 'Ól do ṡaiṫ! Ní ḃéiḋ an ċoirn sin folaṁ fad do ḃeaṫa.', '...', 'Slán go fóil mar sin!', 'asdfdasg', 'hasdfasd',]	
	useEffect(() => { 
		setHasLoaded(false);

	})



	const [hasLoaded, setHasLoaded]  = useState(true)
	if ({hasLoaded}){
		return <>
			

			<div className="silken-holder">
		
				<img src={elf} id={costume==="elf"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={silken} id={costume==="silken"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={silken} id={costume==="faun"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={ogre} id={costume==="ogre"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />


{ props.currentQuestion === 8? 	<p className="rings0"id="freagra0">{freagra1[answer1]}</p>:null}
			</div>


		</>
	}
}