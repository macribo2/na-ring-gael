import ringFound from '../../images/cut-scenes/found-ring.png'
import ringShine from '../../images/cut-scenes/stern.png'
import outerRing from '../../images/ciorcal-glass4.png'
import { render } from "react-dom";
import React, { useState, useEffect } from 'react'
import './score.css'

export function Score(props)  {
	function returnToCounty() {
        // document.getElementById('tully-challenge-bg').fadeOut();
        // document.getElementById('bg-container-rings-5').css.display="none"
        
		// document.getElementById('score-container').css.display="none"
        // document.getElementById('e-id').html('')
        // document.getElementById('i-id').html('')
        
		// document.getElementById('btn-b').css.display="block"
        
		// document.getElementsById('ring-5-challenge-container').css.display="none"
        
		// document.getElementsById('loc').css.display="block"
        // // gameObjects[playerRow][playerColumn] = 0;
                     
		// document.getElementsById('walkies').css.display="none"
     
		// alert('GRMA for playing! Back for more next week @ r/banba lang lebe die Revolution')
        // localStorage.setItem("whereAmI","Dublin")

    }
	
return (
	
	<div>
		<div className='score-container'>
			
 			<img src={outerRing} className="arcadia" alt="arcadia" />
		<div className="score-bg-container">
		<img className="ring-found-bg"src={ ringFound} alt="" />

			</div>
			<div className="ring-shine-container">
		<img className="ring-shine" src={ringShine } alt="a sparkle" />

			</div>

			<div className="score-text-container"  >
			<h1 className="storyteller">
				Tá fáinne búite ag {localStorage.getItem('hname')+'.'}
			</h1>
			<table className='player-stats-table'>
				<tr>
					<th className="storyteller">fáinní</th>
					<th></th>
				</tr>
				<tr>
					<th className="storyteller">1</th>
					<th></th>

					<th></th>
					
				</tr>
			</table>
		</div>
			<div className="circle round-btn" ></div>

			<div className="score">
	</div>
	</div>				</div>
			);
}

