import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import baseurl from '../assets/url';

import { toast } from "react-toastify";
const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

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

const RequestModal = ({ open, handleClose, userName, donorId }) => {
  const currentDate = getCurrentDate();

  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState('');
  const [quantity, setQuantity] = useState('');
  const [msg, setMsg] = useState('');

  const handleRequest = async () => {
    try {
      const requestData = {
        // from: userId,
        to: donorId,
        date,
        time,
        quantity,
        msg
      };
      
      const response = await axios.post(baseurl+'/newrequest', requestData,{withCredentials:true});
      if(!response.data.status) throw new Error("Request Failed");
      notify(response.data.msg,"success","light",3000);
      handleClose();
    } catch (error) {
      notify(error.message,"error","light",3000);
    }
  };

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
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          id="msg"
          label="Message"
          type="text"
          fullWidth
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
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
