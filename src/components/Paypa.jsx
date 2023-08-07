import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from 'react-redux';

const Paypa = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const product={
    name:'hello',
    price:9,
  }
  return (
<PayPalScriptProvider >
{/* {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                
              )} */}
              {cart.cartItems && cart.cartItems.map((cart)=>{
                return(
<>
<PayPalButtons product={cart}/>
</>
                )
              })}
           
           
            
        </PayPalScriptProvider>
    )
}

export default Paypa