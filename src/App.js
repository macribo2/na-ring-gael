import React, { useState, useEffect } from 'react';
import MainView from './components/main-view/main-view';
import './App.css';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadingTime, setLoadingTime] = useState(0);
  
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
                <MainView />
            )}
        </div>
    );
}

export default App;
