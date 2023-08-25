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

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className=" text-primary text-uppercase fw-bold mb-4 ">
                <MDBIcon
                  style={{ color: "blue" }}
                  icon="gem"
                  className="me-3"
                />
                EASYBUY
                <span style={{ color: "red" }}>ENTERPRISES</span>
              </h6>
              <p> Buy products online at cheap prices.</p>

            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-primary text-uppercase fw-bold mb-4">
                Products
              </h6>
              <p>
                <Link to="/#" className="text-reset">
                  Phones{" "}
                </Link>
              </p>
              <p>
                <Link to="/#" className="text-reset">
                  Cars
                </Link>
              </p>
              <p>
                <Link to="/#" className="text-reset">
                  Electronics
                </Link>
              </p>
              <p>
                <Link to="/#" className="text-reset">
                  Clothings
                </Link>
              </p>
              <p>
                <Link to="/#" className="text-reset">
                  Laptops
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className=" text-primary text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <Link to="/cart" className="text-reset">
                  Pricing
                </Link>
              </p>
              <p>
                <Link to="/profile" className="text-reset">
                  Profile
                </Link>
              </p>
              <p>
                <Link
                  to={`/admin-dashboard/${user?.result?.name}`}
                  className="text-reset"
                >
                  DashBoard
                </Link>
              </p>
              <p>
                <Link to="all-products-page" className="text-reset">
                  Products
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className=" text-primary text-uppercase fw-bold mb-4">
                Support/customer care
              </h6>
           <p style={{display:'flex', gap:'2rem',flexWrap:'wrap'}}>
           <a href="mailto:daviskones2@gmail.com"><Email style={{ color: "black",fontSize:'2rem' }}/> <span style={{ color: "black"}} >Email</span></a>

             
<a href="https://wa.me/+1 (225) 453-4430" className="me-4 text-reset">
<WhatsApp style={{ color: "black",fontSize:'2rem' }} /> Whatsapp
</a>
           </p>
                
              
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
