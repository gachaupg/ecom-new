import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  const id = user._id;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hustle-kenya-7azi.onrender.com/products/userProjects/${id}`
        );
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 1);
        setUsers(result);
        setLoading(false);
        console.log("user", users);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const followUser = () => {
    fetch("http://localhost:5000/users/follow", {
      method: "put",
      headers: {
        'Access-Control-Allow-Origin':'*',
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("profile"),
      },
      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <Link to="/">Home</Link>
              </MDBBreadcrumbItem>
             
              {/* <MDBBreadcrumbItem> */}
                {/* <a href={`/users-dashboard/${user?.result?.name}`}>Dashboard</a> */}
              {/* </MDBBreadcrumbItem> */}
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.img}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />

                <div className="d-flex justify-content-center mb-2">
                <a
                style={{ color: "black" }}
                href={`https://wa.me/${user.phone}`}
              >
                  <MDBBtn outline className="mt-3 ms-1">
                    Message
                  </MDBBtn>
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              {users.map((i) => {
                return (
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex  align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText className='text-danger'>Latest Item Posted</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex  align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="github fa-lg"
                          style={{ color: "#333333" }}
                        />
                        <MDBCardText>{i.item}</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex  align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="twitter fa-lg"
                          style={{ color: "#55acee" }}
                        />
                        <MDBCardText> Initial Price: ksh{i.price}</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex  align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="instagram fa-lg"
                          style={{ color: "#ac2bac" }}
                        />
                        <MDBCardText>
                          Discount Price ksh{i.discountPrice}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex  align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="facebook fa-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText>
                          Discount % {i.discountPercentage}%
                        </MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                );
              })}
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.phone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* <hr /> */}
                {/* <MDBRow> */}
                {/* <MDBCol sm="3"> */}
                {/* <MDBCardText>Mobile</MDBCardText> */}
                {/* </MDBCol> */}
                {/* <MDBCol sm="9"> */}
                {/* <MDBCardText className="text-muted">(098) 765-4321</MDBCardText> */}
                {/* </MDBCol> */}
                {/* </MDBRow> */}
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.country}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  
                  <MDBCol  sm="9">
                    <Link to='/register'>
                    <Button style={{background:'blue',
                  color:'white'}}>Update Profile</Button>
                    </Link>
                    
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Assigment
                      </span>{" "}
                      Project Status
                    </MDBCardText>
                    <MDBCardText
                      className="mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Products
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={users.length}
                        valuemin={0}
                        valuemax={1000}
                      />
                    </MDBProgress>


                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Sold Items
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={8} valuemin={0} valuemax={1000} />
                    </MDBProgress>

                    <MDBCardText
                      className="mt-4 mb-1"
                      style={{ fontSize: ".77rem" }}
                    >
                      Earnings
                    </MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar
                        width={8 * 5}
                        valuemin={0}
                        valuemax={1000}
                      />
                    </MDBProgress>

                    {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText> */}
                    {/* <MDBProgress className="rounded"> */}
                    {/* <MDBProgressBar width={66} valuemin={0} valuemax={100} /> */}
                    {/* </MDBProgress> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* <MDBCol md="6"> */}
              {/* <MDBCard className="mb-4 mb-md-0"> */}
              {/* <MDBCardBody> */}
              {/* <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText> */}
              {/* <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Products</MDBCardText> */}
              {/* <MDBProgress className="rounded"> */}
              {/* <MDBProgressBar width={80} valuemin={0} valuemax={100} /> */}
              {/* </MDBProgress> */}

              {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText> */}
              {/* <MDBProgress className="rounded"> */}
              {/* <MDBProgressBar width={72} valuemin={0} valuemax={100} /> */}
              {/* </MDBProgress> */}

              {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText> */}
              {/* <MDBProgress className="rounded"> */}
              {/* <MDBProgressBar width={89} valuemin={0} valuemax={100} /> */}
              {/* </MDBProgress> */}

              {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText> */}
              {/* <MDBProgress className="rounded"> */}
              {/* <MDBProgressBar width={55} valuemin={0} valuemax={100} /> */}
              {/* </MDBProgress> */}

              {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText> */}
              {/* <MDBProgress className="rounded"> */}
              {/* <MDBProgressBar width={66} valuemin={0} valuemax={100} /> */}
              {/* </MDBProgress> */}
              {/* </MDBCardBody> */}
              {/* </MDBCard> */}
              {/* </MDBCol> */}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
