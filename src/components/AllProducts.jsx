import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaMoneyCheckAlt } from "react-icons/fa";
import { TiFlag } from "react-icons/ti"; // TiFlag represents the flag icon from the "react-icons" package

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
const AllProducts = () => {
    const excerpt = (str) => {
        if (str.length > 45) {
          str = str.substring(0, 45) + " ...";
        }
        return str;
      };
    
        function compare(a, b) {
          if (a._id < b._id) {
            return 1;
          }
          if (a._id > b._id) {
            return -1;
          }
          return 0;
        }
      
        const { items: data, status } = useSelector((state) => state.products);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [users, setUsers] = useState([]);
        // const { data, error, isLoading } = useGetAllProductsQuery();
        const [query, setQuery] = useState("");
        const handleAddToCart = (product) => {
          dispatch(addToCart(product));
          navigate("/cart");
        };
      
        useEffect(() => {
          async function fetchData() {
            try {
              const res = await axios.get(`https://ecommerce-lxo3.onrender.com/api/products`);
      
              res.data.sort(compare);
            //   const result = res.data.filter((_, index) => index < 30);
              setUsers(res.data);
              console.log(users);
            } catch (error) {
              console.log(error);
            }
          }
          fetchData();
        }, []);
  return (
    <div style={{marginTop:'3rem'}}>
        <div className="home-container">
        {status === "success" ? (
        <>
          <div className="search">
            <input
              type="text"
              placeholder="Search by title..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          

          <h3
            style={{ color: "blue ", textAlign: "center", marginTop: "1rem" }}
          >
            All Products
          </h3>
          <div className="products">
            {users &&
              users
                .filter((user) => user.brand.toLowerCase().includes(query))
                .map((product) => (
                  <div key={product._id} className="product">
                    <h5>{product.name}</h5>
                    <img src={product.image?.url} alt={product.name} />
                    {/* <div className="details">
                 
                    <span className="pric"><span style={{display:'flex', gap:'2rem'}}>Price</span> <span>ksh{product.price}</span> </span>
                  </div> */}
                    <div className="details">
                      <span style={{ display: "flex", gap: "4rem" }}>
                        {" "}
                        <span> price </span> <span> $ {product.price}</span>
                      </span>
                    </div>
                    <div className="details">
                      <span style={{ display: "flex", gap: "4rem" }}>
                        {" "}
                        <span>location</span> <span>{product.brand}</span>{" "}
                      </span>
                    </div>
                    <div className="details">
                      <span style={{ display: "flex", gap: "4rem" }}>
                        <span>
                          {excerpt(product.desc)}
                          <Link to={`/tour/${product._id}`}>Read More</Link>
                        </span>
                      </span>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>
                      Add to cart
                    </button>

                    {/* <a  href={`https://wa.me/${product.No}`} target="_blank" rel="noreferrer noopener" style={{color:'orangered',listStyle:'none',textDecoration:'none'}}>
                    <button style={{backgroundColor:'red'}}>get in touch <FaWhatsapp/>Whatsapp</button>
                    </a> */}
                  </div>
                ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}

      
      <>
       
      </>
        </div>
    </div>
  )
}

export default AllProducts