import React, { useState, useEffect } from 'react';
import MainView from './components/main-view/main-view';
import './App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAssets = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulated loading time
            setIsLoading(false);
        };

        loadAssets();
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div> {/* Spinner graphic */}
                    <div className="loading-message">Please wait...</div>
                </div>
            ) : (
                <MainView />
            )}
        </div>
    );
}

export default App;
