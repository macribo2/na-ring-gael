import resultBg from '../../images/black.png'
// import * as React from "react";
import './encounter-ring.css';
// import encounterBG from '../../images/blackripple.gif'
import encounterBG from '../../images/bg0.png'
import React, { useState, useEffect } from 'react'
import tutorial0 from '../../images/tutorials/tutorial0.png';
import emerald from '../../images/misc_crystal_new.png'
import pearl from '../../images/stone-soup/misc_crystal_old.png';
import folamh from '../../images/about2/stone-0.png'
import fromOne from '../../images/about2/stone-1.png'
import fromTwo from '../../images/about2/stone-2.png'
import fromThree from '../../images/about2/stone-3.png'
import fromFour from '../../images/about2/stone-4.png'
import fromFive from '../../images/about2/stone-5.png'
import fromSix from '../../images/about2/stone-6.png'
import fromSeven from '../../images/about2/stone-7.png'
import druids from '../../images/gael-ring/druids.png'
import glass from '../../images/bg1.png';
import witch0 from '../../images/ai-art/npcs/witch0.jpg'
import mash from '../../images/gifs/mash.gif';


import './encounter.css';
import './encounter-ring.css';
import {
	CircularInput,
  CircularTrack,
  CircularThumb,
} from "react-circular-input";

import encounter from './encounters.json'

