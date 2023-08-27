import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp, FaMoneyCheckAlt } from "react-icons/fa";
import { TiFlag } from "react-icons/ti"; // TiFlag represents the flag icon from the "react-icons" package
import Dropdown from "react-bootstrap/Dropdown";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Flags from "./Flags";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import Paypa from "./Paypa";
import { Rating } from "@mui/material";
import Main from "./revews/App";
import NewApp from "./revews/NewApp";
import Phones from "./categories/Phones";
import { Laptop } from "@mui/icons-material";
import Laptops from "./categories/Laptops";
import Electronics from "./categories/Electronics";
import Cars from "./categories/Cars";
import Others from "./categories/Others";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(0, 45) + " ...";
  }
  return str;
};
const Home = () => {
  const [value, setValue] = useState(3);
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
  console.log("query", query);
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
      <MDBDropdown>
        <MDBDropdownToggle
          style={{
            height: "2rem",
            width: "10rem",
            marginTop: "3rem",
            marginLeft: "3rem",
          }}
        >
          Categories
        </MDBDropdownToggle>
        <MDBDropdownMenu style={{ width: "2rem" }}>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/phones"
          >
            <MDBDropdownItem>Phones</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/electronics"
          >
            <MDBDropdownItem>Electronices</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/laptops"
          >
            <MDBDropdownItem>Laptops</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/clothing"
          >
            <MDBDropdownItem>Clothing</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/furnatures"
          >
            <MDBDropdownItem>Furnatures</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/cars"
          >
            <MDBDropdownItem>Cars</MDBDropdownItem>
          </Link>
          <Link
            style={{ textDecoration: "", textAlign: "center", color: "black" }}
            to="/others"
          >
            <MDBDropdownItem>Others</MDBDropdownItem>
          </Link>
        </MDBDropdownMenu>
      </MDBDropdown>

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
            {/* <NewApp/> */}
            <>
              <h2 style={{}}>Welcome to Easybuy Enterprises</h2>
            </>
            <div style={{ marginLeft: "2rem" }}></div>
            <h3
              style={{ color: "blue ", textAlign: "center", marginTop: "1rem" }}
            >
              Latest Products
            </h3>

            <div className="products">
              <>
                {users.filter((user) =>
                  user.brand.toLowerCase().includes(query.toLowerCase())
                ).length === 0 ? (
                  <div className="search-none">
                    <div>
                      <img
                        src="https://www.jumia.co.ke/assets_he/images/binoculars.389fc56a.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "orange",
                          fontSize: "2.5rem",
                          textAlign: "center",
                          marginLeft: "",
                        }}
                      >
                        No matching products found.
                      </h4>
                    </div>
                    <div>
                      <ul>
                        <li>There are no results for “{query}”.</li>
                        <li>Check your spelling for typing errors</li>
                        <li>- Try searching with short and simple keywords</li>
                      </ul>
                    </div>
                    <div>
                      <Link to="/">
                        <button
                          style={{ background: "orange", color: "white" }}
                          className="btn"
                        >
                          Home Page
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  users
                    .filter((user) =>
                      user.brand.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((product) => (
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
                              <img
                                src={product.image?.url}
                                alt={product.name}
                              />
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
                                <span>Category</span>{" "}
                                <span>{product.brand}</span>{" "}
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
                    ))
                )}
              </>
            </div>
            <Phones />
            <Laptops/>
            <Electronics/>
            {/* <Cars/> */}
            <Others/>
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          className="main-bottom"
        >
          <Link to="/products">
            <button style={{ paddingLeft: "4px", paddingRight: "4px" }}>
              All products
            </button>
          </Link>
        </div>
        <>
          <Flags />
        </>
      </div>
    </>
  );
};

export default Home;
