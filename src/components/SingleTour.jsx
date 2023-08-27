import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { Rating } from "@mui/material";
import Main from "./revews/App";
import Electronics from "./categories/Electronics";

const SingleTour = () => {
  const [todo, setTodo] = useState({
    task: "",
    rating: true,
  });
  const items = useSelector((state) => state.items);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  console.log(value);
  const navigate = useNavigate();
  const [users, setTours] = useState([]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo._id) {
      dispatch(updateTodo(todo));
    }

    setTodo({
      task: "",
      rating: false,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/products/find/${id}`
        );

        // res.data.sort(compare)
        // const result = res.data.filter((_, index) => index < 1);
        setTours(res.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const { id } = useParams();
  return (
    <div
      style={{
        padding: "1rem",
        gap: "2.7rem",
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
        alinItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "3rem",
      }}
    >
      <Card border="orange" style={{ width: "18rem" }}>
        <Card.Header>{users.name}</Card.Header>
        <Card.Body>
          <img style={{ width: "100%" }} src={users.image?.url} alt="" />
          <Card.Text>
            {" "}
            <span>price:</span> ${users.price}
          </Card.Text>
          <Card.Text>
            {" "}
            <span>phone</span> {users.No}
          </Card.Text>
          <Card.Text>
            {" "}
            <span>Category: </span> {users.brand}
          </Card.Text>
          <Card.Text>
            <p>{users.isComplete === true && "in -stock"}</p>
            <p>{users.isComplete == false && "out -stock"}</p>
            <p>{users.isComplete === true && "1"}</p>
            <p>{users.isComplete === false && "1"}</p>
          </Card.Text>
        </Card.Body>
        <button
          style={{
            background: "orange",
            borderRadius: "2px",
            border: "none",
            color: "white",
            height: "3rem",
          }}
          onClick={() => handleAddToCart(users)}
        >
          Buy the Item
        </button>
      </Card>
      <Card border="orange" style={{ width: "70%" }}>
        <Card.Header>Features</Card.Header>
        <Card.Body>
          <Main />
          <p>Description</p>
          <Card.Text>{users.desc}</Card.Text>
        </Card.Body>
      </Card>

      <h2>Related Products</h2>

      {users.brand==='electronic' &&(
        <>
        <Electronics/>
        </>
      ) }
    </div>
  );
};

export default SingleTour;
