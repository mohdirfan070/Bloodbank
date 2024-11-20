import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, IconButton, Menu, MenuItem, TextField, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import baseurl from '../assets/url';
import { toast } from 'react-toastify';

const getStatusBgColor = (status) => {
  switch (status) {
    case "success":
      return "lightgreen";
    case "accept":
      return "lightblue";
    case "decline":
      return "lightgrey";
    case "pending":
      return "lightyellow";
    default:
      return "white";
  }
};

const RequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [searchConfig, setSearchConfig] = useState({ bloodGroup: '', from: '', to: '', status: '' });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${baseurl}/getreq`, { withCredentials: true });
      setRequests(res.data.requests);
      console.log(res.data.requests)
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${baseurl}/deletereq/${id}`,{reqId:id} ,{ withCredentials: true });
      setRequests(res.data.requests);
      console.log(res.data.requests)
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    handleSortClose();
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value
    }));
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

  const filteredRequests = sortedRequests.filter((request) => {
    return (
      (searchConfig.bloodGroup ? request.to.bloodGroup.toLowerCase().includes(searchConfig.bloodGroup.toLowerCase()) : true) &&
      (searchConfig.from ? request.from.name.toLowerCase().includes(searchConfig.from.toLowerCase()) : true) &&
      (searchConfig.to ? request.to.name.toLowerCase().includes(searchConfig.to.toLowerCase()) : true) &&
      (searchConfig.status ? request.status.toLowerCase() === searchConfig.status.toLowerCase() : true)
    );
  });

  return (
    <>
      <Typography variant="h6" component="div" style={{ padding: '16px' }}>
        All Requests
      </Typography>
      <Stack direction="row" spacing={2} style={{ marginBottom: 20 }}>
        <TextField
          label="Search by Bloodgroup"
          name="bloodGroup"
          variant="outlined"
          size="small"
          value={searchConfig.bloodGroup}
          onChange={handleSearchChange}
        />
        <TextField
          label="Search by From"
          name="from"
          variant="outlined"
          size="small"
          value={searchConfig.from}
          onChange={handleSearchChange}
        />
        <TextField
          label="Search by To"
          name="to"
          variant="outlined"
          size="small"
          value={searchConfig.to}
          onChange={handleSearchChange}
        />
        <TextField
          label="Search by Status"
          name="status"
          variant="outlined"
          size="small"
          value={searchConfig.status}
          onChange={handleSearchChange}
        />
        <Button variant="contained" onClick={handleSortClick}>
          <FilterListIcon /> Sort/Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={() => handleSortSelect('from.name')}>Sort by From</MenuItem>
          <MenuItem onClick={() => handleSortSelect('to.name')}>Sort by To</MenuItem>
          <MenuItem onClick={() => handleSortSelect('to.bloodGroup')}>Sort by Bloodgroup</MenuItem>
          <MenuItem onClick={() => handleSortSelect('status')}>Sort by Status</MenuItem>
        </Menu>
      </Stack>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>BloodGroup</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { filteredRequests.length >0 ? filteredRequests.map((request) => (
              <TableRow key={request._id} style={{ backgroundColor: getStatusBgColor(request.status) }}>
                <TableCell>{ request.from ? request.from.email : "" }</TableCell>
                <TableCell>{ request.to ?  request.to.email : " "}</TableCell>
                <TableCell>{ request.to? request.to.bloodGroup : ""}</TableCell>
                <TableCell>{ request ? request.quantity : " "}</TableCell>
                <TableCell>{ request ? request.msg : ""}</TableCell> 
                <TableCell>{ request ? request.status : " "}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <DeleteIcon onClick={()=>handleDelete(request._id)} color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))  : "No Requests Yet" }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RequestTable;
