import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import TableRowCompo from './TableRowCompo';
import baseurl from '../assets/url';
import axios from 'axios';


const fetchDonor = async () => {
  try {
    const result = await axios.get(`${baseurl}/donors`, { withCredentials: true });
    if (!result.data.status) throw result;
    return result.data;
  } catch (error) {
    // console.log(error);
  }
};
const UsersTable = () => {
  const [updateTable, setUpdateTable] = useState(false);
  const updateSetUpdateTable = value => setUpdateTable(value);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [bloodGroupQuery, setBloodGroupQuery] = useState('');
  const [mobileQuery, setMobileQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const twelveWeeksInMilliseconds = 12 * 7 * 24 * 60 * 60 * 1000; // 12 weeks in milliseconds

  useEffect(() => {
    fetchDonor().then((result) => {
      setUsers([...result.users]);
      setFilteredUsers([...result.users]);
    }).catch((error) => {
      console.log(error);
    });
  }, [updateTable]);

  const handleSearch = () => {
    setFilteredUsers(users.filter(user =>
      user.bloodGroup.toLowerCase().includes(bloodGroupQuery.toLowerCase()) &&
      user.mobile.includes(mobileQuery) &&
      user.name.toLowerCase().includes(nameQuery.toLowerCase())
    ));
  };
  
  useEffect(() => {
    handleSearch();
  }, [bloodGroupQuery, mobileQuery, nameQuery, users]);
  

  return (
    <>
      <div className='w-full h-max  px-2 py-3'>
        <TextField
          label="Search by Blood Group"
          variant="outlined"
          value={bloodGroupQuery}
          onChange={(e) => setBloodGroupQuery(e.target.value)}
          style={{ margin: '0 10px' }}
        />
        <TextField
          label="Search by Mobile"
          variant="outlined"
          value={mobileQuery}
          onChange={(e) => setMobileQuery(e.target.value)}
          style={{ margin: '0 10px' }}
        />
        <TextField
          label="Search by Name"
          variant="outlined"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          style={{ margin: '0 10px' }}
        />
      </div>
      <TableContainer component={Paper} className="">
        <Table>
          <TableHead>
            <TableRow className='bg-slate-300'>
              <TableCell>Sl. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Last Donate Date</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Connect</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers && filteredUsers.map(( user , index) => (
              <TableRowCompo user={user} key={index + 1} index={index} update={{ updateTable, updateSetUpdateTable }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;

