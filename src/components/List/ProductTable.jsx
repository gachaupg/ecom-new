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
import EditProduct from "../admin/EditProduct";

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
    
  
    const id = user?.result?._id;
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios.get(
            `https://ecommerce-lxo3.onrender.com/api/products`
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

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this tour ?")) {
        dispatch(productsDelete({ id, toast }));
      }
    };


  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell style={{width:'2rem'}} align="right">Reviews</TableCell>
            <TableCell align="right">Image</TableCell>
            {/* <TableCell align="right">Edit</TableCell> */}
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{width:'4rem'}} component="" scope="">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.task}</TableCell>
              <TableCell key={row._id}>
                    <img
                      style={{ width: "2rem" }}
                      src={row.image?.url}
                      alt=""
                    />
                  </TableCell>

                  {/* <EditProduct prodId={row._id} /> */}
                  <TableCell
                    key={row._id}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




// // `
// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";
// import { productsDelete } from "../../slices/productsSlice";
// function ResponsiveExample() {
//   const [users, setUsers] = useState([]);
//   function compare(a, b) {
//     if (a._id < b._id) {
//       return 1;
//     }
//     if (a._id > b._id) {
//       return -1;
//     }
//     return 0;
//   }
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state.auth }));
//   const [loading, setLoading] = useState(true);



//   const id = user?.result?._id;
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `https://ecommerce-lxo3.onrender.com/api/products`
//         );
//         res.data.sort(compare);
//         // const result = res.data.filter((_, index) => index < 30);
//         setUsers(res.data);
//         setLoading(false);
//         console.log("user", users);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <>
//           <Stack spacing={1}>
//             {/* For variant="text", adjust the height via font-size */}
//             <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
//             {/* For other variants, adjust the size with `width` and `height` */}
//             <Skeleton variant="circular" width={40} height={40} />
//             <Skeleton variant="rectangular" width={210} height={60} />
//             <Skeleton variant="rounded" width={210} height={60} />
//           </Stack>
//         </>
//       ) : (
//         <Table responsive>
//           <thead>
//             <tr>
//               {/* {Array.from({ length: 5 }).map((_, index) => ( */}
//               <>
//                 <th>Product name</th>
//                 <th>Price</th>

//                 <th>Category</th>

//                 <th>Image</th>
//                 <th>Edit</th>
//                 <th>Delete</th>
//               </>

//               {/* ))} */}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((item, index) => (
//               <tr>
//                 <>
//                   <td key={index}>{item.name}</td>
//                   <td key={index}>{item.price}</td>

//                   <td key={index}>{item.brand}</td>

//                 </>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// }

// export default ResponsiveExample;
