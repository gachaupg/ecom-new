import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { productEdit } from "../../slices/productsSlice";

export default function EditProduct({ prodId }) {

    const handleInputChange = (setState) => (e) => {
        setState(e.target.value);
      };
    
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.products);
  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [No, setNo] = useState("");
  const [location, setLocation] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [battery, setBattery] = useState("");
  const [camera, setCamera] = useState("");
  const [os, setOs] = useState("");
  const [sim, setSim] = useState("");
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };
  const [currentProd, setCureentProd] = useState({});
  const [currentimg, setCureentimg] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
    let selectedItem = items.filter((item) => item._id === prodId);
    selectedItem = selectedItem[0];
    setCureentProd(selectedItem);
    setCureentimg(selectedItem.image.url)
    setProductImg("")
    setBrand(selectedItem.brand)
    setPrice(selectedItem.price)
    setDesc(selectedItem.desc)
    setLocation(selectedItem.location)
    setName(selectedItem.name)
    setNo(selectedItem.No)
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setCureentimg(reader.result)
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productEdit({
       productImg,
       product:{
     ...currentProd,
     name:name,
     brand:brand,
     price:price,
     desc:desc,
     No:No,
     location:location,
     
       }
       
      })
    );
  };
  console.log('jii',name);
  return (
    <div>
      <Button style={{ width: "6rem" }} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledCreateProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Product</h3>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={handleProductImageUpload}
              />
              <select onChange={(e) => setBrand(e.target.value)} value={brand} required>
                <option value="">Select Category</option>
                <option value="phone">phone</option>
                <option value="laptop">laptop</option>
                <option value="electronic">electronic</option>
                <option value="clothing">Clothing</option>
                <option value="furnatures">Furnatures</option>
                <option value="others">Other</option>
              </select>
              <input
                type="text"
                placeholder="Title of the phone"
                onChange={(e) => setName(e.target.value)}
                
                value={name}
                required
              />
              <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              {/* <input
          type="text"
          placeholder="specifications one"
          onChange={(e) => setRam(e.target.value)}
         
        />
      <input
          type="text"
          placeholder="specifications two"
          onChange={(e) => setRom(e.target.value)}
          
        />
         <input
          type="text"
          placeholder="specifications three"
          onChange={(e) => setBattery(e.target.value)}
        
        />
         <input
          type="text"
          placeholder="specifications four"
          onChange={(e) => setCamera(e.target.value)}
          
        />
         <input
          type="text"
          placeholder="specifications five"
          onChange={(e) => setOs(e.target.value)}
          
        />
      <input
          type="text"
          placeholder="specifications six"
          onChange={(e) => setSim(e.target.value)}
          
        /> */}
              <input
                type="text"
                placeholder="Short Description"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                required
              />
              <input
                type="number"
                placeholder="Phone Number"
                value={No}
                onChange={(e) => setNo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />

              <button type="submit">
                {createStatus === "pending" ? "Submitting" : "Submit"}
              </button>
            </StyledForm>
            <ImagePreview>
              {currentimg ? (
                <>
                  <img src={currentimg} alt="error!" />
                </>
              ) : (
                <p>Product image upload preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledCreateProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
