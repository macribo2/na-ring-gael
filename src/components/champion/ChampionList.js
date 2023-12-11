import React, { useState } from 'react';
import { CircularInput, CircularProgress, CircularThumb, CircularTrack, useCircularDrag } from 'react-circular-input';

const champions = [
  { name: 'Champion 1', image: 'path-to-image-1.jpg' },
  { name: 'Champion 2', image: 'path-to-image-2.jpg' },
  // ... more champions
];
const ChampionDial = ({ champions }) => {
  const [value, setValue] = useState(0);
  
  const handleDrag = useCircularDrag(angle => {
    setValue(angle);
  });

  // Example of a champion name based on the current angle
  const selectedChampion = champions[Math.floor((value / 360) * champions.length)];

  return (
    <CircularInput value={value} onChange={handleDrag}>
      <CircularTrack />
      <CircularProgress />
      <CircularThumb>
        {/* Your custom champion graphic goes here */}
        <img src={selectedChampion.image} alt={selectedChampion.name} />

        {/* Display the champion name */}
        <div>{selectedChampion.name}</div>
      </CircularThumb>
    </CircularInput>
  );
};

export default ChampionDial;
