import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import TableRowCompo from './TableRowCompo';
import baseurl from '../assets/url';
import axios from 'axios';
import OrgTableRow from './OrgTableRow';

const fetchOrganizations = async () => {
    try {
      const result = await axios.get(`${baseurl}/users`, { withCredentials: true });
      if (!result.data.status) throw result;
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  const OrganizationsTable = () => {
    const [updateTable, setUpdateTable] = useState(false);
    const updateSetUpdateTable = value => setUpdateTable(value);

    const [organizations, setOrganizations] = useState([]);
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const [mobileQuery, setMobileQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
  
    useEffect(() => {
      fetchOrganizations().then((result) => {
        setOrganizations([...result.users]);
        setFilteredOrganizations([...result.users]);
      }).catch((error) => {
        console.log(error);
      });
    }, [updateTable]);
    const handleSearch = () => {
        setFilteredOrganizations(organizations.filter(org => {
          const isMobileMatch = org.mobile.includes(mobileQuery);
          const isNameMatch = org.name.toLowerCase().includes(nameQuery.toLowerCase());
              
          return  isMobileMatch && isNameMatch ;
        }));
      };
      
      useEffect(() => {
        handleSearch();
      }, [ mobileQuery, nameQuery, organizations]);
      return (
        <>
          <div className='w-full h-max px-2 py-3'>
           
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
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Connect</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrganizations && filteredOrganizations.map((org, index) => {
                        return <OrgTableRow  key={org._id} index={index}  update={{ updateTable, updateSetUpdateTable }}  organization={org} />
                     }     )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    };
    
    export default OrganizationsTable;
            