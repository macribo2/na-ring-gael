import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../gameboard/gameboard';
import MapTransitionOverlay from '../overlay/MapTransitionOverlay'; // Import the overlay component
import '../counties.css';
import greenRingFrame from '../../images/ciorcal-glass6.png'
import molly from '../../images/draoi0.gif'


function County({ countyData, currentCounty,startingCol,startingRow, setCurrentCounty, setCurrentMap, playerName }) {
  
  const [animateBoard, setAnimateBoard] = useState(false);
  // Function to start the animation
  const startAnimation = (color) => {
    setAnimateBoard(true);
    const element = document.getElementById('square-10-9');
    const element2 = document.getElementById('square-10-11');
  if (element) {
    element.classList.add('rotate-horse-45');
    element2.classList.add('rotate-horse-45');
  }
  if (element2.length > 0) {
    for (let i = 0; i < element2.length; i++) {
      element2[i].classList.add('rotate-horse-45');
      element.classList.add('rotate-horse-45');
    }
  }
    
  };
  // Function to stop the animation
  const stopAnimation = () => {
    setAnimateBoard(false);
  };

  // Now you can access the currentCounty prop directly
//  alert('Current County:'+currentCounty );

  const [mapTransition, setMapTransition] = useState(null);

  // Function to handle map transitions
  const handleMapTransition = (newMap) => {
    const leavingCounty = currentCounty; // Use the county's name from the data//
    const enteringCounty = newMap;

    setMapTransition({ leavingCounty, enteringCounty });
  };

  // Function to close the map transition overlay
  const closeMapTransition = () => {
    setMapTransition(null);
  };

  return (
    
    <div className="county-game-board" >
    <div  alt="bg"  className='bg0'/>
    <div  alt="bg1"  className='bg1 '/>

      <h1>{countyData.name}</h1>
      {/* Add game content for the county here */}
      <p></p>
 
      <div className={`game-board-container ${animateBoard ? 'drift-down-animation' : ''}`}>



        <GameBoard setCurrentMap={handleMapTransition} currentMap={countyData.map}   countyData={countyData} startAnimation={startAnimation} stopAnimation={stopAnimation}  />
      </div>
      <div className="top-mask"></div>
<div className="bottom-mask"></div>
<div className="left-mask"></div>
<div className="right-mask"></div>
      {/* Navigation to other counties */}
      <div className="county-navigation">
        <Link to="/wicklow">Go to Wicklow</Link>
        {/* Add links to other counties as needed */}
      </div>

      {/* Map transition overlay */}
      {mapTransition && (
        <MapTransitionOverlay
          leavingCounty={mapTransition.leavingCounty}
          enteringCounty={mapTransition.enteringCounty}
          onClose={closeMapTransition}
        />
      )}
      <div className="chess-like-frame-container">
    <img src={ greenRingFrame } className='chess-like-frame' alt="a round frame of green and purple" />

    <img src={molly} className="og-opponent molly" alt="black molly" />
    
      {/* <div className='question-text'>Cad a feiceann {playerName}?</div> */}
      </div>
      {/* <div className='question-text county-text'>Tá { playerName } i Gleann na Púca</div> */}
      <div className='question-text county-text'>Cad a feiceann fichilín?</div>

    </div>
  );
}

export default County;
