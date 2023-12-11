import React, { useEffect, useState } from 'react';
import '../counties.css'

function MapTransitionOverlay({ leavingCounty, enteringCounty, onClose }) {
  const [visible, setVisible] = useState(true);

  // Automatically close the overlay after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`overlay ${visible ? 'visible' : ''}`}>
      <div className="overlay-content">
        {/* <h2>Leaving {leavingCounty}</h2> */}
        <h2>Entering {enteringCounty}</h2>
      </div>
    </div>
  );
}


export default MapTransitionOverlay;
