import React, { useState , useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import { TableCell, TableRow } from '@mui/material';
import baseurl from '../assets/url';
import axios from 'axios';
import RequestModal from './RequestModal';
import { userContext } from "../App";
import { toast } from "react-toastify";
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
  const { userRole, updateSetUserRole } = useContext(userContext);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  // console.log(new Date(prop.user.lastDonateDate).getTime()) 

  return (
    <>
      <TableRow
        style={{ backgroundColor: (Date.now() > new Date(  prop.user.lastDonateDate ? new Date(prop.user.lastDonateDate).getTime() + twelveWeeksInMilliseconds : 0).getTime()) ? " " : "#fecaca" }}
        className='hover:bg-gray-200'
        key={prop.user._id}
      >
        <TableCell className='hover:cursor-pointer' >{prop.index + 1}</TableCell>
        <TableCell className='hover:cursor-pointer' >{prop.user.name}</TableCell>
        <TableCell className='hover:cursor-pointer' >{prop.user.age}</TableCell>
        <TableCell className='hover:cursor-pointer' >{prop.user.bloodGroup}</TableCell>
        <TableCell className='hover:cursor-pointer' >{prop.user.lastDonateDate ? new Date(prop.user.lastDonateDate).getDate()+"-"+new Date(prop.user.lastDonateDate).getMonth()+"-"+new Date(prop.user.lastDonateDate).getFullYear() : "Not Available" }</TableCell>
        <TableCell className='hover:cursor-pointer' >{prop.user.mobile}</TableCell>
        <TableCell className='hover:cursor-pointer'  title={prop.user.email} >{  prop.user.email.length > 15 ?  prop.user.email.split("").splice(0,14).join("")+"..." : prop.user.email }</TableCell>
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
             { userRole=="admin" && <DeleteIcon color='error' fontSize="inherit" /> }
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <RequestModal open={openModal} handleClose={handleCloseModal}  userName={prop.user.name} donorId={prop.user._id}  />
    </>
  );
}
