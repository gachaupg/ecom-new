import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from 'react-redux';
import PaypalCheckoutButton from './PaypalButton';

const Paypa = ({cartItems}) => {
  console.log(import.meta.env.PAYPAL);

  console.log(cartItems);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const product={
    name:'hello',
    price:9,
  }
  const handlePayClick = async () => {
    // Perform payment process here, either using FlutterWave or PayPal
    // After successful payment, make an API call to your Node.js backend to save the order
    const response = await fetch('http://localhost:5000/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        name:user.name,
        email:user.email,
        address:'77',
        cartTotalAmount: cart.cartTotalAmount,
      }),
      
    });
    const result = await response.json();
    console.log(result);

    // Handle the result, such as showing a success message or navigating to a thank you page
  };


  return (
    <PayPalScriptProvider
    options={{"client-id":import.meta.env.VITE_PAYPAL}}
  >
{/* {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                
              )} */}
              {/* {cart.cartItems && cart.cartItems.map((cart)=>{
                return( */}
<>
<PaypalCheckoutButton  product={cartItems}/>

</>
                {/* )
              })} */}
           
           
            
        </PayPalScriptProvider>
    )
}

export default Paypa