export default function Encounter({ hideEncounterComponent}) {
// let storedEncounterID = localStorage.getItem('encounterID');
// 	let encounterID = 0;

// 	if (storedEncounterID !== null) {
// 	if (encounterID !== undefined && encounterID !== null) {
// 		encounterID = localStorage.getItem('encounterID')
	
	
// 		// alert(localStorage.getItem('encounterID'))
	
// 		let answGae = JSON.stringify(encounter[encounterID].answGae)
// 		answGae = JSON.parse(answGae)
// 		let answEng = JSON.stringify(encounter[encounterID].answEng)
// 		let irishText = JSON.stringify(encounter[encounterID].locationDescriptionGae)
// 		let engText = JSON.stringify(encounter[encounterID].locationDescriptionEng)
// 		let encounterConclusionsEng = JSON.stringify(encounter[encounterID].encounterConclusionsEng)
// 		let encounterConclusionsGae = JSON.stringify(encounter[encounterID].encounterConclusionsGae)
// 		irishText = JSON.parse(irishText)
// 		engText = JSON.parse(engText)
// 		answEng = JSON.parse(answEng)

// 		let engTurnToPage = JSON.stringify(encounter[encounterID].engTurnToPage)
// 		engTurnToPage = JSON.parse(engTurnToPage)


// 		let gaeTurnToPage = JSON.stringify(encounter[encounterID].gaeTurnToPage)
// 		gaeTurnToPage = JSON.parse(gaeTurnToPage)

// 		const [value, setValue] = React.useState(0);
// 		let questionsGae = [

// 			{
// 				questionText: 'Lorem Ach tá tír mhór chumasach i gcóngaracht di agus tá fhios ag na	',
// 				answerOptions: [
// 					{ answerText: answGae[0] },
// 					{ answerText: answGae[1] },
// 					{ answerText: answGae[2] },
// 					{ answerText: answGae[3] },
// 				],
// 			}]
// 		let questionsEng = [

// 			{
// 				questionText: 'and what do you say to that?',
// 				answerOptions: [
// 					{ answerText: answEng[0] },
// 					{ answerText: answEng[1] },
// 					{ answerText: answEng[2] },
// 					{ answerText: answEng[3] },
// 				],
// 			}]
// 		const stepValue = v => Math.round(v * 10) / 10

// 		const [isOn, toggleIsOn] = useToggle();
// 		function useToggle(initialValue = false) {
		
// 			const [value, setValue] = React.useState(initialValue);
// 			const toggle = React.useCallback(() => {
// 				setValue(v => !v);
// 			}, []);
		
// 			localStorage.setItem("isOn", isOn)
// 			console.log(localStorage.getItem('isOn'))
// 			return [value, toggle];
// 		}

// 		// let tullyP = document.getElementById('tully-p')

// 		// document.getElementByClassName('names-i').style.opacity ="1";
// 		// document.getElementsByClassName('names-e').style.opacity="1";
// 		// Similar to componentDidMount and componentDidUpdate:
// 		useEffect(() => {

// 		})


// 		function hideText() {
// 			alert();
// 		}


// 		// const imageSource = require(`${illustrations[1]}`).default;

// 		// alert(illustrations)

// 		// for (let i = 0; i < locationDescriptionGae.length; i++) {
		
// 		// 	irishText.push(locationDescriptionGae[i])
// 		//  }
// 		// alert(locationDescriptionGae)
// 		// let tullyPortrait = setPlayerIcon();
	
// 		function encounterChallenge() {
// 			document.getElementById('dir-pad').style.opacity = '1'

// 			document.getElementById('ring-encounter').style.display = 'none'
// 			document.getElementById('binary-portrait').style.display = 'none'
// 			document.getElementById('encounter-challenge-bg').style.display = 'block'
// 			document.getElementById('encounter-challenge-bg').classList.add('fade-in-champ')
// 			document.getElementById('n-id').innerHTML = 'Curdaigh gort a cúig';
// 			document.getElementById('e-id').innerHTML = 'Search field five';

// 			document.getElementById('bg-container-encounter').style.opacity = '0.5'
// 			// document.getElementById('bg-container-rings-5').setAttribute.src = {darkFields}
// 			document.getElementById('mash-5').style.display = 'none'
// 		}
// 		const prevValue = React.useRef(0);
// 		const diff = React.useRef(0);
// 		const dir = React.useRef(0);
// 		const round = React.useRef(0);
// 		let storyResult = document.getElementsByClassName("story-result")

// 		const max = 0.99;
// 		const min = 0;
// 		// if (stepValue > 10) { stepValue = 10 }
// 		// 		if (stepValue< 0 ){stepValue= 0}
// 		const valueWithinLimits = rv => {
// 			const v = Math.floor(rv * 100) / 100;
// 			console.log("v", v);

// 			const diff = v - value;
// 			let vRound = round.current;
// 			if (diff > 0.8) vRound--;
// 			if (diff < -0.8) vRound++;
// 			const currentValue = value + round.current;
// 			const requestedValue = v + vRound;
// 			const minValue = 0.77;
// 			const maxValue = 0.99;
// 			console.log("current | requested", currentValue + "|" + requestedValue);
// 			console.log(" round.current", round.current);

// 			// //if (requestedValue > 1) return value;
// 			// if (requestedValue > max) return maxValue;
// 			if (requestedValue < min) return minValue;
// 			else return v;
// 		};
	
// 		let champPortrait = document.getElementsByClassName('champion-portrait')

// 		//when player turns dial to select champion:  show avatar in fairy ring; fade in eng and irish names, fade out question text.
// 		if (value > 0 || value < 0) {
	
// 		}

// 		function buttonMashClick() {
		



		
// 		}

// 		function setPlayerIcon() {
		
// 			// { localStorage.setItem('portrait',"")}
		
	
// 		}
// 		const [displayStyle, setDisplayStyle] = useState('none');

// 		const [storyChoice, setStoryChoice] = useState(0);
	
// 		const handleAnswerButtonClick = (index) => {
// 			setStoryChoice(index);
	
// 			setDisplayStyle('grid');

// 		}
	
// 		const handleExitLocation = (index) => {
	
// alert('x')		}

// 		const updateValue = v => {
// 			diff.current = v - prevValue.current;
// 			if (diff.current > 0.8) round.current--;
// 			if (diff.current < -0.8) round.current++;
// 			prevValue.current = v;
// 			setValue(v);
	  
	  
// 		};
// 		let binaryIcon = folamh;
// 		let binaryID = Math.floor(value * 100);
// 		if (binaryID === 0) {
		
// 		}
// 		// localStorage.setItem('quest-portrait', champID);
// 		if (binaryID >= 0 && binaryID <= 10) {
	
// 		}
// 		if (binaryID >= 11 && binaryID <= 20) {
// 			// tullyP.style.top = '10%'
// 			// tullyP.style.left = '60%'
		
		
// 			document.getElementById('tut-g').classList.add('fade-out-champ')
// 		}
// 		if (binaryID >= 21 && binaryID <= 30) {
// 			// tullyP.style.transform = 'rotate(0deg)'
// 			binaryIcon = fromOne;
// 			// tullyP.style.top = '30%'
// 			// tullyP.style.left = '56%'
// 			document.getElementById('tut-g').classList.add('fade-out-champ')
// 		}
// 		if (binaryID >= 31 && binaryID <= 40) {
// 			// tullyP.style.transform = 'rotate(90deg)'
// 			document.getElementById('tut-g').classList.add('fade-out-champ')

// 			binaryIcon = fromTwo;

// 			// tullyP.style.top = '50%'

// 			// tullyP.style.left = '60%'
// 			// tullyP.style.transform = 'scaleX(1)';
// 			// tullyP.style.transform = 'scaleY(-1)';

// 		}
// 		if (binaryID >= 41 && binaryID <= 50) {
// 			binaryIcon = fromThree;
// 			// tullyP.style.top = '64%'

// 			// tullyP.style.left = '55%'	
// 			// tullyP.style.transform = 'rotate(118deg)';
		
// 		}
// 		if (binaryID >= 51 && binaryID <= 60) {
// 			binaryIcon = fromFour;
// 			// tullyP.style.transform = 'rotate(180deg)'


// 			// tullyP.style.top = '70%'
// 			// tullyP.style.left = '43%'	
// 			// tullyP.style.zIndex = '4000'
		

// 		}
// 		if (binaryID >= 61 && binaryID <= 70) {
// 			binaryIcon = fromFive;


// 			// tullyP.style.top = '45%'
// 			// tullyP.style.left = '30%'
// 			// tullyP.style.zIndex = '4'
		
// 			// tullyP.style.transform = 'rotate(270deg)';
		
// 		}
// 		if (binaryID >= 71 && binaryID <= 80) {
// 			binaryIcon = fromSix;


// 			// tullyP.style.top = '30%'
// 			// tullyP.style.left = '32%'	
// 			// tullyP.style.transform = 'rotate(0deg)';
		
// 			// document.getElementById('bg-container-rings-5').classList.remove('circle')
// 		}
// 		if (binaryID >= 81 && binaryID <= 100) {
// 			binaryIcon = fromSeven;

// 			// tullyP.style.top = '21%'
// 			// tullyP.style.left = '38%'	
		
// 			// document.getElementById('bg-container-rings-5').classList.add('circle')
		
		
// 		}
// 		if (binaryID === 100) {
// 			//show buttonmash with colors.gif.
// 		}
	

// 		const tryValue = v => {
// 			updateValue(valueWithinLimits(v));
// 			thumbStart()
// 		};
// 		let hname;
// 		let hnameE;
// 		// let fadeOutNoOne = this.props.fadeOutNoOne;

// 		//thumbStart is a hack to prevent side effect of making question text fade out when player is at location 'geaga'.
// 		function thumbStart() {
// 			// document.querySelector(".champion-portrait").classList.add('fade-in-champ');
// 			// document.querySelector(".history-e").classList.add('fade-in-champ'); document.querySelector(".encounter-i").classList.add('fade-in-champ');
// 			// document.querySelector(".question-text").classList.add('fade-out-champ');

// 		}
// 		return (

// 			<>

// 				<div className='encounter-bg-container'>
// 					<img src={encounterBG} alt="encounter background img" className="encounter-bg-img" />
// 				</div>
// 				{/* 
// 		<div className={value * 10 === 5 ? "encounter-bg" : "hidden"}>
// 					<img rel="preload" className={value * 10 === 5 ? "sea-wave" : "hidden"} src={witch0} alt="" />
					
// 				</div> */}
// 				{/*

// 		<div className={value * 10 === 4 || value * 10 === 5 || value * 10 === 6 || value * 10 === 7  ? "encounter-bg" : "hidden"}>
// 					<img rel="preload" className= "sea-wave"  src={seas1} alt="" />
					
// 				</div> */}
// 				<div className="encounter-ring-0">
// 					{/* <img id="encounter-ring-lens" rel="preload" src={outerLocation} className="question-img tullynally-zoom" alt="dark green fields background" />	 */}
		
		
		
// 					{/* <div className={value * 10 === 4 ? "linux-lens-container" : "hidden"}>
// 					<img rel="preload" className={value * 10 === 4 ? "map-lens" : "hidden"} src={storm1} alt="" />
					
// 				</div> */}
				
				
		

// 					<div className="ring-5-binary-container">
			
// 					</div>

// 					<div className="tut-ring-g-container">
// 						<img id="tut-g" src={tutorial0} className="tutorial0 tut-ring5" alt="spinning arrow" />
// 					</div>

// 					<div className="encounter-i-container">
// 						<div dangerouslySetInnerHTML={{ __html: irishText[Math.floor(value * 10) + round.current * 100] }} x={100} y={100} id="n-id" className="encounter-i" textAnchor="middle" dy="0.3em" fontWeight="bold" ></div>
// 					</div>

// 					{isOn ? (<div id="glass">
// 						< img src={glass} className="question-img" rel="preload" id="glass-img" alt="glass bg for translucent overlay effect." />
// 						<div dangerouslySetInnerHTML={{ __html: engText[Math.floor(value * 10) + round.current * 100] }} x={100} y={100} id="e-id" className="encounter-e" style={{ opacity: isOn ? 1 : 0 }}></div>
			
// 						{/* set encounter specific illustrations for while isOn */}
					
// 						<div className="about-hist">{value * 10 === 2 ? <img src={witch0} className="slide encounter-illustration" alt="story illustrations" /> : null}
// 						</div>

					
// 						<div className="about-hist">{value * 10 === 3 ? <img src={witch0} className="slide encounter-illustration" alt="story illustrations" /> : null}
// 						</div>

										
// 						<div className="about-hist">{value * 10 === 1 ? <img src={witch0} className="slide encounter-illustration" alt="story illustrations" /> : null}
// 						</div>

// 					</div>) : null}

				
					
			 
// 					<div id="ring-encounter" className="ring-encounter-dial-container">			 <CircularInput value={stepValue(value)}
// 						onChange={v => setValue(stepValue(v))} className="dial dial-encounter" >
// 						<CircularTrack
// 							stroke="#523f0d"
// 							strokeWidth={'3px'}
// 						/>
// 						<CircularThumb fill="#58511b"
// 						/>
// 					</CircularInput>
	
			
					
			
				
// 					</div>


// 					{/* <img src={ogHero === "9" ? avatar9 :empty} className="og-hero"  alt="hero portrait"/> */}
			

// 				</div>

// 				<div className="ring-text-container-encounter" >
			
					
			
// 				</div>
			

					
// 				{/* 	 */}

// 				{/* 				
	
			
// 			<div id="ring-5-challenge-container"className="challenge-container">
// 				<img id="encounter-challenge-bg" src={encounterChallengeBG} alt="" />
// 			</div> */}
// 				<div className="button-mash-container-encounter">
// 				<button className={value * 10 === 9 ? 'mash' : 'hidden'} onClick={() => this.handleExitLocation} ><img className="mash-img" src={ mash} alt="gif of rings"/></button></div>
				
			
// 				{

				
// 				}
// 				{isOn ? (<div className="about-hist druids">{value * 10 === 3 ? <img src={druids} className="druids" alt="druids" /> : null}
// 				</div>) : null}


// 				<div className={value * 10 === 4 ? 'question-section question-section-encounter' : 'hidden'}>
					
// 					<div className='question-count'>
// 					</div>
// 					{/* <img src={ gradient} className="gradient"/> */}
						
// 					{!
// 						isOn ? <>
// 						<div dangerouslySetInnerHTML={{ __html: questionsGae[0].questionText }} className='question-text'></div>

// 						<div className='answer-section'>
// 							{questionsGae[0].answerOptions.map((answerOption, index) => (<button className="answers" key={index}
// 								onClick={() => handleAnswerButtonClick(index)}
								
// 							>{answerOption.answerText}</button>))}
// 						</div>
// 					</> : <>
// 						<div dangerouslySetInnerHTML={{ __html: questionsEng[0].questionText }} className='question-text'></div>

// 						<div className='answer-section'>
// 							{questionsEng[0].answerOptions.map((answerOption, index) => (<button className="answers eng-text" key={index}
// 								onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
								
// 							>{answerOption.answerText}</button>))}
// 						</div>
// 					</>}
				 
				
// 				</div>

					
			
// 				{/* story resolution panel */}

// 				<div id='story-result' style={{ display: displayStyle }}>
// 					<img src={resultBg} className="result-bg-img" alt="bg at end of encounter." />
// 					<div className="encounter-i-container">
// 						{isOn ? <div id="n-id" className="encounter-i eng-text"  >{engTurnToPage[storyChoice]}</div> : <div id="n-id" className="encounter-i"  >{gaeTurnToPage[storyChoice]}</div>}

// 						<div className="button-mash-container-encounter">
// 							<button className='mash' onClick={hideEncounterComponent} ><img className="mash-img" src={mash} alt="gif of rings" /></button></div>
				
// 					</div>

// 				</div>

// 				<div className='toggle-glass-btn-container encounter-version'>
// 					{/* className={ value>=0.68 && value<= 1 || value>=0 && value<= 0.02 ?'tog-glass':'hidden'} */}
// 					<button id="toggle-glass-btn-history" onClick={toggleIsOn} ><img src={isOn ? pearl : emerald} id="blank" alt="a crystal or precious stone toggle on off button" /></button></div>
// 			</>
// 		);
// 	}
// }
	// 	else {return null }
	
	return null
};