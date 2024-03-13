import React, { useState, useEffect } from 'react';

const GDPR = () => {
//   // State to track whether the popup should be displayed
//   const [showPopup, setShowPopup] = useState(false);

//   // State to track user consent
//   const [consentGiven, setConsentGiven] = useState(false);

//   // Effect to check if user has given consent previously
//   useEffect(() => {
//     const userConsent = localStorage.getItem('cookieConsent');
//     if (!userConsent) {
//       // If no consent is found in localStorage, show the popup
//       setShowPopup(true);
//     }
//   }, []);

//   // Function to handle user consent
//   const handleConsent = () => {
//     // Set user consent in localStorage
//     localStorage.setItem('cookieConsent', 'true');
//     // Update state to hide the popup
//     setConsentGiven(true);
//     setShowPopup(false);
  //};

  return (
    <>
      {/* {showPopup && (
        <div className="GDPR-popup">
          <div className="GDPR-content">
            <h2>Cookie Consent</h2>
            <p>This website uses cookies to enhance the user experience. By clicking "Accept", you agree to our use of cookies.</p>
            <div className="GDPR-buttons">
              <button onClick={handleConsent}>Accept</button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default GDPR;
