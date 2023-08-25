import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Oders";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import SingleTour from "./components/SingleTour";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Post from "./components/Post";
import Otp from "./components/auth/Otp";
import AllProducts from "./components/AllProducts";
import ProfilePage from "./components/auth/Profile";
import Phones from "./components/categories/Phones";
import Laptops from "./components/categories/Laptops";
import Electronics from "./components/categories/Electronics";
import Clothing from "./components/categories/Clothing";
import Furnatures from "./components/categories/Furnatures";
import Others from "./components/categories/Others";
import Paypa from "./components/Paypa";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);


  return (
    <>
    
        <div className="App">
      <BrowserRouter>
        <ToastContainer />
        {/* <Header/> */}
        <NavBar />
        
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/post" element={<Post/>} />
            <Route path="/products" element={<AllProducts/>} />
            <Route path="/phones" element={<Phones/>} />
            <Route path="/laptops" element={<Laptops/>} />
            <Route path="/electronics" element={<Electronics/>} />
            <Route path="/clothing" element={<Clothing/>} />
            <Route path="/furnatures" element={<Furnatures/>} />
            <Route path="/others" element={<Others/>} />
            <Route path="/admin" element={<Dashboard />}>
            
              <Route path="summary" element={<Summary />} />

              <Route path="products" element={<Products />}>
                <Route path="create-product" element={<CreateProduct />} />
              </Route>
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          <Route path="checkout" element={<Paypa/>}/>
            <Route path="*" element={<NotFound />} />
                <Route path="/tour/:id" element={<SingleTour />} />
          </Routes>
        </div>
       <div style={{marginTop:"5rem"}}></div>
        <Footer/>

       
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App
