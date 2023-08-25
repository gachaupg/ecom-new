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
<PaypalCheckoutButton product={cartItems}/>

</>
                {/* )
              })} */}
           
           
            
        </PayPalScriptProvider>
    )
}

export default Paypa