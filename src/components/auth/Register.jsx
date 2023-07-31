import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { StyledForm } from "./StyledForm";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [isChecked, setIsChecked] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    task: "",
    country:"",
    phone:"",
    address:"",
    img:"",
    city:"",
    age:""
  });

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
const handleSubmit = (e) => {
  e.preventDefault();
  const ages = 18;
  if (!isChecked) {
    alert('Please accept the terms and conditions.')
    toast.error('Please accept the terms and conditions.');
    return;
  }
  if (user.age >= ages) {
    console.log('hello');
    dispatch(registerUser(user));
    navigate("/otp");
    toast.success('register user success');
  } else {
    alert('you must be 18 years and above')
    toast.error('You must be 18 years or older to register.');
  }
};
    
const handleDownload1 = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = '/public/privacy.docx'; // Replace with the actual path of your DOCX file
  downloadLink.download = 'Privacy.docx'; // Specify the filename for the downloaded file
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};


const handleDownload = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = '/public/terms.docx'; // Replace with the actual path of your DOCX file
  downloadLink.download = 'Terms&Coditions.docx'; // Specify the filename for the downloaded file
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};


  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="country"
          onChange={(e) => setUser({ ...user, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="city"
          onChange={(e) => setUser({ ...user, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="address"
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />
        <input
          type="number"
          placeholder="phone"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
         <input
          type="number"
          required
          placeholder="age"
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <input
          type="password"
          required
          placeholder="password"
          onChange={(e) => setUser({ ...user, task: e.target.value })}
        />
         <p>profile Photo</p>
                  <FileBase
                  required
                    type="file"
                    placeholder="mpesa screenshot"
                    multiple={false}
                    onDone={({ base64 }) => setUser({ ...user, img: base64 })}
                  />

        <button>
          {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}

<p>if have account <Link to='/login'>
       Login
        </Link></p>
        <button onClick={handleDownload}>
      Read Terms and Conditions
    </button>
    <button onClick={handleDownload1}>
     Read Privacy Docs
    </button>
        <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
     
      </StyledForm>
    </>
  );
};

export default Register;
