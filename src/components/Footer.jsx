import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  Email,
  Facebook,
  GitHub,
  Google,
  Instagram,
  LinkedIn,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://wa.me/0757198515" className="me-4 text-reset">
            <WhatsApp style={{ color: "red" }} />
          </a>
          <a href="https://twitter.com/ridge_techs" className="me-4 text-reset">
            <Twitter style={{ color: "red" }} />
          </a>
          <a href="petergachau57@gmail.com" className="me-4 text-reset">
            <Google style={{ color: "red" }} />
          </a>
          <a
            href="https://www.instagram.com/peterrgachau/"
            className="me-4 text-reset"
          >
            <Instagram style={{ color: "red" }} fab icon="instagram" />
          </a>
          <a
            href="https://www.linkedin.com/in/peter-gachau-991736277/"
            className="me-4 text-reset"
          >
            <LinkedIn style={{ color: "red" }} fab icon="linkedin" />
          </a>
          <a href="https://github.com/petergachau" className="me-4 text-reset">
            <GitHub style={{ color: "red" }} fab icon="github" />
          </a>
        </div>
      </section>

      <section className="footer-section">
  <MDBContainer className="text-center text-md-start mt-5" id="footercontainer">
    <MDBRow className="mt-3">
      <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-4 equal-column2">
        <h6 className="headingblue">
          EASYBUY<span style={{ color: "red" }}>ENTERPRISES</span>
        </h6>
        <p>
          Buy a wide range of products online at affordable prices.
        </p>
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-4 equal-column">
        <h6 className="headingblue">
          Products
        </h6>
        <p>
          <a href="/#" className="text-reset">Phones</a>
        </p>
        <p>
          <a href="/#" className="text-reset">Cars</a>
        </p>
        <p>
          <a href="/#" className="text-reset">Electronics</a>
        </p>
        <p>
          <a href="/#" className="text-reset">Clothings</a>
        </p>
        <p>
          <a href="/#" className="text-reset">Laptops</a>
        </p>
        
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-4 equal-column">
        <h6 className="headingblue">
          Useful Links
        </h6>
        <p>
          <a href="/cart" className="text-reset">Pricing</a>
        </p>
        <p>
          <a href="/profile" className="text-reset">Profile</a>
        </p>
        <p>
          <a href="/profile" className="text-reset">Dashboard</a>
        </p>
        <p>
          <a href="/profile" className="text-reset">Products</a>
        </p>
    
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-4 equal-column">
        <h6 className="headingblue">
          Support / Customer Care
        </h6>
        <p>
          <a href="mailto:contact@easybuy.com" className="text-reset">
            Email Us
          </a>
        </p>
        <p>
          <a href="tel:+123456789" className="text-reset">
            Call Us: +123-456-789
          </a>
        </p>
      
      </MDBCol>
      <MDBCol md="5" lg="4" xl="4" className="mx-auto mb-md-0 mb-4 equal-column2">
        <div className="newsletterdiv" style={{
          margin:"0px",padding:"0px"
        }}>
          
            <h6 className="headingblue" >
              Subscribe to our newsletter to get updates on our latest offers </h6>
          
          <form action="" style={{ display: "flex" }}>
            <input
              type="email"
              className="newsdiv"
              placeholder="Enter Email address"
            />
            <button className="newsbtn">Subscribe</button>
          </form>
        </div>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>


      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        ©{new Date().getFullYear()} Copyright:
        <span>Eazybuyenterprises All Rights Reserved </span>
      </div>
    </MDBFooter>
  );
};

export default Footer;
