import './gameboard.css'
import React, { useState, useEffect, useRef } from 'react';
import { igate } from 'react-router-dom';
import EnemyKnight from '../enemies/EnemyKnight'
import blackKnight from '../../images/knight.png'
import whiteKnight from '../../images/knight2.png'
import Modal from '../modal/Modal'; // Import the Modal component
import '../dublin/dublin.css';

function GameBoard({ setCurrentMap, currentMap, currentCounty, countyData, startAnimation, stopAnimation }) {

console.log(currentMap)

  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const square = document.getElementById('square-4-16'); // Replace 'square-id' with the actual ID of the square

  if (square) {
      // Add the "pawn" class to the square
      square.classList.add('pawn'); 
  }


  const [playerChoice, setPlayerChoice] = useState(null);
  const [prevValidMoves, setPrevValidMoves] = useState([]); // State to store previously valid moves
  const [knightType, setKnightType] = useState(null);


  const [prevHighlightedSquare, setPrevHighlightedSquare] = useState({ rowIndex: null, cellIndex: null });

  const [highlightNextMoves, setHighlightNextMoves] = useState(false);

  let initialCol = 3;
  
  let initialRow = 5;

  const [blackKnightPosition, setBlackKnightPosition] = useState({
    row: 3, // Set the row to 3
    col: 4, // Set the column to 4
  });
  const [whiteKnightPosition, setWhiteKnightPosition] = useState({
    row: initialRow, col: initialCol
  });

  const [playerMadeFirstMove, setPlayerMadeFirstMove] = useState(false);

  // const [blackKnightPosition, setBlackKnightPosition] = useState({
  //   row: initialRow - 2, // Adjust the initial positions as needed
  //   col: initialCol - 1,
  // });
  
  // const [whiteKnightPosition, setWhiteKnightPosition] = useState({
  //   row: initialRow - 2, // Adjust the initial positions as needed
  //   col: initialCol + 1,
  // });
  const [targetSquare, setTargetSquare] = useState(null);
  const numRows = 100//currentMap.length;
  const numCols = 100//currentMap[0].length;
  const [greenKnightPosition, setGreenKnightPosition] = useState({ row: initialRow, col: initialCol });

  function resetSquareStyles() {
    // Loop through the previously highlighted squares and reset their styles
    prevValidMoves.forEach((move) => {
      const { row, col } = move;
      const element = document.getElementById(`square-${col}-${row}`);
      if (element) {
        // Check if the square was originally a black square
        if (element.classList.contains('black-square')) {
          element.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          // You can set other styles as needed
        } else {
          element.style.backgroundColor = 'transparent';
        }
      }
    });
  }
  



  // Function to calculate valid moves for the green knight
  function calculateGreenKnightMoves(row, col) {
    const moves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    const validMoves = [];

    for (const move of moves) {
      const newRow = row + move.row;
      const newCol = col + move.col;

      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        validMoves.push({ row: newRow, col: newCol });
      }
    }

    return validMoves;
  }


  for (let rowIndex = 0; rowIndex < currentMap.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < currentMap[rowIndex].length; cellIndex++) {
      if (currentMap[rowIndex][cellIndex] === 31) {
        initialRow = currentMap.length - 1 - rowIndex; // Adjust for reversing the map
        initialCol = cellIndex;
        break;
      }
    }
  }

  // Initialize highlightedSquare to the first square
  const [highlightedSquare, setHighlightedSquare] = useState({ rowIndex: 10, cellIndex: 9 });

  const greenKnightRef = useRef(null); // Create a ref for the green knight





  // Function to log the position relative to the viewport
  const logPosition = (event) => {
    const rect = document.getElementById(`square-${highlightedSquare.cellIndex}-${highlightedSquare.rowIndex}`).getBoundingClientRect();
    const xPercentage = ((rect.left + window.scrollX) / window.innerWidth) * 100;
    const yPercentage = ((rect.top + window.scrollY) / window.innerHeight) * 100;
    console.log(`x: ${xPercentage}%, y: ${yPercentage}%`);

    // Check if yPercentage is greater than 90% and refresh the page if it is
    if (yPercentage > 105) {
      window.location.reload();
    }

  };

  useEffect(() => {
    // Log the position initially
    logPosition();

    // Set up an interval to log the position every 500ms
    const intervalId = setInterval(logPosition, 500);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [highlightedSquare]);


  const switchToCounty = (targetCounty) => {
    setCurrentMap(targetCounty.toLowerCase());
    // navigate(`/${targetCounty.toLowerCase()}`);
  };

  

  function calculateKnightMoves(row, col) {
    const moves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    const validMoves = [];

    for (const move of moves) {
      const newRow = row + move.row;
      const newCol = col + move.col;

      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        validMoves.push({ row: newRow, col: newCol });
      }
    }

    return validMoves;

    
  }
  let clickCounter = 0;
  const [isOriginalGreenKnightVisible, setIsOriginalGreenKnightVisible] = useState(true);
  const handleSquareClick = (rowIndex, cellIndex) => {
    const clickedSquareId = `square-${rowIndex}-${cellIndex}`;

// Inside the click event handler for selecting a horse (e.g., white or black horse)


// if (clickCounter!=0) etc
  // Check if the clicked square is one of the allowed squares
  // if (clickedSquareId === 'square-11-10' || clickedSquareId === 'square-11-8') {
    // Handle game logic for the allowed squares
    // For example, trigger animations or perform actions
    console.log(`Clicked on square: ${clickedSquareId}`);
// Check if the clicked square is not the starting square of the chess piece
if (rowIndex !== initialRow || cellIndex !== initialCol) {
  // Remove the background image from the previous square
  if (highlightedSquare.rowIndex !== rowIndex || highlightedSquare.cellIndex !== cellIndex) {
    const prevElement = document.getElementById(`square-${highlightedSquare.cellIndex}-${highlightedSquare.rowIndex}`);
    if (prevElement) {
      prevElement.style.backgroundColor = 'transparent';
      prevElement.style.backgroundImage = 'none';
    }
  }

  // Display the knight image on the clicked square
  const clickedSquare = document.getElementById(`square-${cellIndex}-${rowIndex}`);
  if (clickedSquare.id === 'square-8-11') {
    // The player has selected the white knight
    setPlayerChoice('white');
    clickedSquare.style.backgroundImage = 'url("./knight2.png")'; // Load the white knight image
  } else {
    // The player has not selected the white knight
    setPlayerChoice('black');
    clickedSquare.style.backgroundImage = 'url("./knight.png")'; // Load the black knight image
  }

}

    //player captures knight?
    if (rowIndex === 11 && cellIndex === 8) {
      // Run your additional functions here
      // For example:
      handleKnightChoice('white')
      // Call your custom functions or perform any other actions you need.
    }
  
    if (rowIndex === 11 && cellIndex === 10) {
      // Run your additional functions here
      // For example:
      handleKnightChoice('black')
      // Call your custom functions or perform any other actions you need.
    }
    // Update the previously highlighted square before updating the new highlighted square
    setPrevHighlightedSquare(highlightedSquare);
  
    // Update the highlighted square to the clicked square
    setHighlightedSquare({ rowIndex, cellIndex });
  
    // Remove the highlighting from the previously highlighted valid move squares
    prevValidMoves.forEach((move) => {
      const { row, col } = move;
      const element = document.getElementById(`square-${col}-${row}`);
      if (element) {
        element.classList.remove('highlighted-kn');
        element.style.backgroundColor = 'transparent';
      }
    });
  
    // Calculate the new valid knight moves from the clicked square
    const validMoves = calculateKnightMoves(rowIndex, cellIndex);
  
    // Check if the clicked square is the starting square of the chess piece
    const isStartingSquare = rowIndex === initialRow && cellIndex === initialCol;
  
    // Store the new valid moves as the previously highlighted squares
    if (!isStartingSquare) {
      setPrevValidMoves(validMoves);
    }
  
    // Highlight the new valid move squares with a purple background color
    validMoves.forEach((move) => {
      const { row, col } = move;
      const element = document.getElementById(`square-${col}-${row}`);
      if (element) {
        element.classList.add('highlighted-kn');
        element.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
      }
    });
    
    if (highlightedSquare.rowIndex !== rowIndex || highlightedSquare.cellIndex !== cellIndex) {
      const prevElement = document.getElementById(`square-${highlightedSquare.cellIndex}-${highlightedSquare.rowIndex}`);
      if (prevElement) {
        prevElement.classList.remove('white-knight'); // Remove the class to hide the white horse
      }
    }
 
    
    // Remove the 'highlighted-kn' class from all squares
    document.querySelectorAll('.chess-like-cell').forEach((square) => {
      square.classList.remove('highlighted-kn');
      square.style.border = 'none'; // Remove the border from all squares
  });

       // Determine if the clicked square is a white knight or black knight square
  const isWhiteKnightSquare = rowIndex === initialRow && cellIndex === initialCol;
  const isBlackKnightSquare = rowIndex === initialRow && cellIndex === initialCol + 1;

  // Update the playerChoice based on the square clicked
  if (isWhiteKnightSquare) {
    setPlayerChoice('white');
  } else if (isBlackKnightSquare) {
    setPlayerChoice('black');
  }
    const whiteHorse = document.getElementById('square-15-3');
    const blackHorse = document.getElementById('square-16-4');
    if (whiteHorse && blackHorse) {
      whiteHorse.classList.add('invisible');
      blackHorse.classList.add('invisible');
    }
   
    // Hide the original green knight when a square is clicked
    setIsOriginalGreenKnightVisible(false);

    // Hide the original green knight when a square is clicked
    
    
    // Calculate the new position for the green knight
    const newGreenKnightPosition = calculateNewPosition(
      greenKnightPosition.row,
      greenKnightPosition.col,
      rowIndex,
      cellIndex
    );
    
    // Apply the animation class by adding it to the ref element
    if (greenKnightRef.current) {
      greenKnightRef.current.classList.add('animate'); // Add an 'animate' class
    }


    // Highlight the target square by setting its coordinates in state
    setTargetSquare({ rowIndex: newGreenKnightPosition.row, cellIndex: newGreenKnightPosition.col });

    // Set the position of the green knight using the ref
    if (greenKnightRef.current) {
      greenKnightRef.current.style.gridRow = `${newGreenKnightPosition.row + 1}`;
      greenKnightRef.current.style.gridColumn = `${newGreenKnightPosition.col + 1}`;
    }


    
    // Calculate valid knight moves from the clicked square
    // const validMoves = calculateKnightMoves(rowIndex, cellIndex);
    const squareNumber = currentMap[currentMap.length - 1 - rowIndex][cellIndex];
  
    // Check if the clicked square is a valid knight move
    const isValidMove = validMoves.some((move) => {
      return move.row === highlightedSquare.rowIndex && move.col === highlightedSquare.cellIndex;
    });
  
    if (!isValidMove) {
      return;
    }


  
    // Log the target row and column values
    console.log(`Move the green knight to row ${newGreenKnightPosition.row}, column ${newGreenKnightPosition.col}`);
  
    // Highlight the target square by setting its coordinates in state
    setTargetSquare({ rowIndex: newGreenKnightPosition.row, cellIndex: newGreenKnightPosition.col });
  
    // ...


    // Log the target row and column values
    console.log(`Move the green knight to row ${newGreenKnightPosition.row}, column ${newGreenKnightPosition.col}`);

    // Construct the message for the alert
    const alertMessage = `Move the green knight to row ${newGreenKnightPosition.row}, column ${newGreenKnightPosition.col}`;

    // Show the alert
    // alert(alertMessage);

    // Set the position of the green knight using the ref
    if (greenKnightRef.current) {
      greenKnightRef.current.style.gridRow = `${newGreenKnightPosition.row + 1}`;
      greenKnightRef.current.style.gridColumn = `${newGreenKnightPosition.col + 1}`;
    }

    // Update the state to the new position
    setGreenKnightPosition(newGreenKnightPosition);

    if (!playerMadeFirstMove) {
      // Update the state to indicate that the first move has been made
      setPlayerMadeFirstMove(true);
  
      // Apply the "invisible" class to both horse squares
      const whiteHorse = document.getElementById('square-15-3');
      const blackHorse = document.getElementById('square-16-4');
      if (whiteHorse && blackHorse) {
        whiteHorse.classList.add('invisible');
        blackHorse.classList.add('invisible');
      }
    }

  
  
  
  
    // Remove the 'highlighted-kn' class from all squares
    document.querySelectorAll('.chess-like-cell').forEach((square) => {
      const element = square;
      if (element) {
        square.classList.remove('highlighted-kn');
      }
    });

       // Highlight the clicked square with a pale blue background color
       const clickedSquare = document.getElementById(`square-${cellIndex}-${rowIndex}`);
       if (clickedSquare) {
         clickedSquare.classList.add('highlighted-kn');
         clickedSquare.style.backgroundColor =  "rgba(164, 51, 149, 0.556) ";
         clickedSquare.style.backgroundImage = 'url("./knight.png")';
       }
    
    
    // Highlight the valid move squares with pale blue color
    for (const move of validMoves) {
      const { row, col } = move;
      const element = document.getElementById(`square-${col}-${row}`);
      if (element) {
        element.classList.add('highlighted-kn');
      }
    }
    // Set the previously occupied square to pale blue if it's not the same as the clicked square
    if (
      highlightedSquare.rowIndex !== rowIndex ||
      highlightedSquare.cellIndex !== cellIndex
    ) {
      const prevElement = document.getElementById(
        `square-${highlightedSquare.cellIndex}-${highlightedSquare.rowIndex}`
      );
      if (prevElement) {
        prevElement.classList.add('highlighted-kn');
      }
    }

    // Set the highlighted square to the clicked square
    setHighlightedSquare({ rowIndex, cellIndex });
  
    if (countyData.transitions && countyData.transitions[squareNumber]) {
      const targetCounty = countyData.transitions[squareNumber];
      switchToCounty(targetCounty);
    }


  
  
 
    //  }
  //  else {
  //   // Ignore the click for other squares
  //   console.log(`Clicked on an invalid square: ${clickedSquareId}`);
  // }
  
  // Remove the background image from the previous square
    if (highlightedSquare.rowIndex !== rowIndex || highlightedSquare.cellIndex !== cellIndex) {
      resetSquareStyles(); // Reset the styles of previously highlighted squares
    }
 
  // Other logic...




  if (isWhiteKnightSquare) {
    setPlayerChoice('white');
    console.log('Clicked on a black knight square');
    // Add the "drift-down" class and the "rotate-horse-45" class to the white horse element
    const whiteHorse = document.getElementById('square-15-3');
    if (whiteHorse) {
    
      whiteHorse.classList.add('rotate-horse-45');
    }
  } else if (isBlackKnightSquare) {
    setPlayerChoice('black');
    // Add the "drift-down" class and the "rotate-horse-45" class to the black horse element
    const blackHorse = document.getElementById('square-16-4');
    if (blackHorse) {
      alert('black horse');
      blackHorse.classList.add('rotate-horse-45');
    }
  }
  
  
  
  
  
  
 
  
  
  
  
  };
  function handleKnightChoice(color) {
    setKnightType(color); // Set the chosen knight type (e.g., 'white' or 'black')
    startAnimation(color); // Start the animation
  }
  
 
  // Function to calculate the new position for the green knight
  function calculateNewPosition(currentRow, currentCol, targetRow, targetCol) {
    // Define all possible legal knight moves
    const knightMoves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    // Calculate the distance between the current position and the target position
    const dx = targetCol - currentCol;
    const dy = targetRow - currentRow;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Sort the knight moves by their distance from the target position
    knightMoves.sort((move1, move2) => {
      const newRow1 = targetRow + move1.row;
      const newCol1 = targetCol + move1.col;
      const newRow2 = targetRow + move2.row;
      const newCol2 = targetCol + move2.col;
      const distance1 = Math.sqrt((newCol1 - currentCol) ** 2 + (newRow1 - currentRow) ** 2);
      const distance2 = Math.sqrt((newCol2 - currentCol) ** 2 + (newRow2 - currentRow) ** 2);
      return distance1 - distance2;
    });

    // Find the first legal move that brings the knight closer to the target
    for (const move of knightMoves) {
      const newRow = currentRow + move.row;
      const newCol = currentCol + move.col;

      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        Math.sqrt((newCol - targetCol) ** 2 + (newRow - targetRow) ** 2) < distance
      ) {
        return { row: newRow, col: newCol };
      }
    }

    // If no valid move brings the knight closer, return the current position
    return { row: currentRow, col: currentCol };
  }

  const originalGreenKnightRow = 2; // Replace with the actual row index
  const originalGreenKnightCol = 3; // Replace with the actual column index
  const isOriginalGreenKnightSquare = greenKnightPosition.row === initialRow && greenKnightPosition.col === initialCol;

  const element = document.querySelector('.drift-down-animation'); // Select your element

  const turnKnight = document.querySelector('.drift-down-animation'); // Select your element

