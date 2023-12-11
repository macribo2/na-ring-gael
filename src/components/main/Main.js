// src/components/wicklow/Wicklow.js
import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../../images/bg1.png';
import stars  from '../../images/realta.fdef7a42.gif';
import '../counties.css'
import GameIntro from '../game-intro/GameIntro';
function Main({ setCurrentMap, gameData }) {

  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  }


  return (
    <div className='home-container'>
      

      {gameStarted ? (
        
        <GameIntro className="game-intro" startGame={startGame} />
      ) :
        
        
        <div>

      {/* Add any other content or styling you need for the Wicklow component */}
      <h1 className="title">Éire</h1>
      <h3 className="title-eng">Ireland</h3>
      <img src={ bg1 } id='home-bg'alt="bg img" />
<button className='title-button' onClick={startGame}><h1 id='pawn-icon' >♙♟</h1></button>

        </div>
      
      
      }

      



    </div>

  );
}

export default Main;
