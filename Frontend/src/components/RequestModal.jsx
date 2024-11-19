import React from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const RequestModal = ({ open, handleClose, handleRequest, userName }) => {
  const currentDate = getCurrentDate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Request Form for {userName}
        </Typography>
        <TextField
          margin="normal"
          id="date"
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: currentDate,
          }}
        />
        <TextField
          margin="normal"
          id="time"
          label="Time"
          type="time"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          id="quantity"
          label="Quantity (ml)"
          type="number"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="primary" onClick={handleRequest}>
            Request
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default RequestModal;
