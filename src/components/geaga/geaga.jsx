import React, { useState, useEffect} from 'react';
import leftEye from '../../images/suile0.gif';
import rightEye from '../../images/suile3.gif';
import face from '../../images/geagaFace.png';
import hill from '../../images/rainy-hill1.png';
import Shadowhill from '../../images/shadow-hill.png';
import fields from '../../images/geagabg1.png';
import geagaShadow from '../../images/geagaFaceShadow.png';
import './geaga.css';


export default function Geaga() { 
	
	
	useEffect(() => { 
		setHasLoaded(false);

	})



	const [hasLoaded, setHasLoaded]  = useState(true)
	if ({hasLoaded}){
		return <>
			
			<img src={ fields} className= "fields" alt="stonewalled fields twillight" />

			<div className="geaga-holder">
		
			<img src={ face} id= "face" alt="Face of the tree creature" />
		<img src={ geagaShadow} className= "geaga-shadow" alt="Face of the tree creature" />
		
		</div>
		<img src={ hill} className="hill"alt="rainy hill with fairy ring" />
		<img src={ Shadowhill} className="shadow-hill"alt="rainy hill shadow-overlay " />

		<div className="eyes-holder">
			
			<img src={ leftEye} className="left-eye"alt="glowing blinking left eye" />
			<img src={ rightEye} className= "right-eye"alt="glowing blinking right eye" />
				</div>	
	
	</>
}}