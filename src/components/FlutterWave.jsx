import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useSelector } from 'react-redux';

const FlutterWave = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const amountInCents = cartItems ; // Convert dollars to cents

  const config = {
    public_key: import.meta.env.VITE_FLUTTER,
    tx_ref: Date.now(),
    amount: cartItems, // Use the converted amount in cents
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: user.phone,
      name: user.name,
    },
    customizations: {
      title: 'EasybuyEnterprises',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div style={{ marginBottom: '.7rem' }}>
      <div>
        <h4>Pay with flutterwave</h4>
        <FlutterWaveButton {...fwConfig} />
      </div>
    </div>
  );
};

export default FlutterWave;
