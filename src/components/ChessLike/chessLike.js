import './chess-like.css';
import React, { useEffect,useState  } from 'react';
import horsespng from '../../images/24c.png'	
import County from '../county/County'

import { PlayerProvider, usePlayer } from '../player-context/playerContext';



export default function ChessLike(props) {
  const { playerDetails } = usePlayer();
  const playerName = playerDetails.playerName;

const gameData = {
  dublin: {
    map: 
    // Define the Dublin map data
   [
    [3, 3, 0,0,0,0,0,0,0,0,0,0,3, 2, 2, 2, 2, 9, 9, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [3, 3, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 1, 1],
    [4, 4, 0,0,0,0,0,0,0,0,0,0,0, 0, 30, 0, 0, 0, 1, 1],
    [4, 0, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 33, 1, 1, 1],
    [4, 0, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 32, 0, 1, 1, 1],
    [4, 0, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 1, 1, 1],
    [5, 5, 0,0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 34, 1, 1, 1],
    [5, 5, 0,0,0,0,0,0,0,0,0,0,5, 0, 0, 0, 0, 35, 1, 1],
    [5, 5, 0,0,0,0,0,0,0,0,0,0,5, 6, 6, 6, 6, 7, 1, 1],
  ]
  ,
    placenames: {
      // ... Dublin's placenames data here ...
    },
    dialogue: {
      // ... Dublin's dialogue and narrative content here ...
    },

    transitions: {
      5: 'wicklow', 
      6: 'wicklow', 
      7: 'wicklow' 

      // Add other transitions as needed
    }
  },
  wicklow: {

    transitions: {
      2: 'dublin', 
      3: 'dublin', 
      9: 'dublin' 

      // Add other transitions as needed
    },
    map: [
      
      [3, 3, 3, 2, 2, 2, 2, 9, 9, 1],
      [3, 3, 0, 30, 0, 0, 0, 31, 0, 1],
      [3, 3, 0, 0, 0, 0, 0, 0, 0, 1],
      [4, 0, 32, 0, 0, 0, 0, 0, 0, 1],
      [4, 0, 0, 0, 0, 0, "Wicklow", 0, 1, 1],
      [4, 33, 0, 0, 0, 0, 0, 0, 0, 1],
      [4, 4, 0, 0, 0, 0, 0, 0, 0, 1],
      [5, 5, 0, 0, 0, 0, 34, 35, 1, 1],
      [5, 5, 0, 0, 0, 0, 0, 0, 1, 1],
      [5, 5, 5, 6, 6, 6, 6, 7, 1, 1]]
    ,
    placenames: {
      // ... Wicklow's placenames data here ...
    },
    dialogue: {
      // ... Wicklow's dialogue and narrative content here ...
    },
  },
  // Define data for other counties as needed
};

const [shouldRefresh, setShouldRefresh] = useState(false);
 
useEffect(() => {
  // This effect runs once when the component mounts
  const timeoutId = setTimeout(() => {
    // Set shouldRefresh to true after 2 seconds
    setShouldRefresh(true);
    const squareElement = document.getElementById("square-9-10");
    if (squareElement) {
      // Apply your styles here
      squareElement.style.backgroundColor = "yellow";
      squareElement.style.border = "2px solid red";
      // Add more styles as needed

  // setStartingRow(10);
  // setStartingCol(9);
    }
  }, 2000);

  // Cleanup function to clear the timeout in case the component unmounts
  return () => clearTimeout(timeoutId);
}, []); // Empty dependency array ensures that this effect runs only once


const [currentCounty, setCurrentCounty] = useState('dublin');
const [currentMap, setCurrentMap] = useState(gameData.dublin.map);
const [mapTransition, setMapTransition] = useState(null);

const [startingRow, setStartingRow] = useState(/* initial starting row */);
const [startingCol, setStartingCol] = useState(/* initial starting column */);


// Function to handle map transitions
const handleMapTransition = (newMap) => {
  const leavingCounty = currentCounty;
  const enteringCounty = newMap;
// Update startingRow and startingCol based on the new map
  // You can fetch or calculate these values based on your game logic
  // setStartingRow(10);
  // setStartingCol(9);
  setMapTransition({ leavingCounty, enteringCounty }); // Instead of an object, pass them as strings
  setCurrentMap(newMap);
};

// Function to close the map transition overlay
const closeMapTransition = () => {
  setMapTransition(null);
};

// Define shared game data old verson maybe delete?
// useEffect(() => {
//   // Listen for changes in currentMap and wicklowMap
//   if (currentMap === gameData.wicklow.map) {
//     alert('Cill Meantán')
//     // Perform any necessary actions when switching to Wicklow
//     // This could include updating player position or other logic
//   }
// }, [currentMap, setCurrentMap]);
useEffect(() => {
  // Listen for changes in currentMap and wicklowMap
  if (currentMap === gameData.wicklow.map) {
    alert('Cill Meantán');
    // Perform any necessary actions when switching to Wicklow
    // This could include updating player position or other logic
  }


}, [currentMap, gameData.wicklow.map]);

	return <>
    <County className="hesitate"
      countyData={gameData.dublin}
      currentCounty={currentCounty}
      setCurrentCounty={setCurrentCounty}
      setCurrentMap={handleMapTransition}
      startingRow={startingRow}
      startingCol={startingCol}
      playerName={playerName}
            />

		</>	
		

}