import './settings-menu.css';
import './lights.css';
import Easca from '../easca/easca2';
import bg0 from '../../images/fog3.png';
import eye1 from '../../images/gifs/suile0.gif';
import eye2 from '../../images/gifs/suile3.gif';
import React, { useEffect, useState } from 'react';
import ironkey from '../../images/nrg-text.png';
import keyface from '../../images/gifs/keyface.gif';
import greyBG from '../../images/cut-scenes/rectanglesbg0.jpg';
import nrg from '../../images/nrg.png';
import ReactAudioPlayer from 'react-audio-player';
import settingsBtnKeyboard from '../../images/settings/keyboard.png';
import distantHills from '../../images/newbg4town.png';
import blurryBG from '../../images/newbg2.png';
import History from '../history/history';
import Rings6 from '../Rings/Rings6';
import GDPR from '../gdpr/gdpr';

export default function SettingsMenu(props) {
    const [showHistory, setShowHist] = useState(false);

// Sparkle generation logic
const generateSparkles = () => {
    const lightHolder = document.getElementById('light-holder');
    if (!lightHolder) return;

    // Clear existing sparkles to avoid buildup
    lightHolder.innerHTML = '';

    // Generate fewer sparkles
    for (let i = 0; i < 30; i++) {
        const light = document.createElement('div');
        light.classList.add('light');

        // Randomize positions
        light.style.top = `${Math.random() * 100}%`;
        light.style.left = `${Math.random() * 100}%`;

        // Randomize animation duration
        light.style.animationDuration = `${5 + Math.random() * 5}s`;

        // Append to the holder
        lightHolder.appendChild(light);
    }
};

useEffect(() => {
    // Generate sparkles on mount
    generateSparkles();

    // Re-generate sparkles on window resize (optional, for dynamic adjustments)
    const handleResize = () => generateSparkles();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

    useEffect(() => {
  
        // Generate sparkles automatically on mount
        generateSparkles();

        // Add click event listener for additional sparkles
        const handleClick = () => {
            generateSparkles();
        };

        document.addEventListener('click', handleClick);

        // Cleanup event listener
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Enter fullscreen mode
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

    const handleAboutClick = () => {
     

        setShowHist(true);
        enterFullscreen(); // Ensure fullscreen is triggered by user interaction
    };

    const handleBeginClick = () => {
        props.handleInputSelect('begin');
        enterFullscreen();
    };

    const { toggleIsOn, isOn } = props;

    return (
        <>
            <div className="holder"></div>
            <div className="setting-menu" onClick={() => props.handleInputSelect('gamepad')}>
                <img rel="preload" src={bg0} className="settings-bg" alt="low intensity background graphic, expect this to change sometimes." />
                <img rel="preload" src={greyBG} className="grey-bg" alt="gloomy pixel bg." />
                <div className="ironkeyportraitholder ironkeyportraitholder-intro">
                    <img rel="preload" src={nrg} className="nrg" alt="a hilltop." />
                </div>
                <img src={blurryBG} className="blurry-bg" alt="hazy green grey" />
                <img rel="preload" id="iron-key-text" src={ironkey} alt="ironkey calligraphy" />
            </div>

            <div id="light-holder">
                <div className="light light8"></div>
                <div className="light light1"></div>
                <div className="light light9"></div>
                <div className="light light4"></div>
                <div className="light light10"></div>
            </div>

            <div className="menu-container">
                <button className="menu main-menu" onClick={handleAboutClick}>
                    intro
                </button>
                {showHistory && (
                    <History
                        isOn={isOn}
                        toggleIsOn={toggleIsOn}
                        onTouchStart={enterFullscreen}
                        handleInputSelect={props.handleInputSelect}
                    />
                )}
                <button className="menu main-menu" onClick={handleBeginClick}>
                    begin
                </button>
               
                <GDPR />
            </div>
        </>
    );
}
	