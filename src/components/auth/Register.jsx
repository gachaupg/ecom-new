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

  const [user, setUser] = useState({
    name: "",
    email: "",
    task: "",
    country:"",
    phone:"",
    address:"",
    img:"",
    city:""
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/otp");
      
       
        toast.success('register user sucess')
      
    }else{
      toast.error('register failed')

    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };
    console.log('jj',user);

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
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
          type="password"
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
      </StyledForm>
    </>
  );
};

export default Register;
