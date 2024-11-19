import React from 'react';
import { TextField, Button } from '@mui/material';

const Feedback = () => {
  return (
    <div className="bg-gray-100 p-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">We value your feedback</h2>
      <form className="max-w-md mx-auto">
        <TextField
          fullWidth
          label="Your Feedback"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" size="large">Submit</Button>
      </form>
    </div>
  );
};

export default Feedback;
