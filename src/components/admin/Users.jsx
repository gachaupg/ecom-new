// import React from 'react'
// import styled from 'styled-components'
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from "react";
// import axios from "axios";

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'Name', headerName: 'Name', width: 130 },
//   { field: 'email', headerName: 'email', width: 130 },
//   { field: 'admin', headerName: 'Admin', width: 130 },
  
  
 
//   {
//     field: 'imageUrl',
//     headerName: 'image',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];


// function compare(a,b){
//     if(a._id <b._id){
//       return 1
//     }
//     if(a._id >b._id){
//       return -1
//     }return 0
//   }


// export default function ProductList () {
//     const {items}=useSelector((state)=>state.products)
    
//     const [users,setUsers]=useState([]);

//     useEffect(()=>{
//         async function fetchData(){
//         try {
//           const res= await axios.get(`http://localhost:5000/api/users/stats/all`)
          
//         res.data.sort(compare)
//         const result = res.data.filter((_, index) => index < 30);
//         setUsers(  result)
//         console.log(users);
        
//         } catch (error) {
//           console.log(error);
          
//         }
//         }
//         fetchData()
//           },[])
    
    
//     const rows =  users && users.map(item=>{
//         return{
//             id:item._id,
//             Name:item.name,
//             email:item.email,
//             admin:item.isAdmin,
            

//         }
//     })
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

// const ImageContainer=styled.div`
//     img{
//         height:'40px'
//     }
// `;
// const Actions=styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     button{
//         border: none;
//         outline: none;
//         padding: 3px 5px;
//         color: aliceblue;
//         border-radius:3px;
//         cursor: pointer;
//     }
// `
// const Delete=styled.button`
//     background-color:orange;
// `

// const view=styled.button`
//     background-color:green;
// `
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
// import { deleteTour } from "../../redux/features/productSlice";
import {toast} from 'react-toastify'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
// import { deleteUser } from "../../redux/features/authSlice";
function ResponsiveExample() {
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

    <>
       {loading ? (
      <>
     <Stack spacing={1}>
       {/* For variant="text", adjust the height via font-size */}
       <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
       {/* For other variants, adjust the size with `width` and `height` */}
       <Skeleton variant="circular" width={40} height={40} />
       <Skeleton variant="rectangular" width={210} height={60} />
       <Skeleton variant="rounded" width={210} height={60} />
     </Stack>
     </>
   ) : (
    <Table responsive>
      <thead>
        <tr>
          {/* {Array.from({ length: 5 }).map((_, index) => ( */}
          <>
            <th>User name</th>
            <th>User Email</th>
            <th>IsAdmin</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>city</th>
            <th>Image</th>
            
            
          </>

          {/* ))} */}
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr>

            <>
              <td key={index}>{item.name}</td>
              <td key={index}>{item.email}</td>
              <td key={index}>{item.isSeller?'Seller':'Buyer'}</td>
              <td key={index}>{item.phone}</td>
              <td key={index}>{item.country}</td>
              <td key={index}>{item.city}</td>
              
              
              <td key={index}>
                <img style={{width:'2rem'}} src={item.img} alt="" />
              </td>
             

             
            </>
          </tr>
        ))}
      </tbody>
    </Table>
   )}
    </>
  );
}

export default ResponsiveExample;
