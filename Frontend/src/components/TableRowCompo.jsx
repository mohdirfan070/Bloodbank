import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import { TableCell, TableRow } from '@mui/material';
import baseurl from '../assets/url';
import axios from 'axios';
import { toast } from "react-toastify";
import RequestModal from './RequestModal';

const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

const deleteDonor = async (id, role, updateValue, updatorFunc) => {
  try {
    const result = await axios.delete(`${baseurl}/donor/${id}/${role}`, { withCredentials: true });
    if (!result.data.status) throw result;
    updatorFunc(!updateValue);
    notify(result.data.msg, "success", "light", 2000);
  } catch (error) {
    notify(error.message, "error", "light", 2000);
  }
};

export default function TableRowCompo(prop) {
  const twelveWeeksInMilliseconds = 12 * 7 * 24 * 60 * 60 * 1000;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleRequest = () => {
    // Handle request logic here
    handleCloseModal();
    notify("Request sent successfully", "success", "light", 2000);
  };

  return (
    <>
      <TableRow
        style={{ backgroundColor: (Date.now() > new Date(prop.user.lastDonateDate ? Number(prop.user.lastDonateDate) + twelveWeeksInMilliseconds : 0).getTime()) ? " " : "#fecaca" }}
        className='hover:bg-gray-200'
        key={prop.user._id}
      >
        <TableCell>{prop.index + 1}</TableCell>
        <TableCell>{prop.user.name}</TableCell>
        <TableCell>{prop.user.age}</TableCell>
        <TableCell>{prop.user.bloodGroup}</TableCell>
        <TableCell>{prop.user.mobile}</TableCell>
        <TableCell>{prop.user.email}</TableCell>
        <TableCell>
          <a href={`https://api.whatsapp.com/send?phone=91${prop.user.mobile}&text=${encodeURIComponent(`Hii ${prop.user.name}.\nWe are from RedGold Blood Bank.\nThis is to inform you that we are in a urgent need of "${prop.user.bloodGroup}" Blood.\nPlease if you are able to donate click the link given below for further details.`)}`}>
            <WhatsAppIcon color='success' titleAccess='Whatsapp' />
          </a>
          <IconButton onClick={handleOpenModal} aria-label="request" size="medium">
            <SendIcon color='warning' className='-rotate-45 ml-2' titleAccess='Request' />
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <IconButton title='Delete Donor' onClick={() => deleteDonor(prop.user._id, "donor", prop.update.updateTable, prop.update.updateSetUpdateTable)} aria-label="delete" size="medium">
              <DeleteIcon color='error' fontSize="inherit" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <RequestModal open={openModal} handleClose={handleCloseModal} handleRequest={handleRequest} userName={prop.user.name} />
    </>
  );
}
