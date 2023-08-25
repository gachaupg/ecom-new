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
        const result = res.data.filter((_, index) => index < 39);
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
          <Link to="/phones">
            <MDBDropdownItem>Phones</MDBDropdownItem>
          </Link>
          <Link to="/electronics">
            <MDBDropdownItem>Electronices</MDBDropdownItem>
          </Link>
          <Link to="/laptops">
            <MDBDropdownItem>Laptops</MDBDropdownItem>
          </Link>
          <Link to="/clothing">
            <MDBDropdownItem>Clothing</MDBDropdownItem>
          </Link>
          <Link to="/furnatures">
            <MDBDropdownItem>Furnatures</MDBDropdownItem>
          </Link>
          <Link to="/others">
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
            <>
              <h2>Welcome to Easybuy Enterprises</h2>
            </>
            <div style={{ marginLeft: "2rem" }}></div>
            <h3
              style={{ color: "blue ", textAlign: "center", marginTop: "1rem" }}
            >
              New Arrivals
            </h3>
            <div className="products">
              {users &&
                users
                  .filter((user) => user.brand.toLowerCase().includes(query))
                  .map((product) => (
                    <div key={product._id} className="product">
                      <h6>{product.name}</h6>
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
                          <span>Category</span> <span>{product.brand}</span>{" "}
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
                      <div>
                        <span>
                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
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
              More products
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
