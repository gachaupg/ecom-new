import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {toast} from 'react-toastify'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const [users, setUsers] = useState([]);
    function compare(a, b) {
      if (a._id < b._id) {
        return 1;
      }
      if (a._id > b._id) {
        return -1;
      }
      return 0;
    }
    const dispatch=useDispatch()
    const { user } = useSelector((state) => ({ ...state.auth }));
  const[loading, setLoading]=useState(true)
    console.log(loading);
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this tour ?")) {
        dispatch(deleteUser({ id, toast }));
      }
    };
  
    const id = user?.result?._id;
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios.get(
            `https://ecommerce-lxo3.onrender.com/api/users/stats/all`
          );
          res.data.sort(compare);
          // const result = res.data.filter((_, index) => index < 30);
          setUsers(res.data);
          setLoading(false)
          console.log("usergtttt", users);
        } catch (error) {
          console.log(error);
          setLoading(false)
  
        }
      }
      fetchData();
    }, []);




  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Is Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.isAdmin ===true?'Admin':'User'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
