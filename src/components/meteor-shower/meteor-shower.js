import React, { useEffect } from 'react';
import './meteor-shower.css';

const MeteorShower = () => {
  useEffect(() => {
    const startMeteorShower = () => {
      const container = document.getElementById('meteor-shower-container');
      container.innerHTML = ''; // Clear previous comets

      const numComets = Math.floor(Math.random() * 6); // Adjust the maximum number of comets per shower

      for (let i = 0; i < numComets; i++) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        comet.style.top = `${-Math.random() * 50}vh`; // Random vertical position above the screen
        comet.style.animationDelay = `${Math.random() * 5}s`; // Random delay for each comet

        const initialBrightness = Math.random();
        comet.style.setProperty('--initial-brightness', initialBrightness);

        container.appendChild(comet);
      }
    };

    const runMeteorShower = () => {
      startMeteorShower();
      const delay = Math.random() * 8000 + 2000; // Random delay between 2 to 10 seconds
      return setTimeout(runMeteorShower, delay);
    };

    // Initial meteor shower
    const timeoutId = runMeteorShower();

    // Clean up when the component is unmounted
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div id="meteor-shower-container">
      {/* Comets will be dynamically added here */}
    </div>
  );
};

export default MeteorShower;
