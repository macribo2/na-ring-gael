import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    // Simulating asset loading
    const loadAssets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading time
      setIsLoading(false);
      const endTime = Date.now();
      setLoadingTime(endTime - startTime);

      // Initialize Phaser after loading completes
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: [LandingPage()], // Call LandingPage to return the scene class
        parent: 'phaser-container', // Render inside this container
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      new Phaser.Game(config);
    };

    loadAssets();

    // Cleanup Phaser when the component unmounts
    return () => {
      Phaser.Game.destroy(true);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-screen">Loading...</div> // Optional loading screen
      ) : (
        <div id="phaser-container" style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default App;
