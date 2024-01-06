
import React from 'react';
// playerContext.js
import { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [playerDetails, setPlayerDetails] = useState({
    playerName: 'DefaultPlayer',
    // Add other player details as needed
  });

  return (
    <PlayerContext.Provider value={{ playerDetails, setPlayerDetails }}>
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayerContext };  // Only export PlayerProvider and usePlayerContext
