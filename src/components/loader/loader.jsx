import React from 'react';
import './style.css'

const loader = () => {
  return (
    <div className='bigcontainer'>
      <div className="container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default loader;
