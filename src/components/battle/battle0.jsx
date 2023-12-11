// I am going to Doon-na-shee (the fortress of the fairies) to-night, to play music for the good people, and if you come with me you’ll see fine fun.
import $ from 'jquery';
import river2 from '../../vid/river0.mp4';
import river3 from '../../vid/river0.mp4';
import battleLens from '../../images/ciorcal-glass3.png'
import {Rings5} from '../../components/Rings/Rings5'

import React from 'react';
import silken from '../../images/agnes_new.png';
import elf from '../../images/champions/0.png';
import ogre from '../../images/champions/10.png';

// import ogre from '../../images/stone-soup/ogre_mage_new.png';
// import faun from '../../images/stone-soup/faun.png';
import poet from '../../images/stone-soup/poet.png';
// import silken from '../../images/stone-soup/faun.png';
import hill from '../../images/rainy-hill1.png';
import Shadowhill from '../../images/shadow-hill.png';
import './battle.css'

export default class Battle0 extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    
	jQueryCode = () => {
		// if (toBattle) { 
			
			$('#river2').fadeIn();
			$('#river3').fadeIn();

		// }

	}

	componentDidMount() {
	
	    
		this.jQueryCode();
	}
	render() {
		return(
		<>
			{/* <div className='battle0'>

			<div className="battle-river-container">

<video id="river2"  autostart="true" autoPlay={true} loop={true} fluid="false" src={river2} 
/>


<video id="river3"  autostart="true" autoPlay={true} loop={true} fluid="false" src={river3} />
					</div>
					
					<div className='battle-lens-container'>
							<img className="battleLens"src={battleLens } alt="a round frame." />
					</div>
					<>
					<h1> </h1>

					</>
</div> */}
			{/* <Rings5/>	 */}
		</>
)	}
}