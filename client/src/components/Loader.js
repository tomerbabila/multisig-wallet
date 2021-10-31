import React from 'react';
import puff from '../assets/puff.svg';

function Loader() {
  return (
    <div>
      <img src={puff} alt='loading...' />
    </div>
  );
}

export default Loader;
