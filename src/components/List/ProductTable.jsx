// import React from 'react'
// import styled from 'styled-components'
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from "react";
// import axios from "axios";

// const columns; GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'pName', headerName: 'item name', width: 130 },
//   { field: 'price', headerName: 'price', width: 130 },
//   { field: 'ram', headerName: 'ram', width: 130 },
  
  
//   { field: 'rom', headerName: 'Internal', width: 130 },
//   { field: 'battery', headerName: 'battery', width: 130 },
//   { field: 'camera', headerName: 'camera', width: 130 },
//   { field: 'os', headerName: 'Os', width: 130 },

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
//           const res= await axios.get(`http://localhost:5000/api/products`)
          
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
//             imageUrl:item.image.url,
//             pName:item.name,
//             price:item.price,
//             Brand:item.brand,
//             ram:item.ram,
//             rom:item.rom,
//             battery:item.battery,
//             camera:item.camera,
//             os:item.os

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
import {toast} from 'react-toastify'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { productsDelete } from "../../slices/productsSlice";
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
  const handleDelete = (id) => {

      dispatch(productsDelete(id))
   
  };

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
        console.log("user", users);
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
            <th>Product name</th>
            <th>Price</th>
            
            <th>Category</th>
            
            <th>Image</th>
            <th>Delete</th>
          </>

          {/* ))} */}
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr>

            <>
              <td key={index}>{item.name}</td>
              <td key={index}>{item.price}</td>
              
              <td key={index}>{item.brand}</td>
              <td key={index}>
                <img style={{width:'2rem'}} src={item.image?.url} alt="" />
              </td>
             
              <td onClick={handleDelete(item._id)} key={index} style={{color:'blue',cursor:"pointer"}}>Delete</td>

             
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