// Function to pause the animation
function pauseAnimation() {
  element.classList.add('pause-animation');
  element.classList.remove('resume-animation');
}

// Function to resume the animation
function resumeAnimation() {
  element.classList.remove('pause-animation');
  element.classList.add('resume-animation');
}


  useEffect(() => {
    const pauseButton = document.getElementById('pauseButton');
    const resumeButton = document.getElementById('resumeButton');
  
    if (pauseButton && resumeButton) {
      pauseButton.addEventListener('click', pauseAnimation);
      resumeButton.addEventListener('click', resumeAnimation);
    }
  
    // Clean up the event listeners if the component unmounts
    return () => {
      if (pauseButton && resumeButton) {
        pauseButton.removeEventListener('click', pauseAnimation);
        resumeButton.removeEventListener('click', resumeAnimation);
      }
    };
  }, []); // The empty dependency array ensures this runs once after the component mounts
  
  return (
    <div className="chess-like-gameboard-container">

        <div className="grid">
        {currentMap.slice().reverse().map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellData, cellIndex) => {
              const isGreenSquare = rowIndex === initialRow && cellIndex === initialCol;
              const isTargetSquare = targetSquare && targetSquare.rowIndex === rowIndex && targetSquare.cellIndex === cellIndex;
              const isblack = (rowIndex + cellIndex) % 2 === 0; // Check both rowIndex and cellIndex
  
              const squareClasses = `chess-like-cell ${
                highlightedSquare.rowIndex === rowIndex &&
                highlightedSquare.cellIndex === cellIndex
                  ? 'highlighted'
                  : ''
              } ${isOriginalGreenKnightVisible && isGreenSquare ? 'green-knight' : ''} ${isTargetSquare ? 'target-square' : ''} ${
                isblack ? 'black-square' : ''
              }`;
  
              return (
                <div
              key={cellIndex}
              className={squareClasses}
              id={`square-${cellIndex}-${rowIndex}`}
              onClick={() => handleSquareClick(rowIndex, cellIndex)}
            >
              {cellData === 1 ? (
                <div className="number">
                  {knightType === 'white' ? (
                    <img id="white-knight-img" src={whiteKnight} alt="White Knight" />
                  ) : knightType === 'black' ? (
                    <img id="black-knight-img" src={blackKnight} alt="Black Knight" />
                  ) : (
                    '1'
                  )}
                </div>
              ) : (
                cellData
              )}
            </div>
          );
            })}
          </div>
        ))}
      </div>
  
      <div className="game-board" isPaused = {isModalOpen}>

      <div ref={greenKnightRef} className={`green-knight ${isOriginalGreenKnightSquare ? 'original-green-knight' : ''}`}>
        {isOriginalGreenKnightSquare && (
          <EnemyKnight greenKnightPosition={greenKnightPosition} />
        )}
      </div>


      </div>
 
      </div>

  );
  
}

export default GameBoard;
