import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Grid, Card, CardContent, CardActions, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import baseurl from '../assets/url';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from "react-toastify";

const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const getCardBackgroundColor = (status) => {
  switch (status) {
    case "success":
      return "lightgreen";
    case "accept":
      return "lightblue";
    case "decline":
      return "lightgrey";
    default:
      return "white";
  }
};

const ListDonorRequest = ({ open, handleClose, donorId }) => {
  const [requests, setRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${baseurl}/getreq`, { withCredentials: true });
      setRequests(res.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchRequests();
    }
  }, [open]);

  const handleAccept = async ( donorId ,  reqId , status ) => {
    try {
      const res = await axios.put(`${baseurl}/updatereq/${donorId}/${reqId}`, { status }, { withCredentials: true });
      toast.success(res.data.msg);
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Error accepting request');
    }
  };

 

  const sortRequests = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" color='error' component="h2">
          Donor Requests
        </Typography>
        <Stack direction="row" spacing={2} style={{ marginTop: 10 }}>
        {  sortedRequests.length >0 ?  <>
           <Button variant="contained" onClick={() => sortRequests('from.name')}>
            Sort by Name
          </Button>
          <Button variant="contained" onClick={() => sortRequests('time')}>
            Sort by Time
          </Button>

         </> : ""
}          
        </Stack>
        <Grid container spacing={2} style={{ marginTop: 20, maxHeight: 'calc(100% - 100px)', overflow: 'auto' }}>
          { sortedRequests.length >0 ? sortedRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={request._id}>
              <Card variant='elevation' style={{ backgroundColor: getCardBackgroundColor(request.status) }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    From: {request.from.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {request.quantity} ml
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(request.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Time: {request.time}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {request.from.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {request.from.mobile}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Message: {request.msg}
                  </Typography>
                  {request.status === 'decline' && (
                    <Typography variant="body2" color="error" component="div">
                      Declined
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  {request.status === "pending" && (
                    <>
                      <Button variant="contained" color="success" onClick={() => handleAccept(request.to._id , request._id ,"accept")}>
                        Accept
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleAccept(request.to._id , request._id , "decline")}>
                        Reject
                      </Button>
                    </>
                  )}
                  <IconButton title='Delete Organization' aria-label="delete" size="medium" disabled={request.status === "decline"}>
                    <a href={`https://api.whatsapp.com/send?phone=91${request.from.mobile}&text=${encodeURIComponent(`Hello ${request.from.name}, I accept your request of ${request.quantity}ml "${request.to.bloodGroup}" blood.`)}`}>
                      <WhatsAppIcon color='success' titleAccess='Whatsapp' />
                    </a>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ) )  : <h1 className='text-center font-semibold' >No requests Yet</h1>}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ListDonorRequest;
