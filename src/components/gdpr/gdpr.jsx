import React, { useState, useEffect } from 'react';
import './gdpr.css';
const CookiesConsent = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Check if user has previously given consent
  useEffect(() => {
    const userConsent = localStorage.getItem('cookiesConsent');
    if (userConsent === 'true') {
      setConsentGiven(true);
    } else {
      setShowModal(true);
    }
  }, []);

  // Function to handle user consent
  const handleConsent = (consent) => {
    setConsentGiven(consent);
    setShowModal(false);
    localStorage.setItem('cookiesConsent', consent.toString());
  };

  return (
    <div>
      {showModal && (
        <div className="cookies-modal">
          <h2>Cookie Consent</h2>
          This website uses cookies to ensure you get the best experience.
          <div className="buttons">
            <button className='gdpr-buttons menu' onClick={() => handleConsent(true)}>Accept</button>
            <button className='gdpr-buttons menu'onClick={() => handleConsent(false)}>Decline</button>
          </div>
        </div>
      )}
      {/* Your app content goes here */}
      {consentGiven && <p></p>}
    </div>
  );
};

export default CookiesConsent;
