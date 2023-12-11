// Champion.js
import React from 'react';

const Champion = ({ name, image }) => (
  <div>
    <img src={image} alt={name} />
    <p>{name}</p>
  </div>
);

export default Champion;
