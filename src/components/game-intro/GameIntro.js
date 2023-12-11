// src/components/gameintro/GameIntro.js
import React from 'react';
import stars  from '../../images/realta.fdef7a42.gif';
import './game-intro.css'
import ChampionList from '../champion/ChampionList';
function GameIntro({ skipIntro, startGame }) {
  // Add your introduction content here

  return (
    <div id="game-intro-container">
{/* <h1>hhhas</h1> */}
<ChampionList/>
      {/* <button onClick={startGame}>Skip Intro</button> */}
    </div>
  );
}

export default GameIntro;
