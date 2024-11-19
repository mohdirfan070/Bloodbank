import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import { TableCell, TableRow } from '@mui/material';
import baseurl from '../assets/url';
import axios from 'axios';
import { toast } from "react-toastify";

const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

const deleteOrganization = async (id, role,  updateValue, updatorFunc) => {
  try {

    const result = await axios.delete(baseurl+`/user/${id}/${role}`, {withCredentials:true});
    if (!result.data.status) throw result;
    updatorFunc(!updateValue);
    notify(result.data.msg, "success", "light", 2000);
  } catch (error) {
    notify(error.message, "error", "light", 2000);
  }
};

export default function OrgTableRow(prop) {
    
  return (
    <TableRow className='hover:bg-gray-200'>
      <TableCell>{prop.index + 1}</TableCell>
      <TableCell>{prop.organization.name}</TableCell>
      <TableCell>{prop.organization.mobile}</TableCell>
      <TableCell>{prop.organization.email}</TableCell>
      <TableCell>
        <a href={`https://api.whatsapp.com/send?phone=91${prop.organization.mobile}&text=${encodeURIComponent(`Hello ${prop.organization.name}.`)} `}>
          <WhatsAppIcon color='success' titleAccess='Whatsapp' />
        </a>
        <SendIcon color='warning' className='-rotate-45 ml-2' titleAccess='Request' />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton title='Delete Organization' onClick={() => deleteOrganization(prop.organization._id,"user", prop.update.updateTable, prop.update.updateSetUpdateTable)} aria-label="delete" size="medium">
            <DeleteIcon color='error' fontSize="inherit" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
