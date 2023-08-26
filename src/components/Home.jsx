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
              <h2 className="headertitle">Welcome to Easybuy Enterprises</h2>
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
                      <h5>{product.name}</h5>
                      <img src={product.image?.url} alt={product.name} />
                      {/* <div className="details">
                 
                    <span className="pric"><span style={{display:'flex', gap:'2rem'}}>Price</span> <span>ksh{product.price}</span> </span>
                  </div> */}
                      <div className="details">
                        <span style={{ display: "flex", gap: "3rem" }}>
                          {" "}
                          <span> price </span> <span> $ {product.price}</span>
                        </span>
                      </div>
                      <div className="details">
                        <span className="detailsspan" >
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
      <div className="cardpolicy">
  <div>
    <h5>Terms and Conditions and Privacy Policy for EasyBuy Enterprises</h5>
    <p>These Terms and Conditions ("Agreement") and Privacy Policy set forth the general terms and conditions,
      as well as the privacy practices, under which customers may use the EasyBuy Enterprises website ("Website")
      and the services available on the Website. By accessing or using the Website, you agree to be bound by this
      Agreement and Privacy Policy. If you do not agree to these terms, please do not use our Website.</p>
  </div>

  <div>
    <h6>Use of Website</h6>
    <p>
      <strong>Eligibility:</strong> You must be at least 18 years old and have legal capacity to enter into a binding contract to use this Website.<br />
      <strong>Account Creation:</strong> To place an order or access certain features on the Website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.<br />
      <strong>Accuracy of Information:</strong> You agree to provide accurate, current, and complete information during the registration process and to keep your information updated. EasyBuy Enterprises may rely on the information you provide to process and deliver your order.<br />
      <strong>Prohibited Activities:</strong> You may not use the Website for any illegal or unauthorized purpose. This includes, but is not limited to, violating any applicable laws, regulations, or third-party rights.
      <strong>Product Listings:</strong> EasyBuy Enterprises endeavors to provide accurate and up-to-date information about the Products on the Website. However, the availability, pricing, and descriptions of Products are subject to change without notice.<br />
      <strong>Order Acceptance:</strong> Your order constitutes an offer to purchase the selected Products. EasyBuy Enterprises reserves the right to accept or refuse any order for any reason at its sole discretion. If an order is canceled or rejected, any payment received will be promptly refunded.<br />
      <strong>Payment:</strong> All payments made through the Website must be made using the approved payment methods. EasyBuy Enterprises uses secure payment gateways to process online transactions.<br />
      <strong>Delivery:</strong> EasyBuy Enterprises will endeavor to deliver the Products within the estimated timeframes. However, any delivery date provided is only an estimate, and EasyBuy Enterprises will not be liable for any delays in delivery.
      <strong>Return Policy:</strong> EasyBuy Enterprises accepts returns of Products within 14 days of purchase, subject to certain conditions. Please refer to our Return Policy for more details.<br />
      <strong>Refunds:</strong> Refunds for returned Products will be issued to the original payment method used. Allowance for processing times may apply. EasyBuy Enterprises reserves the right to refuse refunds or partial refunds in certain circumstances.
    </p>
  </div>

  <div>
    <h6>Intellectual Property</h6>
    <p>All content on the Website, including but not limited to text, graphics, logos, images, and software, is the property of EasyBuy Enterprises and protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any of the content without prior written permission from EasyBuy Enterprises.</p>
  </div>

  <div>
    <h6>Disclaimers and Limitation of Liability</h6>
    <p>
      EasyBuy Enterprises makes no warranties, whether expressed or implied, regarding the accuracy, reliability, or availability of the Website or the Products. The Website and the Products are provided on an "as-is" and "as available" basis.
      In no event shall EasyBuy Enterprises be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the Website or the Products, even if EasyBuy Enterprises has been advised of the possibility of such damages.
    </p>
  </div>

  <div>
    <h6>Privacy Policy</h6>
    <p>
      <strong>Collection of Information:</strong> EasyBuy Enterprises may collect personal information from Customers, including but not limited to name, contact information, and payment details, in order to process orders and improve customer experience.
      <strong>Use of Information:</strong> EasyBuy Enterprises will use the collected information for the purposes for which it was provided, including order fulfillment, customer support, and internal business operations. Your information may also be used to send you marketing communications, which you can opt-out of at any time.
      <strong>Data Security:</strong> EasyBuy Enterprises takes reasonable precautions to protect the security and confidentiality of your information. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure.
      <strong>Sharing of Information:</strong> EasyBuy Enterprises may share your information with third-party service providers to facilitate order processing, delivery, and customer support. EasyBuy Enterprises will not sell or rent your personal information to third parties without your consent, except as required by law.
    </p>
  </div>

  <div>
    <h6>Amendments</h6>
    <p>EasyBuy Enterprises reserves the right to modify, update, or amend this Agreement and Privacy Policy at any time without prior notice. Continued use of the Website after any amendments indicates your acceptance of the revised terms.</p>
  </div>

  <div>
    <h6>Governing Law and Jurisdiction</h6>
    <p>This Agreement and Privacy Policy shall be governed by and construed in accordance with the laws of Your Country. Any dispute arising out of or in connection with this Agreement and Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Your Country.
      By using the EasyBuy Enterprises website, you acknowledge that you have read, understood, and agreed to the terms and conditions, as well as the privacy practices, stated above.</p>
  </div>
</div>

    </>
  );
};

export default Home;
