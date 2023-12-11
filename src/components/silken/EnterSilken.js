// I am going to Doon-na-shee (the fortress of the fairies) to-night, to play music for the good people, and if you come with me you’ll see fine fun.



import React, { useState, useEffect} from 'react';
import silken from '../../images/stone-soup/killer_klown_blue.png';
import elf from '../../images/stone-soup/elf_old.png';
import ogre from '../../images/stone-soup/ogre_mage_new.png';
import faun from '../../images/stone-soup/faun.png';
import poet from '../../images/stone-soup/poet.png';
// import silken from '../../images/stone-soup/faun.png';
import hill from '../../images/rainy-hill1.png';
import Shadowhill from '../../images/shadow-hill.png';
import './silken.css';


export default function EnterSilken() { 
	let costume = localStorage.getItem('costume');	
	
	useEffect(() => { 
		setHasLoaded(false);

	})


	const [hasLoaded, setHasLoaded]  = useState(true)
	if ({hasLoaded}){
		return <>
			
		}
			<div className="enter-silken">
		
			
			<img src={elf} id={costume==="elf"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={silken} id={costume==="silken"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={faun} id={costume==="faun"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />
				<img src={ogre} id={costume==="ogre"? 'silken':'hidden'} alt="A stonesoup pixel art rpg character " />


			</div>


		</>
	}
}