
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerDetails, setPlayerDetails] = useState({
    playerName: 'an timreoir',
    // Add other player details as needed
  });
  const updatePlayerDetails = (newDetails) => {
    setPlayerDetails(newDetails);
  };

  return (
    <PlayerContext.Provider value={{ playerDetails, updatePlayerDetails }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};