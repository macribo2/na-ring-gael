import '../settings-menu/settings-menu.css';
import Easca from '../easca/easca2';
import bg0 from '../../images/fog3.png';
import eye1 from '../../images/gifs/suile0.gif';
import eye2 from '../../images/gifs/suile3.gif';
import React, { useEffect, useState } from 'react';
import ironkey from '../../images/iron-key.png';
import keyface from '../../images/gifs/keyface.gif';
import greyBG from '../../images/cut-scenes/rectanglesbg1.jpg';
import lordIronkey from '../../images/gifs/keyface.gif';
import ReactAudioPlayer from 'react-audio-player';
import settingsBtnKeyboard from '../../images/settings/keyboard.png';
import distantHills from '../../images/newbg4town.png';
import blurryBG from '../../images/newbg2.png';
import History from '../history/history';
import Rings6 from '../Rings/Rings6';
import deepBlue from '../../audio/switch2.ogg';
import GDPR from '../gdpr/gdpr';

let lyricID = 0;

const enterFullscreen = () => {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

export default function SettingsMenu(props) {
  const [fade, setFade] = useState('fade-in');
  const [showHistory, setShowHist] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const poemLines = [
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
    'à Sasainn ann',
    `Le eachaibh luath is iochar throm`,
    `Ar eiginn ar n-eirigh as ar suain`,
    `Ar eiginn ar n-eirigh as ar suain`,
    `An Gaidheal 'sa leabaidh`,
    `An Gaidheal 'na shuain`,
    `Is ar eiginn ar n-eirigh`,
    'as ar suain',
    ' ',
    ' '
  ];
  const poemLinesEng = [
    `Behind the door 
`,`    there will be no Sun.
`,`   There'll be no table there'll be no wine
`,`    Behind the door 
`,`    there will be no Sun
`,`   There'll be no table, there's be no wine
`,`    He cameC
`,`   across the wave
`,`    O he came
`,`    With fast horses and a heavy key
`,`    We must rise from our slumber!
`,`    He came
`,`    from England
`,`    With fast horses and a heavy key.
`,`     
`,`    He came from England
`,`     
`,`    We barely rose from our slumber,
`,`    We barely rose from our slumber:
`,`    The Gaels in bed,
`,`    The Gaels who are asleep -
`,`    They barely rose from their slumber!`, 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade('fade-out');
      setTimeout(() => {
        setCurrentLineIndex((prevIndex) => (prevIndex + 1) % poemLines.length);
        setFade('fade-in');
      }, 1000); // Duration of fade-out transition
    }, 4000); // Change line every 4 seconds (2 seconds for display, 1 second for fade-out, 1 second for fade-in)

    return () => clearInterval(interval);
  }, []);

  const handleAboutClick = () => {
    const audioPlayer = document.getElementById('deepBlue');

    if (audioPlayer) {
      audioPlayer.play();
    }
    setShowHist(true);
    enterFullscreen();
  };

  const handleBeginClick = () => {
    setTimeout(() => { window.location.href = 'https://www.na-ring-gael.com/rings4'; }, 2000);
  };

  let toggleIsOn = props.toggleIsOn;
  let isOn = props.isOn;

  return (
    <>
      <div className="holder"></div>
      <div className="setting-menu" onClick={() => props.handleInputSelect('gamepad')}>
        <img rel="preload" src={bg0} className="settings-bg" alt="low intensity background graphic, expect this to change sometimes." />
        <img rel="preload" src={greyBG} className="grey-bg" alt="gloomy pixel bg." />
        <div className="ironkeyportraitholder ironkeyportraitholder-game-over ">
          <img rel="preload" src={lordIronkey} className="iron-key-portrait iron-key-portrait-game-over" alt="lord iron key and his iron key." />
        </div>
        <img src={blurryBG} className="blurry-bg" alt="hazy green grey" />
        <img className="distant-hills" src={distantHills} alt="distant hills" />
        <div className={`poem-line ${fade}`}>
          {poemLines[currentLineIndex]}
        </div>
      </div>
      <div id="light-holder">
        <div className="light light8"></div>
        <div className="light light1"></div>
        <div className="light light9"></div>
        <div className="light light4"></div>
        <div className="light light10"></div>
      </div>
      <div className='menu-container'>
        <button className="game-over-menu" onClick={handleAboutClick}>ar ais</button>
        {showHistory === true ? <History isOn={isOn} toggleIsOn={toggleIsOn} onTouchStart={enterFullscreen} handleInputSelect={props.handleInputSelect} /> : null}
        <button className="game-over-menu" onClick={handleBeginClick}>arís</button>
        <ReactAudioPlayer src={deepBlue} autoPlay={true} id='deepBlue' controls={false} />
        {/* <h2>scóɼ:</h2> */}

      </div>
    </>
  );
}
