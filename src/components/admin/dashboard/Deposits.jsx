import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [users, setUsers] = React.useState([]);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api`
        );

        res.data.sort(compare);
        // const result = res.data.filter((_, index) => index < 10);
        setUsers(res.data);
        console.log(users.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  let currentDate = `${day}-${month}-${year}`;
  const totalPrice = users.reduce((sum, user) => sum + user.cartTotalAmount, 0);

  return (
    <div style={{background:'grey'}}>
      <p style={{color:'white',fontSize:'2rem',fontWeight:'700',}}>Recent Amount</p>
      <Typography component="p" variant="h4">
       
       <p style={{color:'white'}}>   $ {totalPrice}</p>  
          
        
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       <p style={{color:'white'}}> Date
        {currentDate}</p>
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </div>
  );
}
