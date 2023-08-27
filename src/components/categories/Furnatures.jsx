import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaMoneyCheckAlt } from "react-icons/fa";
import { TiFlag } from "react-icons/ti"; // TiFlag represents the flag icon from the "react-icons" package
import Dropdown from "react-bootstrap/Dropdown";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Flags from "../Flags";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { Rating } from "@mui/material";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(0, 45) + " ...";
  }
  return str;
};
const Laptops = () => {
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
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/products`
        );

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 80);
        console.log("results", users);
        setUsers(result);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "" }}>All Laptops</h3>

      <div className="products">
        {status === "success" ? (
          <>
            {users.map((product) => {
              return (
                <>
                  
                    {product.brand === "laptop" && (
                      <>
                      <div
                    style={{ background: "white" }}
                    key={product._id}
                    className="product"
                  >
                        {/* {users.length<0 ?'hello':'none'} */}
                        <div>
                          <h6>{product.name}</h6>
                          <Link to={`/tour/${product._id}`}>
                            <img src={product.image?.url} alt={product.name} />
                          </Link>
                          <div className="details">
                            <span style={{ display: "flex", gap: "4rem" }}>
                              {" "}
                              <span> price </span>{" "}
                              <span> $ {product.price}</span>
                            </span>
                          </div>
                          <div className="details">
                            <span style={{ display: "flex", gap: "4rem" }}>
                              {" "}
                              <span>Category</span> <span>{product.brand}</span>{" "}
                            </span>
                          </div>
                          <div className="details">
                            <span style={{ display: "flex", gap: "4rem" }}>
                              <span>
                                {excerpt(product.desc)}
                                <Link to={`/tour/${product._id}`}>
                                  Read More
                                </Link>
                              </span>
                            </span>
                          </div>
                          <div>
                            <span>
                              <Rating
                                name="read-only"
                                value={product.task}
                                readOnly
                              />
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              gap: "3rem",
                            }}
                          >
                            <p>
                              {product.isComplete === true
                                ? "In stock"
                                : "Out of stock"}
                            </p>
                            <p>
                              {product.isComplete === true
                                ? "1 item left"
                                : "0 items left"}
                            </p>
                          </div>

                          <button onClick={() => handleAddToCart(product)}>
                            Add to cart
                          </button>
                        </div>
                        </div>
                      </>
                    )}
                  
                </>
              );
            })}
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )}

        <></>
      </div>
    </>
  );
};

export default Laptops;
