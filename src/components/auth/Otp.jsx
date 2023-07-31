import React, { useState } from 'react';
import { StyledForm } from './StyledForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOpt] = useState('');
  const navigate = useNavigate();
const otps=99999
  // async function verifyCode() {
    // Assuming you have the phone number available
  //   const phone = '+254757198515';

  //   await fetch('http://localhost:5000/api/verify', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({code:otp}),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.ok === true) {
  //         alert('Number verified successfully');
  //         navigate('/login')
  //       } else {
  //         alert('Oh no, we have an error');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       alert('Error occurred while verifying the number');
  //     });
  // }

  console.log(otp);

const  Very =(e)=>{
  e.preventDefault()
  if(otp==otps){
alert('invalid verification code')
  }else{
    toast.success('verification succes')
    navigate('/login')
  }
}

  return (
    <div>
      <StyledForm onSubmit={Very}>
        <div>
          <h1 style={{ margin: 20 }}>Code verification</h1>
          <input
            type='number'
            maxLength={6}
            onChange={(e) => setOpt(e.target.value)}
            placeholder='Enter your code'
          />
          <button >Verify code</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Otp;
