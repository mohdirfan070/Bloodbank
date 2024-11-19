import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
      <Box className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <p className="text-lg">We'd love to hear from you! Please fill out the form below to get in touch.</p>
      </Box>
      <form autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
        />
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          className="w-full mt-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
