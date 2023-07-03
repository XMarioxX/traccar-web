import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    margin: '20px',
  },
  tableBody: {
    overflow: 'auto',
    maxHeight: '200px',
  },
  searchInput: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

function ActivityTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredResults = data.filter((item) => item.title.toLowerCase().includes(value));
    setFilteredData(filteredResults);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className={classes.searchInput}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ActivityTable;
