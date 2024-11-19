import React from 'react';
import { Button } from '@mui/material';

const Hero = () => {

    

  return (
    <div className="bg-red-600 text-white p-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Blood Bank</h1>
      <p className="text-xl mb-6">Donate blood, save lives.</p>

      <Button variant="contained" color="primary" size="large">Learn More</Button>
      
    </div>
  );
};

export default Hero;
