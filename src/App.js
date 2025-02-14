import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css';
import FastTravel1 from './components/IntroSequence/FastTravel1';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadingTime, setLoadingTime] = useState(0);
	const fastTravel = new FastTravel1();
	useEffect(() => {
		const startTime = Date.now();
		
		// Simulating asset loading
		const loadAssets = async () => {
		  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
		  setIsLoading(false);
		  const endTime = Date.now();
		  setLoadingTime(endTime - startTime);
		};
	
		loadAssets();
	  }, []);

    return (
        <div className="App">
            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div> {/* Spinner graphic */}
                    <div className="loading-message">Ag lódál...</div>
                </div>
            ) : (
                <LandingPage />
            )}
        </div>
    );
}

export default App;