// OTPVerificationForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OTPVerificationForm = () => {
  const user = useSelector((state) => state.auth);
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

const navigate=useNavigate()
  const [otp, setOtp] = useState("");
const userId=user._id

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Sort users array by _id in descending order to get the latest user first
    users.sort(compare);

    // Find the latest OTP from the user array
    const latestUser = users.length > 0 ? users[0] : null;
    const latestServerOTP = latestUser ? latestUser.otp : null;
console.log(latestServerOTP);
console.log(otp);
    

    // Compare the user's input OTP with the latest server OTP
    if (  otp==latestServerOTP) {
      // OTP matches
      navigate('/login');
      return;
    } else {
      // OTP does not match
      alert('OTP verification failed');
      // You can handle the failure scenario accordingly
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    // Handle errors here, such as showing an error message to the user
  }
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     // Find the latest OTP from the user array
    
//     if (!users[0]?.otp) {
//       alert('Invalid OTP'); // No OTP found in the server response
//       return;
//     }
//     // Compare the user's input OTP with the latest server OTP
//     if (users[0]?.otp === otp) {
//        // OTP does not match
//        navigate('/login')
//       return;
//     }


//     // If OTP matches, proceed with verification
//     const response = await axios.post("http://localhost:5000/api/verify-otp", { userId, otp });
//     setVerificationResult(response.data);
//     navigate('/login');
//   } catch (error) {
//     console.log(error);
//     setVerificationResult("An error occurred during OTP verification.");
//   }
// };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://ecommerce-lxo3.onrender.com/api/verify`);

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 1);
        setUsers(result);
        console.log(users[0]?.otp);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const latestUser = users.length > 0 ? user[0] : null;
  const latestServerOTP = latestUser ? parseInt(latestUser.otp) : null;
  console.log(latestServerOTP);
  return (
    <div style={{display:"flex", alignItems:"center",justifyContent:"center",
    flexDirection:"column",
    marginTop:"6rem",gap:"2rem"}}>
      <h2> Check your phone for OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={{display:"flex", alignItems:"center",justifyContent:"center",
    flexDirection:"column"
    ,gap:"2rem"}}>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button style={{marginTop:"2rem"}} type="submit">Verify OTP</button>
      </form>
      {/* <p>{verificationResult}</p> */}
    </div>
  );
};

export default OTPVerificationForm;
