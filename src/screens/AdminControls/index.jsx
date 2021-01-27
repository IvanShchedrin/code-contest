import React from 'react';
import axios from 'axios';

export const AdminControls = () => {
  const handleStart = () => {
    axios.post('/start');
  };

  return (
    <>
      <button type="button" onClick={handleStart}>Start</button>
    </>
  );
}
